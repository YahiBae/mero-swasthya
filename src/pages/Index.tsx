import { Link } from "react-router-dom";
import { Search, MapPin, Stethoscope, Building2, ArrowRight, Heart, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import ClinicCard from "@/components/ClinicCard";
import DoctorCard from "@/components/DoctorCard";
import { hospitals, clinics, doctors, specializations, locations } from "@/data/mockData";

const HeroSection = () => (
  <section className="hero-gradient relative overflow-hidden py-20 lg:py-28">
    <div className="container mx-auto px-4 text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
        Book Hospital & Clinic Appointments{" "}
        <span className="text-gradient">Across Nepal</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        Find doctors, clinics, and hospitals in one place. Trusted care from experienced professionals.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/doctors">
          <Button size="lg" className="gap-2 rounded-full px-8">
            <Stethoscope className="h-4 w-4" /> Book Appointment
          </Button>
        </Link>
        <Link to="/services">
          <Button variant="outline" size="lg" className="gap-2 rounded-full px-8">
            Explore Services <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const SearchBar = () => (
  <section className="container mx-auto -mt-8 px-4 relative z-10">
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
  { icon: Stethoscope, label: "Verified Doctors", value: "1,500+" },
  { icon: Clock, label: "Appointments/Day", value: "3,000+" },
];

const StatsSection = () => (
  <section className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

const services = [
  { icon: Heart, title: "Primary Care", desc: "Your first step toward a healthier life. Ongoing care and medical advice you can trust." },
  { icon: Shield, title: "Dental Care", desc: "Gentle, expert dental services for every smile — from cleanings to complex procedures." },
  { icon: Stethoscope, title: "Vaccinations", desc: "Protecting you and your family with essential and seasonal immunizations." },
  { icon: Users, title: "Mental Health", desc: "Confidential therapy and psychological support to help you feel better emotionally." },
];

const ServicesPreview = () => (
  <section className="container mx-auto px-4 py-16">
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold text-foreground">The Best Quality Service You Can Get</h2>
      <p className="mt-2 text-muted-foreground">Trusted care from experienced professionals — accessible and compassionate.</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <div key={s.title} className="card-shadow rounded-2xl bg-card p-6 text-center transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <s.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-card-foreground">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 text-center">
      <Link to="/services">
        <Button variant="outline" className="gap-2 rounded-full">
          View All Services <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <SearchBar />
    <StatsSection />
    <ServicesPreview />

    {/* Featured Hospitals */}
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

    {/* Featured Clinics */}
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

    {/* Top Doctors */}
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
