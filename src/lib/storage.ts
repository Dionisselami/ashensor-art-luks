export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO string
  read: boolean;
};

const STORAGE_KEY = "contactMessages";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  return safeParse<ContactMessage[]>(localStorage.getItem(STORAGE_KEY), []);
}

function saveMessages(messages: ContactMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function addMessage(input: Pick<ContactMessage, "name" | "email" | "message">): ContactMessage {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
  const created: ContactMessage = {
    id,
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  const current = getMessages();
  current.unshift(created);
  saveMessages(current);
  return created;
}

export function setRead(id: string, read: boolean) {
  const current = getMessages();
  const next = current.map((m) => (m.id === id ? { ...m, read } : m));
  saveMessages(next);
  return next;
}

export function removeMessage(id: string) {
  const current = getMessages();
  const next = current.filter((m) => m.id !== id);
  saveMessages(next);
  return next;
}

export function clearMessages() {
  saveMessages([]);
  return [];
}