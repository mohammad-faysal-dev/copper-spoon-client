import { CreateOrderPayload, Order } from "@/types/order.type";

const API_URL = process.env.API_URL;

export const orderService = {
  createOrder: async function (
    payload: CreateOrderPayload,
  ): Promise<{ data: Order | null; error: { message: string } | null }> {
    try {
      const res = await fetch(`${API_URL}/orders`, {
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
            message: result?.message || "Failed to create order",
          },
        };
      }

      return {
        data: result?.data ?? result,
        error: null,
      };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to create order" } };
    }
  },
  getMyOrders: async function () {
    try {
      const res = await fetch(`${API_URL}/orders/my-orders`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: {
            message: result?.message || "Failed to fetch orders",
          },
        };
      }
      return { data: result?.data ?? result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to get order" } };
    }
  },
};
