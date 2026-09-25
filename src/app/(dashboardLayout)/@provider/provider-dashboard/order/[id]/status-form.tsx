"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Check,
    Clock3,
    Loader2,
    PackageCheck,
    Truck,
    XCircle,
    CircleDot,
    Save,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { orderService } from "@/services/order.service";
import { OrderStatus } from "@/types/order.type";

const statuses: OrderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
];

const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PREPARING: "Preparing",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

const statusIcons: Record<OrderStatus, React.ElementType> = {
    PENDING: Clock3,
    CONFIRMED: Check,
    PREPARING: CircleDot,
    OUT_FOR_DELIVERY: Truck,
    DELIVERED: PackageCheck,
    CANCELLED: XCircle,
};

interface OrderStatusFormProps {
    orderId: string;
    currentStatus: OrderStatus;
}

export default function OrderStatusForm({
    orderId,
    currentStatus,
}: OrderStatusFormProps) {
    const router = useRouter();

    const [status, setStatus] = useState<OrderStatus>(currentStatus);
    const [loading, setLoading] = useState(false);

    const changed = status !== currentStatus;
    const Icon = statusIcons[status];

    const handleUpdate = async () => {
        if (!orderId || !changed) return;

        setLoading(true);

        const result = await orderService.updateOrderStatus(
            orderId,
            status,
        );

        if (result.error) {
            toast.error(result.error.message);
        } else {
            toast.success("Order status updated successfully");
            router.refresh();
        }

        setLoading(false);
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-amber-300/20">
            {/* Top glowing line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500" />

            <div className="flex items-center gap-3 border-b border-border/50 pb-5 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-inner">
                    <CircleDot className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold tracking-tight">Order Status Workflow</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Move the order through the fulfillment process.</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select New Status</label>
                    <Select
                        value={status}
                        onValueChange={(value) =>
                            setStatus(value as OrderStatus)
                        }
                        disabled={loading}
                    >
                        <SelectTrigger className="h-12 w-full rounded-xl bg-background border-border/80 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm transition-all md:w-80">
                            <div className="flex items-center gap-3">
                                <Icon className="size-4 text-amber-600 dark:text-amber-500" />
                                <SelectValue className="font-semibold" />
                            </div>
                        </SelectTrigger>

                        <SelectContent className="rounded-xl overflow-hidden border-border/60 shadow-xl">
                            {statuses.map((item) => {
                                const StatusIcon = statusIcons[item];
                                return (
                                    <SelectItem
                                        key={item}
                                        value={item}
                                        className="rounded-lg cursor-pointer focus:bg-amber-500/10 focus:text-amber-600 dark:focus:text-amber-500 transition-colors py-2.5"
                                    >
                                        <div className="flex items-center gap-3 font-medium">
                                            <StatusIcon className="size-4" />
                                            {statusLabels[item]}
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full sm:w-auto">
                    <Button
                        onClick={handleUpdate}
                        disabled={!changed || loading}
                        className="w-full sm:w-auto h-12 rounded-xl px-8 font-bold text-white shadow-lg overflow-hidden group hover:-translate-y-0.5 transition-all outline-none"
                        style={{
                            background: changed && !loading ? "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)" : "",
                            boxShadow: changed && !loading ? "0 4px 15px rgba(180,83,9,0.3)" : "none",
                        }}
                    >
                        {changed && !loading && (
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                        )}

                        {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                        ) : (
                            <><Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 relative z-10" /> <span className="relative z-10">Confirm Status</span></>
                        )}
                    </Button>
                </div>
            </div>

            {changed && (
                <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                    <CircleDot className="h-4 w-4 animate-pulse" />
                    Pending change: will be updated to "{statusLabels[status]}"
                </div>
            )}
        </div>
    );
}
