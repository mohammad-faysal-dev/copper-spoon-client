"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight, ChefHat } from "lucide-react";

import { useCart } from "@/providers/cart-provider";

import { Button } from "@/components/ui/button";


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
      <main className="min-h-screen bg-background">
        <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Your Cart</h1>
              <p className="mt-1 text-white/70 text-sm font-medium">Ready to order?</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-10">
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center rounded-3xl border border-dashed border-border bg-muted/20 p-16">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-card border border-border shadow-sm">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Your Cart is Empty</h2>
            <p className="mt-3 max-w-sm text-muted-foreground font-medium">
              Looks like you haven&apos;t added any meals yet. Explore our menu to find something delicious.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center justify-center rounded-xl px-8 h-12 font-semibold shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:-translate-y-1 group"
            >
              Browse Menu
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                Your Cart
              </h1>
              <p className="mt-1 text-white/70 text-sm font-medium">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items ready to order
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={clearCart}
            className="rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md hover:text-white transition-all shadow-sm"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.meal.id}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                  {/* Meal Info */}
                  <div className="flex-1">
                    <h2 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {item.meal.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      ৳{item.meal.price.toFixed(2)} <span className="text-xs opacity-70">each</span>
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-border/40">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-background/50 p-1.5 shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
                        onClick={() => updateQuantity(item.meal.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold text-sm bg-transparent">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
                        onClick={() => updateQuantity(item.meal.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Item Total */}
                      <p className="w-24 text-right text-lg font-bold text-foreground">
                        ৳{(item.meal.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.meal.id)}
                        className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors bg-muted/30"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg h-fit sticky top-24">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="p-7 border-b border-border/40">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                  <p className="text-xs font-medium text-muted-foreground">Checkout details</p>
                </div>
              </div>
            </div>

            <div className="p-7 space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Total Items</span>
                <span className="font-bold text-foreground">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Subtotal</span>
                <span className="font-bold text-foreground">৳{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Delivery</span>
                <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">Free</span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-2" />

              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total</span>
                <span className="text-3xl font-black text-primary">৳{total.toFixed(2)}</span>
              </div>

              <div className="pt-4 space-y-3">
                <Link
                  href="/dashboard/checkout"
                  className="inline-flex w-full items-center justify-center rounded-2xl h-14 font-bold shadow-md hover:shadow-xl transition-all duration-300 group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:-translate-y-1 text-base"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Link>

                <Link
                  href="/menu"
                  className="inline-flex w-full items-center justify-center rounded-2xl h-12 font-semibold border-2 border-border/50 bg-transparent hover:bg-muted transition-colors text-sm text-foreground"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}