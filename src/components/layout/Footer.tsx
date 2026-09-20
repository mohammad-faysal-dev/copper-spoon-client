import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "Reservations", href: "/reservations" },
      { label: "Chef's Table", href: "/chef-table" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "Facebook", href: "https://facebook.com", icon: MessageCircle },
];

const contactDetails = [
  { label: "hello@copperspoon.com", href: "mailto:hello@copperspoon.com", icon: Mail },
  { label: "+1 (415) 555-0147", href: "tel:+14155550147", icon: Phone },
  {
    label: "18 Market Street, San Francisco, CA",
    href: "https://maps.google.com/?q=18+Market+Street+San+Francisco+CA",
    icon: MapPin,
  },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border bg-muted/30", className)}>
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                C
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">Copper Spoon</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Kitchen & Co.
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Seasonal dishes, warm hospitality, and memorable evenings built around
              bold ingredients and thoughtful service.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
              Visit</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {contactDetails.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-start gap-3 transition-colors hover:text-primary"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a table
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Copper Spoon. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
