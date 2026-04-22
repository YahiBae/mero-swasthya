import { doctors, hospitals, clinics } from "./mockData";
import { firebaseAuth } from "@/lib/firebase";

export type AppointmentStatus = "confirmed" | "cancelled" | "completed" | "pending";
export type PatientConfirmationStatus = "pending" | "confirmed";
export type ReminderType = "24h" | "2h";

export interface AppointmentReminder {
  appointmentId: string;
  type: ReminderType;
  scheduledFor: string;
  message: string;
}

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
  patientConfirmation?: PatientConfirmationStatus;
  patientConfirmedAt?: string | null;
  rescheduleRequestedAt?: string | null;
  createdAt: string;
}

const STORAGE_KEY = "mero_swasthya_appointments";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function getAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const appointments: Appointment[] = data ? JSON.parse(data) : getSeedAppointments();
    return normalizeAppointments(appointments);
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
    patientConfirmation: "pending",
    patientConfirmedAt: null,
    rescheduleRequestedAt: null,
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

export function confirmAppointmentAttendance(id: string): boolean {
  const all = getAppointments();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1 || all[idx].status !== "confirmed") {
    return false;
  }

  all[idx].patientConfirmation = "confirmed";
  all[idx].patientConfirmedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return true;
}

export function requestAppointmentReschedule(id: string): boolean {
  const all = getAppointments();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1 || all[idx].status !== "confirmed") {
    return false;
  }

  all[idx].status = "pending";
  all[idx].rescheduleRequestedAt = new Date().toISOString();
  all[idx].patientConfirmation = "pending";
  all[idx].patientConfirmedAt = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return true;
}

export function getAppointmentReminders(appointments: Appointment[] = getAppointments(), now: Date = new Date()): AppointmentReminder[] {
  return appointments
    .filter((appointment) => {
      if (appointment.status !== "confirmed") {
        return false;
      }
      if (appointment.patientConfirmation === "confirmed") {
        return false;
      }

      const startsAt = parseAppointmentDateTime(appointment.date, appointment.timeSlot);
      if (!startsAt) {
        return false;
      }

      const msUntil = startsAt.getTime() - now.getTime();
      return msUntil > 0 && msUntil <= 24 * 60 * 60 * 1000;
    })
    .map((appointment) => {
      const startsAt = parseAppointmentDateTime(appointment.date, appointment.timeSlot) as Date;
      const msUntil = startsAt.getTime() - now.getTime();
      const within2Hours = msUntil <= 2 * 60 * 60 * 1000;

      return {
        appointmentId: appointment.id,
        type: within2Hours ? "2h" : "24h",
        scheduledFor: startsAt.toISOString(),
        message: within2Hours
          ? `Your appointment with ${appointment.doctorName} starts in under 2 hours.`
          : `Reminder: appointment with ${appointment.doctorName} is within 24 hours.`,
      };
    })
    .sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor));
}

export function deleteAppointmentById(id: string): void {
  const all = getAppointments();
  const next = all.filter((appointment) => appointment.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function deleteAppointmentsByIds(ids: string[]): number {
  if (ids.length === 0) {
    return 0;
  }

  const idSet = new Set(ids);
  const all = getAppointments();
  const next = all.filter((appointment) => !idSet.has(appointment.id));
  const removed = all.length - next.length;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return removed;
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
      patientConfirmation: "pending",
      patientConfirmedAt: null,
      rescheduleRequestedAt: null,
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
      patientConfirmation: "pending",
      patientConfirmedAt: null,
      rescheduleRequestedAt: null,
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
      patientConfirmation: "confirmed",
      patientConfirmedAt: "2026-03-28T08:30:00Z",
      rescheduleRequestedAt: null,
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
      patientConfirmation: "pending",
      patientConfirmedAt: null,
      rescheduleRequestedAt: null,
      createdAt: "2026-03-18T09:00:00Z",
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  return seeds;
}

function normalizeAppointments(appointments: Appointment[]): Appointment[] {
  const normalized = appointments.map((appointment) => {
    if (appointment.patientConfirmation) {
      return appointment;
    }

    return {
      ...appointment,
      patientConfirmation: appointment.status === "completed" ? "confirmed" : "pending",
      patientConfirmedAt: appointment.status === "completed" ? appointment.createdAt : null,
      rescheduleRequestedAt: appointment.rescheduleRequestedAt ?? null,
    };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function parseAppointmentDateTime(date: string, timeSlot: string): Date | null {
  const match = timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return null;
  }

  const [, hourRaw, minuteRaw, periodRaw] = match;
  const hourNumber = Number.parseInt(hourRaw, 10);
  const minuteNumber = Number.parseInt(minuteRaw, 10);
  if (Number.isNaN(hourNumber) || Number.isNaN(minuteNumber) || hourNumber < 1 || hourNumber > 12) {
    return null;
  }

  let hour24 = hourNumber % 12;
  const period = periodRaw.toUpperCase();
  if (period === "PM") {
    hour24 += 12;
  }

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  parsed.setHours(hour24, minuteNumber, 0, 0);
  return parsed;
}
