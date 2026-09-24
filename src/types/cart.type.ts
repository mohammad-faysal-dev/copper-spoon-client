import { Meal } from "./menu.type";

export interface CartItem {
  meal: Meal;
  quantity: number;
}
