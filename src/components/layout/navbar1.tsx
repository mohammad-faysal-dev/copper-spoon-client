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
    src: string;
    alt: string;
    title: string;
    className?: string;
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
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "Logo",
    title: "Copper Spoon",
  },

  menu = [
    { title: "Home", url: "/" },
    { title: "Menu", url: "/menu" },
    { title: "About", url: "/about" },
    { title: "Reservations", url: "/reservations" },
    { title: "Contact", url: "/contact" },
    { title: "provider", url: "/providers" },
    { title: "Dashboard", url: "/dashboard" },
  ],

  auth = {
    login: {
      title: "Login",
      url: "/login",
    },
    signup: {
      title: "Sign up",
      url: "/signup",
    },
  },

  className,
}: Navbar1Props) => {
  return (
    <header className={cn("sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl", className)}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <nav className="hidden items-center justify-between py-4 lg:flex">
          <div className="flex items-center gap-10">
            <a href={logo.url} className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-200 group-hover:scale-105">
                C
              </div>

              <div className="leading-none">
                <span className="block text-lg font-semibold tracking-tight text-foreground">
                  {logo.title}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Kitchen & Co.
                </span>
              </div>
            </a>

            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.url}
                      className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground"
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

            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border bg-background px-4 text-sm font-medium shadow-sm"
              render={<a href={auth.login.url} />}
              nativeButton={false}
            >
              {auth.login.title}
            </Button>

            <Button
              size="sm"
              className="rounded-full px-4 text-sm font-medium shadow-sm shadow-primary/20"
              render={<a href={auth.signup.url} />}
              nativeButton={false}
            >
              {auth.signup.title}
            </Button>
          </div>
        </nav>

        <div className="block py-3 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <a href={logo.url} className="group flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20">
                C
              </div>

              <div className="leading-none">
                <span className="block text-base font-semibold tracking-tight text-foreground">
                  {logo.title}
                </span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  Kitchen & Co.
                </span>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <ModeToggle />

              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="icon" className="rounded-full" />}>
                  <Menu className="size-4" />
                </SheetTrigger>

                <SheetContent side="right" className="overflow-y-auto">
                  <SheetHeader className="mb-4">
                    <SheetTitle>
                      <a href={logo.url} className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                          C
                        </div>

                        <div className="leading-none">
                          <span className="block text-base font-semibold tracking-tight text-foreground">
                            {logo.title}
                          </span>
                          <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                            Kitchen & Co.
                          </span>
                        </div>
                      </a>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-1">
                    <nav className="flex flex-col gap-2">
                      {menu.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          className="rounded-xl px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>

                    <div className="flex flex-col gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        render={<a href={auth.login.url} />}
                        nativeButton={false}
                      >
                        {auth.login.title}
                      </Button>

                      <Button
                        className="rounded-full"
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
