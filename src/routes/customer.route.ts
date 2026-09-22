import { Route } from "@/types/routes.type";
import { Home, ShoppingCart, User } from "lucide-react";

export const customerRoute: Route[] = [
  {
    title: "Customer Management",
    items: [
        {
        title: "Home",
        url: "/",
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
    ],
  },
];
