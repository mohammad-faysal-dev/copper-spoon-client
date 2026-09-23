import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "No session found" } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
  updateUser: async (
    userId: string,
    data: {
      name: string;
      phone: string;
      address: string;
    },
  ) => {
    try {
      const res = await fetch(`${API_URL}/api/users${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result.message || "Failed to update user",
          },
        };
      }
      return {
        data: result,
        error: null,
      };
    } catch (err) {
      return { data: null, error: { message: "Failed to updated user" } };
    }
  },
};
