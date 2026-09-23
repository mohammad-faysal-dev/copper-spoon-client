import { CreateMealPayload, Meal } from "@/types/menu.type";

const API_URL = process.env.API_URL;
console.log("API_URL:", API_URL);
export const menuService = {
  getMenus: async function () {
    try {
      const url = new URL(`${API_URL}/meals`);
      const res = await fetch(url.toString());
      console.log("Status:", res.status);
      console.log("Status Text:", res.statusText);
      if (!res.ok) {
        throw new Error("Failed to fetch menus");
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch " } };
    }
  },
  getMenuById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/meals/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Failed to fetch" } };
    }
  },
  createMeal: async function (
    payload: CreateMealPayload,
  ): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const res = await fetch(`${API_URL}/meals`, {
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
            message: result?.message || "Failed to create meal",
          },
        };
      }
      return {
        data: result?.data ?? result,
        error: null,
      };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch" } };
    }
  },
  deleteMeal: async function (
    mealId: string,
  ): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const res = await fetch(`${API_URL}/meals/${mealId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to delete meal",
          },
        };
      }

      return {
        data: result?.data ?? result,
        error: null,
      };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch" } };
    }
  },
};
