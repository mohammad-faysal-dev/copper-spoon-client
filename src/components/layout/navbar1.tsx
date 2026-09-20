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
    title: "Shadcnblocks.com",
  },

  menu = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" },
    { title: "Resources", url: "/resources" },
    { title: "Pricing", url: "/pricing" },
    { title: "Blog", url: "/blog" },
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
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        {/* ================= Desktop Navbar ================= */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo + Menu */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={32}
                height={32}
                className={cn("max-h-8 w-auto dark:invert", logo.className)}
                alt={logo.alt}
              />

              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>

            {/* Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.url}
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <Button
              variant="outline"
              size="sm"
              render={<a href={auth.login.url} />}
              nativeButton={false}
            >
              {auth.login.title}
            </Button>

            <Button
              size="sm"
              render={<a href={auth.signup.url} />}
              nativeButton={false}
            >
              {auth.signup.title}
            </Button>
          </div>
        </nav>

        {/* ================= Mobile Navbar ================= */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={32}
                height={32}
                className={cn("max-h-8 w-auto dark:invert", logo.className)}
                alt={logo.alt}
              />

              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" />}>
                <Menu className="size-4" />
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        width={32}
                        height={32}
                        className={cn(
                          "max-h-8 w-auto dark:invert",
                          logo.className,
                        )}
                        alt={logo.alt}
                      />

                      <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  {/* Mobile Menu */}
                  <nav className="flex flex-col gap-4">
                    {menu.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        className="text-md font-semibold transition-colors hover:text-primary"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-3">
                    <ModeToggle />

                    <Button
                      variant="outline"
                      render={<a href={auth.login.url} />}
                      nativeButton={false}
                    >
                      {auth.login.title}
                    </Button>

                    <Button
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
    </section>
  );
};

export { Navbar1 };
