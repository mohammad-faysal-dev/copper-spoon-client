import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, CheckCircle2, Clock, Package, Truck, Activity, MapPin, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { orderService } from "@/services/order.service";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const ORDER_STEPS = [
    { id: "PENDING", index: 0, label: "Pending", icon: Clock, color: "text-amber-600", bg: "bg-amber-500/15", border: "border-amber-500" },
    { id: "PLACED", index: 1, label: "Placed", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-500/15", border: "border-blue-500" },
    { id: "PREPARING", index: 2, label: "Preparing", icon: Package, color: "text-violet-600", bg: "bg-violet-500/15", border: "border-violet-500" },
    { id: "READY", index: 3, label: "Ready", icon: Truck, color: "text-teal-600", bg: "bg-teal-500/15", border: "border-teal-500" },
    { id: "DELIVERED", index: 4, label: "Delivered", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/15", border: "border-emerald-500" },
];

export default async function OrderTrackPage({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
    const { data: order, error } = await orderService.getOrderById(id, cookieStore.toString());

    if (error || !order) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-12 text-center max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold text-destructive mb-2">Order Not Found</h1>
                        <p className="text-muted-foreground mt-2">{error?.message || "Could not fetch order data."}</p>
                        <Button asChild className="mt-6 rounded-xl">
                            <Link href="/dashboard/order">Go Back</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    const currentStepIndex = ORDER_STEPS.find((s) => s.id === order.status)?.index ?? -1;
    const isCancelled = order.status === "CANCELLED";
    const total = order.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
                <div className="relative flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
                        <Link href="/dashboard/order">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
                        <Activity className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Track Order #{order.id.slice(-8).toUpperCase()}
                        </h1>
                        <p className="text-white/60 text-sm mt-1">
                            Ordered on {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 pb-10">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left: Progress + Delivery */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Progress Tracker Card */}
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                            <div className="p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                        <Activity className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-lg font-bold">Order Status</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                {isCancelled ? (
                                    <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-6 text-destructive text-center">
                                        <p className="font-bold text-lg">This order has been cancelled.</p>
                                        <p className="text-sm mt-2 text-destructive/70">Please contact us if you have questions.</p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {/* Progress Line */}
                                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border rounded-full md:hidden" />

                                        {/* Desktop horizontal stepper */}
                                        <div className="hidden md:flex relative justify-between pt-4">
                                            <div className="absolute left-0 top-10 w-full h-1 bg-muted rounded-full" />
                                            <div
                                                className="absolute left-0 top-10 h-1 bg-primary rounded-full transition-all duration-700"
                                                style={{ width: `${Math.max(0, (currentStepIndex / (ORDER_STEPS.length - 1)) * 100)}%` }}
                                            />
                                            {ORDER_STEPS.map((step) => {
                                                const isCompleted = currentStepIndex >= step.index;
                                                const isCurrent = currentStepIndex === step.index;
                                                const Icon = step.icon;
                                                return (
                                                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                                        <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-background transition-all duration-500 shadow-sm ${isCompleted ? `${step.border} ${step.bg}` : "border-border text-muted-foreground"
                                                            } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}>
                                                            <Icon className={`h-5 w-5 transition-colors ${isCompleted ? step.color : "text-muted-foreground"}`} />
                                                        </div>
                                                        <span className={`text-xs font-semibold transition-colors ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Mobile vertical stepper */}
                                        <div className="flex flex-col gap-4 md:hidden">
                                            {ORDER_STEPS.map((step) => {
                                                const isCompleted = currentStepIndex >= step.index;
                                                const isCurrent = currentStepIndex === step.index;
                                                const Icon = step.icon;
                                                return (
                                                    <div key={step.id} className="flex items-center gap-4">
                                                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 bg-background transition-all ${isCompleted ? `${step.border} ${step.bg}` : "border-border"
                                                            } ${isCurrent ? "ring-2 ring-primary/20" : ""}`}>
                                                            <Icon className={`h-4 w-4 ${isCompleted ? step.color : "text-muted-foreground"}`} />
                                                        </div>
                                                        <span className={`text-sm font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                            <div className="p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-bold">Delivery Details</h2>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Delivery Address</p>
                                    <p className="font-medium">{order.deliveryAddress || "N/A"}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Payment Method</p>
                                    <p className="font-medium">Cash on Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Receipt */}
                    <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm sticky top-6">
                            <div className="p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
                                        <ReceiptText className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <h2 className="text-base font-bold">Order Summary</h2>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-3">
                                    {order.items.map((item: any) => (
                                        <div key={item.id || item.mealId} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.quantity} × {item.meal?.name || "Meal"}
                                            </span>
                                            <span className="font-medium">৳{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-dashed border-border/70 my-3" />

                                <div className="flex justify-between items-center font-bold">
                                    <span>Total</span>
                                    <span className="text-lg">৳{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
