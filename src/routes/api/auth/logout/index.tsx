// src/routes/api/auth/logout.ts
import { clearAuthCookie } from "@/utils/auth.server";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/auth/logout/")({
  server: {
    handlers: {
      POST: async () => {
        return json(
          { ok: true },
          {
            headers: {
              "Set-Cookie": clearAuthCookie(),
            },
          },
        );
      },
    },
  },
});
