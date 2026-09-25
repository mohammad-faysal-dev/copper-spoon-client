import { Route } from "@/types/routes.type";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  UserRound,
} from "lucide-react";

export const providerRoutes: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Dashboard",
        url: "/provider-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Menu",
        url: "/provider-dashboard/menu",
        icon: UtensilsCrossed,
      },
      {
        title: "Order",
        url: "/provider-dashboard/order",
        icon: ShoppingCart,
      },
      {
        title: "Profile",
        url: "/provider-dashboard/profile",
        icon: UserRound,
      },
    ],
  },
];