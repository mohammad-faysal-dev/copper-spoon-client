"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
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
  SidebarInset,
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
      <Sidebar variant="inset" className="border-r border-border/40 shadow-xl bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <SidebarHeader className="border-b border-border/40 py-6 px-5 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-primary/20 blur-2xl opacity-70"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-primary/20 transition-transform duration-300 hover:scale-105">
              <Utensils className="size-5" />
            </div>
            <div className="flex flex-col gap-1 leading-none">
              <span className="font-bold text-[1.15rem] text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Copper Spoon
              </span>
              <span className="text-[0.7rem] font-medium text-muted-foreground uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit">
                {user.role} Panel
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-6 space-y-6">
          {routes.map((route) => (
            <SidebarGroup key={route.title} className="px-1">
              <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-3 px-2 flex items-center gap-2">
                <span className="h-px bg-border flex-1 border-dashed"></span>
                {route.title}
                <span className="h-px bg-border flex-1 border-dashed"></span>
              </SidebarGroupLabel>

              <SidebarMenu className="gap-1.5">
                {route.items.map((item) => {
                  const isDashboardHome = item.url === '/dashboard' || item.url === '/admin-dashboard';
                  const isActive = pathname === item.url || (!isDashboardHome && pathname?.startsWith(item.url + '/'));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`group relative overflow-hidden rounded-xl transition-all duration-300 ease-out h-11 px-3 ${isActive
                          ? 'bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold shadow-sm ring-1 ring-primary/20'
                          : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground hover:pl-5'
                          }`}
                      >
                        {/* Active Indicator Bar */}
                        <div className={`absolute left-0 top-0 h-full w-1 rounded-r-md transition-all duration-300 bg-primary ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 text-transparent'}`}></div>

                        <Link className="flex w-full items-center gap-3 relative z-10" href={item.url}>
                          <div className={`flex items-center justify-center rounded-lg p-1.5 transition-colors duration-300 ${isActive ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30' : 'bg-muted/50 group-hover:bg-primary/20 group-hover:text-primary transition-transform duration-300 group-hover:scale-110'}`}>
                            <item.icon className="size-4" />
                          </div>
                          <span className="text-[14px] flex-1">{item.title}</span>

                          {/* Chevron for hover/active visual cues */}
                          <ChevronRight className={`size-4 opacity-0 -translate-x-2 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'group-hover:opacity-50 group-hover:translate-x-0'}`} />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t border-border/40 p-4 pb-6 mt-auto bg-gradient-to-t from-muted/30 to-transparent">
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-center h-11 rounded-xl bg-background border shadow-sm hover:shadow-md hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300 group">
                <Link href="/" className="flex w-full items-center justify-center gap-2">
                  <span className="group-hover:-translate-x-1 transition-transform duration-300 font-medium">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-center h-11 rounded-xl bg-destructive/5 text-destructive/80 hover:bg-destructive hover:text-destructive-foreground hover:shadow-lg hover:shadow-destructive/20 transition-all duration-300 group">
                <div className="flex items-center gap-2">
                  <LogOut className="size-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Log out</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </>
  );
}
