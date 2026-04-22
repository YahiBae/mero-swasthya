import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/data/appointmentStore";

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-green-100 text-green-700" },
  completed: { label: "Completed", className: "bg-blue-100 text-blue-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
  pending: { label: "Reschedule Pending", className: "bg-yellow-100 text-yellow-700" },
};

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const config = statusConfig[status];
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", config.className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
