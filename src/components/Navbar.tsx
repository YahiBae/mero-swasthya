import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { firebaseAuth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Hospitals", path: "/hospitals" },
  { label: "Clinics", path: "/clinics" },
  { label: "Doctors", path: "/doctors" },
  { label: "Departments", path: "/departments" },
  { label: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStatus();

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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">M</span>
          </div>
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
          {isAuthenticated ? (
            <>
              <span className="text-xs text-muted-foreground max-w-[180px] truncate">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
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
            {isAuthenticated ? (
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">Register</Button>
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
