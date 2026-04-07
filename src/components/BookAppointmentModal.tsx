import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { saveAppointment } from "@/data/appointmentStore";
import { Doctor, hospitals, clinics } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@/hooks/useAuthStatus";

interface BookAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  doctor: Doctor;
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const BookAppointmentModal = ({ open, onClose, doctor }: BookAppointmentModalProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [problem, setProblem] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();

  const selectedDayName = date ? dayNames[date.getDay()] : null;
  const availableSlots = selectedDayName
    ? doctor.availability.find((a) => a.day === selectedDayName)?.slots ?? []
    : [];

  const availableDays = doctor.availability.map((a) => a.day);

  const isDateAvailable = (d: Date) => {
    const name = dayNames[d.getDay()];
    return availableDays.includes(name) && d >= new Date(new Date().toDateString());
  };

  const hospitalOrClinic =
    hospitals.find((h) => h.id === doctor.hospitalId)?.name ??
    clinics.find((c) => c.doctorIds.includes(doctor.id))?.name ??
    doctor.hospital;

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast.error("Please login or register to book an appointment.");
      handleClose();
      navigate("/login");
      return;
    }

    if (!date || !selectedSlot || !patientName.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      saveAppointment({
        patientName: patientName.trim(),
        problemDescription: problem.trim(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        hospitalOrClinic,
        date: format(date, "yyyy-MM-dd"),
        timeSlot: selectedSlot,
      });
      setStep("success");
    } catch {
      toast.error("Please login or register to book an appointment.");
      handleClose();
      navigate("/login");
    }
  };

  const handleClose = () => {
    setStep("form");
    setDate(undefined);
    setSelectedSlot(null);
    setPatientName("");
    setProblem("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Book Appointment</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {doctor.name} · {doctor.specialty}
              </p>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Date Picker */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-primary" /> Select Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => { setDate(d); setSelectedSlot(null); }}
                      disabled={(d) => !isDateAvailable(d)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slots */}
              {date && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" /> Select Time Slot *
                  </label>
                  {availableSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "rounded-xl px-4 py-2 text-sm font-medium transition-all border",
                            selectedSlot === slot
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:border-primary/50"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No slots available on this day.</p>
                  )}
                </div>
              )}

              {/* Patient Info */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" /> Patient Name *
                </label>
                <Input
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" /> Problem Description
                </label>
                <Textarea
                  placeholder="Briefly describe your health concern..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  maxLength={500}
                  rows={3}
                />
              </div>

              {/* Summary */}
              {date && selectedSlot && patientName.trim() && (
                <div className="rounded-xl bg-secondary/50 p-4 text-sm space-y-1">
                  <p className="font-medium text-foreground">Booking Summary</p>
                  <p className="text-muted-foreground">Doctor: {doctor.name}</p>
                  <p className="text-muted-foreground">Date: {format(date, "PPP")}</p>
                  <p className="text-muted-foreground">Time: {selectedSlot}</p>
                  <p className="text-muted-foreground">Fee: Rs. {doctor.fee}</p>
                </div>
              )}

              {!isAuthenticated && (
                <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  You must login or register before booking.
                </p>
              )}

              <Button className="w-full rounded-xl" size="lg" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Appointment Booked!</h3>
            <p className="mt-2 text-muted-foreground">
              Your appointment with {doctor.name} has been confirmed.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={handleClose}>Close</Button>
              <Button onClick={() => { handleClose(); navigate("/dashboard"); }}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
