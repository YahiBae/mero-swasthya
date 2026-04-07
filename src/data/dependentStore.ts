export interface Dependent {
  id: string;
  name: string;
  relation: string;
  age: string;
}

const STORAGE_KEY = "mero_swasthya_dependents";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const seedDependents: Dependent[] = [
  { id: "dep-1", name: "Father", relation: "Parent", age: "58" },
  { id: "dep-2", name: "Mother", relation: "Parent", age: "54" },
];

export function getDependents(): Dependent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDependents));
      return seedDependents;
    }

    const parsed = JSON.parse(raw) as Dependent[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedDependents;
  } catch {
    return seedDependents;
  }
}

export function setDependents(dependents: Dependent[]): void {
  const sanitized = dependents.filter((dependent) => dependent.name.trim().length > 0);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized.length > 0 ? sanitized : seedDependents));
}

export function addDependent(dependent: Omit<Dependent, "id">): Dependent {
  const next: Dependent = { ...dependent, id: generateId() };
  const current = getDependents();
  const nextList = [next, ...current.filter((item) => item.id !== next.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  return next;
}

export function removeDependent(id: string): void {
  const next = getDependents().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.length > 0 ? next : seedDependents));
}

export function getDefaultDependent(): Dependent {
  return getDependents()[0] ?? seedDependents[0];
}