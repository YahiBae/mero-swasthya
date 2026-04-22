import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import { getAppointments, updateAppointmentStatus, type Appointment } from "@/data/appointmentStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProviderAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending" | "completed" | "cancelled">("all");

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const refresh = () => setAppointments(getAppointments());
  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "confirmed" as const, label: "Confirmed" },
    { key: "pending" as const, label: "Reschedule Pending" },
    { key: "completed" as const, label: "Completed" },
    { key: "cancelled" as const, label: "Cancelled" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="provider" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Manage Appointments</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-5 bg-muted/30">
            <div className="flex gap-1 rounded-xl bg-muted p-1 w-fit">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    filter === f.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm">No appointments found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((a) => (
                  <div key={a.id} className="card-shadow rounded-2xl bg-card p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-semibold text-card-foreground">{a.patientName}</p>
                      <p className="text-sm text-muted-foreground">{a.doctorName} · {a.hospitalOrClinic}</p>
                      {a.problemDescription && <p className="text-xs text-muted-foreground">Concern: {a.problemDescription}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground shrink-0">{a.date} · {a.timeSlot}</div>
                    <StatusBadge status={a.status} />
                    {a.status === "confirmed" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { updateAppointmentStatus(a.id, "completed"); refresh(); toast.success("Marked complete."); }}>
                          Complete
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => { updateAppointmentStatus(a.id, "cancelled"); refresh(); toast.success("Rejected."); }}>
                          Reject
                        </Button>
                      </div>
                    )}
                    {a.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateAppointmentStatus(a.id, "cancelled");
                            refresh();
                            toast.success("Reschedule request accepted. Previous slot cancelled.");
                          }}
                        >
                          Accept Reschedule
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateAppointmentStatus(a.id, "confirmed");
                            refresh();
                            toast.success("Reschedule request declined. Appointment kept confirmed.");
                          }}
                        >
                          Keep Current Slot
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProviderAppointments;
