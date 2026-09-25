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

const STATUS_OPTIONS = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
] as const;

interface OrderStatusFormProps {
    orderId: string;
    currentStatus: OrderStatus;
}

const statusConfig: Record<
    string,
    {
        label: string;
        icon: React.ElementType;
    }
> = {
    PENDING: {
        label: "Pending",
        icon: Clock3,
    },
    CONFIRMED: {
        label: "Confirmed",
        icon: Check,
    },
    PREPARING: {
        label: "Preparing",
        icon: CircleDot,
    },
    OUT_FOR_DELIVERY: {
        label: "Out for Delivery",
        icon: Truck,
    },
    DELIVERED: {
        label: "Delivered",
        icon: PackageCheck,
    },
    CANCELLED: {
        label: "Cancelled",
        icon: XCircle,
    },
};

export default function OrderStatusForm({
    orderId,
    currentStatus,
}: OrderStatusFormProps) {
    const router = useRouter();

    const [status, setStatus] = useState<OrderStatus>(currentStatus);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasChanged = status !== currentStatus;

    const selectedStatus = statusConfig[status];
    const SelectedIcon = selectedStatus?.icon ?? CircleDot;

    const handleSubmit = async () => {
        if (!orderId) {
            toast.error("Order ID is missing");
            console.error("Missing orderId:", orderId);
            return;
        }
        if (!hasChanged) return;

        setIsSubmitting(true);

        try {
            const result = await orderService.updateOrderStatus(
                orderId,
                status,
            );

            if (result.error) {
                toast.error(result.error.message);
                return;
            }

            toast.success("Order status updated successfully");

            router.refresh();
        } catch (error) {
            console.error(
                "Failed to update order status:",
                error,
            );

            toast.error("Failed to update order status");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="mb-4">
                <h3 className="text-sm font-semibold">
                    Update Order Status
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Change the current status of this order.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Select
                    value={status}
                    onValueChange={(val) => setStatus(val as OrderStatus)}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="h-11 w-full rounded-xl sm:w-72">
                        <div className="flex items-center gap-2">
                            <SelectedIcon className="size-4 text-muted-foreground" />

                            <SelectValue placeholder="Select status" />
                        </div>
                    </SelectTrigger>

                    <SelectContent>
                        {STATUS_OPTIONS.map((option) => {
                            const config = statusConfig[option];
                            const Icon = config.icon;

                            return (
                                <SelectItem
                                    key={option}
                                    value={option}
                                    className="rounded-lg"
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-4 text-muted-foreground" />

                                        <span>{config.label}</span>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!hasChanged || isSubmitting}
                    className="h-11 rounded-xl px-6"
                >
                    {isSubmitting ? (
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

            {hasChanged && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5 text-sm">
                    <SelectedIcon className="size-4 text-muted-foreground" />

                    <span className="text-muted-foreground">
                        New status:
                    </span>

                    <span className="font-medium">
                        {selectedStatus?.label}
                    </span>
                </div>
            )}
        </div>
    );
}
