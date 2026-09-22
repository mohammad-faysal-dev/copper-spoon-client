"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Package,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CustomerDashboardPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <p className="text-sm font-medium text-primary">
          Customer Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back! 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your orders, cart, and profile from one place.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>

            <h2 className="mt-4 font-semibold">Total Orders</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              All your orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Clock3 className="h-6 w-6 text-primary" />
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
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>

            <h2 className="mt-4 font-semibold">Cart Items</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Items in your cart
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <UserRound className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-green-600">
                Active
              </span>
            </div>

            <h2 className="mt-4 font-semibold">My Profile</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your information
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <ShoppingCart className="h-8 w-8 text-primary" />

            <h2 className="mt-4 text-xl font-semibold">
              Hungry for something delicious?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Explore our menu and find your favorite meals.
            </p>

            <Button asChild className="mt-5">
              <Link href="/menu">
                Explore Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Package className="h-8 w-8 text-primary" />

            <h2 className="mt-4 text-xl font-semibold">
              Track your orders
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Check your recent orders and delivery status.
            </p>

            <Button asChild variant="outline" className="mt-5">
              <Link href="/dashboard/orders">
                View Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CustomerDashboardPage;