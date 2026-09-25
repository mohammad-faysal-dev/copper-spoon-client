import { OrderStatus } from "./order.type";

export interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description?: string | null;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
}

export interface CreateProviderProfilePayload {
  restaurantName: string;
  description?: string;
  phone?: string;
  address?: string;
  image?: string;
}
export interface UpdateProviderProfilePayload {
  restaurantName?: string;
  description?: string;
  phone?: string;
  address?: string;
  image?: string;
}

export interface CreateProviderMealPayload {
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  cuisine?: string;
  dietary?: string;
  isAvailable?: boolean;
}

export interface UpdateProviderMealPayload {
  categoryId?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  cuisine?: string;
  dietary?: string;
  isAvailable?: boolean;
}

export interface UpdateProviderOrderStatusPayload {
  status: OrderStatus;
}