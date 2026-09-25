import Link from "next/link";
import {
    ClipboardList,
    PlusCircle,
    Utensils,
    UserCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

const providerItems = [
    {
        title: "My Meals",
        description: "Manage your restaurant meals.",
        href: "/provider-dashboard/meals",
        icon: Utensils,
    },
    {
        title: "Add Meal",
        description: "Add a new meal to your menu.",
        href: "/provider-dashboard/meals/add",
        icon: PlusCircle,
    },
    {
        title: "Orders",
        description: "View and manage customer orders.",
        href: "/provider-dashboard/orders",
        icon: ClipboardList,
    },
    {
        title: "Profile",
        description: "Manage your restaurant profile.",
        href: "/provider-dashboard/profile",
        icon: UserCircle,
    },
];

export default function ProviderDashboardPage() {
    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Provider Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage your meals, orders, and restaurant profile.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {providerItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link key={item.title} href={item.href}>
                            <Card className="h-full transition-colors hover:bg-muted/50">
                                <CardContent className="p-6">
                                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="size-6 text-primary" />
                                    </div>

                                    <h2 className="text-lg font-semibold">
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