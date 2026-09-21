import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Send
} from "lucide-react";

import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Menu", href: "/menu" },
      { label: "Reservations", href: "/reservations" },
      { label: "Chef's Table", href: "/chef-table" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Copper Spoon", href: "/about" },
      { label: "Culinary Journal", href: "/journal" },
      { label: "Our Suppliers", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "Facebook", href: "https://facebook.com", icon: MessageCircle },
  { label: "Twitter", href: "https://twitter.com", icon: Share2 },
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
    <footer className={cn("relative bg-background text-foreground overflow-hidden pt-20 pb-10 border-t-4 border-primary", className)}>
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-[0.03] dark:opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, var(--primary) 0%, transparent 70%)" }}>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 mb-16 border-b border-border">
          <div className="max-w-xl text-center md:text-left space-y-3">
            <h2 className="text-3xl font-bold text-foreground font-display">Join our inner circle</h2>
            <p className="text-muted-foreground">Subscribe for early access to seasonal menus, special events, and chef's secrets.</p>
          </div>
          <div className="w-full md:w-auto relative flex items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full md:w-[350px] bg-card border border-border text-foreground rounded-full px-6 py-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
            />
            <button className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform shadow-md">
              <Send className="w-5 h-5 ml-1 mt-1 pr-1 pb-1" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-primary-foreground shadow-lg">
                  C
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">Copper Spoon</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Kitchen & Co.
                  </p>
                </div>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Seasonal dishes, warm hospitality, and memorable evenings built around
              bold ingredients and thoughtful service.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 border border-transparent shadow-sm hover:shadow-md"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Contact & Visit
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {contactDetails.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-start gap-3 transition-colors hover:text-primary group"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/reservations"
                className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-muted border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
              >
                Book Your Table
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 flex text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Copper Spoon. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
