import { useState, useEffect } from "react";
import { CalendarDays, Clock, CheckCircle, Users } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { getAppointments, updateAppointmentStatus, type Appointment } from "@/data/appointmentStore";
import { toast } from "sonner";

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => (
  <div className="card-shadow rounded-2xl bg-card p-5 flex items-center gap-4">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

const ProviderDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const refresh = () => setAppointments(getAppointments());

  const upcoming = appointments.filter((a) => a.status === "confirmed");
  const completed = appointments.filter((a) => a.status === "completed");
  const patients = new Set(appointments.map((a) => a.patientName)).size;

  const handleAccept = (id: string) => {
    updateAppointmentStatus(id, "confirmed");
    refresh();
    toast.success("Appointment accepted.");
  };

  const handleReject = (id: string) => {
    updateAppointmentStatus(id, "cancelled");
    refresh();
    toast.success("Appointment rejected.");
  };

  const handleComplete = (id: string) => {
    updateAppointmentStatus(id, "completed");
    refresh();
    toast.success("Appointment marked as completed.");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="provider" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Provider Dashboard</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 bg-muted/30">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Bookings" value={appointments.length} icon={CalendarDays} color="bg-primary/10 text-primary" />
              <StatCard label="Upcoming" value={upcoming.length} icon={Clock} color="bg-green-100 text-green-600" />
              <StatCard label="Completed" value={completed.length} icon={CheckCircle} color="bg-blue-100 text-blue-600" />
              <StatCard label="Patients" value={patients} icon={Users} color="bg-purple-100 text-purple-600" />
            </div>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Recent Bookings</h2>
              {appointments.length === 0 ? (
                <p className="text-muted-foreground text-sm">No bookings yet.</p>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 10).map((a) => (
                    <div key={a.id} className="card-shadow rounded-2xl bg-card p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-card-foreground">{a.patientName}</p>
                        <p className="text-sm text-muted-foreground truncate">{a.doctorName} · {a.problemDescription || "No description"}</p>
                      </div>
                      <div className="text-sm text-muted-foreground shrink-0">{a.date} · {a.timeSlot}</div>
                      <StatusBadge status={a.status} />
                      {a.status === "confirmed" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleComplete(a.id)}>Complete</Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleReject(a.id)}>
                            Reject
                          </Button>
                        </div>
                      )}
                      {a.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAccept(a.id)}>Accept</Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleReject(a.id)}>
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProviderDashboard;
