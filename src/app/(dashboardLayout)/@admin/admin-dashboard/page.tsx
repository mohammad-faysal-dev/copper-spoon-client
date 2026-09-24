import Link from "next/link";
import {
    ClipboardList,
    FolderTree,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

const adminItems = [
    {
        title: "Users",
        description: "Manage customers and providers.",
        href: "/admin-dashboard/users",
        icon: Users,
    },
    {
        title: "Orders",
        description: "View and manage all orders.",
        href: "/admin-dashboard/orders",
        icon: ClipboardList,
    },
    {
        title: "Categories",
        description: "Manage meal categories.",
        href: "/admin-dashboard/categories",
        icon: FolderTree,
    },
];

export default function AdminDashboardPage() {
    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage users, orders, and meal categories.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {adminItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link key={item.title} href={item.href}>
                            <Card className="h-full transition-colors hover:bg-muted/50">
                                <CardContent className="p-6">
                                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="size-6 text-primary" />
                                    </div>

                                    <h2 className="text-xl font-semibold">
                                        {item.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}