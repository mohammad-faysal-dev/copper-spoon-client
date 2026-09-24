
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  ClipboardList,
  Clock,
  CheckCircle2,
  Package,
  Truck,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { cookies } from "next/headers";
import { orderService } from "@/services/order.service";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  PENDING: { label: "Pending", color: "text-amber-600", bg: "bg-amber-500/15", icon: Clock },
  PLACED: { label: "Placed", color: "text-blue-600", bg: "bg-blue-500/15", icon: CheckCircle2 },
  PREPARING: { label: "Preparing", color: "text-violet-600", bg: "bg-violet-500/15", icon: Package },
  READY: { label: "Ready", color: "text-teal-600", bg: "bg-teal-500/15", icon: Truck },
  DELIVERED: { label: "Delivered", color: "text-emerald-600", bg: "bg-emerald-500/15", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", color: "text-destructive", bg: "bg-destructive/10", icon: ShoppingBag },
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const { data: orders, error } =
    await orderService.getMyOrders(cookieStore.toString());

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
              <ClipboardList className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">My Orders</h1>
              <p className="mt-1 text-white/60 text-sm">View and track your orders.</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-10">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-12 text-center">
            <p className="text-destructive font-medium">{error.message}</p>
            <Link href="/dashboard/order" className={buttonVariants({ variant: "default", className: "mt-6 rounded-xl" })}>
              Try Again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
              <ClipboardList className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">My Orders</h1>
              <p className="mt-1 text-white/60 text-sm">View and track your orders.</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-10">
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center rounded-3xl border border-dashed border-border bg-muted/20 p-16">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 border border-border mb-6">
              <ShoppingBag className="size-9 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">No Orders Found</h2>
            <p className="mt-3 text-muted-foreground max-w-sm">
              You haven&apos;t placed any orders yet. Explore our menu and order your first meal!
            </p>
            <Link href="/menu" className={buttonVariants({ variant: "default", className: "mt-8 rounded-xl px-8" })}>
              Browse Menu
              <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <ClipboardList className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">My Orders</h1>
              <p className="mt-1 text-white/70 text-sm font-medium">
                {orders.length} order{orders.length !== 1 ? "s" : ""} placed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + Number(item.price) * Number(item.quantity),
              0,
            );
            const statusCfg = STATUS_CONFIG[order.status] ?? {
              label: order.status,
              color: "text-muted-foreground",
              bg: "bg-muted",
              icon: ClipboardList,
            };
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={order.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex-1 p-6 flex flex-col">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <ClipboardList className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-bold text-foreground text-lg">
                          #{order.id.slice(-8).toUpperCase()}
                        </h2>
                        <p className="text-xs font-medium text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold leading-none ${statusCfg.bg} ${statusCfg.color} shadow-sm backdrop-blur-md`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="flex-1 space-y-3 mb-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id ?? item.mealId}
                        className="flex items-center justify-between text-sm group/item"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                            {item.quantity}
                          </span>
                          <span className="font-medium text-muted-foreground group-hover/item:text-foreground transition-colors line-clamp-1">
                            {item.meal?.name ?? "Meal"}
                          </span>
                        </div>
                        <span className="font-semibold text-foreground shrink-0">
                          ৳{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="mt-auto border-t border-border/40 pt-5">
                    <div className="flex items-end justify-between mb-5">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Payment</p>
                        <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-2xl font-black text-primary">৳{total.toFixed(2)}</p>
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/order/${order.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl h-11 font-semibold shadow-md hover:shadow-xl transition-all duration-300 group/btn text-primary-foreground bg-gradient-to-r from-primary to-primary/90 text-sm hover:translate-y-[-2px]"
                    >
                      Track Order Details
                      <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}