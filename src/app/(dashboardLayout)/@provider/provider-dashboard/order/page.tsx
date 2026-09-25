import Link from "next/link";
import {
    ArrowRight,
    ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export default async function ProviderOrdersPage() {
    const cookieStore = await cookies()
    const result = await orderService.getAllOrders(cookieStore.toString());

    const orders = result.data ?? [];
    const error = result.error?.message;

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <ClipboardList className="size-6 text-primary" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        Orders
                    </h1>

                    <p className="text-muted-foreground">
                        View and manage customer orders.
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="flex min-h-[250px] items-center justify-center">
                        <p className="text-muted-foreground">
                            No orders found.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between gap-3">
                                    <CardTitle>
                                        Order #{order.id.slice(-8)}
                                    </CardTitle>

                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                        {order.status}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Delivery Address
                                </p>

                                <p className="font-medium">
                                    {order.deliveryAddress}
                                </p>

                                <div className="mt-5">
                                    <Button asChild>
                                        <Link
                                            href={`/provider-dashboard/order/${order.id}`}
                                        >
                                            View Order
                                            <ArrowRight className="ml-2 size-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}