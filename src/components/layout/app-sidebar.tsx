"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import {
  Utensils,
  LogOut,
  ChevronRight,
  Home,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
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
    email?: string;
  };
  children: React.ReactNode;
};

const ROLE_META: Record<string, { label: string; accent: string; glow: string }> = {
  admin: { label: "Admin Panel", accent: "#7c3aed", glow: "rgba(124,58,237,0.35)" },
  customer: { label: "Customer Panel", accent: "#059669", glow: "rgba(5,150,105,0.35)" },
  provider: { label: "Provider Panel", accent: "#b45309", glow: "rgba(180,83,9,0.35)" },
};

function getInitials(name?: string) {
  if (!name) return "CS";
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function AppSidebar({ user, children }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const routes =
    user.role === Roles.admin
      ? adminRoutes
      : user.role === Roles.customer
        ? customerRoute
        : user.role === Roles.provider
          ? providerRoutes
          : [];

  const role = ROLE_META[user.role] ?? ROLE_META.provider;

  return (
    <>
      <Sidebar
        variant="inset"
        className="border-r border-border/50 bg-sidebar shadow-xl"
      >
        {/* ── HEADER ── */}
        <SidebarHeader className="px-5 pt-6 pb-5 border-b border-border/50">
          {/* Brand Row */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
                boxShadow: "0 4px 14px rgba(184,115,51,0.4)",
              }}
            >
              <Utensils className="h-5 w-5 text-amber-100" />
            </div>
            <div>
              <p className="text-[15px] font-black tracking-tight text-foreground leading-none">
                Copper Spoon
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="h-2.5 w-2.5 text-amber-500/70" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  Kitchen &amp; Co.
                </span>
              </div>
            </div>
          </div>

          {/* User card */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/50 border border-border/60 px-3.5 py-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-black text-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${role.accent} 0%, ${role.accent}cc 100%)`,
                boxShadow: `0 3px 10px ${role.glow}`,
              }}
            >
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">
                {user.name ?? "Welcome"}
              </p>
              <span
                className="text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-full mt-0.5 inline-block"
                style={{
                  background: `${role.accent}18`,
                  color: role.accent,
                  border: `1px solid ${role.accent}30`,
                }}
              >
                {role.label}
              </span>
            </div>
          </div>
        </SidebarHeader>

        {/* ── NAV ── */}
        <SidebarContent className="px-3 py-5">
          {routes.map((route) => (
            <SidebarGroup key={route.title} className="mb-3">
              {/* Section label */}
              <div className="flex items-center gap-2 px-2 mb-2.5">
                <div className="h-px flex-1 bg-border/60" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 whitespace-nowrap">
                  {route.title}
                </span>
                <div className="h-px flex-1 bg-border/60" />
              </div>

              <SidebarMenu className="gap-0.5">
                {route.items.map((item) => {
                  const isDashboardHome =
                    item.url === "/dashboard" ||
                    item.url === "/admin-dashboard" ||
                    item.url === "/provider-dashboard";
                  const isActive =
                    pathname === item.url ||
                    (!isDashboardHome && pathname?.startsWith(item.url + "/"));

                  return (
                    <SidebarMenuItem key={item.title}>

                      <Link
                        href={item.url}
                        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 overflow-hidden ${isActive
                          ? "text-foreground font-semibold bg-background border border-border shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent"
                          }`}
                      >
                        {/* Active left indicator */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                            style={{
                              background: `linear-gradient(180deg, ${role.accent}, ${role.accent}99)`,
                              boxShadow: `0 0 8px ${role.glow}`,
                            }}
                          />
                        )}

                        {/* Hover shimmer */}
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent rounded-xl pointer-events-none" />

                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${isActive
                            ? "text-white scale-105"
                            : "bg-muted/70 text-muted-foreground group-hover:scale-105 group-hover:text-foreground"
                            }`}
                          style={
                            isActive
                              ? {
                                background: `linear-gradient(135deg, ${role.accent} 0%, ${role.accent}cc 100%)`,
                                boxShadow: `0 3px 10px ${role.glow}`,
                              }
                              : {}
                          }
                        >
                          <item.icon className="h-4 w-4" />
                        </div>

                        {/* Label */}
                        <span className="relative z-10 flex-1 text-[13.5px] tracking-tight">
                          {item.title}
                        </span>

                        {/* Chevron */}
                        <ChevronRight
                          className={`relative z-10 h-3.5 w-3.5 transition-all duration-300 ${isActive
                            ? "opacity-60 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-30 group-hover:translate-x-0"
                            }`}
                        />
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* ── FOOTER ── */}
        <SidebarFooter className="px-4 pt-3 pb-6 border-t border-border/50">
          <SidebarMenu className="gap-2 mt-2">
            <SidebarMenuItem>
              <Link
                href="/"
                className="group flex w-full items-center justify-center gap-2 rounded-xl h-10 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:border-border hover:bg-muted/50 transition-all duration-300"
              >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuItem>

            {/* Logout */}
            <SidebarMenuItem>
              <button onClick={handleLogout} className="group flex w-full items-center justify-center gap-2 rounded-xl h-10 text-sm font-medium text-destructive/70 hover:text-destructive-foreground border border-destructive/15 hover:border-destructive/40 hover:bg-destructive transition-all duration-300 hover:shadow-lg hover:shadow-destructive/20">
                <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Log out</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>

          <p className="mt-4 text-center text-[9px] uppercase tracking-widest text-muted-foreground/30 font-medium">
            © 2025 Copper Spoon
          </p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
