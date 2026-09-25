import { cookies } from "next/headers";
import { orderService } from "@/services/order.service";
import OrderStatusForm from "./status-form";
import { ArrowLeft, Clock3, UtensilsCrossed, ChefHat, CheckCircle2, CircleDot, PackageCheck, Truck, XCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { OrderStatus } from "@/types/order.type";

interface PageProps {
    params: {
        id: string;
    };
}

const statusConfig: Record<OrderStatus, { color: string, badge: string, icon: any }> = {
    PENDING: { color: "#fbbf24", badge: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400", icon: Clock3 },
    CONFIRMED: { color: "#34d399", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400", icon: CheckCircle2 },
    PREPARING: { color: "#60a5fa", badge: "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400", icon: CircleDot },
    OUT_FOR_DELIVERY: { color: "#a78bfa", badge: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400", icon: Truck },
    DELIVERED: { color: "#10b981", badge: "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400", icon: PackageCheck },
    CANCELLED: { color: "#f87171", badge: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400", icon: XCircle },
};

export default async function OrderStatusPage({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieStr = cookieStore.toString();
    const result = await orderService.getOrderById(id, cookieStr);

    if (!result.data) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto max-w-4xl px-4 py-16">
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-red-500/20 bg-red-500/5">
                        <XCircle className="h-16 w-16 text-red-500 mb-6" />
                        <h2 className="text-2xl font-black text-foreground mb-2">Order Not Found</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                            We couldn't locate this order. It may have been removed or you might not have access to it.
                        </p>
                        <Link
                            href="/provider-dashboard/order"
                            className="inline-flex items-center justify-center gap-2 rounded-xl h-11 px-8 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            style={{ background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)", boxShadow: "0 4px 15px rgba(220,38,38,0.3)" }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Return to Orders
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const order = result.data;
    const currentStatus = order.status as OrderStatus;
    const cfg = statusConfig[currentStatus] || statusConfig.PENDING;
    const StatusIcon = cfg.icon;

    // Calculate total
    const totalAmount = order.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    return (
        <main className="min-h-screen bg-background pb-14">

            {/* ══ HERO BANNER ══ */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#111111] shadow-2xl">
                {/* Glows */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#d97706_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#b45309_0%,_transparent_60%)]" />

                {/* Decorative lines */}
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-10"
                    style={{ backgroundImage: "linear-gradient(45deg, transparent 45%, #b87333 45%, #b87333 55%, transparent 55%)", backgroundSize: "20px 20px" }}
                />

                <div className="relative px-6 md:px-10 py-10">
                    <div className="mb-6">
                        <Link href="/provider-dashboard/order" className="inline-flex items-center gap-2 text-amber-200/50 hover:text-amber-100 text-xs font-bold uppercase tracking-wider transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to orders list
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative shrink-0 hidden sm:block">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 shadow-xl"
                                    style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)" }}>
                                    <UtensilsCrossed className="h-7 w-7 text-amber-100" />
                                </div>
                                <div className="absolute -inset-1 rounded-2xl blur-md opacity-40 -z-10"
                                    style={{ background: "radial-gradient(circle, #b87333, transparent)" }} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
                                    Order <span className="font-mono text-amber-400">#{id.slice(-8).toUpperCase()}</span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                                    <span className="text-white/60">
                                        {new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </span>
                                    <span className="text-white/20">•</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-sm ${cfg.badge} border-white/10`}>
                                        <StatusIcon className="h-3.5 w-3.5" />
                                        {currentStatus.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-6 py-4 backdrop-blur-sm lg:text-right">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/60 mb-1">Total Amount</p>
                            <p className="text-3xl font-black text-amber-400" style={{ textShadow: "0 0 15px rgba(217,119,6,0.3)" }}>
                                ৳{totalAmount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl space-y-8">

                {/* ── STATUS FORM COMPONENT ── */}
                <OrderStatusForm
                    orderId={id}
                    currentStatus={currentStatus}
                />

                {/* ── ORDER DETAILS ── */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Items List */}
                    <div className="rounded-[24px] border border-border/60 bg-card p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-bold tracking-tight mb-5 flex items-center gap-2">
                            <ChefHat className="h-5 w-5 text-amber-500" />
                            Order Items
                        </h3>

                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between group rounded-xl p-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-600 dark:text-amber-500 shrink-0">
                                            x{item.quantity}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-sm line-clamp-1">{item.meal?.name || "Dish Item"}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">৳{Number(item.price).toFixed(2)} each</p>
                                        </div>
                                    </div>
                                    <div className="font-bold text-foreground text-sm shrink-0 pl-4">
                                        ৳{(Number(item.price) * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                            <span className="font-semibold text-muted-foreground text-sm">Subtotal</span>
                            <span className="font-black text-foreground text-lg">৳{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Delivery & Customer Info */}
                    <div className="rounded-[24px] border border-border/60 bg-card p-6 md:p-8 shadow-sm h-fit">
                        <h3 className="text-lg font-bold tracking-tight mb-5 flex items-center gap-2">
                            <Truck className="h-5 w-5 text-amber-500" />
                            Delivery Details
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Delivery Address</p>
                                <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4 border border-border/50">
                                    <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium text-foreground leading-relaxed">
                                        {order.deliveryAddress}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Payment Method</p>
                                <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-4 py-3 border border-border/50 text-sm font-semibold text-foreground">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    {order.paymentMethod === "CASH_ON_DELIVERY" ? "Cash on Delivery" : order.paymentMethod}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}