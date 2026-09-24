import { Route } from "@/types/routes.type";
import { Home, ShoppingCart, User, CreditCard } from "lucide-react";

export const customerRoute: Route[] = [
  {
    title: "Customer Management",
    items: [
      {
        title: "Home",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
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