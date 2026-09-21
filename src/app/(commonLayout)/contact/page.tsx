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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">

        {/* Split Section */}
        <section className="relative overflow-hidden rounded-[3rem] border border-border bg-card shadow-2xl">
          <div className="grid lg:grid-cols-2">

            {/* Left Column: Form & Info */}
            <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center">
              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-4 w-4" />
                Get in touch
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-6">
                Let's plan your next evening.
              </h1>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                From intimate dinners to celebrations with friends and family, our team is ready to help you shape an unforgettable experience.
              </p>

              {/* Form elements */}
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">Name</label>
                    <Input id="name" type="text" placeholder="Your name" className="h-14 rounded-2xl bg-muted border-transparent focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
                    <Input id="email" type="email" placeholder="you@example.com" className="h-14 rounded-2xl bg-muted border-transparent focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">Inquiry Type</label>
                  <Input id="subject" type="text" placeholder="Reservation, event, menu question" className="h-14 rounded-2xl bg-muted border-transparent focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what you’re planning..."
                    className="w-full rounded-2xl bg-muted border-transparent px-4 py-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary shadow-sm resize-none"
                  />
                </div>

                <Button className="w-full h-14 rounded-2xl text-base font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform shadow-lg">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Right Column: Image and Details */}
            <div className="relative hidden lg:block overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1600"
                alt="Restaurant Ambience"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-14 text-white">
                <div className="p-8 rounded-[2rem] bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
                  <div className="space-y-6">
                    {quickInfo.map(({ icon: Icon, label, value, href }) => (
                      <a key={label} href={href} className="flex items-center gap-4 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.1em] text-gray-400">{label}</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Hours section */}
        <section className="mt-16 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2.5rem] bg-muted/40 p-10 border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold">Hours of Operation</h3>
              </div>
              <div className="space-y-4">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center pb-4 border-b border-border last:border-0">
                    <span className="text-muted-foreground font-medium">{day}</span>
                    <span className="text-foreground font-bold">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-card p-10 border border-border flex flex-col justify-center text-center items-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Planning a private event?</h3>
              <p className="text-muted-foreground mb-8 max-w-sm relative z-10">
                For groups larger than 8, or fully private events, please consult our events team.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-105 shadow-xl relative z-10"
              >
                Inquire for Events
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
