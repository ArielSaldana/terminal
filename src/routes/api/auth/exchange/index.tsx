// src/routes/api/auth/exchange.ts
import { makeAuthCookie } from "@/utils/auth.server";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/auth/exchange/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { privyToken } = await request.json();

        // 1. Exchange Privy token
        const response = await fetch(
          "https://dusted.app/api/account/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${privyToken}`,
            },
          },
        );

        if (!response.ok) {
          return json({ error: "Invalid Privy token" }, { status: 401 });
        }

        const { token: nativeToken } = await response.json();

        return json(
          { ok: true },
          {
            headers: {
              "Set-Cookie": makeAuthCookie(nativeToken),
            },
          },
        );
      },
    },
  },
});
