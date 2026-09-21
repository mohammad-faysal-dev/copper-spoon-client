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
     

      <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
              About Copper Spoon
            </span>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              We cook with soul, seasonality, and a little bit of magic.
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Copper Spoon is a neighborhood dining room built around honest ingredients,
              generous hospitality, and the joy of gathering around a beautifully prepared table.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a table
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Explore menu
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-2 bottom-10 h-32 w-32 rounded-full bg-amber-500/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/10 via-background to-amber-100/80 p-4 shadow-xl shadow-primary/5 dark:from-primary/10 dark:to-background">
              <div className="rounded-[1.5rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(255,255,255,0)_35%),linear-gradient(135deg,#1c1917_0%,#3b2f2a_35%,#d97706_100%)] p-6 text-white">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>House special</span>
                  <span>Tonight</span>
                </div>

                <div className="mt-12 space-y-5">
                  <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/80">
                    Seasonal menu
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight">Fire-roasted citrus salmon</h2>

                  <p className="max-w-sm text-sm leading-6 text-white/80">
                    Served with charred greens, herb butter, and a bright fennel finish inspired by the market stalls of early morning.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Chef's note</p>
                  <p className="mt-2 font-medium text-foreground">Local ingredients. Intentional flavor.</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Since</p>
                  <p className="mt-2 font-medium text-foreground">2013</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-border bg-muted/30 p-6"
            >
              <p className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-24 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
              Our story
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Built on community, curiosity, and a love for good food.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            {storySteps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
              What matters to us
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              The details that turn a meal into a memory.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[2rem] border border-border bg-muted/30 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
                The experience
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                From the first welcome to the final bite.
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Clock3,
                  title: "A pace that feels easy",
                  text: "We believe every evening should feel unhurried, generous, and beautifully paced.",
                },
                {
                  icon: UtensilsCrossed,
                  title: "A menu with personality",
                  text: "Each plate is designed to balance comfort, creativity, and ingredients that speak for themselves.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-border bg-background p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 pb-8 text-center">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-linear-to-r from-primary/10 to-amber-100/70 p-8 dark:from-primary/10 dark:to-background md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
              Join us
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Come for the food. Stay for the feeling.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Whether it’s a weeknight dinner or a meaningful celebration, we’re ready to welcome you with a table, a story, and a menu worth savoring.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Reserve your table
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
}
