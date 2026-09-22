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



type AppSidebarProps = {
  user: {
    role: string;
  };
};

export function AppSidebar({ user }: AppSidebarProps) {
  const routes = user.role === "admin" ? adminRoutes : userRoutes;

  return (
    <Sidebar>
      <SidebarContent>
        {routes.map((route) => (
          <SidebarGroup key={route.title}>
            <h3 className="px-2 py-2 text-sm font-semibold">
              {route.title}
            </h3>

            <SidebarMenu>
              {route.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton >
                    <Link href={item.url}>
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