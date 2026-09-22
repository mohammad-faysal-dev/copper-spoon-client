import { Route } from "@/types/routes.type";
import { LayoutDashboard, Users } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
       {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
    ],
  },
];
