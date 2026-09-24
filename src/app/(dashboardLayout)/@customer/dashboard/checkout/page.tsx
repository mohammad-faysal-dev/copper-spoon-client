"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Truck, CreditCard, ArrowLeft, ArrowRight, MapPin, ChefHat } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import { orderService } from "@/services/order.service";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      providerId: items[0].meal.providerId,
      deliveryAddress: address,
      paymentMethod: "CASH_ON_DELIVERY" as const,
      items: items.map(item => ({
        mealId: item.meal.id,
        quantity: item.quantity,
        price: item.meal.price
      }))
    };

    const { data: order, error: apiError } = await orderService.createOrder(payload);

    if (apiError || !order) {
      setError(apiError?.message || "Failed to create order.");
      setLoading(false);
      return;
    }

    clearCart();
    router.push(`/dashboard/order/${order.id}`);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
            <ShoppingBag className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Checkout
            </h1>
            <p className="mt-1 text-white/70 text-sm font-medium">
              Complete your order and payment details.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Order Summary */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg h-fit">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -z-10" />
            <div className="p-7 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 shadow-inner">
                  <ChefHat className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                  <p className="text-xs font-medium text-muted-foreground">{items.length} items in cart</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-4">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Your cart is empty.</p>
                </div>
              )}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
                {items.map(item => (
                  <div
                    key={item.meal.id}
                    className="flex justify-between gap-4 p-3 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-bold text-foreground line-clamp-1">{item.meal.name}</span>
                      <p className="text-xs font-semibold text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-primary">
                      ৳{(item.quantity * item.meal.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4" />

              <div className="flex justify-between items-end pt-2">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total</span>
                <span className="text-3xl font-black text-primary drop-shadow-sm">৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg h-fit">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            <div className="p-7 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 shadow-inner">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Delivery Details</h2>
                  <p className="text-xs font-medium text-muted-foreground">Where should we send it?</p>
                </div>
              </div>
            </div>

            <div className="p-7 space-y-7">
              {error && (
                <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <p className="text-sm text-destructive font-semibold leading-tight">{error}</p>
                </div>
              )}

              <div className="space-y-3 relative group">
                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MapPin className="h-4.5 w-4.5 text-primary" />
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your full apartment, street, and area..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-2xl h-14 bg-background/50 border-border/60 focus:bg-background transition-all shadow-sm focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <CreditCard className="h-4.5 w-4.5 text-primary" />
                  Payment Method
                </Label>
                <div className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 shadow-inner">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="relative">
                    <p className="text-base font-bold text-foreground">Cash on Delivery</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">Pay conveniently when your order arrives</p>
                  </div>
                  <div className="relative ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/cart")}
                  className="rounded-2xl h-14 flex-1 border-2 border-border/50 hover:bg-muted font-bold text-foreground flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Cart</span>
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  className="rounded-2xl h-14 flex-1 group shadow-md hover:shadow-xl transition-all duration-300 font-bold bg-gradient-to-r from-primary to-primary/90 hover:-translate-y-1 text-base text-primary-foreground"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      Confirm Order
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}