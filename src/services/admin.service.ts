import { UpdateUserStatusPayload, User } from "@/types/user.type";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  // Get All Users
  getAllUsers: async function (): Promise<{
    data: User[] | null;
    error: { message: string } | null;
  }> {
    try {
      const cookeiStore = await cookies()
      const res = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: {
          Cookie: cookeiStore.toString()
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch users",
          },
        };
      }

      return {
        data: result?.data ?? result,
        error: null,
      };
    } catch (err) {
      console.error(err);

      return {
        data: null,
        error: {
          message: "Failed to fetch users",
        },
      };
    }
  },

  // Update User Status
  updateUserStatus: async function (
    id: string,
    payload: UpdateUserStatusPayload,
  ): Promise<{
    data: User | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to update user status",
          },
        };
      }

      return {
        data: result?.data ?? result,
        error: null,
      };
    } catch (err) {
      console.error(err);

      return {
        data: null,
        error: {
          message: "Failed to update user status",
        },
      };
    }
  },
};

export default adminService;