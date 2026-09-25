import Link from "next/link";
import {
    ClipboardList,
    FolderTree,
    Users,
    ShieldCheck,
    BarChart3
} from "lucide-react";

const adminItems = [
    {
        title: "Users Management",
        description: "View and manage all platform customers and providers.",
        href: "/admin-dashboard/users",
        icon: Users,
        accent: "from-purple-600 to-indigo-500",
        iconColor: "text-purple-500",
    },
    {
        title: "Platform Orders",
        description: "Monitor all orders placed across the system.",
        href: "/admin-dashboard/orders",
        icon: ClipboardList,
        accent: "from-indigo-500 to-blue-500",
        iconColor: "text-indigo-500",
    },
    {
        title: "Menu Categories",
        description: "Create and manage global meal categories.",
        href: "/admin-dashboard/categories",
        icon: FolderTree,
        accent: "from-violet-500 to-purple-400",
        iconColor: "text-violet-500",
    },
];

export default function AdminDashboardPage() {
    return (
        <main className="min-h-screen bg-background pb-14">
            {/* ══ HERO BANNER ══ */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#0f0f13] shadow-2xl">
                {/* Glows */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#6d28d9_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#4338ca_0%,_transparent_60%)]" />

                {/* Decorative lines */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20"
                    style={{ backgroundImage: "linear-gradient(45deg, transparent 45%, #5b21b6 45%, #5b21b6 55%, transparent 55%)", backgroundSize: "20px 20px" }}
                />

                <div className="relative px-8 py-12 flex items-center gap-6">
                    <div className="relative shrink-0 hidden sm:block">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/25 shadow-xl"
                            style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)" }}>
                            <ShieldCheck className="h-8 w-8 text-purple-100" />
                        </div>
                        <div className="absolute -inset-1 rounded-2xl blur-lg opacity-50 -z-10"
                            style={{ background: "radial-gradient(circle, #6d28d9, transparent)" }} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400/80">
                                System Control
                            </span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white mb-2" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                            Admin Dashboard
                        </h1>
                        <p className="text-white/50 text-base font-medium max-w-lg">
                            Monitor platform activity, manage system users, and control global delivery operations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {adminItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link key={item.title} href={item.href} className="group relative block h-full">
                                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.05) 0%, transparent 100%)" }} />

                                <div className="relative flex flex-col h-full rounded-[24px] border border-border/60 bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-purple-500/30 overflow-hidden">
                                    {/* Hover top bar */}
                                    <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                                    <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-105 transition-transform shadow-inner">
                                        <Icon className={`size-7 ${item.iconColor}`} />
                                    </div>

                                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto pt-6 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                                        Manage {item.title.split(' ')[0]} &rarr;
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