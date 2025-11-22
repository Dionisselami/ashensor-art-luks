const AUTH_KEY = "admin-authenticated";

const EXPECTED_USERNAME = "admin";
const EXPECTED_PASSWORD = "shpetimi1234";

export function login(username: string, password: string): boolean {
  const ok = username === EXPECTED_USERNAME && password === EXPECTED_PASSWORD;
  if (ok) {
    localStorage.setItem(AUTH_KEY, "true");
  }
  return ok;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}