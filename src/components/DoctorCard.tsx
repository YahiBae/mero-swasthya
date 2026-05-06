import { useState } from "react";
import { Star, Clock, Banknote } from "lucide-react";
import type { Doctor } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isAuthenticated } = useAuthStatus();
  const navigate = useNavigate();

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.error("Please login or register to book an appointment.");
      navigate("/login");
      return;
    }
    setBookingOpen(true);
  };

  return (
    <>
      <div className="group card-shadow overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
        <div className="flex items-center gap-4 p-5">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-secondary"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground">{doctor.name}</h3>
            <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
            <p className="text-xs text-muted-foreground">{doctor.hospital}</p>
          </div>
        </div>
        <div className="border-t border-border px-5 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                {doctor.rating}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {doctor.experience}yr
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Banknote className="h-3.5 w-3.5" />
                Rs.{doctor.fee}
              </span>
            </div>
            <Button size="sm" variant="default" className="h-8 text-xs" onClick={handleBook}>
              Book
            </Button>
          </div>
        </div>
      </div>
      <BookAppointmentModal open={bookingOpen} onClose={() => setBookingOpen(false)} doctor={doctor} />
    </>
  );
};

export default DoctorCard;
