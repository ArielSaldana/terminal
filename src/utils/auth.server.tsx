// src/utils/auth.server.ts
import { parse, serialize } from "cookie";

export const AUTH_COOKIE = "auth_token";

export const getAuthTokenFromRequest = (request: Request): string | null => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  return cookies[AUTH_COOKIE] ?? null;
};

export const makeAuthCookie = (token: string) => {
  return serialize(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

export const clearAuthCookie = () => {
  return serialize(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};
