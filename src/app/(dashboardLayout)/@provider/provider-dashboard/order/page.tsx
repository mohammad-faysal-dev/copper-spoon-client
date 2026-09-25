import Link from "next/link";
import {
    ArrowRight,
    ClipboardList,
    Clock,
    CheckCircle2,
    Package,
    Truck,
    ShoppingBag,
    XCircle,
    MapPin,
    UtensilsCrossed,
    TrendingUp,
    Sparkles,
    CreditCard,
} from "lucide-react";

import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

const STATUS_CONFIG: Record<
    string,
    {
        label: string;
        color: string;
        bg: string;
        border: string;
        dot: string;
        icon: React.ElementType;
        step: number;
    }
> = {
    PENDING: {
        label: "Pending",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/30",
        dot: "bg-amber-400",
        icon: Clock,
        step: 1,
    },
    PLACED: {
        label: "Placed",
        color: "text-orange-300",
        bg: "bg-orange-300/10",
        border: "border-orange-300/30",
        dot: "bg-orange-300",
        icon: CheckCircle2,
        step: 2,
    },
    PREPARING: {
        label: "Preparing",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/30",
        dot: "bg-yellow-400",
        icon: Package,
        step: 3,
    },
    READY: {
        label: "Ready",
        color: "text-lime-400",
        bg: "bg-lime-400/10",
        border: "border-lime-400/30",
        dot: "bg-lime-400",
        icon: Truck,
        step: 4,
    },
    DELIVERED: {
        label: "Delivered",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/30",
        dot: "bg-emerald-400",
        icon: CheckCircle2,
        step: 5,
    },
    CANCELLED: {
        label: "Cancelled",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/30",
        dot: "bg-red-400",
        icon: XCircle,
        step: 0,
    },
};

const STEPS = ["Pending", "Placed", "Preparing", "Ready", "Delivered"];

export default async function ProviderOrdersPage() {
    const cookieStore = await cookies();
    const result = await orderService.getAllOrders(cookieStore.toString());

    const orders = result.data ?? [];
    const error = result.error?.message;

    const totalRevenue = orders.reduce((sum, order) => {
        return (
            sum +
            order.items.reduce(
                (s, item) => s + Number(item.price) * Number(item.quantity),
                0,
            )
        );
    }, 0);

    const activeOrders = orders.filter(
        (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED",
    ).length;

    const deliveredOrders = orders.filter((o) => o.status === "DELIVERED").length;

    return (
        <main className="min-h-screen bg-background">

            {/* ══════════ HERO BANNER ══════════ */}
            <div
                className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl shadow-2xl"
                style={{ background: "linear-gradient(160deg, #111111 0%, #1c1208 45%, #0f0a00 100%)" }}
            >
                {/* Subtle diagonal line pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
              -45deg,
              rgba(184,115,51,1) 0px,
              rgba(184,115,51,1) 1px,
              transparent 1px,
              transparent 28px
            )`,
                    }}
                />

                {/* Warm glow blobs */}
                <div
                    className="absolute -top-16 left-10 h-64 w-64 rounded-full opacity-25"
                    style={{ background: "radial-gradient(circle, #b87333 0%, transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-12 right-20 h-48 w-48 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
                />
                <div
                    className="absolute top-1/2 right-1/3 h-32 w-64 opacity-10"
                    style={{ background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)" }}
                />

                {/* Decorative rings */}
                <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-amber-400/10" />
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-amber-400/15" />
                {/* Floating dots */}
                <div className="absolute right-28 top-7 h-2 w-2 rounded-full bg-amber-400/40" />
                <div className="absolute right-44 bottom-8 h-1.5 w-1.5 rounded-full bg-orange-300/50" />
                <div className="absolute left-1/3 top-4 h-1 w-1 rounded-full bg-yellow-400/40" />
                {/* bottom shimmer line */}
                <div
                    className="absolute bottom-0 left-1/4 h-px w-96 opacity-30"
                    style={{ background: "linear-gradient(90deg, transparent, #b87333, transparent)" }}
                />

                <div className="relative px-8 py-11">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

                        {/* Left: Icon + Title */}
                        <div className="flex items-center gap-5">
                            <div className="relative shrink-0">
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 backdrop-blur-sm shadow-2xl"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(184,115,51,0.5) 0%, rgba(217,119,6,0.25) 100%)",
                                    }}
                                >
                                    <ClipboardList className="h-8 w-8 text-amber-200" />
                                </div>
                                {/* copper glow */}
                                <div
                                    className="absolute -inset-2 rounded-2xl blur-xl opacity-40"
                                    style={{ background: "radial-gradient(circle, #b87333 0%, transparent 70%)" }}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="h-3 w-3 text-amber-400/60" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/60">
                                        Copper Spoon Kitchen
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-white">
                                    Manage Orders
                                </h1>
                                <p className="mt-1.5 text-amber-200/40 text-sm font-medium">
                                    {orders.length} total &bull; {activeOrders} active &bull; {deliveredOrders} delivered
                                </p>
                            </div>
                        </div>

                        {/* Right: Stats */}
                        {orders.length > 0 && (
                            <div className="flex items-stretch gap-3">
                                {/* Revenue */}
                                <div
                                    className="flex flex-col justify-between rounded-2xl border border-amber-400/15 backdrop-blur-sm px-5 py-4 min-w-[120px] text-center"
                                    style={{ background: "rgba(184,115,51,0.08)" }}
                                >
                                    <div className="flex items-center justify-center gap-1.5 mb-2">
                                        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300/50">
                                            Revenue
                                        </span>
                                    </div>
                                    <p
                                        className="text-2xl font-black text-white leading-none"
                                        style={{ textShadow: "0 0 16px rgba(184,115,51,0.5)" }}
                                    >
                                        ৳{totalRevenue.toFixed(0)}
                                    </p>
                                </div>

                                {/* Active Orders */}
                                <div
                                    className="flex flex-col justify-between rounded-2xl border border-amber-400/15 backdrop-blur-sm px-5 py-4 min-w-[90px] text-center"
                                    style={{ background: "rgba(184,115,51,0.08)" }}
                                >
                                    <div className="flex items-center justify-center gap-1.5 mb-2">
                                        <UtensilsCrossed className="h-3.5 w-3.5 text-orange-300" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300/50">
                                            Active
                                        </span>
                                    </div>
                                    <p
                                        className="text-2xl font-black text-white leading-none"
                                        style={{ textShadow: "0 0 16px rgba(184,115,51,0.5)" }}
                                    >
                                        {activeOrders}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ══════════ CONTENT ══════════ */}
            <div className="container mx-auto px-4 pb-14">

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-400">
                        <XCircle className="h-5 w-5 shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div
                        className="flex min-h-[420px] flex-col items-center justify-center text-center rounded-3xl border-2 border-dashed border-amber-400/15 p-16"
                        style={{ background: "rgba(184,115,51,0.03)" }}
                    >
                        <div
                            className="flex h-24 w-24 items-center justify-center rounded-3xl border border-amber-400/20 mx-auto mb-6"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(184,115,51,0.15) 0%, rgba(217,119,6,0.08) 100%)",
                            }}
                        >
                            <ShoppingBag className="size-11 text-amber-400/50" />
                        </div>
                        <h2 className="text-2xl font-black text-foreground/80">No Orders Yet</h2>
                        <p className="mt-3 text-muted-foreground max-w-sm leading-relaxed text-sm">
                            No orders have been placed yet. Once customers start ordering, they&apos;ll appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const total = order.items.reduce(
                                (sum, item) =>
                                    sum + Number(item.price) * Number(item.quantity),
                                0,
                            );
                            const statusCfg = STATUS_CONFIG[order.status] ?? {
                                label: order.status,
                                color: "text-muted-foreground",
                                bg: "bg-muted",
                                border: "border-border",
                                dot: "bg-muted-foreground",
                                icon: ClipboardList,
                                step: 0,
                            };
                            const StatusIcon = statusCfg.icon;
                            const isCancelled = order.status === "CANCELLED";
                            const isDelivered = order.status === "DELIVERED";

                            return (
                                <div
                                    key={order.id}
                                    className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-amber-400/30"
                                >
                                    {/* Hover warm glow overlay */}
                                    <div
                                        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                                        style={{
                                            background:
                                                "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.06) 0%, transparent 65%)",
                                        }}
                                    />

                                    {/* Top accent line */}
                                    <div
                                        className={`h-[3px] w-full rounded-t-3xl bg-gradient-to-r ${isCancelled
                                            ? "from-red-500/60 to-red-400/40"
                                            : isDelivered
                                                ? "from-emerald-500/60 to-teal-400/40"
                                                : "from-amber-500 via-orange-400 to-yellow-500"
                                            }`}
                                    />

                                    <div className="relative p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                                            {/* ── LEFT SECTION ── */}
                                            <div className="flex-1 min-w-0">

                                                {/* Order ID + Date + Status Badge */}
                                                <div className="flex items-start flex-wrap gap-3 mb-5">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 group-hover:scale-110 transition-transform duration-500 shrink-0"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, rgba(184,115,51,0.2) 0%, rgba(217,119,6,0.1) 100%)",
                                                            }}
                                                        >
                                                            <UtensilsCrossed className="h-5 w-5 text-amber-400" />
                                                        </div>
                                                        <div>
                                                            <h2 className="font-black text-foreground text-base leading-tight">
                                                                Order{" "}
                                                                <span className="font-mono text-amber-500">
                                                                    #{order.id.slice(-8).toUpperCase()}
                                                                </span>
                                                            </h2>
                                                            <p className="text-xs font-medium text-muted-foreground mt-0.5">
                                                                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                                                    weekday: "short",
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}{" "}
                                                                &bull;{" "}
                                                                {new Date(order.createdAt).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Status badge */}
                                                    <span
                                                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold border backdrop-blur-sm ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot} ${isCancelled || isDelivered ? "" : "animate-pulse"}`}
                                                        />
                                                        <StatusIcon className="h-3.5 w-3.5" />
                                                        {statusCfg.label}
                                                    </span>
                                                </div>

                                                {/* Progress stepper */}
                                                {!isCancelled && (
                                                    <div className="flex items-center gap-1.5 mb-5">
                                                        {STEPS.map((step, idx) => {
                                                            const stepNum = idx + 1;
                                                            const isActive = statusCfg.step >= stepNum;
                                                            const isCurrent = statusCfg.step === stepNum;
                                                            return (
                                                                <div key={step} className="flex-1 flex flex-col items-center gap-1">
                                                                    <div
                                                                        className={`h-1.5 w-full rounded-full transition-all duration-700 ${isActive
                                                                            ? "bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400"
                                                                            : "bg-muted"
                                                                            }`}
                                                                        style={
                                                                            isCurrent
                                                                                ? { boxShadow: "0 0 8px rgba(184,115,51,0.7)" }
                                                                                : {}
                                                                        }
                                                                    />
                                                                    <span
                                                                        className={`text-[8px] font-bold uppercase tracking-wider hidden md:block ${isCurrent
                                                                            ? "text-amber-500"
                                                                            : isActive
                                                                                ? "text-muted-foreground"
                                                                                : "text-muted-foreground/30"
                                                                            }`}
                                                                    >
                                                                        {step}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* Delivery Address */}
                                                <div className="flex items-start gap-3 rounded-xl bg-muted/40 border border-border/50 px-4 py-3 mb-4">
                                                    <MapPin className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-0.5">
                                                            Delivery Address
                                                        </p>
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {order.deliveryAddress}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Order Items */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {order.items.map((item) => (
                                                        <div
                                                            key={item.id ?? item.mealId}
                                                            className="flex items-center justify-between rounded-xl bg-muted/40 border border-border/50 px-3.5 py-2.5 text-sm hover:bg-muted/70 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                <span
                                                                    className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black text-amber-600 shrink-0"
                                                                    style={{ background: "rgba(184,115,51,0.15)" }}
                                                                >
                                                                    {item.quantity}
                                                                </span>
                                                                <span className="font-medium text-foreground/70 truncate">
                                                                    {item.meal?.name ?? "Meal"}
                                                                </span>
                                                            </div>
                                                            <span className="font-bold text-foreground shrink-0 ml-2">
                                                                ৳{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ── RIGHT SIDEBAR ── */}
                                            <div className="lg:w-52 flex flex-col gap-3 lg:shrink-0">

                                                {/* Total card */}
                                                <div
                                                    className="rounded-2xl border border-amber-400/20 p-5 text-center relative overflow-hidden"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(217,119,6,0.06) 100%)",
                                                    }}
                                                >
                                                    {/* glow */}
                                                    <div
                                                        className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-20"
                                                        style={{ background: "radial-gradient(circle, #b87333, transparent)" }}
                                                    />
                                                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                                                        Order Total
                                                    </p>
                                                    <p
                                                        className="text-3xl font-black text-amber-500 leading-none"
                                                        style={{ textShadow: "0 0 16px rgba(184,115,51,0.4)" }}
                                                    >
                                                        ৳{total.toFixed(2)}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                                                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                                    </p>
                                                </div>

                                                {/* Payment */}
                                                <div className="rounded-xl bg-muted/40 border border-border/50 px-4 py-3 flex items-center gap-3">
                                                    <CreditCard className="h-4 w-4 text-amber-500/60 shrink-0" />
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                                            Payment
                                                        </p>
                                                        <p className="text-xs font-semibold text-foreground/80">
                                                            Cash on Delivery
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* CTA Button */}
                                                <Link
                                                    href={`/provider-dashboard/order/${order.id}`}
                                                    className="relative inline-flex w-full items-center justify-center rounded-xl h-11 font-bold text-sm text-white overflow-hidden transition-all duration-300 group/btn hover:-translate-y-0.5"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
                                                        boxShadow: "0 4px 20px rgba(184,115,51,0.4)",
                                                    }}
                                                >
                                                    {/* shimmer */}
                                                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                                    <span className="relative flex items-center gap-2">
                                                        Manage Order
                                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                                                    </span>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}