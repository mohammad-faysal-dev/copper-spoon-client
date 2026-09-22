"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Package,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomerDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Customer Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back! 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your orders, cart, profile and discover delicious meals.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Package className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>

            <h2 className="mt-4 font-semibold">Total Orders</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your completed orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Clock3 className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>

            <h2 className="mt-4 font-semibold">Active Orders</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <ShoppingCart className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>

            <h2 className="mt-4 font-semibold">Cart Items</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Items waiting for checkout
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <UserRound className="h-7 w-7 text-primary" />
              <span className="text-sm font-medium">Active</span>
            </div>

            <h2 className="mt-4 font-semibold">My Profile</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your account
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Ready to order?</h2>
                <p className="text-sm text-muted-foreground">
                  Explore our delicious meals.
                </p>
              </div>
            </div>

            <Link href="/menu">
              <Button className="mt-5">
                Explore Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Package className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Track your orders</h2>
                <p className="text-sm text-muted-foreground">
                  Check your recent order status.
                </p>
              </div>
            </div>

            <Link href="/dashboard/orders">
              <Button variant="outline" className="mt-5">
                View Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CustomerDashboard;