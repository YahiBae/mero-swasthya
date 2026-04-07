import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Ambulance, Clock3, Hospital, PhoneCall, ShieldPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/mockData";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { toast } from "sonner";

const EmergencyService = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();
  const [issue, setIssue] = useState("Chest Pain");

  const emergencyReadyHospitals = useMemo(() => {
    return hospitals
      .filter((h) => h.departments.some((dept) => dept.toLowerCase().includes("emergency")))
      .sort((a, b) => b.beds - a.beds);
  }, []);

  const handleUrgentConsult = () => {
    if (!isAuthenticated) {
      toast.error("Please login first for urgent consultation booking.");
      navigate("/login");
      return;
    }

    if (issue.toLowerCase().includes("chest")) {
      navigate("/doctors?department=Cardiology");
      return;
    }

    if (issue.toLowerCase().includes("accident") || issue.toLowerCase().includes("fracture")) {
      navigate("/doctors?department=Orthopedics");
      return;
    }

    navigate("/doctors?department=General%20Practice");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <section className="hero-gradient border-b border-border py-14">
        <div className="container mx-auto px-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
            <AlertTriangle className="h-3.5 w-3.5" /> Emergency 24/7 Support
          </p>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">Emergency Service</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Fast triage guidance, emergency-ready hospitals, and immediate consultation routing.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+9779801985751">
              <Button className="gap-2 rounded-xl">
                <PhoneCall className="h-4 w-4" /> Call Emergency Desk
              </Button>
            </a>
            <Link to="/hospitals">
              <Button variant="outline" className="gap-2 rounded-xl">
                <Hospital className="h-4 w-4" /> View Emergency Hospitals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-card p-5 lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground">Quick Emergency Triage</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick the closest symptom type to route to the right specialist.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Chest Pain", "Accident / Fracture", "Breathing Issue", "High Fever", "Severe Headache", "Other Urgent Condition"].map((option) => (
                <button
                  key={option}
                  onClick={() => setIssue(option)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    issue === option ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <Button onClick={handleUrgentConsult} className="mt-5 w-full gap-2 rounded-xl">
              <Ambulance className="h-4 w-4" /> Get Urgent Consultation
            </Button>
          </div>

          <div className="rounded-2xl bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Safety Checklist</h3>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2"><ShieldPlus className="mt-0.5 h-4 w-4 text-primary" /> Keep emergency contact reachable.</p>
              <p className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 text-primary" /> Track symptom start time for doctors.</p>
              <p className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-primary" /> For severe bleeding or collapse, call ambulance first.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground">Emergency-Ready Hospitals</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {emergencyReadyHospitals.map((hospital) => (
              <div key={hospital.id} className="rounded-xl border border-border bg-background p-4">
                <p className="font-semibold text-foreground">{hospital.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{hospital.location}</p>
                <p className="mt-1 text-xs text-muted-foreground">Capacity: {hospital.beds} beds</p>
                <Link to={`/hospitals/${hospital.id}`}>
                  <Button size="sm" variant="outline" className="mt-3 w-full rounded-lg">Open Hospital</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyService;
