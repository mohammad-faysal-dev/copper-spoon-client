import { ClipboardList } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export default async function AdminOrdersPage() {
    const cookieStore = await cookies()
    const { data, error } = await orderService.getAllOrders(cookieStore.toString());

    const orders = data ?? [];

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <ClipboardList className="size-6 text-primary" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">
                        View all customer orders.
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error.message}
                </div>
            )}

            {/* Empty State */}
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
                    {orders.map((order) => {
                        const total = order.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0,
                        );

                        return (
                            <Card key={order.id}>
                                <CardHeader>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <CardTitle>
                                            Order #{order.id.slice(-8)}
                                        </CardTitle>

                                        <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                            {order.status}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Delivery Address */}
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Delivery Address
                                        </p>
                                        <p className="font-medium">
                                            {order.deliveryAddress}
                                        </p>
                                    </div>

                                    {/* Payment */}
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Payment
                                        </p>
                                        <p className="font-medium">
                                            {order.paymentMethod}
                                        </p>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            Items
                                        </p>

                                        <div className="space-y-2">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                                                >
                                                    <span>
                                                        {item.quantity} × {item.meal?.name}
                                                    </span>

                                                    <span className="font-medium">
                                                        ৳{(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Total</span>

                                            <span className="font-bold">
                                                ৳{total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </main>
    );
}