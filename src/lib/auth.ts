import { createAuthClient } from "better-auth/react";

// baseURL must be the FRONTEND URL (not backend) so that auth requests go through
// Next.js rewrites (/api/auth/* → backend). This ensures session cookies are set
// on the frontend domain and Next.js server-side can read them.
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");

export const authClient = createAuthClient({
  baseURL: APP_URL,
});
