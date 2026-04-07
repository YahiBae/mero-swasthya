import { doctors, hospitals, clinics } from "./mockData";
import { firebaseAuth } from "@/lib/firebase";

export type AppointmentStatus = "confirmed" | "cancelled" | "completed" | "pending";

export interface Appointment {
  id: string;
  patientName: string;
  problemDescription: string;
  doctorId: number;
  doctorName: string;
  hospitalOrClinic: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  createdAt: string;
}

const STORAGE_KEY = "mero_swasthya_appointments";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function getAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getSeedAppointments();
  } catch {
    return getSeedAppointments();
  }
}

export function saveAppointment(appointment: Omit<Appointment, "id" | "createdAt" | "status">): Appointment {
  if (!firebaseAuth?.currentUser) {
    throw new Error("AUTH_REQUIRED");
  }

  const newAppt: Appointment = {
    ...appointment,
    id: generateId(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  const all = getAppointments();
  all.unshift(newAppt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newAppt;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): void {
  const all = getAppointments();
  const idx = all.findIndex((a) => a.id === id);
  if (idx !== -1) {
    all[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

function getSeedAppointments(): Appointment[] {
  const seeds: Appointment[] = [
    {
      id: "seed1",
      patientName: "Ram Bahadur",
      problemDescription: "Routine heart checkup",
      doctorId: 1,
      doctorName: doctors[0].name,
      hospitalOrClinic: hospitals[1].name,
      date: "2026-04-08",
      timeSlot: "10:00 AM",
      status: "confirmed",
      createdAt: "2026-04-05T08:00:00Z",
    },
    {
      id: "seed2",
      patientName: "Sita Kumari",
      problemDescription: "Migraine and dizziness",
      doctorId: 2,
      doctorName: doctors[1].name,
      hospitalOrClinic: hospitals[0].name,
      date: "2026-04-10",
      timeSlot: "2:00 PM",
      status: "confirmed",
      createdAt: "2026-04-04T14:00:00Z",
    },
    {
      id: "seed3",
      patientName: "Hari Prasad",
      problemDescription: "Knee pain follow-up",
      doctorId: 3,
      doctorName: doctors[2].name,
      hospitalOrClinic: hospitals[2].name,
      date: "2026-03-28",
      timeSlot: "9:00 AM",
      status: "completed",
      createdAt: "2026-03-25T10:00:00Z",
    },
    {
      id: "seed4",
      patientName: "Gita Devi",
      problemDescription: "Skin rash consultation",
      doctorId: 4,
      doctorName: doctors[3].name,
      hospitalOrClinic: hospitals[3].name,
      date: "2026-03-20",
      timeSlot: "11:00 AM",
      status: "cancelled",
      createdAt: "2026-03-18T09:00:00Z",
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  return seeds;
}
