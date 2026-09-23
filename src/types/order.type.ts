import { Meal } from "./menu.type";

export type PaymentMethod = "CASH_ON_DELIVERY";

export type OrderStatus =
  | "PENDING"
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id?: string;
  mealId: string;
  quantity: string;
  price: string;
  meal?: Meal;
}
export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  providerId: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  items: {
    mealId: string;
    quantity: number;
    price: number;
  }[];
}
