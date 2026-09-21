import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickInfo = [
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (415) 555-0147",
    href: "tel:+14155550147",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@copperspoon.com",
    href: "mailto:hello@copperspoon.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "18 Market Street, San Francisco",
    href: "https://maps.google.com/?q=18+Market+Street+San+Francisco+CA",
  },
];

const hours = [
  { day: "Monday - Thursday", time: "5:00 PM - 10:30 PM" },
  { day: "Friday", time: "5:00 PM - 11:30 PM" },
  { day: "Saturday", time: "12:00 PM - 11:30 PM" },
  { day: "Sunday", time: "11:00 AM - 9:30 PM" },
];

const inquiryTypes = [
  {
    title: "Reservations",
    text: "Book a table for date nights, family dinners, and special gatherings.",
    href: "/reservations",
  },
  {
    title: "Private dining",
    text: "Plan a tasting menu, birthday celebration, or intimate event with our team.",
    href: "/events",
  },
  {
    title: "General questions",
    text: "Ask about ingredients, dietary needs, menu updates, and more.",
    href: "mailto:hello@copperspoon.com",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
   

      <main className="container mx-auto px-4 py-10 md:px-6 lg:px-8 lg:py-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.15),transparent_35%),linear-gradient(135deg,rgba(17,17,17,0.98),rgba(28,25,23,0.96),rgba(120,53,15,0.9))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] md:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.04)_40%,transparent_100%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-amber-200">
                <Sparkles className="h-3.5 w-3.5" />
                Contact us
              </span>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                  Let’s plan your next memorable evening.
                </h1>
                <p className="max-w-xl text-base leading-8 text-stone-300 md:text-lg">
                  From intimate dinners to celebrations with friends and family, our team is ready to help you shape a dining experience that feels warm, seamless, and unforgettable.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/reservations"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-medium text-stone-950 transition-all hover:bg-amber-400"
                >
                  Book a table
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+14155550147"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Call now
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-amber-500/30 blur-3xl" />
              <div className="absolute -right-4 bottom-4 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm">
                <div className="rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_35%),linear-gradient(135deg,#1c1917_0%,#3b2f2a_35%,#d97706_100%)] p-5 text-white">
                  <div className="flex items-center justify-between gap-4 text-sm text-stone-200">
                    <span>Kitchen open</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>

                  <div className="mt-10 space-y-5">
                    <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-stone-200">
                      Signature dining
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      Fire-roasted seasonal plates.
                    </h2>
                    <p className="max-w-sm text-sm leading-7 text-stone-200/90">
                      Thoughtful ingredients, a warm room, and a menu that changes with the season.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {quickInfo.map(({ icon: Icon, label, value, href }) => (
                    <Link
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-2xl border border-white/10 bg-black/10 p-3 text-left text-white transition-colors hover:border-amber-400/40 hover:bg-white/5"
                    >
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300">{label}</p>
                      <p className="mt-1 text-sm font-medium text-white">{value}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Reservations",
              text: "For intimate dinners and celebrations, call or message us for availability.",
            },
            {
              title: "Private events",
              text: "Curated tasting menus and private dining experiences for special occasions.",
            },
            {
              title: "Pre-arrival notes",
              text: "Share dietary preferences, allergies, or celebration details before your visit.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.title}</p>
              <p className="mt-3 text-base leading-7 text-foreground">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Send a note</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tell us what you’re planning</h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full name
                </label>
                <Input id="name" type="text" placeholder="Your name" className="h-12 rounded-xl border-border/80 bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-12 rounded-xl border-border/80 bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone number
                </label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="h-12 rounded-xl border-border/80 bg-background" />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Inquiry type
                </label>
                <Input id="subject" type="text" placeholder="Reservation, event, menu" className="h-12 rounded-xl border-border/80 bg-background" />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell us what you’re planning, any dietary notes, or a question you’d like answered."
                className="w-full rounded-2xl border border-border/80 bg-background px-3.5 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-amber-500/60 focus:ring-3 focus:ring-amber-500/10 md:text-sm"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">We usually reply within 1 business day.</p>
              <Button className="rounded-full px-5">
                Send message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-muted/30 p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Visit us</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">A warm room for every occasion.</h3>

              <div className="mt-6 space-y-4">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{day}</span>
                    <span className="text-sm font-medium text-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-linear-to-br from-amber-50 to-background p-6 shadow-sm dark:from-amber-950/30 dark:to-background">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="h-4 w-4" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Reservations</p>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Reserve early for peak evenings.</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                For Friday and Saturday service, we recommend booking at least 48 hours in advance to secure your preferred table.
              </p>

              <Link
                href="/reservations"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Reserve a table
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 pb-4">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-primary">Quick answers</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Everything you need before your visit.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {inquiryTypes.map(({ title, text, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-[1.75rem] border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
              >
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
