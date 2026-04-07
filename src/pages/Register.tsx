import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

type Role = "patient" | "doctor" | "hospital" | "clinic";

const roles: { value: Role; label: string }[] = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
  { value: "hospital", label: "Hospital" },
  { value: "clinic", label: "Clinic" },
];

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("patient");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasFirebaseConfig() || !firebaseAuth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
      await updateProfile(credential.user, {
        displayName: `${name.trim()} (${role})`,
      });
      toast.success(`Registered as ${role} successfully!`);
      navigate("/dashboard");
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else if (code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else if (code === "auth/operation-not-allowed") {
        toast.error("Email/password signup is disabled in Firebase Console.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="card-shadow rounded-2xl bg-card p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
              <p className="mt-1 text-sm text-muted-foreground">Join Mero Swasthya today</p>
            </div>

            {/* Role Toggle */}
            <div className="mb-6 grid grid-cols-4 gap-1 rounded-xl bg-muted p-1">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`rounded-lg py-2 text-xs font-medium transition-all ${
                    role === r.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
                <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
                <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : `Register as ${roles.find((r) => r.value === role)?.label}`} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
