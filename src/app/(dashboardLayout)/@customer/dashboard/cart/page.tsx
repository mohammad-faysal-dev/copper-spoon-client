"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "@/providers/cart-provider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const {
    items,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />

          <h1 className="text-2xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add some delicious meals to your cart.
          </p>

          <Button  className="mt-6">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Your Cart
          </h1>

          <p className="mt-1 text-muted-foreground">
            Review your selected meals.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.meal.id}>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                {/* Meal Info */}
                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.meal.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    ${item.meal.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.meal.id,
                        item.quantity - 1,
                      )
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.meal.id,
                        item.quantity + 1,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Item Total */}
                <p className="w-24 text-right font-semibold">
                  $
                  {(
                    item.meal.price * item.quantity
                  ).toFixed(2)}
                </p>

                {/* Remove */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    removeFromCart(item.meal.id)
                  }
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Items
              </span>

              <span>
                {items.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span>${total.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full">
              <Link href="/dashboard/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}