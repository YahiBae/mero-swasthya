import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Stethoscope,
  Building2,
  Users,
  Clock,
  ShieldCheck,
  CalendarCheck2,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import ClinicCard from "@/components/ClinicCard";
import DoctorCard from "@/components/DoctorCard";
import { hospitals, clinics, doctors, specializations, locations } from "@/data/mockData";

const HeroSection = () => (
  <section className="hero-gradient relative overflow-hidden py-16 lg:py-22">
    <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Nepal Healthcare Booking Platform
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          Hospital Appointment in Minutes, Not Days
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Search departments, pick available doctors, confirm your slot, and track every appointment from one dashboard.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/departments?org=true">
            <Button size="lg" className="gap-2 rounded-full px-8">
              <Building2 className="h-4 w-4" /> Select Department
            </Button>
          </Link>
          <Link to="/doctors">
            <Button variant="outline" size="lg" className="gap-2 rounded-full px-8">
              <Stethoscope className="h-4 w-4" /> Find Doctor
            </Button>
          </Link>
        </div>
      </div>

      <div className="card-shadow rounded-2xl bg-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Search</h3>
        <p className="mt-1 text-sm text-muted-foreground">Pick your location and specialization to begin.</p>

        <div className="mt-4 grid gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select className="w-full bg-transparent text-sm text-foreground outline-none">
              <option value="">Select Location</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <select className="w-full bg-transparent text-sm text-foreground outline-none">
              <option value="">Specialization</option>
              {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Hospital / Clinic / Doctor" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          </div>
          <Link to="/departments?org=true">
            <Button className="w-full gap-2 rounded-xl">
              <Search className="h-4 w-4" /> Start Booking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const QuickAccess = () => (
  <section className="container mx-auto px-4 py-10">
    <div className="grid gap-4 md:grid-cols-3">
      <Link to="/login" className="card-shadow rounded-2xl bg-card p-5 transition-all hover:-translate-y-0.5 hover:card-shadow-hover">
        <p className="text-sm text-muted-foreground">Quick Login</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">Patient Portal</h3>
        <p className="mt-2 text-sm text-muted-foreground">Track bookings, prescriptions, and follow-ups.</p>
      </Link>
      <Link to="/provider" className="card-shadow rounded-2xl bg-card p-5 transition-all hover:-translate-y-0.5 hover:card-shadow-hover">
        <p className="text-sm text-muted-foreground">Partner Access</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">Hospital / Clinic</h3>
        <p className="mt-2 text-sm text-muted-foreground">Manage schedules and appointment requests.</p>
      </Link>
      <Link to="/doctors" className="card-shadow rounded-2xl bg-card p-5 transition-all hover:-translate-y-0.5 hover:card-shadow-hover">
        <p className="text-sm text-muted-foreground">Doctor Access</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">Consult Dashboard</h3>
        <p className="mt-2 text-sm text-muted-foreground">Review upcoming consultations and patient notes.</p>
      </Link>
    </div>
  </section>
);

const departments = [
  { en: "General Practice", np: "साधारण तथा आकस्मिक चिकित्सा" },
  { en: "Internal Medicine", np: "आन्तरिक चिकित्सा" },
  { en: "Cardiology", np: "मुटुरोग सम्बन्धी" },
  { en: "Pediatrics", np: "बालरोग सेवा" },
  { en: "Dermatology", np: "चर्मरोग" },
  { en: "Orthopedics", np: "हाडजोर्नी सेवा" },
  { en: "ENT", np: "नाक कान घाँटी" },
  { en: "Neurology", np: "स्नायुशास्त्र" },
];

const DepartmentHighlights = () => (
  <section className="container mx-auto px-4 py-10">
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Book by Department</h2>
        <p className="mt-1 text-muted-foreground">Choose a department first, then pick a doctor and slot.</p>
      </div>
      <Link to="/departments?org=true" className="text-sm font-medium text-primary hover:underline">
        View All Departments →
      </Link>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {departments.map((dept) => (
        <Link key={dept.en} to="/departments?org=true" className="card-shadow rounded-2xl bg-card p-4 transition-all hover:-translate-y-0.5 hover:card-shadow-hover">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-card-foreground">{dept.en}</h3>
            <Stethoscope className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">({dept.np})</p>
          <p className="mt-2 text-sm text-muted-foreground">Consult now</p>
        </Link>
      ))}
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    "Select department",
    "Select doctor and date",
    "Select time slot",
    "Verify mobile number",
    "Provide personal details",
    "Choose payment method",
    "Get confirmation",
  ];

  return (
    <section className="container mx-auto px-4 py-10">
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
      </div>
    </section>
  );
};

const SearchBar = () => (
  <section className="container mx-auto -mt-4 px-4 relative z-10">
    <div className="card-shadow rounded-2xl bg-card p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <select className="w-full bg-transparent text-sm text-foreground outline-none">
            <option value="">Select Location</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
          <select className="w-full bg-transparent text-sm text-foreground outline-none">
            <option value="">Specialization</option>
            {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Hospital / Clinic name" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
        </div>
        <Button className="gap-2 rounded-xl">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  </section>
);

const stats = [
  { icon: Users, label: "Active Patients", value: "50,000+" },
  { icon: Building2, label: "Partner Hospitals", value: "200+" },
  { icon: CalendarCheck2, label: "Booked Appointments", value: "2M+" },
  { icon: ShieldCheck, label: "Verified Doctors", value: "1,500+" },
  { icon: Clock, label: "Avg. Confirmation", value: "< 3 min" },
  { icon: PhoneCall, label: "Support", value: "24/7" },
];

const StatsSection = () => (
  <section className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/50 p-6 text-center">
          <s.icon className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold text-foreground">{s.value}</span>
          <span className="text-sm text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <QuickAccess />
    <SearchBar />
    <DepartmentHighlights />
    <HowItWorks />
    <StatsSection />

    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Featured Hospitals</h2>
          <p className="mt-1 text-muted-foreground">Top-rated hospitals across Nepal</p>
        </div>
        <Link to="/hospitals" className="text-sm font-medium text-primary hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.slice(0, 3).map((h) => <HospitalCard key={h.id} hospital={h} />)}
      </div>
    </section>

    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Clinics</h2>
            <p className="mt-1 text-muted-foreground">Specialized clinics near you</p>
          </div>
          <Link to="/clinics" className="text-sm font-medium text-primary hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clinics.slice(0, 3).map((c) => <ClinicCard key={c.id} clinic={c} />)}
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Top Doctors</h2>
          <p className="mt-1 text-muted-foreground">Experienced and highly-rated specialists</p>
        </div>
        <Link to="/doctors" className="text-sm font-medium text-primary hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.slice(0, 3).map((d) => <DoctorCard key={d.id} doctor={d} />)}
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
