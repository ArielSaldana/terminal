import { createMiddleware } from "@tanstack/react-start";

import { redirect } from "@tanstack/react-router";

const AUTH_TOKEN_KEY = "auth_token";

export const getAuthToken = (): string | null => {
  if (typeof document !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const authMiddleware = createMiddleware().server(
  async ({ next, context }: any) => {
    const isAuthed = isAuthenticated();
    const pathname = context.request.url;

    // Root path logic
    if (pathname === "/") {
      if (isAuthed) {
        throw redirect({ to: "/terminal" });
      }
      return next();
    }

    // Protected paths
    if (!isAuthed) {
      throw redirect({ to: "/" });
    }

    return next();
  },
);

// app/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "../context/AuthContext";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});
