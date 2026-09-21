import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { menuService } from "@/services/menu.service";
import { ChefHat, MapPin, ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Ensure dynamic if needed

const MenuPage = async () => {
  const { data, error } = await menuService.getMenus();

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-12 text-center max-w-lg mx-auto backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-destructive mb-2">Failed to load menu</h2>
            <p className="text-muted-foreground">
              Please try again later. Our chefs are working on it!
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
            alt="Our Menu"
            className="h-full w-full object-cover transition-transform duration-1000 transform md:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 glassmorphism p-10 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Culinary Excellence
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-md">
              A curated experience.
            </h1>
            <p className="max-w-xl text-lg text-gray-300 font-light">
              Explore exquisite dishes crafted by our expert culinary team, bringing together seasonal ingredients and unforgettable flavors.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <main className="container mx-auto px-4 py-20 lg:px-8">

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="rounded-[2.5rem] border border-dashed border-border p-16 text-center max-w-2xl mx-auto bg-muted/20">
            <ChefHat className="mx-auto size-14 text-muted-foreground mb-6 opacity-50" />
            <h2 className="text-2xl font-bold mb-3">Menu is updating</h2>
            <p className="text-lg text-muted-foreground">
              We are currently refining our menu. Please check back shortly for our new seasonal offerings.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((meal: any) => (
              <div
                key={meal.id}
                className="group relative flex flex-col rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                  {/* Availability */}
                  <div className="absolute left-4 top-4">
                    {meal.isAvailable ? (
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none shadow-sm hover:bg-primary">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="backdrop-blur-md opacity-90 shadow-sm border-none">
                        Sold Out
                      </Badge>
                    )}
                  </div>

                  {/* Dietary */}
                  {meal.dietary && (
                    <div className="absolute right-4 top-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-border shadow-sm">
                        {meal.dietary}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-border">
                    <span className="text-lg font-bold text-foreground">৳{meal.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2">
                    <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {meal.name}
                    </h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {meal.cuisine} Cuisine
                    </p>
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground mb-6 flex-1">
                    {meal.description}
                  </p>

                  {/* Provider Info */}
                  <div className="mb-6 rounded-2xl bg-muted/50 p-4 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ChefHat className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">
                          {meal.provider?.restaurantName || "Copper Spoon Kitchen"}
                        </p>
                        {meal.provider?.address && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{meal.provider.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  {meal.category?.name && (
                    <div className="mb-6 flex items-center justify-between text-xs font-medium border-t border-border pt-4">
                      <span className="text-muted-foreground">Category</span>
                      <span className="text-foreground">{meal.category.name}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Link
                      href={`/menu/${meal.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex-1 h-12 rounded-xl border-border bg-transparent hover:bg-muted font-semibold transition-colors",
                        !meal.isAvailable && "pointer-events-none opacity-50"
                      )}
                    >
                      Details
                    </Link>
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-md"
                      disabled={!meal.isAvailable}
                      aria-label={`Add ${meal.name} to cart`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default MenuPage;