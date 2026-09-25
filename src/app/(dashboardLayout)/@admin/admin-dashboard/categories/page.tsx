import { FolderTree, Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import { categoryService } from "@/services/category.service";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
    const result = await categoryService.getAllCategories();
    const categories = result.data ?? [];
    const error = result.error?.message;

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* Header Banner */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#0f0f13] shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#6d28d9_0%,_transparent_60%)]" />
                <div className="relative px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-xl border border-purple-400/20">
                            <FolderTree className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white mb-1">Categories</h1>
                            <p className="text-white/50 text-sm font-medium">Create and organise food categories</p>
                        </div>
                    </div>
                    <Link href="/admin-dashboard/categories/add">
                        <Button className="h-11 rounded-xl px-6 font-bold bg-white text-purple-900 border-0 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-500 font-medium">
                        {error}
                    </div>
                )}

                <div className="rounded-[24px] border border-border/60 bg-card shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Category List</h2>
                        <span className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border/50">
                            {categories.length} Total
                        </span>
                    </div>

                    <div className="p-6">
                        {categories.length === 0 ? (
                            <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                                <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                                    <FolderTree className="h-8 w-8 text-purple-500/40" />
                                </div>
                                <p className="text-muted-foreground font-medium">No categories found.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {categories.map((category) => (
                                    <div key={category.id} className="group relative flex items-center justify-between rounded-2xl border border-border/50 bg-muted/30 p-5 transition-all hover:bg-card hover:border-purple-500/30 hover:shadow-md overflow-hidden">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                                <FolderTree className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <span className="font-bold text-foreground text-sm truncate">{category.name}</span>
                                        </div>
                                        <button className="h-8 w-8 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500 hover:text-white hover:border-purple-500 shrink-0">
                                            <Settings2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}