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

function isDefaultDependentEntry(dependent: Dependent): boolean {
  const name = dependent.name.trim().toLowerCase();
  return name === "father" || name === "mother";
}

export function sanitizeDependentList(dependents: Dependent[]): Dependent[] {
  return dependents.filter((dependent) => dependent.name.trim().length > 0 && !isDefaultDependentEntry(dependent));
}

const seedDependents: Dependent[] = [];

export function getDependents(): Dependent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDependents));
      return seedDependents;
    }

    const parsed = JSON.parse(raw) as Dependent[];
    const sanitized = Array.isArray(parsed) ? sanitizeDependentList(parsed) : [];
    if (sanitized.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    }
    return sanitized.length > 0 ? sanitized : seedDependents;
  } catch {
    return seedDependents;
  }
}

export function setDependents(dependents: Dependent[]): void {
  const sanitized = sanitizeDependentList(dependents);
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

export function getDefaultDependent(): Dependent | null {
  return getDependents()[0] ?? null;
}