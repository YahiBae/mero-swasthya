import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-lg font-bold">Mero Swasthya</span>
          </div>
          <p className="mt-3 text-sm opacity-70">
            Caring for You, Every Step of the Way. Nepal's unified healthcare appointment platform.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/hospitals" className="hover:opacity-100 transition-opacity">Hospitals</Link>
            <Link to="/doctors" className="hover:opacity-100 transition-opacity">Doctors</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +977-1-4XXXXXX</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@meroswasthya.np</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kathmandu, Nepal</div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Newsletter</h4>
          <p className="mb-3 text-sm opacity-70">Stay updated with health tips and news.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-sm opacity-60">
        © 2026 Mero Swasthya. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
