"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, LogOut, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
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
    name?: string;
  };
  children: React.ReactNode;
};

export function AppSidebar({ user, children }: AppSidebarProps) {
  const pathname = usePathname();

  const routes =
    user.role === Roles.admin
      ? adminRoutes
      : user.role === Roles.customer
        ? customerRoute
        : user.role === Roles.provider
          ? providerRoutes
          : [];

  return (
    <>
      <Sidebar variant="inset" className="border-r shadow-sm">
        <SidebarHeader className="border-b py-4 px-4 bg-sidebar-accent/30">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
              <Utensils className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold text-lg text-foreground tracking-tight">Copper Spoon</span>
              <span className="text-xs text-muted-foreground capitalize">{user.role} Panel</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          {routes.map((route) => (
            <SidebarGroup key={route.title} className="mb-4">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
                {route.title}
              </SidebarGroupLabel>

              <SidebarMenu>
                {route.items.map((item) => {
                  const isActive = pathname === item.url || pathname?.startsWith(item.url + '/');
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`transition-all duration-200 ease-in-out hover:pl-4 hover:bg-primary/10 hover:text-primary ${isActive ? 'bg-primary/15 text-primary font-medium' : 'text-muted-foreground'}`}
                      >
                        <Link className="flex w-full items-center gap-3" href={item.url}>
                          <item.icon className="size-[18px]" />
                          <span className="text-[15px]">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t p-4 mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start h-10 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {children}
    </>
  );
}
