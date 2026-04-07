import { useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserCircle, UserPlus, Trash2, Users } from "lucide-react";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "@/lib/firebase";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { addDependent, getDependents, removeDependent, sanitizeDependentList, setDependents, type Dependent } from "@/data/dependentStore";

interface ProfilePageProps {
  role: "patient" | "provider";
}

const ProfilePage = ({ role }: ProfilePageProps) => {
  const { user } = useAuthStatus();
  const storageKey = useMemo(() => `mero_profile_${role}_${user?.uid ?? "guest"}`, [role, user?.uid]);
  const [name, setName] = useState(role === "patient" ? "Ram Bahadur" : "Dr. Rajesh Sharma");
  const [email, setEmail] = useState(role === "patient" ? "ram@example.com" : "dr.rajesh@hospital.com");
  const [phone, setPhone] = useState("+977-9841234567");
  const [dependents, setDependentsState] = useState<Dependent[]>([]);
  const [dependentOpen, setDependentOpen] = useState(false);
  const [newDependentName, setNewDependentName] = useState("");
  const [newDependentRelation, setNewDependentRelation] = useState("Child");
  const [newDependentAge, setNewDependentAge] = useState("");
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

    setDependentsState(getDependents());

    const currentUser = firebaseAuth?.currentUser;
    if (currentUser?.displayName) {
      setName(currentUser.displayName);
    }
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }

    const loadRemoteProfile = async () => {
      if (!currentUser || !firestore) {
        return;
      }

      try {
        const snapshot = await getDoc(doc(firestore, "users", currentUser.uid));
        if (!snapshot.exists()) {
          return;
        }

        const data = snapshot.data() as {
          name?: string;
          email?: string;
          phone?: string;
          dependents?: Dependent[];
        };

        if (data.name) {
          setName(data.name);
        }
        if (data.email) {
          setEmail(data.email);
        }
        if (data.phone) {
          setPhone(data.phone);
        }
        if (Array.isArray(data.dependents)) {
          const sanitizedDependents = sanitizeDependentList(data.dependents);
          setDependents(sanitizedDependents);
          setDependentsState(getDependents());

          if (sanitizedDependents.length !== data.dependents.length) {
            await setDoc(
              doc(firestore, "users", currentUser.uid),
              {
                dependents: sanitizedDependents,
                updatedAt: serverTimestamp(),
              },
              { merge: true },
            );
          }
        }
      } catch {
        // Ignore remote load issues and keep local fallback.
      }
    };

    void loadRemoteProfile();
  }, [storageKey, role, user?.uid]);

  const persistUserRecord = async (nextProfile: { name: string; email: string; phone: string }, nextDependents: Dependent[]) => {
    localStorage.setItem(storageKey, JSON.stringify(nextProfile));
    setDependents(nextDependents);
    setDependentsState(getDependents());

    const currentUser = firebaseAuth?.currentUser;
    if (!currentUser || !firestore) {
      return;
    }

    await setDoc(
      doc(firestore, "users", currentUser.uid),
      {
        ...nextProfile,
        role,
        dependents: nextDependents,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  };

  const handleAddDependent = async () => {
    if (!newDependentName.trim() || !newDependentAge.trim()) {
      toast.error("Please enter dependent name and age.");
      return;
    }

    const created = addDependent({
      name: newDependentName.trim(),
      relation: newDependentRelation.trim() || "Dependent",
      age: newDependentAge.trim(),
    });

    const nextDependents = [...dependents, created];
    try {
      await persistUserRecord({ name, email, phone }, nextDependents);
      toast.success("Dependent added successfully.");
      setNewDependentName("");
      setNewDependentRelation("Child");
      setNewDependentAge("");
      setDependentOpen(false);
    } catch {
      toast.error("Failed to save dependent.");
    }
  };

  const handleRemoveDependent = async (id: string) => {
    const nextDependents = dependents.filter((dependent) => dependent.id !== id);
    removeDependent(id);

    try {
      await persistUserRecord({ name, email, phone }, nextDependents);
      toast.success("Dependent removed.");
    } catch {
      toast.error("Failed to remove dependent.");
    }
  };

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

      await persistUserRecord(
        {
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
        },
        dependents,
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

                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" /> Dependents
                      </p>
                      <p className="text-xs text-muted-foreground">Saved to your account and reused in appointment booking.</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setDependentOpen(true)}>
                      <UserPlus className="h-4 w-4" /> Add
                    </Button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {dependents.length > 0 ? (
                      dependents.map((dependent) => (
                        <div key={dependent.id} className="rounded-xl border border-border bg-card p-3">
                          <p className="font-medium text-card-foreground">{dependent.name}</p>
                          <p className="text-xs text-muted-foreground">{dependent.relation} • {dependent.age}</p>
                          <button
                            type="button"
                            onClick={() => void handleRemoveDependent(dependent.id)}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No dependents added yet.</p>
                    )}
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

      <Dialog open={dependentOpen} onOpenChange={setDependentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Dependent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input placeholder="Dependent name" value={newDependentName} onChange={(e) => setNewDependentName(e.target.value)} />
            <Input placeholder="Relation (Child, Spouse, Parent)" value={newDependentRelation} onChange={(e) => setNewDependentRelation(e.target.value)} />
            <Input placeholder="Age" value={newDependentAge} onChange={(e) => setNewDependentAge(e.target.value)} />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setDependentOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => void handleAddDependent()}>
                Save Dependent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default ProfilePage;
