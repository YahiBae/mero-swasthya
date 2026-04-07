import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Building2, Search, ShieldCheck, Siren, Stethoscope, TestTube2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/mockData";
import { DEPARTMENT_CATALOG } from "@/data/siteContent";

const steps = [
  "Select a department",
  "Select a doctor and date",
  "Select a time slot",
  "Verify your mobile number",
  "Provide your personal information",
  "Choose payment method",
  "Get appointment confirmation",
];

const Departments = () => {
  const [query, setQuery] = useState("");
  const [params] = useSearchParams();
  const orgMode = params.get("org") === "true";

  const departmentData = useMemo(() => {
    return DEPARTMENT_CATALOG.map((dept) => ({
      name: dept.en,
      nepali: dept.np,
      doctorCount: doctors.filter((d) => {
        const specialty = d.specialty.toLowerCase();
        return dept.keywords.some((keyword) => specialty.includes(keyword));
      }).length,
    }));
  }, []);

  const filtered = departmentData.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase().trim()) || d.nepali.includes(query.trim()),
  );

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <section className="hero-gradient border-b border-border py-14">
        <div className="container mx-auto px-4">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {orgMode ? "Extended Hospital Service" : "Department Booking"}
          </p>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
            Select a Department
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Book appointments by department, compare doctor availability, and get confirmation in minutes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="card-shadow rounded-2xl bg-card p-4 md:p-5">
          <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search department"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Hospital Service</p>
              <p className="mt-1 text-sm text-muted-foreground">In-patient and specialist consultation support.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Emergency 24/7</p>
              <p className="mt-1 text-sm text-muted-foreground">Critical care and quick triage departments.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Diagnostics</p>
              <p className="mt-1 text-sm text-muted-foreground">Pathology and imaging support for follow-up treatment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dept) => (
            <div key={dept.name} className="card-shadow rounded-2xl bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-card-foreground">{dept.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">({dept.nepali})</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dept.doctorCount} Doctors
                  </p>
                </div>
                <div className="rounded-xl bg-secondary p-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Link to={`/doctors?department=${encodeURIComponent(dept.name)}`}>
                  <Button size="sm" className="w-full rounded-xl gap-2">
                    Consult Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No departments found.</p>
        )}
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground">Follow These Easy Steps</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold text-primary">Step {index + 1}</p>
                <p className="mt-1 text-sm text-foreground">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/hospitals">
              <Button variant="outline" className="gap-2 rounded-xl">
                <Building2 className="h-4 w-4" /> Book Hospital Appointment
              </Button>
            </Link>
            <Link to="/emergency">
              <Button variant="outline" className="gap-2 rounded-xl">
                <Siren className="h-4 w-4" /> Emergency Service 24/7
              </Button>
            </Link>
            <Link to="/diagnostics">
              <Button variant="outline" className="gap-2 rounded-xl">
                <TestTube2 className="h-4 w-4" /> Diagnostics Booking
              </Button>
            </Link>
            <Link to="/doctors">
              <Button className="gap-2 rounded-xl">
                <Stethoscope className="h-4 w-4" /> Book Doctor Appointment
              </Button>
            </Link>
            <Button variant="outline" className="gap-2 rounded-xl" disabled>
              <ShieldCheck className="h-4 w-4" /> Verified Specialists
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Departments;
