
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
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold">
                Update Order Status
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
                Change the current status of this order.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Select
                    value={status}
                    onValueChange={(value) =>
                        setStatus(value as OrderStatus)
                    }
                    disabled={loading}
                >
                    <SelectTrigger className="h-11 w-full rounded-xl sm:w-72">
                        <div className="flex items-center gap-2">
                            <Icon className="size-4 text-muted-foreground" />
                            <SelectValue />
                        </div>
                    </SelectTrigger>

                    <SelectContent>
                        {statuses.map((item) => {
                            const StatusIcon = statusIcons[item];

                            return (
                                <SelectItem
                                    key={item}
                                    value={item}
                                    className="rounded-lg"
                                >
                                    <div className="flex items-center gap-2">
                                        <StatusIcon className="size-4" />
                                        {statusLabels[item]}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Button
                    onClick={handleUpdate}
                    disabled={!changed || loading}
                    className="h-11 rounded-xl px-6"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Check className="mr-2 size-4" />
                            Update Status
                        </>
                    )}
                </Button>
            </div>

            {changed && (
                <div className="mt-4 rounded-xl bg-muted/50 px-3 py-2 text-sm">
                    New status:{" "}
                    <span className="font-medium">
                        {statusLabels[status]}
                    </span>
                </div>
            )}
        </div>
    );
}

