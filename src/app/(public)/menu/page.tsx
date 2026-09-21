import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { menuService } from "@/services/menu.service";
import { ChefHat, MapPin, ShoppingCart } from "lucide-react";

const MenuPage = async () => {
  const { data, error } = await menuService.getMenus();

  if (error || !data) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <h2 className="text-xl font-semibold">Failed to load menu</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 md:py-14">
      {/* Header */}
      <section className="mb-10 text-center">
        <Badge variant="secondary" className="mb-3">
          <ChefHat className="mr-1 size-4" />
          Our Menu
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Discover Delicious Meals
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Explore delicious meals from our trusted food providers and order
          your favorite food.
        </p>
      </section>

      {/* Menu Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((meal) => (
          <Card
            key={meal.id}
            className="group overflow-hidden transition-shadow hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={meal.image}
                alt={meal.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Availability */}
              <div className="absolute left-3 top-3">
                {meal.isAvailable ? (
                  <Badge className="bg-green-600 text-white hover:bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </div>

              {/* Dietary */}
              <div className="absolute right-3 top-3">
                <Badge variant="secondary">{meal.dietary}</Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {meal.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {meal.cuisine} Cuisine
                  </p>
                </div>

                <span className="shrink-0 text-lg font-bold">
                  ৳{meal.price}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {meal.description}
              </p>

              {/* Provider */}
              <div className="flex items-center gap-2 border-t pt-3 text-sm">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <ChefHat className="size-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    {meal.provider?.restaurantName}
                  </p>

                  {meal.provider?.address && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <span className="truncate">
                        {meal.provider.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Category</span>
                <Badge variant="outline">{meal.category?.name}</Badge>
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={!meal.isAvailable}
              >
                View Details
              </Button>

              <Button
                size="icon"
                disabled={!meal.isAvailable}
                aria-label={`Add ${meal.name} to cart`}
              >
                <ShoppingCart className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <ChefHat className="mx-auto size-10 text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">No meals available</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are currently no meals available on the menu.
          </p>
        </div>
      )}
    </main>
  );
};

export default MenuPage;