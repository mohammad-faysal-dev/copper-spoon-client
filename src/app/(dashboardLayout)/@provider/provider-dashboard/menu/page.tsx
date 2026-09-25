import Link from "next/link";
import {
    Plus,
    Trash2,
    Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { menuService } from "@/services/menu.service";

export default async function ProviderMealsPage() {
    const { data: meals, error } = await menuService.getMenus();

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                        <Utensils className="size-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">My Meals</h1>

                        <p className="text-muted-foreground">
                            Manage your menu items.
                        </p>
                    </div>
                </div>

                <Button asChild>
                    <Link href="/provider-dashboard/menu/add">
                        <Plus className="mr-2 size-4" />
                        Add Meal
                    </Link>
                </Button>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error.message}
                </div>
            )}

            {/* Empty State */}
            {!meals || meals.length === 0 ? (
                <Card>
                    <CardContent className="flex min-h-[250px] items-center justify-center">
                        <div className="text-center">
                            <Utensils className="mx-auto mb-4 size-10 text-muted-foreground" />

                            <h2 className="font-semibold">No meals found</h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Add your first menu item.
                            </p>

                            <Button asChild className="mt-5">
                                <Link href="/provider-dashboard/menu/add">
                                    <Plus className="mr-2 size-4" />
                                    Add Meal
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                /* Meals Grid */
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {meals.map((meal) => (
                        <Card key={meal.id} className="overflow-hidden">
                            {/* Image */}
                            {meal.image ? (
                                <div className="aspect-video overflow-hidden bg-muted">
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="size-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-video items-center justify-center bg-muted">
                                    <Utensils className="size-10 text-muted-foreground" />
                                </div>
                            )}

                            <CardHeader>
                                <div className="flex items-start justify-between gap-3">
                                    <CardTitle className="line-clamp-1">
                                        {meal.name}
                                    </CardTitle>

                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${meal.isAvailable
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-red-500/10 text-red-600"
                                            }`}
                                    >
                                        {meal.isAvailable ? "Available" : "Unavailable"}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {meal.description || "No description available."}
                                </p>

                                <p className="mt-4 text-xl font-bold">
                                    ৳{Number(meal.price).toFixed(2)}
                                </p>

                                <div className="mt-5 border-t pt-4">
                                    <Button
                                        variant="ghost"
                                        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        aria-label={`Delete ${meal.name}`}
                                    >
                                        <Trash2 className="mr-2 size-4" />
                                        Remove Item
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}