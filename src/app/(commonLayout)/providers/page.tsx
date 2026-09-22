import Link from "next/link";
import { ArrowRight, ChefHat, MapPin, Phone, Sparkles, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { providerService } from "@/services/provider.service";

const providerPage = async () => {
  const { data, error } = await providerService.getProviders();
  const providers = Array.isArray(data)
    ? data
    : Array.isArray(data?.providers)
      ? data.providers
      : [];

  if (error || providers.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 text-foreground">
        <main className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-xl rounded-[2.5rem] border border-dashed border-border bg-muted/20 p-12 text-center">
            <ChefHat className="mx-auto mb-6 size-14 text-muted-foreground/50" />
            <h2 className="mb-3 text-2xl font-bold">Providers are updating</h2>
            <p className="text-muted-foreground">
              We are currently refreshing our trusted partner network. Please check back soon.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant partners"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2.5rem] border border-white/10 bg-black/35 p-10 shadow-2xl backdrop-blur-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted kitchens
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Meet our culinary partners.
            </h1>
            <p className="max-w-2xl text-lg text-gray-200 font-light">
              Discover the kitchens and chefs behind Copper Spoon’s signature dishes and unforgettable dining experiences.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 md:px-6 lg:px-8">
        <section className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Partners</p>
            <p className="mt-6 text-4xl font-bold text-foreground">{providers.length}+</p>
          </div>
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Specialties</p>
            <p className="mt-6 text-4xl font-bold text-foreground">12</p>
          </div>
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Guest rating</p>
            <p className="mt-6 text-4xl font-bold text-foreground">4.9</p>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {providers.map((provider: any, index: number) => {
            const providerName = provider.restaurantName || provider.name || `Partner Kitchen ${index + 1}`;
            const providerAddress = provider.address || provider.location || provider.city || "Serving fresh flavors daily";
            const providerPhone = provider.phone || provider.contactPhone || null;
            const providerEmail = provider.email || provider.contactEmail || null;
            const providerImage =
              provider.image ||
              provider.bannerImage ||
              provider.coverImage ||
              "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200";
            const providerCuisine = provider.specialty || provider.cuisine || provider.category || "Chef's Selection";
            const providerRating = provider.rating ?? "4.9";

            return (
              <article
                key={provider.id || providerName + index}
                className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={providerImage}
                    alt={providerName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Badge className="border-none bg-background/90 text-foreground shadow-sm backdrop-blur-sm">
                      {provider.isVerified ? "Verified" : "Partner"}
                    </Badge>
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {providerRating}
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {providerCuisine}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-foreground">{providerName}</h2>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ChefHat className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{providerAddress}</span>
                    </div>

                    {providerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        <span>{providerPhone}</span>
                      </div>
                    )}
                  </div>

                  {provider.description && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {provider.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{provider.isOpen !== undefined ? (provider.isOpen ? "Open now" : "Closed") : "Available"}</span>
                    </div>

                    <Link
                      href="/menu"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                    >
                      Explore menu
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default providerPage;