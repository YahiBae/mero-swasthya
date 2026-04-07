import { MapPin, Star, BedDouble } from "lucide-react";
import type { Hospital } from "@/data/mockData";

const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
  <div className="group card-shadow overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
    <div className="relative h-48 overflow-hidden">
      <img
        src={hospital.image}
        alt={hospital.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-card-foreground line-clamp-1">{hospital.name}</h3>
      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        {hospital.location}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{hospital.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <BedDouble className="h-4 w-4" />
          {hospital.beds} beds
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {hospital.specialties.slice(0, 2).map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default HospitalCard;
