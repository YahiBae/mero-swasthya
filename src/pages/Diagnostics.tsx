import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FlaskConical, Microscope, ShieldCheck, TestTube2, Timer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/mockData";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { toast } from "sonner";

const packages = [
  { id: "diag-1", name: "Basic Health Panel", tests: 18, reportTime: "24 hrs", price: 1800 },
  { id: "diag-2", name: "Heart Risk Profile", tests: 12, reportTime: "12 hrs", price: 2400 },
  { id: "diag-3", name: "Liver & Kidney Function", tests: 10, reportTime: "24 hrs", price: 2100 },
  { id: "diag-4", name: "Diabetes Monitoring", tests: 8, reportTime: "8 hrs", price: 1200 },
  { id: "diag-5", name: "Thyroid Screening", tests: 6, reportTime: "12 hrs", price: 1500 },
  { id: "diag-6", name: "Women Wellness Panel", tests: 14, reportTime: "24 hrs", price: 2600 },
];

const Diagnostics = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();
  const [query, setQuery] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const diagnosticHospitals = useMemo(() => {
    return hospitals.filter((h) => h.departments.some((dept) => dept.toLowerCase().includes("radiology") || dept.toLowerCase().includes("pathology")));
  }, []);

  const handleBookTest = (packageName: string) => {
    if (!isAuthenticated) {
      toast.error("Please login first to book diagnostic tests.");
      navigate("/login");
      return;
    }

    toast.success(`${packageName} selected. Choose a doctor to attach your test booking.`);
    navigate("/doctors?department=General%20Practice");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <section className="hero-gradient border-b border-border py-14">
        <div className="container mx-auto px-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Microscope className="h-3.5 w-3.5" /> Diagnostics & Lab Booking
          </p>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">Book Diagnostic Tests</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Compare lab packages, check report turnaround time, and schedule tests from trusted partners.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="rounded-2xl bg-card p-5">
          <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3">
            <TestTube2 className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search diagnostic package"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="rounded-xl border border-border bg-background p-4">
                <p className="font-semibold text-foreground">{pkg.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{pkg.tests} tests included</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Timer className="h-3.5 w-3.5" /> Report in {pkg.reportTime}</p>
                <p className="mt-2 text-sm font-semibold text-primary">NPR {pkg.price}</p>
                <Button onClick={() => handleBookTest(pkg.name)} size="sm" className="mt-3 w-full rounded-lg">Book Test</Button>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && <p className="py-8 text-center text-muted-foreground">No package found.</p>}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground">Partner Diagnostic Centers</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {diagnosticHospitals.map((hospital) => (
              <div key={hospital.id} className="rounded-xl border border-border bg-background p-4">
                <p className="font-semibold text-foreground">{hospital.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{hospital.location}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600"><ShieldCheck className="h-3.5 w-3.5" /> Verified facility</p>
                <Link to={`/hospitals/${hospital.id}`}>
                  <Button size="sm" variant="outline" className="mt-3 w-full rounded-lg">Open Center</Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/departments?org=true">
              <Button variant="outline" className="gap-2 rounded-xl"><FlaskConical className="h-4 w-4" /> Back to Departments</Button>
            </Link>
            <Link to="/doctors">
              <Button className="gap-2 rounded-xl"><Microscope className="h-4 w-4" /> Find Doctor for Follow-up</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Diagnostics;
