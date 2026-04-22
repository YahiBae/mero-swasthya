import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { BellRing, CalendarClock, CircleCheckBig, Clock3, RefreshCw, XCircle } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { getAppointmentReminders, getAppointments } from "@/data/appointmentStore";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: "reminder" | "pending" | "cancelled" | "completed";
}

const READ_STORAGE_KEY = "mero_swasthya_read_notifications";

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  const refreshNotifications = () => {
    const appointments = getAppointments();

    const reminderNotifications: NotificationItem[] = getAppointmentReminders(appointments).map((reminder) => {
      const appointment = appointments.find((item) => item.id === reminder.appointmentId);
      const title = reminder.type === "2h" ? "Appointment starts soon" : "Upcoming appointment reminder";

      return {
        id: `reminder:${reminder.appointmentId}:${reminder.type}`,
        title,
        description: appointment
          ? `${appointment.doctorName} at ${appointment.hospitalOrClinic} on ${appointment.date} at ${appointment.timeSlot}.`
          : reminder.message,
        createdAt: reminder.scheduledFor,
        type: "reminder",
      };
    });

    const statusNotifications: NotificationItem[] = appointments
      .filter((appointment) => appointment.status === "pending" || appointment.status === "cancelled" || appointment.status === "completed")
      .map((appointment) => {
        if (appointment.status === "pending") {
          return {
            id: `status:${appointment.id}:pending`,
            title: "Reschedule request sent",
            description: `Your request to reschedule ${appointment.doctorName} is awaiting provider response.`,
            createdAt: appointment.rescheduleRequestedAt ?? appointment.createdAt,
            type: "pending" as const,
          };
        }

        if (appointment.status === "completed") {
          return {
            id: `status:${appointment.id}:completed`,
            title: "Appointment completed",
            description: `Your appointment with ${appointment.doctorName} has been marked as completed.`,
            createdAt: appointment.createdAt,
            type: "completed" as const,
          };
        }

        return {
          id: `status:${appointment.id}:cancelled`,
          title: "Appointment cancelled",
          description: `Appointment with ${appointment.doctorName} was cancelled.`,
          createdAt: appointment.createdAt,
          type: "cancelled" as const,
        };
      });

    const merged = [...reminderNotifications, ...statusNotifications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setNotifications(merged);
  };

  useEffect(() => {
    refreshNotifications();

    try {
      const saved = localStorage.getItem(READ_STORAGE_KEY);
      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved) as string[];
      if (Array.isArray(parsed)) {
        setReadIds(parsed);
      }
    } catch {
      setReadIds([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !readIds.includes(notification.id)).length,
    [notifications, readIds],
  );

  const markAllAsRead = () => {
    setReadIds(notifications.map((notification) => notification.id));
  };

  const markAsRead = (id: string) => {
    if (readIds.includes(id)) {
      return;
    }
    setReadIds((current) => [...current, id]);
  };

  const iconByType = {
    reminder: BellRing,
    pending: RefreshCw,
    cancelled: XCircle,
    completed: CircleCheckBig,
  };

  const toneByType = {
    reminder: "bg-amber-100 text-amber-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-emerald-100 text-emerald-700",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="patient" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Notifications</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-5 bg-muted/30">
            <div className="rounded-2xl bg-card border border-border p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Keep track of reminders and appointment updates.</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
                </p>
              </div>
              <Button variant="outline" onClick={markAllAsRead} disabled={notifications.length === 0 || unreadCount === 0}>
                Mark all as read
              </Button>
            </div>

            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                <CalendarClock className="h-6 w-6 text-muted-foreground mx-auto" />
                <p className="mt-3 text-sm text-muted-foreground">No notifications yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const Icon = iconByType[notification.type];
                  const isRead = readIds.includes(notification.id);

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isRead
                          ? "border-border/60 bg-card"
                          : "border-primary/30 bg-primary/5 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <span className={`mt-0.5 rounded-lg p-2 ${toneByType[notification.type]}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientNotifications;