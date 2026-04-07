import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clock } from "lucide-react";

const defaultSchedule = [
  { day: "Sunday", enabled: true, start: "9:00 AM", end: "4:00 PM" },
  { day: "Monday", enabled: true, start: "9:00 AM", end: "3:00 PM" },
  { day: "Tuesday", enabled: true, start: "2:00 PM", end: "5:00 PM" },
  { day: "Wednesday", enabled: true, start: "9:00 AM", end: "4:00 PM" },
  { day: "Thursday", enabled: true, start: "9:00 AM", end: "12:00 PM" },
  { day: "Friday", enabled: true, start: "2:00 PM", end: "5:00 PM" },
  { day: "Saturday", enabled: false, start: "", end: "" },
];

const ProviderSchedule = () => {
  const [schedule, setSchedule] = useState(defaultSchedule);

  const toggle = (idx: number) => {
    setSchedule((prev) => prev.map((s, i) => (i === idx ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="provider" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Manage Schedule</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 bg-muted/30">
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-sm text-muted-foreground">Configure your availability for each day of the week.</p>

              {schedule.map((s, idx) => (
                <div key={s.day} className="card-shadow rounded-2xl bg-card p-4 flex items-center gap-4">
                  <button
                    onClick={() => toggle(idx)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      s.enabled ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{s.day}</p>
                    {s.enabled ? (
                      <p className="text-sm text-muted-foreground">{s.start} – {s.end}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Unavailable</p>
                    )}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.enabled ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {s.enabled ? "Active" : "Off"}
                  </span>
                </div>
              ))}

              <Button className="w-full rounded-xl" onClick={() => toast.success("Schedule saved! (Mock)")}>
                Save Schedule
              </Button>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProviderSchedule;
