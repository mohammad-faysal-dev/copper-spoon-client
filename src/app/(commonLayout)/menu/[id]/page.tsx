import AddToCartButton from "@/components/modules/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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

          <Link href="/menu" className={buttonVariants({ variant: "default", className: "mt-6" })}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const meal = data;

  return (
    <div className="min-h-screen bg-muted/20 text-foreground pt-10">
      <main className="container mx-auto px-4 pb-14 max-w-7xl">
        {/* Back Link */}
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Menu
        </Link>

        {/* Main Details Card */}
        <div className="rounded-3xl bg-card border border-border/50 shadow-sm overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">

            {/* Image Section */}
            <div className="relative h-[350px] lg:h-full w-full bg-muted/50">
              {meal.image ? (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground/40">
                  <ImageOff className="size-16 opacity-30" />
                  <span className="text-sm font-medium">No image available</span>
                </div>
              )}

              {/* Status Badges */}
              <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
                {meal.isAvailable ? (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white border-none shadow-sm font-medium px-3 py-1">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="border-none shadow-sm font-medium px-3 py-1">
                    Sold Out
                  </Badge>
                )}
                {meal.dietary && (
                  <Badge variant="secondary" className="bg-background/95 text-foreground border border-border shadow-sm font-medium px-3 py-1 flex items-center gap-1.5">
                    <Leaf className="size-3 text-green-500" />
                    {meal.dietary}
                  </Badge>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-8 lg:p-10">
              {/* Category & Cuisine */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {meal.cuisine && (
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 font-medium">
                    <UtensilsCrossed className="size-3 mr-1.5" />
                    {meal.cuisine} Cuisine
                  </Badge>
                )}
                {meal.category?.name && (
                  <Badge variant="secondary" className="font-medium text-foreground/80">
                    {meal.category.name}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-foreground mb-4">
                {meal.name}
              </h1>

              {meal.description && (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {meal.description}
                </p>
              )}

              <Separator className="my-8" />

              {/* Provider Info */}
              {meal.provider && (
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ChefHat className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">
                      Prepared By
                    </p>
                    <p className="font-bold text-base text-foreground truncate">
                      {meal.provider.restaurantName}
                    </p>
                    {meal.provider.address && (
                      <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{meal.provider.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-grow"></div>

              {/* Action Section */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="w-full sm:w-auto text-center sm:text-left">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Price
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    ৳{meal.price}
                  </p>
                </div>

                <AddToCartButton meal={meal} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuDetailsPage;