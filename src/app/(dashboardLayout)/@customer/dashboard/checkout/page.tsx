"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <p className="mt-1 text-muted-foreground">
          Complete your order.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="font-semibold">
              Delivery Address
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Your delivery address will appear here.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">
              Payment Method
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Cash on Delivery
            </p>
          </div>

          <Button asChild>
            <Link href="/dashboard/cart">
              Back to Cart
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}