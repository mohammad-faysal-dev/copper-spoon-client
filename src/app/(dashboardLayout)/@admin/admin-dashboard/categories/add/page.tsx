"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Loader2, Plus, FolderTree, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AddCategoryPage() {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
        } satisfies CategoryFormValues,

        validators: {
            onSubmit: categorySchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const res = await fetch(`${API_URL}/category`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ name: value.name.trim() }),
                });

                const result = await res.json();

                if (!res.ok) {
                    toast.error(result.message || "Failed to add category");
                    return;
                }

                toast.success("Category added successfully");
                form.reset();
                router.push("/admin-dashboard/categories");

            } catch (error) {
                console.error(error);
                toast.error("Failed to add category");
            }
        },
    });

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* Header Banner */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#0f0f13] shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#6d28d9_0%,_transparent_60%)]" />
                <div className="relative px-6 py-10 sm:px-10">
                    <div className="mb-6">
                        <Link href="/admin-dashboard/categories" className="inline-flex items-center gap-2 text-purple-200/50 hover:text-purple-100 text-xs font-bold uppercase tracking-wider transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Categories
                        </Link>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-xl border border-purple-400/20">
                            <Plus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white mb-1">Add Category</h1>
                            <p className="text-white/50 text-sm font-medium">Create a new global food category</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl">
                <div className="rounded-[24px] border border-border/60 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/20">
                    <div className="p-6 md:p-8 border-b border-border/50 bg-muted/20">
                        <h2 className="text-xl font-bold tracking-tight">Category Details</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Please provide a unique name for the new category.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                form.handleSubmit();
                            }}
                            className="space-y-6"
                        >
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-2 group/field">
                                        <Label className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-purple-600 transition-colors">
                                            <FolderTree className="h-4 w-4" />
                                            Category Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="E.g., Beverages, Desserts, Burgers..."
                                            className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-purple-500/20 focus-visible:border-purple-500 transition-colors text-base"
                                        />
                                        {field.state.meta.errors.length > 0 && <p className="text-xs font-semibold text-destructive">{field.state.meta.errors[0]?.message}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <div className="pt-6 mt-6 border-t border-border/60 flex justify-end">
                                <form.Subscribe selector={(state) => [state.isSubmitting]}>
                                    {([isSubmitting]) => (
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="h-11 px-8 rounded-xl font-bold shadow-lg overflow-hidden group hover:-translate-y-0.5 transition-all text-white outline-none"
                                            style={{
                                                background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)",
                                                boxShadow: "0 4px 15px rgba(124,58,237,0.25)"
                                            }}
                                        >
                                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            {isSubmitting ? (
                                                <><Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" /><span className="relative z-10">Creating...</span></>
                                            ) : (
                                                <><Plus className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 relative z-10" /><span className="relative z-10">Create Category</span></>
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
