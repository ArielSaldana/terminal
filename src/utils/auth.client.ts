const AUTH_TOKEN_KEY = "auth_token";

// Set token in both cookie and localStorage
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    // Set localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    // Set a non-HttpOnly cookie (so JS can see it) if you want to sync with client
    document.cookie = `${AUTH_TOKEN_KEY}=${token}; Path=/; SameSite=Lax; Secure`;
  }
};

// Clear token from both
export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    document.cookie = `${AUTH_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  }
};

// Client-only auth guard
export const isClientAuthed = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// Optional helper to get the token client-side for cross-domain API calls
export const getClientAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};
