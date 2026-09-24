"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItem } from "@/types/cart.type";
import { Meal } from "@/types/menu.type";

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("foodhub-cart");

    if (cart) {
      setItems(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foodhub-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (meal: Meal) => {
    setItems((items) => {
      const existingItem = items.find(
        (item) => item.meal.id === meal.id,
      );

      if (existingItem) {
        return items.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setItems((items) =>
      items.filter((item) => item.meal.id !== mealId),
    );
  };

  const updateQuantity = (
    mealId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(mealId);
      return;
    }

    setItems((items) =>
      items.map((item) =>
        item.meal.id === mealId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (total, item) =>
      total + item.meal.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return cart;
}