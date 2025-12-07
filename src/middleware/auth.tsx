import { createMiddleware } from "@tanstack/react-start";
import { getAuthTokenFromRequest } from "../utils/auth.server";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthProvider } from "../context/AuthContext";
import { getClientAuthToken } from "@/utils/auth.client";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const token = getAuthTokenFromRequest(request);
    const pathname = new URL(request.url).pathname;

    console.log(token, pathname);

    const isAuthed = !!token;

    // Public route: "/"
    if (pathname === "/") {
      if (isAuthed) {
        throw redirect({ to: "/terminal" });
      }
      return next();
    }

    // Protected routes
    if (!isAuthed) {
      throw redirect({ to: "/" });
    }

    return next();
  },
);

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});

export const useClientAuthGuard = () => {
  const token = getClientAuthToken(); // from localStorage
  return !!token;
};
