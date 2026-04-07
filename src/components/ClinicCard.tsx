import { MapPin, Star } from "lucide-react";
import type { Clinic } from "@/data/mockData";

const ClinicCard = ({ clinic }: { clinic: Clinic }) => (
  <div className="group card-shadow overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
    <div className="relative h-48 overflow-hidden">
      <img
        src={clinic.image}
        alt={clinic.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
        {clinic.type}
      </span>
      <h3 className="mt-2 font-semibold text-card-foreground line-clamp-1">{clinic.name}</h3>
      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        {clinic.location}
      </div>
      <div className="mt-3 flex items-center gap-1">
        <Star className="h-4 w-4 fill-primary text-primary" />
        <span className="text-sm font-medium">{clinic.rating}</span>
      </div>
    </div>
  </div>
);

export default ClinicCard;
