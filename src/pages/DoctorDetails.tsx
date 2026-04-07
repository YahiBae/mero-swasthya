import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Star, Clock, Banknote, GraduationCap, Languages, Calendar, ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors, hospitals } from "@/data/mockData";
import { useEffect, useState } from "react";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { toast } from "sonner";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const doctor = doctors.find((d) => d.id === Number(id));
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "qualifications">("overview");
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (searchParams.get("book") !== "1") {
      return;
    }
    setBookingOpen(true);
    const next = new URLSearchParams(searchParams);
    next.delete("book");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-lg text-muted-foreground">Doctor not found.</p>
          <Link to="/doctors"><Button variant="outline" className="mt-4 gap-2"><ArrowLeft className="h-4 w-4" /> Back to Doctors</Button></Link>
        </div>
      </div>
    );
  }

  const hospital = hospitals.find((h) => h.id === doctor.hospitalId);
  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "schedule" as const, label: "Schedule" },
    { key: "qualifications" as const, label: "Qualifications" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <BookAppointmentModal open={bookingOpen} onClose={() => setBookingOpen(false)} doctor={doctor} />

      <div className="hero-gradient py-10">
        <div className="container mx-auto px-4">
          <Link to="/doctors" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Doctors
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img src={doctor.image} alt={doctor.name} className="h-28 w-28 rounded-2xl object-cover ring-4 ring-background shadow-lg" />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{doctor.name}</h1>
              <p className="mt-1 text-lg font-medium text-primary">{doctor.specialty}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{doctor.rating} Rating</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{doctor.experience} years exp.</span>
                <span className="flex items-center gap-1"><Banknote className="h-4 w-4" />Rs. {doctor.fee}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{doctor.city}</span>
              </div>
              {hospital && (
                <Link to={`/hospitals/${hospital.id}`} className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  <Building2 className="h-4 w-4" /> {hospital.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex gap-1 rounded-xl bg-muted p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"><Languages className="h-5 w-5 text-primary" /> Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((l) => (
                    <span key={l} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">{l}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="card-shadow rounded-2xl bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Book Appointment</h3>
                <p className="text-sm text-muted-foreground mb-4">Schedule a visit with {doctor.name}.</p>
                <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                <p className="text-2xl font-bold text-foreground mb-4">Rs. {doctor.fee}</p>
                <Button
                  className="w-full rounded-xl"
                  size="lg"
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please login or register to book an appointment.");
                      navigate("/login");
                      return;
                    }
                    setBookingOpen(true);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctor.availability.map((a) => (
              <div key={a.day} className="card-shadow rounded-2xl bg-card p-5">
                <h3 className="font-semibold text-card-foreground mb-3">{a.day}</h3>
                <div className="flex flex-wrap gap-2">
                  {a.slots.map((slot) => (
                    <span key={slot} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">{slot}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "qualifications" && (
          <div className="max-w-2xl space-y-4">
            {doctor.qualifications.map((q, i) => (
              <div key={i} className="card-shadow rounded-2xl bg-card p-5 flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary shrink-0">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{q}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DoctorDetails;
