const KEY = "auth";

export function setAuth({ token, user, role }) {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      token,
      user,
      role,
    })
  );
}

export function getAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}

export function isLogged() {
  const auth = getAuth();
  return !!auth?.token;
}

export function isAdmin() {
  const auth = getAuth();

  return (
    auth?.role === "ADMIN" ||
    auth?.user?.rol === "ADMIN" ||
    auth?.user?.role === "ADMIN" ||
    auth?.user?.roles?.includes("ADMIN") ||
    auth?.user?.roles?.includes("admin")
  );
}