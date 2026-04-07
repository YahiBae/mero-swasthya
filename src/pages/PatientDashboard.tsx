import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  MonitorPlay,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  UserPlus,
  Video,
  XCircle,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { getAppointments, type Appointment } from "@/data/appointmentStore";
import { DEPARTMENT_CATALOG } from "@/data/siteContent";
import { addDependent, getDependents, removeDependent, sanitizeDependentList, setDependents as setStoredDependents, type Dependent } from "@/data/dependentStore";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { toast } from "sonner";

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => (
  <div className="card-shadow rounded-2xl bg-card p-5 flex items-center gap-4">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [displayName, setDisplayName] = useState("You");
  const [profileEmail, setProfileEmail] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [selectedDependentId, setSelectedDependentId] = useState("self");
  const [dependentOpen, setDependentOpen] = useState(false);
  const [newDependentName, setNewDependentName] = useState("");
  const [newDependentRelation, setNewDependentRelation] = useState("Child");
  const [newDependentAge, setNewDependentAge] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  useEffect(() => {
    const selfName = user?.displayName || user?.email?.split("@")[0] || "You";
    setDisplayName(selfName);
    setProfileEmail(user?.email ?? "");

    const loadProfile = async () => {
      const fallbackDependents = getDependents();
      if (!user?.uid || !firestore) {
        setDependents([{ id: "self", name: selfName, relation: "Self", age: "Adult" }, ...fallbackDependents]);
        return;
      }

      try {
        const snapshot = await getDoc(doc(firestore, "users", user.uid));
        if (!snapshot.exists()) {
          setDependents([{ id: "self", name: selfName, relation: "Self", age: "Adult" }, ...fallbackDependents]);
          return;
        }

        const data = snapshot.data() as {
          name?: string;
          email?: string;
          dependents?: Dependent[];
        };

        if (data.name) {
          setDisplayName(data.name);
        }
        if (data.email) {
          setProfileEmail(data.email);
        }

        if (Array.isArray(data.dependents)) {
          const sanitizedDependents = sanitizeDependentList(data.dependents);
          setStoredDependents(sanitizedDependents);
          setDependents([{ id: "self", name: data.name ?? selfName, relation: "Self", age: "Adult" }, ...sanitizedDependents]);

          if (sanitizedDependents.length !== data.dependents.length) {
            await setDoc(
              doc(firestore, "users", user.uid),
              {
                dependents: sanitizedDependents,
                updatedAt: serverTimestamp(),
              },
              { merge: true },
            );
          }
          return;
        }

        setDependents([{ id: "self", name: data.name ?? selfName, relation: "Self", age: "Adult" }, ...getDependents()]);
      } catch {
        setDependents([{ id: "self", name: selfName, relation: "Self", age: "Adult" }, ...fallbackDependents]);
      }
    };

    void loadProfile();
  }, [user?.displayName, user?.email, user?.uid]);

  const filteredDepartments = useMemo(() => {
    const trimmed = departmentQuery.trim().toLowerCase();
    if (!trimmed) {
      return DEPARTMENT_CATALOG.slice(0, 8);
    }
    return DEPARTMENT_CATALOG.filter(
      (item) => item.en.toLowerCase().includes(trimmed) || item.np.includes(departmentQuery.trim()),
    ).slice(0, 8);
  }, [departmentQuery]);

  const upcoming = appointments.filter((a) => a.status === "confirmed");
  const completed = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  const benefits = [
    {
      icon: MonitorPlay,
      title: "Consult Top Doctors 24x7",
      description: "Start a video consultation instantly with verified specialists.",
    },
    {
      icon: MessageSquare,
      title: "Convenient And Easy",
      description: "Book consultations in a few clicks from your dashboard.",
    },
    {
      icon: ShieldCheck,
      title: "100% Safe Consultations",
      description: "Secure and private consultation flow for every patient.",
    },
    {
      icon: Stethoscope,
      title: "Clinic-like Experience",
      description: "Doctor review, prescriptions, and follow-up from one place.",
    },
    {
      icon: UserPlus,
      title: "Free Follow-up",
      description: "Track appointments and continue care with repeat consults.",
    },
    {
      icon: Smartphone,
      title: "Digital Prescription",
      description: "Get a digital prescription and access it anytime.",
    },
  ];

  const testimonials = [
    {
      quote: "Video consultation was smooth and I got prescription quickly.",
      name: "Anita Karki",
      city: "Kathmandu",
    },
    {
      quote: "Booking for my family became much easier after adding dependents.",
      name: "Rohit Shrestha",
      city: "Lalitpur",
    },
    {
      quote: "Support was responsive and the doctor joined exactly on schedule.",
      name: "Puja Bhandari",
      city: "Bhaktapur",
    },
  ];

  useEffect(() => {
    if (isCarouselPaused) {
      return;
    }

    const interval = setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isCarouselPaused, testimonials.length]);

  const handlePreviousTestimonial = () => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length);
  };

  const refreshDependents = () => {
    const selfName = displayName || user?.displayName || user?.email?.split("@")[0] || "You";
    setDependents([{ id: "self", name: selfName, relation: "Self", age: "Adult" }, ...getDependents()]);
  };

  const handleAddDependent = () => {
    if (!newDependentName.trim() || !newDependentAge.trim()) {
      toast.error("Please enter dependent name and age.");
      return;
    }

    addDependent({
      name: newDependentName.trim(),
      relation: newDependentRelation.trim() || "Dependent",
      age: newDependentAge.trim(),
    });
    refreshDependents();
    setNewDependentName("");
    setNewDependentRelation("Child");
    setNewDependentAge("");
    setDependentOpen(false);
    toast.success("Dependent added successfully.");
  };

  const handleRemoveDependent = (id: string) => {
    removeDependent(id);
    refreshDependents();
    if (selectedDependentId === id) {
      setSelectedDependentId("self");
    }
    toast.success("Dependent removed.");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="patient" />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-lg font-semibold text-foreground">Patient Dashboard</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 bg-muted/30">
            <section className="rounded-2xl bg-[linear-gradient(120deg,#4c1175,#5d178f)] px-5 py-8 text-white md:px-8">
              <h2 className="text-2xl font-bold md:text-4xl">Consult with doctor from the comfort of your home</h2>
              <p className="mt-2 text-sm text-white/85 md:text-base">More than 20 specialties and trusted doctors are available for instant video consultation.</p>
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]">
              <div className="rounded-2xl bg-card p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Who will be seeing the doctor?</h3>
                    <p className="text-sm text-muted-foreground">Select a saved profile or dependent and choose a department.</p>
                  </div>
                  <input
                    value={departmentQuery}
                    onChange={(e) => setDepartmentQuery(e.target.value)}
                    className="w-full max-w-[280px] rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
                    placeholder="Search departments"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {dependents.map((dependent) => (
                    <div
                      key={dependent.id}
                      className={`rounded-xl border p-3 text-left transition ${
                        selectedDependentId === dependent.id ? "border-primary bg-primary/10" : "border-border bg-background"
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedDependentId(dependent.id)} className="block w-full text-left">
                        <p className="font-semibold text-foreground">{dependent.name}</p>
                        <p className="text-xs text-muted-foreground">{dependent.relation} • {dependent.age}</p>
                      </button>
                      {dependent.id !== "self" && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDependent(dependent.id)}
                          className="mt-2 text-xs font-medium text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {filteredDepartments.map((dept) => (
                    <button
                      key={dept.en}
                      onClick={() => navigate(`/doctors?department=${encodeURIComponent(dept.en)}`)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm text-foreground hover:border-primary hover:text-primary"
                    >
                      {dept.en}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2 rounded-xl" onClick={() => setDependentOpen(true)}>
                    <UserPlus className="h-4 w-4" /> Add new dependent
                  </Button>
                  <Button className="gap-2 rounded-xl" onClick={() => navigate("/departments?org=true")}> 
                    <Video className="h-4 w-4" /> Start Video Consultation
                  </Button>
                </div>

                <div className="rounded-xl bg-primary px-4 py-3 text-sm text-primary-foreground">
                  Our platform helps patients connect with suitable specialists based on department and doctor availability.
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-card p-4 md:p-6">
                  <p className="text-sm font-semibold text-primary">Account</p>
                  <h3 className="mt-1 text-2xl font-bold text-foreground">{displayName}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{profileEmail || "No email found"}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to="/dashboard/profile">
                      <Button variant="outline" className="rounded-xl">Edit Profile</Button>
                    </Link>
                    <Button variant="outline" className="rounded-xl" onClick={() => navigate("/dashboard/appointments")}>Appointments</Button>
                  </div>
                </div>

                <div className="rounded-2xl bg-card p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">Dependents</p>
                      <h4 className="text-lg font-bold text-foreground">Saved profile list</h4>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setDependentOpen(true)}>
                      <UserPlus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dependents.map((dependent) => (
                      <div key={dependent.id} className="rounded-xl border border-border bg-background p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-foreground">{dependent.name}</p>
                            <p className="text-xs text-muted-foreground">{dependent.relation} • {dependent.age}</p>
                          </div>
                          {dependent.id === selectedDependentId && <span className="text-xs font-semibold text-primary">Active</span>}
                        </div>
                        {dependent.id !== "self" && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDependent(dependent.id)}
                            className="mt-2 text-xs font-medium text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-card p-4 md:p-6 space-y-3">
                  <p className="text-sm font-semibold text-primary">Instant Video Consultation</p>
                  <p className="text-sm text-muted-foreground">Free instant video consultation with available doctors.</p>
                  <p className="text-sm font-semibold text-primary">Need help choosing a doctor?</p>
                  <p className="text-sm text-muted-foreground">Support team available every day from 7 AM to 9 PM.</p>
                </div>
              </aside>
            </section>

            <section className="rounded-2xl bg-[linear-gradient(120deg,#0f172a,#1d4ed8)] px-4 py-4 text-white md:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white/15 p-2">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Mero Swasthya App</p>
                    <h3 className="text-lg font-bold md:text-xl">Download the app for instant consultation and follow-ups</h3>
                    <p className="mt-1 text-sm text-white/80">Get appointment reminders and prescriptions on your phone.</p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                  <input
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 outline-none sm:min-w-[220px]"
                  />
                  <Button className="rounded-lg bg-white text-slate-900 hover:bg-white/90">Send App Link</Button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-card p-4 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-foreground">What Our Patients Are Saying</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousTestimonial}
                    className="rounded-full border border-border p-1.5 text-muted-foreground transition hover:border-primary hover:text-primary"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTestimonial}
                    className="rounded-full border border-border p-1.5 text-muted-foreground transition hover:border-primary hover:text-primary"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                className="mt-4 overflow-hidden rounded-xl border border-border bg-background"
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
                >
                  {testimonials.map((item) => (
                    <article key={item.name} className="w-full shrink-0 p-5 md:p-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">"{item.quote}"</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.city}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary">{testimonialIndex + 1}/{testimonials.length}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTestimonialIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${idx === testimonialIndex ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40"}`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </section>

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
                    <Button className="flex-1" onClick={handleAddDependent}>
                      Save Dependent
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <section className="rounded-2xl bg-card p-4 md:p-6">
              <h3 className="text-2xl font-bold text-foreground">Benefits of Online Consultation</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-background p-4">
                    <item.icon className="h-5 w-5 text-primary" />
                    <p className="mt-2 font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total" value={appointments.length} icon={CalendarDays} color="bg-primary/10 text-primary" />
              <StatCard label="Upcoming" value={upcoming.length} icon={Clock} color="bg-green-100 text-green-600" />
              <StatCard label="Completed" value={completed.length} icon={CheckCircle} color="bg-blue-100 text-blue-600" />
              <StatCard label="Cancelled" value={cancelled.length} icon={XCircle} color="bg-red-100 text-red-600" />
            </div>

            {/* Upcoming */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming Appointments</h2>
              {upcoming.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
                  No upcoming appointments. <Link to="/departments?org=true" className="text-primary hover:underline">Book a consultation now</Link>.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((a) => (
                    <AppointmentRow key={a.id} appointment={a} />
                  ))}
                </div>
              )}
            </section>

            {/* Past */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Past Appointments</h2>
              {[...completed, ...cancelled].length === 0 ? (
                <p className="text-muted-foreground text-sm">No past appointments.</p>
              ) : (
                <div className="space-y-3">
                  {[...completed, ...cancelled].map((a) => (
                    <AppointmentRow key={a.id} appointment={a} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppointmentRow = ({ appointment }: { appointment: Appointment }) => (
  <div className="card-shadow rounded-2xl bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
    <div className="flex-1 min-w-0">
      <p className="font-medium text-card-foreground truncate">{appointment.doctorName}</p>
      <p className="text-sm text-muted-foreground truncate">{appointment.hospitalOrClinic}</p>
    </div>
    <div className="text-sm text-muted-foreground shrink-0">
      {appointment.date} · {appointment.timeSlot}
    </div>
    <StatusBadge status={appointment.status} />
  </div>
);

export default PatientDashboard;
