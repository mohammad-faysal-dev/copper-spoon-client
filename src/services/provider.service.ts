import { CreateProviderProfilePayload, Provider } from "@/types/provider.type";

const API_URL = process.env.API_URL;

export const providerService = {
  getProviders: async function () {
    try {
      const url = new URL(`${API_URL}/provider`);
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error("Failed to fetch providers");
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch providers" } };
    }
  },
  createProfile: async function (
    payload: CreateProviderProfilePayload,
  ): Promise<{
    data: Provider | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/api/providers/profile`, {
        method: "POST",
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
            message: result?.message || "Failed to create provider profile",
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
          message: "Failed to create provider profile",
        },
      };
    }
  },
};
