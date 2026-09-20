import { Footer } from "@/components/layout/Footer";
import { Navbar1 } from "@/components/layout/navbar1";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar1 />

      <main className="container mx-auto flex min-h-[55vh] flex-col justify-center px-4 py-16 md:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Freshly curated
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Thoughtful dining for every occasion.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Discover seasonal flavors, intimate tables, and a warm culinary experience designed around the moments that matter most.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
