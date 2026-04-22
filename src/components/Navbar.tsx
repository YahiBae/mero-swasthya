import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { firebaseAuth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStatus();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.hospitals, path: "/hospitals" },
    { label: t.nav.clinics, path: "/clinics" },
    { label: t.nav.doctors, path: "/doctors" },
    { label: t.nav.departments, path: "/departments" },
    { label: t.nav.emergency, path: "/emergency" },
    { label: t.nav.diagnostics, path: "/diagnostics" },
    { label: t.nav.dashboard, path: "/dashboard" },
  ];

  const handleLogout = async () => {
    if (!firebaseAuth) {
      return;
    }
    await signOut(firebaseAuth);
    toast.success("Logged out successfully.");
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt="Mero Swasthya logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-foreground">Mero Swasthya</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            {t.nav.languageSwitch}
          </Button>
          {isAuthenticated ? (
            <>
              <span className="text-xs text-muted-foreground max-w-[180px] truncate">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>{t.nav.logout}</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">{t.nav.login}</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">{t.nav.register}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="w-full" onClick={toggleLanguage}>
              {t.nav.languageSwitch}
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>{t.nav.logout}</Button>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{t.nav.login}</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">{t.nav.register}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
