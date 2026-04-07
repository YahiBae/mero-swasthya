import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Star, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { clinics, doctors } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";

const ClinicDetails = () => {
  const { id } = useParams();
  const clinic = clinics.find((c) => c.id === Number(id));
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "doctors">("overview");

  if (!clinic) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-lg text-muted-foreground">Clinic not found.</p>
          <Link to="/clinics"><Button variant="outline" className="mt-4 gap-2"><ArrowLeft className="h-4 w-4" /> Back to Clinics</Button></Link>
        </div>
      </div>
    );
  }

  const clinicDoctors = doctors.filter((d) => clinic.doctorIds.includes(d.id));
  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "services" as const, label: `Services (${clinic.services.length})` },
    { key: "doctors" as const, label: `Doctors (${clinicDoctors.length})` },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/clinics" className="mb-3 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Clinics
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground">{clinic.name}</h1>
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">{clinic.type}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{clinic.location}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{clinic.rating}</span>
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
                <p className="text-muted-foreground leading-relaxed">{clinic.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card-shadow rounded-2xl bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact & Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" /> {clinic.phone}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {clinic.location}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Working Hours</h4>
                  <div className="space-y-1.5">
                    {clinic.workingHours.map((wh) => (
                      <div key={wh.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{wh.day}</span>
                        <span className="font-medium text-foreground">{wh.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-6 w-full rounded-xl" onClick={() => toast.success("Appointment booking coming soon!")}>
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clinic.services.map((service) => (
              <div key={service} className="card-shadow rounded-2xl bg-card p-5 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-0.5">
                <h3 className="font-semibold text-card-foreground">{service}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Professional healthcare service</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "doctors" && (
          clinicDoctors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clinicDoctors.map((d) => (
                <Link key={d.id} to={`/doctors/${d.id}`}>
                  <DoctorCard doctor={d} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-muted-foreground">No doctors listed for this clinic yet.</p>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ClinicDetails;
