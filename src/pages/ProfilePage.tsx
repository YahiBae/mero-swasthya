import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserCircle } from "lucide-react";

interface ProfilePageProps {
  role: "patient" | "provider";
}

const ProfilePage = ({ role }: ProfilePageProps) => {
  const [name, setName] = useState(role === "patient" ? "Ram Bahadur" : "Dr. Rajesh Sharma");
  const [email, setEmail] = useState(role === "patient" ? "ram@example.com" : "dr.rajesh@hospital.com");
  const [phone, setPhone] = useState("+977-9841234567");

  const handleSave = () => toast.success("Profile updated successfully! (Mock)");

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

                <Button className="w-full rounded-xl" onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
