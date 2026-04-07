import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Star, BedDouble, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { hospitals, doctors } from "@/data/mockData";
import { useState } from "react";

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find((h) => h.id === Number(id));
  const [activeTab, setActiveTab] = useState<"overview" | "departments" | "doctors">("overview");

  if (!hospital) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-lg text-muted-foreground">Hospital not found.</p>
          <Link to="/hospitals"><Button variant="outline" className="mt-4 gap-2"><ArrowLeft className="h-4 w-4" /> Back to Hospitals</Button></Link>
        </div>
      </div>
    );
  }

  const hospitalDoctors = doctors.filter((d) => hospital.doctorIds.includes(d.id));
  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "departments" as const, label: `Departments (${hospital.departments.length})` },
    { key: "doctors" as const, label: `Doctors (${hospitalDoctors.length})` },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/hospitals" className="mb-3 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Hospitals
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground">{hospital.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{hospital.location}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{hospital.rating}</span>
              <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{hospital.beds} beds</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Est. {hospital.established}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
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
                <p className="text-muted-foreground leading-relaxed">{hospital.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card-shadow rounded-2xl bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" /> {hospital.phone}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" /> {hospital.email}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {hospital.location}
                  </div>
                </div>
                <Button
                  className="mt-6 w-full rounded-xl"
                  onClick={() => {
                    if (hospitalDoctors.length === 0) {
                      return;
                    }
                    navigate(`/doctors/${hospitalDoctors[0].id}?book=1`);
                  }}
                  disabled={hospitalDoctors.length === 0}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hospital.departments.map((dept) => (
              <div key={dept} className="card-shadow rounded-2xl bg-card p-5 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-0.5">
                <h3 className="font-semibold text-card-foreground">{dept}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Specialized care and treatment</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "doctors" && (
          hospitalDoctors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospitalDoctors.map((d) => (
                <Link key={d.id} to={`/doctors/${d.id}`}>
                  <DoctorCard doctor={d} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-muted-foreground">No doctors listed for this hospital yet.</p>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HospitalDetails;
