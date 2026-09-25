"use client";

import { useState } from "react";
import { MoreHorizontal, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orderService } from "@/services/order.service";

export function OrderActions({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStatusUpdate = async (status: string) => {
        if (loading) return;
        setLoading(true);
        const toastId = toast.loading(`Updating status to ${status}...`);

        try {
            const result = await orderService.updateOrderStatus(orderId, status as any);
            if (result.error) {
                toast.error(result.error.message, { id: toastId });
            } else {
                toast.success("Order status updated", { id: toastId });
                router.refresh();
            }
        } catch (error) {
            toast.error("An error occurred", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8 rounded-lg outline-none hover:bg-muted focus:bg-muted text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground mt-2">Update Status</DropdownMenuLabel>

                <DropdownMenuItem disabled={currentStatus === "CONFIRMED"} onClick={() => handleStatusUpdate("CONFIRMED")} className="cursor-pointer">
                    <RefreshCcw className="mr-2 h-4 w-4 text-emerald-500" />
                    Mark Confirmed
                </DropdownMenuItem>

                <DropdownMenuItem disabled={currentStatus === "PREPARING"} onClick={() => handleStatusUpdate("PREPARING")} className="cursor-pointer">
                    <RefreshCcw className="mr-2 h-4 w-4 text-blue-500" />
                    Mark Preparing
                </DropdownMenuItem>

                <DropdownMenuItem disabled={currentStatus === "OUT_FOR_DELIVERY"} onClick={() => handleStatusUpdate("OUT_FOR_DELIVERY")} className="cursor-pointer">
                    <RefreshCcw className="mr-2 h-4 w-4 text-purple-500" />
                    Mark Out For Delivery
                </DropdownMenuItem>

                <DropdownMenuItem disabled={currentStatus === "DELIVERED"} onClick={() => handleStatusUpdate("DELIVERED")} className="cursor-pointer">
                    <RefreshCcw className="mr-2 h-4 w-4 text-green-500" />
                    Mark Delivered
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem disabled={currentStatus === "CANCELLED"} onClick={() => handleStatusUpdate("CANCELLED")} className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                    Cancel Order
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
