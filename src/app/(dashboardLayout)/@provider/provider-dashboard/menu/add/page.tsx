"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Loader2, Plus, ChefHat, FolderOpen, Tag, Leaf, Banknote, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { menuService } from "@/services/menu.service";

const mealSchema = z.object({
    name: z.string().min(1, "Meal name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required").refine((value) => Number(value) > 0, "Enter a valid price"),
    categoryId: z.string().min(1, "Category ID is required"),
    cuisine: z.string(),
    dietary: z.string(),
    image: z.string(),
});

type MealFormValues = z.infer<typeof mealSchema>;

export default function AddMealPage() {
    const router = useRouter();

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
                router.push("/provider-dashboard/menu");

            } catch (error) {
                console.error(error);
                toast.error("Failed to add meal");
            }
        },
    });

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* Header Banner */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#111111] shadow-2xl">
                {/* Glows */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#d97706_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#b45309_0%,_transparent_60%)]" />

                <div className="relative px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/25 shadow-xl"
                                style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)" }}>
                                <ChefHat className="h-7 w-7 text-amber-100" />
                            </div>
                            <div className="absolute -inset-1 rounded-2xl blur-md opacity-50 -z-10"
                                style={{ background: "radial-gradient(circle, #b87333, transparent)" }} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                                Add New Dish
                            </h1>
                            <p className="text-white/50 text-sm font-medium">
                                Expand your menu by adding a new culinary creation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="relative overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:border-amber-300/20">
                    <div className="p-6 md:p-8 border-b border-border/50 bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Dish Information</h2>
                                <p className="text-sm text-muted-foreground mt-0.5">Please fill in details about the new dish.</p>
                            </div>
                            <Link href="/provider-dashboard/menu" className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors">
                                Cancel
                            </Link>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                form.handleSubmit();
                            }}
                            className="space-y-6"
                        >
                            {/* Meal Name */}
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-2 group/field">
                                        <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                            <ChefHat className="h-4 w-4" />
                                            Dish Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="E.g., Signature Braised Lamb"
                                            className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors text-base"
                                        />
                                        {field.state.meta.errors.length > 0 && <p className="text-xs font-semibold text-destructive">{field.state.meta.errors[0]?.message}</p>}
                                    </div>
                                )}
                            </form.Field>

                            {/* Description */}
                            <form.Field name="description">
                                {(field) => (
                                    <div className="space-y-2 group/field">
                                        <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                            <FolderOpen className="h-4 w-4" />
                                            Description <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Describe the ingredients, preparation method, and flavors..."
                                            rows={4}
                                            className="resize-none bg-background p-4 shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                        />
                                        {field.state.meta.errors.length > 0 && <p className="text-xs font-semibold text-destructive">{field.state.meta.errors[0]?.message}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Price */}
                                <form.Field name="price">
                                    {(field) => (
                                        <div className="space-y-2 group/field">
                                            <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <Banknote className="h-4 w-4" />
                                                Price (৳) <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="0.00"
                                                className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors font-bold text-amber-600/90"
                                            />
                                            {field.state.meta.errors.length > 0 && <p className="text-xs font-semibold text-destructive">{field.state.meta.errors[0]?.message}</p>}
                                        </div>
                                    )}
                                </form.Field>

                                {/* Category ID */}
                                <form.Field name="categoryId">
                                    {(field) => (
                                        <div className="space-y-2 group/field">
                                            <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <FolderOpen className="h-4 w-4" />
                                                Category ID <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter category reference..."
                                                className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors font-mono text-sm"
                                            />
                                            {field.state.meta.errors.length > 0 && <p className="text-xs font-semibold text-destructive">{field.state.meta.errors[0]?.message}</p>}
                                        </div>
                                    )}
                                </form.Field>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Cuisine */}
                                <form.Field name="cuisine">
                                    {(field) => (
                                        <div className="space-y-2 group/field">
                                            <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <Tag className="h-4 w-4" />
                                                Cuisine Type
                                            </Label>
                                            <Input
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="E.g., Italian, Deshi..."
                                                className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                            />
                                        </div>
                                    )}
                                </form.Field>

                                {/* Dietary */}
                                <form.Field name="dietary">
                                    {(field) => (
                                        <div className="space-y-2 group/field">
                                            <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <Leaf className="h-4 w-4 text-emerald-500" />
                                                Dietary Information
                                            </Label>
                                            <Input
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="E.g., Vegetarian, Gluten-Free..."
                                                className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                            />
                                        </div>
                                    )}
                                </form.Field>
                            </div>

                            {/* Image */}
                            <form.Field name="image">
                                {(field) => (
                                    <div className="space-y-2 group/field">
                                        <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                            <ImageIcon className="h-4 w-4" />
                                            Image URL
                                        </Label>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="https://..."
                                            className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <div className="pt-6 mt-6 border-t border-border/60">
                                <form.Subscribe
                                    selector={(state) => [state.isSubmitting]}
                                >
                                    {([isSubmitting]) => (
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 rounded-xl font-bold text-white shadow-lg overflow-hidden group hover:-translate-y-0.5 transition-all outline-none"
                                            style={{
                                                background: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
                                                boxShadow: "0 4px 15px rgba(180,83,9,0.3)",
                                            }}
                                        >
                                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            {isSubmitting ? (
                                                <><Loader2 className="mr-2 h-5 w-5 animate-spin relative z-10" /><span className="relative z-10">Adding Dish...</span></>
                                            ) : (
                                                <><Plus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 relative z-10" /><span className="relative z-10">Add Menu Item</span></>
                                            )}
                                        </Button>
                                    )}
                                </form.Subscribe>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}