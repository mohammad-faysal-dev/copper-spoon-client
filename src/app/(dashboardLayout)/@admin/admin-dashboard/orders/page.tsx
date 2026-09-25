import { ClipboardList } from "lucide-react";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";
import { OrderActions } from "./order-actions";

export default async function AdminOrdersPage() {
    const cookieStore = await cookies();
    const { data, error } = await orderService.getAllOrders(cookieStore.toString());

    const orders = data ?? [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-green-500/10 text-green-600 border-green-500/20";
            case "PENDING": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-600 border-red-500/20";
            case "PREPARING": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
            default: return "bg-purple-500/10 text-purple-600 border-purple-500/20";
        }
    };

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* Header */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#0f0f13] shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#6d28d9_0%,_transparent_60%)]" />
                <div className="relative px-6 py-10 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-xl border border-indigo-400/20">
                            <ClipboardList className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white mb-1">Global Orders</h1>
                            <p className="text-white/50 text-sm font-medium">Monitor all orders placed in the system</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-500 font-medium">
                        {error.message}
                    </div>
                )}

                <div className="rounded-[24px] border border-border/60 bg-card shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border/50 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold">Recent Orders Map</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1.5 rounded-lg border border-border/50">
                                {orders.length} Records
                            </span>
                        </div>
                    </div>

                    <div className="p-0">
                        {orders.length === 0 ? (
                            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                                <ClipboardList className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                <p className="text-muted-foreground font-medium">No orders found in the database.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">Order ID</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Address & Payment</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Items</th>
                                            <th className="px-6 py-4 font-bold tracking-wider text-right">Total</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {orders.map((order) => {
                                            const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                                            return (
                                                <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono font-bold text-foreground bg-muted px-2 py-1 rounded-md border border-border/50">
                                                            #{order.id.slice(-8).toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-foreground max-w-[200px] truncate" title={order.deliveryAddress}>{order.deliveryAddress}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{order.paymentMethod}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-medium text-muted-foreground">
                                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-black text-foreground">
                                                        ৳{total.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <OrderActions orderId={order.id} currentStatus={order.status} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}