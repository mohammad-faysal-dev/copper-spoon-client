import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/category.type";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  // Get All Categories
  getAllCategories: async function (): Promise<{
    data: Category[] | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/category`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch categories",
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
          message: "Failed to fetch categories",
        },
      };
    }
  },

  // Create Category
  createCategory: async function (
    payload: CreateCategoryPayload,
  ): Promise<{
    data: Category | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to create category",
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
          message: "Failed to create category",
        },
      };
    }
  },

  // Get Category By ID
  getCategoryById: async function (
    categoryId: string,
  ): Promise<{
    data: Category | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch category",
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
          message: "Failed to fetch category",
        },
      };
    }
  },

  // Update Category
  updateCategory: async function (
    categoryId: string,
    payload: UpdateCategoryPayload,
  ): Promise<{
    data: Category | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to update category",
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
          message: "Failed to update category",
        },
      };
    }
  },

  // Delete Category
  deleteCategory: async function (
    categoryId: string,
  ): Promise<{
    data: Category | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "DELETE",

        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to delete category",
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
          message: "Failed to delete category",
        },
      };
    }
  },
};

export default categoryService;