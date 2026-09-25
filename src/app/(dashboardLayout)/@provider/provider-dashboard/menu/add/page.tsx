"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { menuService } from "@/services/menu.service";

const mealSchema = z.object({
    name: z.string().min(1, "Meal name is required"),

    description: z
        .string()
        .min(1, "Description is required"),

    price: z
        .string()
        .min(1, "Price is required")
        .refine(
            (value) => Number(value) > 0,
            "Enter a valid price",
        ),

    categoryId: z
        .string()
        .min(1, "Category ID is required"),

    cuisine: z.string(),

    dietary: z.string(),

    image: z.string(),
});

type MealFormValues = z.infer<typeof mealSchema>;

export default function AddMealPage() {
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            categoryId: "",
            cuisine: "",
            dietary: "",
            image: "",
        } satisfies MealFormValues,

        validators: {
            onSubmit: mealSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const result = await menuService.createMeal({
                    name: value.name.trim(),
                    description: value.description.trim(),
                    price: Number(value.price),
                    categoryId: value.categoryId.trim(),
                    cuisine: value.cuisine.trim() || undefined,
                    dietary: value.dietary.trim() || undefined,
                    image: value.image.trim() || undefined,
                    isAvailable: true,
                });

                if (result.error) {
                    toast.error(result.error.message);
                    return;
                }

                toast.success("Meal added successfully");

                form.reset();
            } catch (error) {
                console.error(error);
                toast.error("Failed to add meal");
            }
        },
    });

    return (
        <main className="container mx-auto max-w-3xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Add Menu Item
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Add a new meal to your restaurant.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Meal Information</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        {/* Meal Name */}
                        <form.Field
                            name="name"
                            children={(field) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Meal Name
                                    </label>

                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(event.target.value)
                                        }
                                        placeholder="BBQ Chicken Pizza"
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Description */}
                        <form.Field
                            name="description"
                            children={(field) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Description
                                    </label>

                                    <Textarea
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(event.target.value)
                                        }
                                        placeholder="Describe the meal..."
                                        rows={5}
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Price + Category */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <form.Field
                                name="price"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Price
                                        </label>

                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(event.target.value)
                                            }
                                            placeholder="350"
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <p className="text-sm text-destructive">
                                                {field.state.meta.errors[0]?.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="categoryId"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Category ID
                                        </label>

                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(event.target.value)
                                            }
                                            placeholder="Category ID"
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <p className="text-sm text-destructive">
                                                {field.state.meta.errors[0]?.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Cuisine + Dietary */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <form.Field
                                name="cuisine"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Cuisine
                                        </label>

                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(event.target.value)
                                            }
                                            placeholder="Italian"
                                        />
                                    </div>
                                )}
                            />

                            <form.Field
                                name="dietary"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Dietary
                                        </label>

                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(event.target.value)
                                            }
                                            placeholder="Vegetarian"
                                        />
                                    </div>
                                )}
                            />
                        </div>

                        {/* Image */}
                        <form.Field
                            name="image"
                            children={(field) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Image URL
                                    </label>

                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(event.target.value)
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                            )}
                        />

                        {/* Submit */}
                        <form.Subscribe
                            selector={(state) => [
                                state.isSubmitting,
                            ]}
                            children={([isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                            Adding Meal...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 size-4" />
                                            Add Menu Item
                                        </>
                                    )}
                                </Button>
                            )}
                        />
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}