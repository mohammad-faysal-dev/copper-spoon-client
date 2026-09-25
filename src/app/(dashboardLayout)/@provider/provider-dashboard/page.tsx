import Link from "next/link";
import {
    ClipboardList,
    PlusCircle,
    UtensilsCrossed,
    UserCircle,
    ChefHat,
    Sparkles,
} from "lucide-react";

const providerItems = [
    {
        title: "My Menu",
        description: "Manage your restaurant meals and availability.",
        href: "/provider-dashboard/menu",
        icon: UtensilsCrossed,
        accent: "from-amber-600 to-amber-400",
        shadow: "rgba(217,119,6,0.25)",
        iconColor: "text-amber-500",
    },
    {
        title: "Add Dish",
        description: "Create a new meal and add it to your menu.",
        href: "/provider-dashboard/menu/add",
        icon: PlusCircle,
        accent: "from-orange-500 to-amber-500",
        shadow: "rgba(249,115,22,0.25)",
        iconColor: "text-orange-500",
    },
    {
        title: "Orders",
        description: "View and manage incoming customer orders.",
        href: "/provider-dashboard/order",
        icon: ClipboardList,
        accent: "from-yellow-500 to-amber-300",
        shadow: "rgba(217,119,6,0.25)",
        iconColor: "text-amber-500",
    },
    {
        title: "Profile",
        description: "Update your restaurant details and settings.",
        href: "/provider-dashboard/profile",
        icon: UserCircle,
        accent: "from-amber-700 to-orange-600",
        shadow: "rgba(194,65,12,0.25)",
        iconColor: "text-orange-600",
    },
];

export default function ProviderDashboardPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* ══ HERO BANNER ══ */}
            <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] shadow-2xl">
                {/* Glows */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#d97706_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#b45309_0%,_transparent_60%)]" />

                {/* Decorative lines */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(45deg, transparent 45%, #b45309 45%, #b45309 55%, transparent 55%)",
                        backgroundSize: "20px 20px"
                    }}
                />

                <div className="relative px-8 py-12">
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 shadow-xl"
                                style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)" }}>
                                <ChefHat className="h-8 w-8 text-amber-100" />
                            </div>
                            <div className="absolute -inset-1 rounded-2xl blur-lg opacity-50 -z-10"
                                style={{ background: "radial-gradient(circle, #b87333, transparent)" }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <Sparkles className="h-4 w-4 text-amber-400" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/70">
                                    Welcome Chef
                                </span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-white mb-2">
                                Provider Dashboard
                            </h1>
                            <p className="text-white/50 text-base font-medium max-w-lg">
                                Access your menu, manage incoming orders, and keep your restaurant profile up to date.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-14">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {providerItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link key={item.title} href={item.href} className="group relative block h-full">
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at center, rgba(180,83,9,0.06) 0%, transparent 100%)" }} />

                                <div className="relative flex flex-col h-full rounded-[24px] border border-border/60 bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-amber-300/30 overflow-hidden">
                                    {/* Hover top bar */}
                                    <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                                    <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted border border-border/50 group-hover:border-amber-500/20 transition-colors shadow-sm">
                                        <Icon className={`size-7 ${item.iconColor} group-hover:scale-110 transition-transform duration-500`} />
                                    </div>

                                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto pt-6 flex items-center text-xs font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                                        Go to {item.title} &rarr;
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}