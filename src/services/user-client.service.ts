const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userClientService = {
  updateUser: async (
    userId: string,
    data: {
      name: string;
      phone: string;
      address: string;
    },
  ) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
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
      console.error(err);

      return {
        data: null,
        error: {
          message: "Failed to update user",
        },
      };
    }
  },
};