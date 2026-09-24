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

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const cart = localStorage.getItem("foodhub-cart");

    if (cart) {
      try {
        setItems(JSON.parse(cart));
      } catch {
        localStorage.removeItem("foodhub-cart");
      }
    }

    setIsHydrated(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "foodhub-cart",
      JSON.stringify(items),
    );
  }, [items, isHydrated]);

  const addToCart = (meal: Meal) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.meal.id === meal.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.meal.id === meal.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          meal,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (mealId: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.meal.id !== mealId,
      ),
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

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.meal.id === mealId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) =>
      sum + item.meal.price * item.quantity,
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