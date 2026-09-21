"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
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
  return (
    <header
      className={cn(
        "sticky top-2 sm:top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl sm:rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all",
        className
      )}
    >
      <div className="px-4 md:px-6 lg:px-8">
        {/* Desktop Nav */}
        <nav className="hidden items-center justify-between py-3 lg:flex">
          <div className="flex items-center gap-8 xl:gap-12">
            <a href={logo.url} className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                C
              </div>

              <div className="leading-none flex flex-col justify-center">
                <span className="block text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {logo.title}
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Kitchen & Co.
                </span>
              </div>
            </a>

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

          <div className="flex items-center gap-3">
            <ModeToggle />

            <div className="h-6 w-[1px] bg-border/60 mx-1"></div>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-5 text-sm font-bold hover:text-primary hover:bg-primary/10 transition-colors"
              render={<a href={auth.login.url} />}
              nativeButton={false}
            >
              {auth.login.title}
            </Button>

            <Button
              size="sm"
              className="rounded-full px-6 text-sm font-bold shadow-md hover:scale-105 transition-transform"
              render={<a href={auth.signup.url} />}
              nativeButton={false}
            >
              {auth.signup.title}
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="block py-3 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <a href={logo.url} className="group flex items-center gap-3">
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

            <div className="flex items-center gap-2">
              <ModeToggle />

              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" />}>
                  <Menu className="size-5" />
                </SheetTrigger>

                <SheetContent side="right" className="w-[85vw] max-w-sm rounded-l-3xl border-border/50 bg-background/95 backdrop-blur-xl p-6">
                  <SheetHeader className="mb-8 items-start">
                    <SheetTitle>
                      <a href={logo.url} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                          C
                        </div>

                        <div className="leading-none text-left">
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

                    <div className="flex flex-col gap-3 border-t border-border/50 pt-8">
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-2xl border-border font-bold shadow-sm"
                        render={<a href={auth.login.url} />}
                        nativeButton={false}
                      >
                        {auth.login.title}
                      </Button>

                      <Button
                        size="lg"
                        className="rounded-2xl font-bold shadow-md"
                        render={<a href={auth.signup.url} />}
                        nativeButton={false}
                      >
                        {auth.signup.title}
                      </Button>
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
