import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import { deleteAppointmentById, deleteAppointmentsByIds, getAppointments, updateAppointmentStatus, type Appointment } from "@/data/appointmentStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [clearMode, setClearMode] = useState(false);
  const [selectedPastIds, setSelectedPastIds] = useState<string[]>([]);
  const [clearUpcomingMode, setClearUpcomingMode] = useState(false);
  const [selectedUpcomingIds, setSelectedUpcomingIds] = useState<string[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);
  const pastFiltered = filtered.filter((a) => a.status === "completed" || a.status === "cancelled");
  const upcomingFiltered = filtered.filter((a) => a.status === "confirmed");

  const toggleSelect = (id: string) => {
    setSelectedPastIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleClearOne = (id: string) => {
    deleteAppointmentById(id);
    setAppointments(getAppointments());
    setSelectedPastIds((current) => current.filter((item) => item !== id));
    toast.success("Past appointment cleared.");
  };

  const handleClearSelected = () => {
    if (selectedPastIds.length === 0) {
      toast.error("Select past appointments to clear.");
      return;
    }

    const removed = deleteAppointmentsByIds(selectedPastIds);
    setAppointments(getAppointments());
    setSelectedPastIds([]);
    setClearMode(false);
    toast.success(`${removed} past appointment${removed > 1 ? "s" : ""} cleared.`);
  };

  const toggleUpcomingSelect = (id: string) => {
    setSelectedUpcomingIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleClearUpcomingOne = (id: string) => {
    deleteAppointmentById(id);
    setAppointments(getAppointments());
    setSelectedUpcomingIds((current) => current.filter((item) => item !== id));
    toast.success("Upcoming appointment cleared.");
  };

  const handleClearUpcomingSelected = () => {
    if (selectedUpcomingIds.length === 0) {
      toast.error("Select upcoming appointments to clear.");
      return;
    }

    const removed = deleteAppointmentsByIds(selectedUpcomingIds);
    setAppointments(getAppointments());
    setSelectedUpcomingIds([]);
    setClearUpcomingMode(false);
    toast.success(`${removed} upcoming appointment${removed > 1 ? "s" : ""} cleared.`);
  };

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, "cancelled");
    setAppointments(getAppointments());
    toast.success("Appointment cancelled.");
  };

  useEffect(() => {
    if (!clearMode) {
      setSelectedPastIds([]);
    }
  }, [clearMode, filter]);

  useEffect(() => {
    if (!clearUpcomingMode) {
      setSelectedUpcomingIds([]);
    }
  }, [clearUpcomingMode, filter]);

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "confirmed" as const, label: "Upcoming" },
    { key: "completed" as const, label: "Completed" },
    { key: "cancelled" as const, label: "Cancelled" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="patient" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">My Appointments</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-5 bg-muted/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
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

              {pastFiltered.length > 0 && (
                <div className="flex items-center gap-2">
                  {clearMode ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setClearMode(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="gap-2" onClick={handleClearSelected}>
                        <Trash2 className="h-4 w-4" /> Clear History ({selectedPastIds.length})
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="gap-2" onClick={() => setClearMode(true)}>
                      <Trash2 className="h-4 w-4" /> Clear History
                    </Button>
                  )}
                </div>
              )}

              {upcomingFiltered.length > 0 && (
                <div className="flex items-center gap-2">
                  {clearUpcomingMode ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setClearUpcomingMode(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="gap-2" onClick={handleClearUpcomingSelected}>
                        <Trash2 className="h-4 w-4" /> Clear Upcoming ({selectedUpcomingIds.length})
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="gap-2" onClick={() => setClearUpcomingMode(true)}>
                      <Trash2 className="h-4 w-4" /> Clear Upcoming
                    </Button>
                  )}
                </div>
              )}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm">No appointments found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((a) => (
                  <div
                    key={a.id}
                    className={`card-shadow rounded-2xl bg-card p-5 flex flex-col md:flex-row md:items-center gap-4 ${
                      clearMode && selectedPastIds.includes(a.id) ? "ring-2 ring-primary/50" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-semibold text-card-foreground">{a.doctorName}</p>
                      <p className="text-sm text-muted-foreground">{a.hospitalOrClinic}</p>
                      {a.problemDescription && (
                        <p className="text-xs text-muted-foreground">Concern: {a.problemDescription}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground shrink-0">
                      {a.date} · {a.timeSlot}
                    </div>
                    <StatusBadge status={a.status} />
                    {a.status === "confirmed" && clearUpcomingMode && (
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={selectedUpcomingIds.includes(a.id)}
                          onChange={() => toggleUpcomingSelect(a.id)}
                        />
                        Select
                      </label>
                    )}
                    {(a.status === "completed" || a.status === "cancelled") && clearMode && (
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={selectedPastIds.includes(a.id)}
                          onChange={() => toggleSelect(a.id)}
                        />
                        Select
                      </label>
                    )}
                    {a.status === "confirmed" && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleCancel(a.id)}>
                          Cancel
                        </Button>
                        {!clearUpcomingMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() => handleClearUpcomingOne(a.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Clear
                          </Button>
                        )}
                      </div>
                    )}
                    {(a.status === "completed" || a.status === "cancelled") && !clearMode && (
                      <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleClearOne(a.id)}>
                        <Trash2 className="h-3.5 w-3.5" /> Clear
                      </Button>
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

export default PatientAppointments;
