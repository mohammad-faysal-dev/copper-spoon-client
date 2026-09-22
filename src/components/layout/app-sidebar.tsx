"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Roles } from "@/constant/roles";
import { adminRoutes } from "@/routes/admin.route";
import { customerRoute } from "@/routes/customer.route";
import { providerRoutes } from "@/routes/provider.route";

type AppSidebarProps = {
  user: {
    role: string;
  };
};

export function AppSidebar({ user }: AppSidebarProps) {
  const routes =
    user.role === Roles.admin
      ? adminRoutes
      : user.role === Roles.customer
        ? customerRoute
        : user.role === Roles.provider
          ? providerRoutes
          : [];

  return (
    <Sidebar>
      <SidebarContent>
        {routes.map((route) => (
          <SidebarGroup key={route.title}>
            <h3 className="px-2 py-2 text-sm font-semibold">{route.title}</h3>

            <SidebarMenu>
              {route.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Link className="flex items-center gap-2" href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
