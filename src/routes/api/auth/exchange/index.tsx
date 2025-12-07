import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/auth/exchange/")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { privyToken } = await request.json();

        // Call your auth API
        const response = await fetch("https://your-api.com/auth/exchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ privyToken }),
        });

        const { token } = await response.json();

        return json({ token });
      },
    },
  },
});

// export const Route = createFileRoute("/api/auth/exchange/")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   return <div>Hello "/api/auth/exchange/"!</div>;
// }

// const func = async function POST({ request }: { request: Request }) {
//   const { privyToken } = await request.json();

//   // Call your auth API
//   const response = await fetch("https://your-api.com/auth/exchange", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ privyToken }),
//   });

//   const { token } = await response.json();

//   return json({ token });
// };
