import { CreateReviewPayload, Review, UpdateReviewPayload } from "@/types/review.type";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  // Get Review By ID
  getReviewById: async function (reviewId: string): Promise<{
    data: Review | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/review/${reviewId}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch review",
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
          message: "Failed to fetch review",
        },
      };
    }
  },

  // Update Review
  updateReview: async function (
    reviewId: string,
    payload: UpdateReviewPayload,
  ): Promise<{
    data: Review | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/review/${reviewId}`, {
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
            message: result?.message || "Failed to update review",
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
          message: "Failed to update review",
        },
      };
    }
  },

  // Delete Review
  deleteReview: async function (reviewId: string): Promise<{
    data: Review | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/review/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to delete review",
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
          message: "Failed to delete review",
        },
      };
    }
  },

  // Get All Reviews
  getAllReviews: async function (): Promise<{
    data: Review[] | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/review`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch reviews",
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
          message: "Failed to fetch reviews",
        },
      };
    }
  },

  // Create Review
  createReview: async function (payload: CreateReviewPayload): Promise<{
    data: Review | null;
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/review`, {
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
            message: result?.message || "Failed to create review",
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
          message: "Failed to create review",
        },
      };
    }
  },
};

export default reviewService;
