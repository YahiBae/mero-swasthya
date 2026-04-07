import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserCircle } from "lucide-react";
import { updateEmail, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

interface ProfilePageProps {
  role: "patient" | "provider";
}

const ProfilePage = ({ role }: ProfilePageProps) => {
  const storageKey = `mero_profile_${role}`;
  const [name, setName] = useState(role === "patient" ? "Ram Bahadur" : "Dr. Rajesh Sharma");
  const [email, setEmail] = useState(role === "patient" ? "ram@example.com" : "dr.rajesh@hospital.com");
  const [phone, setPhone] = useState("+977-9841234567");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const persisted = localStorage.getItem(storageKey);
    if (persisted) {
      try {
        const data = JSON.parse(persisted) as { name?: string; email?: string; phone?: string };
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
      } catch {
        // Ignore invalid persisted profile data.
      }
    }

    const currentUser = firebaseAuth?.currentUser;
    if (currentUser?.displayName) {
      setName(currentUser.displayName);
    }
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [storageKey]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      toast.error("Please fill all fields.");
      return;
    }

    setIsSaving(true);
    try {
      const currentUser = firebaseAuth?.currentUser;
      if (currentUser) {
        if (trimmedName !== (currentUser.displayName ?? "")) {
          await updateProfile(currentUser, { displayName: trimmedName });
        }

        if (trimmedEmail !== (currentUser.email ?? "")) {
          await updateEmail(currentUser, trimmedEmail);
        }
      }

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
        }),
      );

      setName(trimmedName);
      setEmail(trimmedEmail);
      setPhone(trimmedPhone);
      toast.success("Profile updated successfully!");
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === "auth/requires-recent-login") {
        toast.error("Please login again before changing email.");
      } else if (code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else if (code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Failed to save profile changes.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role={role} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 bg-muted/30">
            <div className="max-w-xl mx-auto">
              <div className="card-shadow rounded-2xl bg-card p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <UserCircle className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} />
                  </div>
                </div>

                <Button className="w-full rounded-xl" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
