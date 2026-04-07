const CardSkeleton = ({ variant = "default" }: { variant?: "default" | "doctor" }) => {
  if (variant === "doctor") {
    return (
      <div className="animate-pulse card-shadow rounded-2xl bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-5">
          <div className="h-16 w-16 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
        </div>
        <div className="border-t border-border px-5 py-3">
          <div className="h-4 w-full rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse card-shadow rounded-2xl bg-card overflow-hidden">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
