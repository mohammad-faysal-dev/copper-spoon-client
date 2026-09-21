import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  HeartHandshake,
  Leaf,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";


const stats = [
  { value: "12", label: "years of crafting seasonal menus" },
  { value: "40+", label: "local farms and makers we partner with" },
  { value: "4.9/5", label: "average guest experience rating" },
];

const values = [
  {
    icon: Leaf,
    title: "Seasonal sourcing",
    description:
      "We build each menu around what is freshest, local, and most expressive in the moment.",
  },
  {
    icon: HeartHandshake,
    title: "Thoughtful hospitality",
    description:
      "Every interaction is designed to feel personal, warm, and genuinely memorable.",
  },
  {
    icon: Sparkles,
    title: "Crafted details",
    description:
      "From plating to pacing, we believe the smallest touches shape the whole experience.",
  },
];

const storySteps = [
  "We began with a simple idea: bring the comfort of a neighborhood kitchen to the center of the city.",
  "By partnering with nearby growers and artisans, we created a menu that evolves with the season and celebrates quality over excess.",
  "Today, Copper Spoon is a gathering place for celebrations, conversations, and slow evenings worth remembering.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000"
            alt="About Copper Spoon"
            className="h-full w-full object-cover transition-transform duration-1000 md:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 glassmorphism p-10 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
            <span className="inline-flex rounded-full border border-primary/40 bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
              Our Story
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
              We cook with soul & seasonality.
            </h1>
            <p className="max-w-2xl text-lg text-gray-200 md:text-xl font-light">
              Copper Spoon is a neighborhood dining room built around honest ingredients,
              generous hospitality, and the joy of gathering around a beautifully prepared table.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-transform hover:scale-105 shadow-xl hover:shadow-primary/25"
              >
                Book a table
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 md:px-6 lg:px-8">

        {/* Stats */}
        <section className="grid gap-6 md:grid-cols-3 -mt-10 relative z-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-10 shadow-lg text-center transform transition-transform hover:-translate-y-2 duration-300"
            >
              <p className="text-5xl font-bold tracking-tight text-primary mb-4">{stat.value}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* The Story */}
        <section className="mt-32 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Origins
            </span>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl leading-tight">
              Built on community, curiosity, and a love for good food.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-6">
              {storySteps.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative rounded-full overflow-hidden shadow-2xl border-8 border-background z-10">
              <img src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&q=80&w=800" alt="Chef cooking" className="object-cover w-full h-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] rounded-full z-0"></div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Our Core Values</h2>
            <p className="mt-4 text-xl text-muted-foreground">The details that turn a meal into a memory.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, idx) => (
              <div key={idx} className="group rounded-[2rem] border border-border bg-card p-10 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">{title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA inside About */}
        <section className="mt-32 pb-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-20 text-center shadow-2xl text-primary-foreground md:px-16">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1500')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.24em] mb-4">Join us</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
                Come for the food.<br />Stay for the feeling.
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Whether it’s a weeknight dinner or a meaningful celebration, we’re ready to welcome you with a table, a story, and a menu worth savoring.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/reservations"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-lg font-bold text-primary transition-transform hover:scale-105 shadow-xl"
                >
                  Reserve your table
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 bg-transparent px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
