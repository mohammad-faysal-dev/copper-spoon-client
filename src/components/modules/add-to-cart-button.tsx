"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { authClient } from "@/lib/auth";
import { Meal } from "@/types/menu.type";

interface AddToCartButtonProps {
  meal: Meal;
  fullWidth?: boolean;
}

export default function AddToCartButton({
  meal,
  fullWidth = false,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const { data: session } = authClient.useSession();

  const handleAddToCart = () => {
    if (!session?.user) {
      toast.info("Please login to add items to your cart");

      router.push("/login");

      return;
    }

    if (!meal.isAvailable) {
      toast.error("This meal is currently unavailable");

      return;
    }

    addToCart(meal);

    toast.success(`${meal.name} added to cart`);
  };

  return (
    <Button
      size={fullWidth ? "lg" : "icon"}
      disabled={!meal.isAvailable}
      onClick={handleAddToCart}
      className={
        fullWidth
          ? "h-14 w-full rounded-xl px-8 text-base font-semibold shadow-md"
          : "h-10 w-10 shrink-0 rounded-xl shadow-sm"
      }
      aria-label={`Add ${meal.name} to cart`}
    >
      <ShoppingCart className="size-5" />

      {fullWidth && (
        <span className="ml-2">
          {meal.isAvailable ? "Add to Cart" : "Unavailable"}
        </span>
      )}
    </Button>
  );
}
