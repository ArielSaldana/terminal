// import { json } from "@tanstack/react-start";

// export async function POST({ request }: { request: Request }) {
//   const { privyToken } = await request.json();

//   // Call your auth API
//   const response = await fetch("https://your-api.com/auth/exchange", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ privyToken }),
//   });

//   const { token } = await response.json();

//   return json({ token });
// }
