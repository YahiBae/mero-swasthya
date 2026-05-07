import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

  const handleGoogle = async () => {
    if (!hasFirebaseConfig() || !firebaseAuth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.");
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      setIsSubmitting(true);
      await signInWithPopup(firebaseAuth, provider);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === "auth/popup-closed-by-user") {
        toast.error("Popup closed before completing sign-in.");
      } else {
        toast.error("Google sign-in failed. Please try again.");
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

            <div className="mt-4">
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2 rounded-xl" onClick={handleGoogle} disabled={isSubmitting}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.35 11.1h-9.2v2.9h5.3c-.25 1.45-1.57 3.9-5.3 3.9-3.2 0-5.8-2.63-5.8-5.86 0-3.23 2.6-5.87 5.8-5.87 1.82 0 3.04.78 3.74 1.45l2.56-2.5C17.8 3.28 15.88 2.2 12.95 2.2 7.98 2.2 4 6.15 4 11.04c0 4.9 3.98 8.85 8.95 8.85 5.15 0 8.55-3.62 8.55-8.74 0-.59-.06-1.05-.15-1.11z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
            </div>
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
