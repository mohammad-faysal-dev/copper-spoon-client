import Link from "next/link";
import { ArrowRight, Utensils, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Interior"
            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 glassmorphism p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl animate-fade-in-up">
            <span className="inline-flex rounded-full border border-primary/40 bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-sm backdrop-blur-sm">
              An Exquisite Culinary Journey
            </span>

            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-lg">
              Copper Spoon.
            </h1>

            <p className="max-w-2xl text-lg text-gray-200 md:text-xl md:leading-relaxed font-light drop-shadow-md">
              Thoughtful dining for every occasion. Discover seasonal flavors, intimate tables, and a warm culinary experience designed around the moments that matter most.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                Book a Table
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 transition-all duration-300 bg-black/20 backdrop-blur-sm">
                View Menu
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>

      {/* Features/Stats Section */}
      <section className="relative z-20 -mt-16 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Utensils, title: "Seasonal Menus", desc: "Crafted with local, fresh ingredients that change with the seasons." },
            { icon: Star, title: "Award Winning", desc: "Recognized by culinary experts for outstanding flavors and service." },
            { icon: Clock, title: "Perfect Timing", desc: "Experiencing seamless service designed for your comfort and enjoyment." },
          ].map((feature, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition-transform group-hover:scale-110 duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Where taste meets elegance</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Copper Spoon, we believe that dining is not just about food, but the entire experience. Our chefs meticulously design each plate to tell a story, bringing together traditional techniques and modern innovation.
            </p>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Visit Us</h4>
                <p className="text-muted-foreground">123 Culinary Boulevard<br />Gastronomy District, Food City</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000"
                alt="Chef preparing food"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full border-4 border-primary/20 blur-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
