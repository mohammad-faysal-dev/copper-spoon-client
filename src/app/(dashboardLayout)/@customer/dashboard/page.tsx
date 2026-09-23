import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  ShoppingCart,
  UserRound,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Orders",
    value: "0",
    icon: ClipboardList,
  },
  {
    title: "Active Orders",
    value: "0",
    icon: Utensils,
  },
  {
    title: "Cart Items",
    value: "0",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    value: "Complete",
    icon: UserRound,
  },
];

export default function CustomerDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your orders, cart and profile.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <p className="text-2xl font-bold">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Explore Menu</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Browse meals and add your favorite food to
              your cart.
            </p>

            <Button asChild>
              <Link href="/menu">
                Browse Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              View and track your previous orders.
            </p>

            <Button variant="outline" asChild>
              <Link href="/dashboard/orders">
                View Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}