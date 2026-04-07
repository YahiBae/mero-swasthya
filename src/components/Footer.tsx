import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { BRAND_CONTACT, BRAND_SOCIALS } from "@/data/siteContent";

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/favicon.svg"
              alt="Mero Swasthya logo"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-lg font-bold">Mero Swasthya</span>
          </div>
          <p className="mt-3 text-sm opacity-70">
            Caring for You, Every Step of the Way. Nepal's unified healthcare appointment platform.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Company</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Faq's</Link>
            <Link to="/departments?org=true" className="hover:opacity-100 transition-opacity">Departments</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Quick Login</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/login" className="hover:opacity-100 transition-opacity">Patient</Link>
            <Link to="/login" className="hover:opacity-100 transition-opacity">Partners</Link>
            <Link to="/doctors" className="hover:opacity-100 transition-opacity">Doctors</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/services" className="hover:opacity-100 transition-opacity">Instant Consultation</Link>
            <Link to="/doctors" className="hover:opacity-100 transition-opacity">Specialist Consultation</Link>
            <Link to="/hospitals" className="hover:opacity-100 transition-opacity">Book Hospital Appointment</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Get In Touch</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {BRAND_CONTACT.location}</div>
            {BRAND_CONTACT.phones.map((phone) => (
              <div key={phone} className="flex items-center gap-2"><Phone className="h-4 w-4" /> {phone}</div>
            ))}
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {BRAND_CONTACT.email}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-sm opacity-80">
        <div className="flex items-center gap-3">
          <span>Follow Us on:</span>
          <a href={BRAND_SOCIALS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-100"><Facebook className="h-4 w-4" /></a>
          <a href={BRAND_SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-100"><Instagram className="h-4 w-4" /></a>
          <a href={BRAND_SOCIALS.youtube} target="_blank" rel="noreferrer" aria-label="Youtube" className="hover:opacity-100"><Youtube className="h-4 w-4" /></a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/services" className="hover:opacity-100">Terms & conditions</Link>
          <span>|</span>
          <Link to="/services" className="hover:opacity-100">Privacy policy</Link>
        </div>
      </div>

      <div className="mt-4 border-t border-primary-foreground/10 pt-6 text-center text-sm opacity-60">
        © 2026 Mero Swasthya. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
