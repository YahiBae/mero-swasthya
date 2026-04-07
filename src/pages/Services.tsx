import { Link } from "react-router-dom";
import { Building2, Stethoscope, Heart, Pill, Eye, Brain, Baby, Bone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { icon: Building2, title: "Hospitals", desc: "Find and book appointments at top hospitals across Nepal.", link: "/hospitals" },
  { icon: Stethoscope, title: "Clinics", desc: "Specialized clinics for targeted healthcare needs.", link: "/clinics" },
  { icon: Heart, title: "Cardiology", desc: "Heart specialists and cardiac care services.", link: "/doctors" },
  { icon: Brain, title: "Neurology", desc: "Expert neurological diagnosis and treatment.", link: "/doctors" },
  { icon: Bone, title: "Orthopedics", desc: "Bone, joint, and muscle care specialists.", link: "/doctors" },
  { icon: Eye, title: "Ophthalmology", desc: "Complete eye care and vision services.", link: "/doctors" },
  { icon: Baby, title: "Pediatrics", desc: "Dedicated healthcare for children and infants.", link: "/doctors" },
  { icon: Pill, title: "Dental Care", desc: "From cleanings to complex dental procedures.", link: "/clinics" },
];

const Services = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="hero-gradient py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground">Our Services</h1>
        <p className="mt-2 text-muted-foreground">Comprehensive healthcare services tailored for you</p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.link}
            className="group card-shadow rounded-2xl bg-card p-6 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary">
              <cat.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-card-foreground">{cat.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;
