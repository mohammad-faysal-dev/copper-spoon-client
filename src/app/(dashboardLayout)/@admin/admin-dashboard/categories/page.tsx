import { FolderTree, Plus } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { categoryService } from "@/services/category.service";

export default async function AdminCategoriesPage() {
    const result =
        await categoryService.getAllCategories();

    const categories = result.data ?? [];
    const error = result.error?.message;

    return (
        <main className="container mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <FolderTree className="size-6 text-primary" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Categories
                    </h1>

                    <p className="text-muted-foreground">
                        Manage meal categories.
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Categories</CardTitle>

                        <Button>
                            <Plus className="mr-2 size-4" />
                            Add Category
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {categories.length === 0 ? (
                        <div className="flex min-h-[200px] items-center justify-center">
                            <p className="text-muted-foreground">
                                No categories found.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <span className="font-medium">
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}