import { cookies } from "next/headers";
import { orderService } from "@/services/order.service";
import OrderStatusForm from "./status-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function OrderStatusPage({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieStr = cookieStore.toString();
    const result = await orderService.getOrderById(id, cookieStr);

    console.log("FETCH ORDER STATUS:", { id, cookieStrLen: cookieStr.length, result });

    if (!result.data) {
        return (
            <div className="p-4 mt-8 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-center max-w-lg mx-auto">
                <p>Order not found or an error occurred.</p>
                <div className="mt-4">
                    <Link href="/provider-dashboard/order">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 size-4" />
                            Back to Orders
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/provider-dashboard/order">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="size-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">
                        Order #{id.slice(-8)}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your order status and details here.
                    </p>
                </div>
            </div>

            <OrderStatusForm
                orderId={id}
                currentStatus={result.data.status}
            />
        </main>
    );
}