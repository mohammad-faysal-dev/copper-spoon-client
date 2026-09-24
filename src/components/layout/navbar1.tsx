"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
}

interface Navbar1Props {
  className?: string;

  logo?: {
    url: string;
    title: string;
  };

  menu?: MenuItem[];

  auth?: {
    login: {
      title: string;
      url: string;
    };

    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    title: "Copper Spoon",
  },

  menu = [
    { title: "Home", url: "/" },
    { title: "Menu", url: "/menu" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Provider", url: "/providers" },
    { title: "Dashboard", url: "/dashboard" },
  ],

  auth = {
    login: {
      title: "Login",
      url: "/login",
    },

    signup: {
      title: "Sign Up",
      url: "/signup",
    },
  },

  className,
}: Navbar1Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Check current session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/auth/get-session`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) {
          setIsLoggedIn(false);
          return;
        }

        const result = await res.json();

        const user =
          result?.user ??
          result?.data?.user ??
          null;

        setIsLoggedIn(Boolean(user));
      } catch (error) {
        console.error("Session check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [API_URL]);

  // Logout
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const res = await fetch(
        `${API_URL}/api/auth/sign-out`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      setIsLoggedIn(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-2 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-border/40 bg-background/60 shadow-lg shadow-black/5 backdrop-blur-xl transition-all sm:top-4 sm:rounded-full dark:shadow-black/20",
        className,
      )}
    >
      <div className="px-4 md:px-6 lg:px-8">

        {/* ================= Desktop Nav ================= */}
        <nav className="hidden items-center justify-between py-3 lg:flex">

          {/* Logo + Navigation */}
          <div className="flex items-center gap-8 xl:gap-12">

            {/* Logo */}
            <a
              href={logo.url}
              className="group flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                C
              </div>

              <div className="flex flex-col justify-center leading-none">
                <span className="block text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {logo.title}
                </span>

                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Kitchen & Co.
                </span>
              </div>
            </a>

            {/* Navigation */}
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.url}
                      className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary data-active:bg-primary/10 data-active:text-primary"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <ModeToggle />

            <div className="mx-1 h-6 w-[1px] bg-border/60" />

            {/* Authentication */}
            {checkingSession ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
            ) : isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-full px-5 text-sm font-bold transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <LogOut className="mr-2 size-4" />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </Button>
            ) : (
              <>
                {/* Login */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-5 text-sm font-bold transition-colors hover:bg-primary/10 hover:text-primary"
                  render={<a href={auth.login.url} />}
                  nativeButton={false}
                >
                  {auth.login.title}
                </Button>

                {/* Sign Up */}
                <Button
                  size="sm"
                  className="rounded-full px-6 text-sm font-bold shadow-md transition-transform hover:scale-105"
                  render={<a href={auth.signup.url} />}
                  nativeButton={false}
                >
                  {auth.signup.title}
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ================= Mobile Nav ================= */}
        <div className="block py-3 lg:hidden">
          <div className="flex items-center justify-between gap-3">

            {/* Mobile Logo */}
            <a
              href={logo.url}
              className="group flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
                C
              </div>

              <div className="leading-none">
                <span className="block text-base font-bold tracking-tight text-foreground">
                  {logo.title}
                </span>

                <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Kitchen & Co.
                </span>
              </div>
            </a>

            {/* Mobile Right */}
            <div className="flex items-center gap-2">

              <ModeToggle />

              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                    />
                  }
                >
                  <Menu className="size-5" />
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[85vw] max-w-sm rounded-l-3xl border-border/50 bg-background/95 p-6 backdrop-blur-xl"
                >
                  {/* Sheet Header */}
                  <SheetHeader className="mb-8 items-start">
                    <SheetTitle>
                      <a
                        href={logo.url}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                          C
                        </div>

                        <div className="text-left leading-none">
                          <span className="block text-lg font-bold tracking-tight text-foreground">
                            {logo.title}
                          </span>

                          <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Kitchen & Co.
                          </span>
                        </div>
                      </a>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-8">

                    {/* Mobile Menu */}
                    <nav className="flex flex-col gap-3">
                      {menu.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          className="rounded-2xl px-4 py-3 text-lg font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>

                    {/* Mobile Authentication */}
                    <div className="flex flex-col gap-3 border-t border-border/50 pt-8">

                      {checkingSession ? (
                        <div className="h-12 w-full animate-pulse rounded-2xl bg-muted" />
                      ) : isLoggedIn ? (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleLogout}
                          disabled={loggingOut}
                          className="w-full rounded-2xl border-border font-bold shadow-sm"
                        >
                          <LogOut className="mr-2 size-4" />

                          {loggingOut
                            ? "Logging out..."
                            : "Logout"}
                        </Button>
                      ) : (
                        <>
                          {/* Mobile Login */}
                          <Button
                            variant="outline"
                            size="lg"
                            className="rounded-2xl border-border font-bold shadow-sm"
                            render={
                              <a href={auth.login.url} />
                            }
                            nativeButton={false}
                          >
                            {auth.login.title}
                          </Button>

                          {/* Mobile Sign Up */}
                          <Button
                            size="lg"
                            className="rounded-2xl font-bold shadow-md"
                            render={
                              <a href={auth.signup.url} />
                            }
                            nativeButton={false}
                          >
                            {auth.signup.title}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar1 };