import AddToCartButton from "@/components/modules/add-to-cart-button";
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
                className="group flex flex-col rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  {meal.image ? (
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/30">
                      <ChefHat className="size-12" />
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {meal.isAvailable ? (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white border-none shadow-sm font-medium">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="border-none shadow-sm font-medium">
                        Sold Out
                      </Badge>
                    )}
                    {meal.dietary && (
                      <Badge variant="secondary" className="bg-background/95 text-foreground border border-border shadow-sm font-medium">
                        {meal.dietary}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {meal.name}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground font-medium truncate">
                        <span className="text-primary truncate">{meal.cuisine} Cuisine</span>
                        {meal.category?.name && (
                          <>
                            <span className="shrink-0">•</span>
                            <span className="truncate">{meal.category.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-xl font-bold text-foreground shrink-0">
                      ৳{meal.price}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                    {meal.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    {/* Provider Info */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ChefHat className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">
                          {meal.provider?.restaurantName || "Copper Spoon Kitchen"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-5">
                    <Link
                      href={`/menu/${meal.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex-1 h-10 rounded-xl border-border bg-background hover:bg-muted font-medium transition-colors text-sm",
                        !meal.isAvailable && "pointer-events-none opacity-50"
                      )}
                    >
                      View Details
                    </Link>
                   <AddToCartButton meal={meal} />
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