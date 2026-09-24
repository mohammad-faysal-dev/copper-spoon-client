import { cookies } from "next/headers";
import { orderService } from "@/services/order.service";
import CustomerDashboardClient from "./CustomerDashboardClient";
import { userService } from "@/services/user.service";

export default async function CustomerDashboardPage() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const [sessionRes, ordersRes] = await Promise.all([
    userService.getSession(),
    orderService.getMyOrders(cookieString),
  ]);

  const user = sessionRes?.data?.user;
  const orders = ordersRes?.data || [];

  return <CustomerDashboardClient user={user} orders={orders} />;
}
