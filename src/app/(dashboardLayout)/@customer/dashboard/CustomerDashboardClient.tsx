"use client";

import Link from "next/link";
import {
    ArrowRight,
    ClipboardList,
    ShoppingCart,
    UserRound,
    Utensils,
    ChefHat,
    Sparkles,
    Activity,
    Bell,
    Settings,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";

export default function CustomerDashboardClient({ user, orders }: { user: any, orders: any[] }) {
    const { items } = useCart();

    const totalOrders = orders?.length || 0;
    const activeOrders = orders?.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED')?.length || 0;
    const cartItemsCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const stats = [
        {
            title: "Total Orders",
            value: totalOrders.toString(),
            icon: ClipboardList,
            color: "from-amber-400 to-orange-600",
            lightBg: "bg-orange-50 dark:bg-orange-950/20",
            iconColor: "text-orange-600 dark:text-orange-500",
        },
        {
            title: "Active Orders",
            value: activeOrders.toString(),
            icon: Activity,
            color: "from-emerald-400 to-teal-600",
            lightBg: "bg-teal-50 dark:bg-teal-950/20",
            iconColor: "text-teal-600 dark:text-teal-500",
        },
        {
            title: "Cart Items",
            value: cartItemsCount.toString(),
            icon: ShoppingCart,
            color: "from-blue-400 to-indigo-600",
            lightBg: "bg-blue-50 dark:bg-blue-950/20",
            iconColor: "text-blue-600 dark:text-blue-500",
        },
        {
            title: "Profile Status",
            value: "Complete",
            icon: Sparkles,
            color: "from-fuchsia-400 to-purple-600",
            lightBg: "bg-purple-50 dark:bg-purple-950/20",
            iconColor: "text-purple-600 dark:text-purple-500",
        },
    ];

    return (
        <main className="min-h-screen bg-neutral-50/50 dark:bg-background pb-12">
            {/* Header Banner - Premium Glassmorphism */}
            <div className="relative overflow-hidden rounded-bl-[2.5rem] rounded-br-[2.5rem] sm:rounded-bl-[3rem] sm:rounded-br-[3rem] bg-slate-950 px-6 py-12 sm:px-12 sm:py-16 shadow-2xl">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="absolute -inset-[100%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0)_0%,rgba(56,189,248,0)_50%,rgba(244,114,182,0.1)_100%)]" />
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[80px]" />

                <div className="relative container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-blue-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
                                <ChefHat className="h-8 w-8 text-white drop-shadow-md" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/90 shadow-sm">
                                    <Sparkles className="h-3 w-3 text-yellow-300" />
                                    Welcome Back
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                                {user?.name ? user.name : 'Valued Customer'}
                            </h1>
                            <p className="mt-2 text-white/70 max-w-sm text-sm sm:text-base font-medium">
                                Manage your orders, customize your profile, and explore our delicious menu.
                            </p>
                        </div>
                    </div>

                    {/* Quick Access Top Metrics */}
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl">
                        <div className="flex flex-col items-center px-4 border-r border-white/10">
                            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Cart</span>
                            <span className="text-xl font-bold text-white">{cartItemsCount}</span>
                        </div>
                        <div className="flex flex-col items-center px-4">
                            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Active</span>
                            <span className="text-xl font-bold text-white">{activeOrders}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-10">
                {/* Stats Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full group-hover:scale-125 transition-transform duration-700`} />
                                <div className="p-6 relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.lightBg} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
                                            <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black tracking-tight text-foreground mb-1 transition-all duration-300">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                            {stat.title}
                                        </p>
                                    </div>
                                </div>
                                <div className={`h-1 w-full bg-gradient-to-r ${stat.color} absolute bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                            </div>
                        );
                    })}
                </div>

                {/* Action Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8 lg:px-8">
                    {/* Explore Menu Card */}
                    <div className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-60 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1200"
                                alt="Menu"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
                            <div className="absolute top-6 left-6 z-20">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                                    <Utensils className="h-3.5 w-3.5 text-primary" />
                                    Discover
                                </span>
                            </div>
                        </div>
                        <div className="relative p-8 -mt-6 z-30 bg-card rounded-t-[2rem]">
                            <h2 className="text-2xl font-bold tracking-tight mb-3 text-foreground">
                                Explore Our Menu
                            </h2>
                            <p className="mb-6 text-base text-muted-foreground leading-relaxed">
                                Dive into our exquisite collection of hand-crafted meals. Add your favorite dishes to the cart and experience culinary delight.
                            </p>
                            <Link href="/menu" className="relative group/btn inline-flex items-center justify-center h-12 w-full sm:w-auto px-8 rounded-full bg-gradient-to-r from-primary to-orange-500 font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-white/25 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                                <span className="relative flex items-center gap-2">
                                    Browse Full Menu
                                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-rotate-45" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Your Orders Card */}
                    <div className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-60 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200"
                                alt="Orders"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 hover:-rotate-1"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
                            <div className="absolute top-6 left-6 z-20">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                                    <ClipboardList className="h-3.5 w-3.5 text-blue-400" />
                                    Tracking
                                </span>
                            </div>
                        </div>
                        <div className="relative p-8 -mt-6 z-30 bg-card rounded-t-[2rem]">
                            <h2 className="text-2xl font-bold tracking-tight mb-3 text-foreground">
                                Track Your Orders
                            </h2>
                            <p className="mb-6 text-base text-muted-foreground leading-relaxed">
                                Keep an eye on your ongoing orders in real-time and review your delicious past order history.
                            </p>
                            <Link href="/dashboard/order" className="relative group/btn inline-flex items-center justify-center h-12 w-full sm:w-auto px-8 rounded-full font-semibold text-foreground bg-transparent border-2 border-primary/20 hover:border-primary/60 shadow-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-primary/10 hover:shadow-lg">
                                <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                                <span className="relative flex items-center gap-2">
                                    View Order History
                                    <ArrowRight className="h-4.5 w-4.5 text-primary transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-rotate-45" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
