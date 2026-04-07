import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasFirebaseConfig() || !firebaseAuth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.");
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        toast.error("Invalid email or password.");
      } else if (code === "auth/operation-not-allowed") {
        toast.error("Email/password login is disabled in Firebase Console.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card-shadow rounded-2xl bg-card p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="mt-1 text-sm text-muted-foreground">Login to your Mero Swasthya account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                {isSubmitting ? "Logging in..." : "Login"} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
