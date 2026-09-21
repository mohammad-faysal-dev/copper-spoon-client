import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { menuService } from "@/services/menu.service";
import {
  ArrowLeft,
  ChefHat,
  ImageOff,
  Leaf,
  MapPin,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const MenuDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data, error } = await menuService.getMenuById(id);
  console.log(data)

  if (error || !data) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">
          <UtensilsCrossed className="mx-auto size-10 text-destructive/60" />

          <h2 className="mt-4 text-xl font-semibold">
            Meal not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The meal you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>

          <Button asChild className="mt-6">
            <Link href="/menu">
              <ArrowLeft className="mr-2 size-4" />
              Back to Menu
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const meal = data;

  return (
    <main className="container mx-auto px-4 py-10 md:py-14">
      {/* Back Link */}
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Menu
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Meal Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted shadow-sm">
          {meal.image ? (
            <img
              src={meal.image}
              alt={meal.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/50">
              <ImageOff className="size-10" />
              <span className="text-sm">No image available</span>
            </div>
          )}

          {meal.image && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          )}

          {/* Availability Badge */}
          <div className="absolute left-4 top-4">
            {meal.isAvailable ? (
              <Badge className="bg-green-600 text-white shadow hover:bg-green-600">
                Available
              </Badge>
            ) : (
              <Badge variant="destructive" className="shadow">
                Unavailable
              </Badge>
            )}
          </div>

          {/* Dietary Badge */}
          {meal.dietary && (
            <div className="absolute right-4 top-4">
              <Badge variant="secondary" className="gap-1 shadow">
                <Leaf className="size-3" />
                {meal.dietary}
              </Badge>
            </div>
          )}
        </div>

        {/* Meal Details */}
        <div className="flex flex-col">
          {/* Cuisine & Category */}
          <div className="flex flex-wrap items-center gap-2">
            {meal.cuisine && (
              <Badge variant="outline">
                {meal.cuisine} Cuisine
              </Badge>
            )}

            {meal.category?.name && (
              <Badge variant="outline">
                {meal.category.name}
              </Badge>
            )}
          </div>

          {/* Meal Name */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {meal.name}
          </h1>

          {/* Description */}
          {meal.description && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {meal.description}
            </p>
          )}

          <Separator className="my-6" />

          {/* Provider */}
          {meal.provider && (
            <div className="flex items-center gap-3 rounded-2xl border bg-muted/30 p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <ChefHat className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="font-medium">
                  {meal.provider.restaurantName}
                </p>

                {meal.provider.address && (
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">
                      {meal.provider.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Price & Add To Cart */}
          <div className="mt-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Price
              </p>

              <p className="text-3xl font-bold text-primary">
                ৳{meal.price}
              </p>
            </div>

            <Button
              size="lg"
              disabled={!meal.isAvailable}
              className="flex-1 gap-2 sm:flex-none sm:px-10"
            >
              <ShoppingCart className="size-5" />
              {meal.isAvailable ? "Add to Cart" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuDetailsPage;