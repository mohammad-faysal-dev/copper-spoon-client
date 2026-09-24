import { Route } from "@/types/routes.type";
import { Home, ShoppingCart, User, CreditCard, ShoppingBag } from "lucide-react";

export const customerRoute: Route[] = [
  {
    title: "Customer Management",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Order",
        url: "/dashboard/order",
        icon: ShoppingBag,
      },
      {
        title: "Cart",
        url: "/dashboard/cart",
        icon: ShoppingCart,
      },
      {
        title: "Checkout",
        url: "/dashboard/checkout",
        icon: CreditCard,
      },
    ],
  },
];