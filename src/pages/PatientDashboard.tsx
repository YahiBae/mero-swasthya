import { useState, useEffect } from "react";
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import { getAppointments, type Appointment } from "@/data/appointmentStore";

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

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const upcoming = appointments.filter((a) => a.status === "confirmed");
  const completed = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="patient" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 bg-muted/30">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total" value={appointments.length} icon={CalendarDays} color="bg-primary/10 text-primary" />
              <StatCard label="Upcoming" value={upcoming.length} icon={Clock} color="bg-green-100 text-green-600" />
              <StatCard label="Completed" value={completed.length} icon={CheckCircle} color="bg-blue-100 text-blue-600" />
              <StatCard label="Cancelled" value={cancelled.length} icon={XCircle} color="bg-red-100 text-red-600" />
            </div>

            {/* Upcoming */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming Appointments</h2>
              {upcoming.length === 0 ? (
                <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((a) => (
                    <AppointmentRow key={a.id} appointment={a} />
                  ))}
                </div>
              )}
            </section>

            {/* Past */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Past Appointments</h2>
              {[...completed, ...cancelled].length === 0 ? (
                <p className="text-muted-foreground text-sm">No past appointments.</p>
              ) : (
                <div className="space-y-3">
                  {[...completed, ...cancelled].map((a) => (
                    <AppointmentRow key={a.id} appointment={a} />
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

const AppointmentRow = ({ appointment }: { appointment: Appointment }) => (
  <div className="card-shadow rounded-2xl bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
    <div className="flex-1 min-w-0">
      <p className="font-medium text-card-foreground truncate">{appointment.doctorName}</p>
      <p className="text-sm text-muted-foreground truncate">{appointment.hospitalOrClinic}</p>
    </div>
    <div className="text-sm text-muted-foreground shrink-0">
      {appointment.date} · {appointment.timeSlot}
    </div>
    <StatusBadge status={appointment.status} />
  </div>
);

export default PatientDashboard;
