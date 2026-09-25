import Link from "next/link";
import Image from "next/image";
import {
    Plus,
    Trash2,
    Utensils,
    UtensilsCrossed,
    LeafIcon,
    Tag,
    ChefHat,
    CheckCircle2,
    XCircle,
    Sparkles,
} from "lucide-react";
import { menuService } from "@/services/menu.service";

export default async function ProviderMealsPage() {
    const { data: meals, error } = await menuService.getMenus();

    const availableCount = meals?.filter((m) => m.isAvailable).length ?? 0;
    const totalCount = meals?.length ?? 0;

    return (
        <main className="min-h-screen bg-background">

            {/* ══ HERO HEADER ══ */}
            <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] shadow-2xl">
                {/* Subtle warm glow */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#d97706_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#b45309_0%,_transparent_60%)]" />
                {/* Decorative rings */}
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10 opacity-30" />
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/10 opacity-20" />
                {/* Sparkle dots */}
                <div className="absolute right-32 top-6 h-1.5 w-1.5 rounded-full bg-amber-400/50" />
                <div className="absolute right-20 bottom-8 h-2 w-2 rounded-full bg-orange-400/40" />
                {/* bottom line */}
                <div className="absolute bottom-0 left-1/4 h-px w-80 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

                <div className="relative px-8 py-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        {/* Title */}
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
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="h-3 w-3 text-amber-400/60" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/50">
                                        Provider Dashboard
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-white">
                                    My Meals
                                </h1>
                                <p className="mt-1 text-white/50 text-sm font-medium">
                                    {totalCount > 0
                                        ? `${totalCount} item${totalCount !== 1 ? "s" : ""} · ${availableCount} available`
                                        : "Manage your menu items"}
                                </p>
                            </div>
                        </div>

                        {/* Add Meal CTA */}
                        <Link
                            href="/provider-dashboard/menu/add"
                            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 h-11 font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shrink-0 relative overflow-hidden group"
                            style={{
                                background: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
                                boxShadow: "0 4px 20px rgba(180,83,9,0.4)",
                            }}
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <Plus className="h-4 w-4" />
                            Add New Meal
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-14">

                {/* Error */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-5 py-4 text-sm text-destructive">
                        <XCircle className="h-5 w-5 shrink-0" />
                        <p className="font-medium">{error.message}</p>
                    </div>
                )}

                {/* Empty State */}
                {!meals || meals.length === 0 ? (
                    <div className="flex min-h-[440px] flex-col items-center justify-center text-center rounded-3xl border-2 border-dashed border-border bg-muted/20 p-16">
                        <div className="relative mb-6">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-border mx-auto"
                                style={{ background: "linear-gradient(135deg, rgba(180,83,9,0.1) 0%, rgba(217,119,6,0.05) 100%)" }}>
                                <UtensilsCrossed className="size-11 text-muted-foreground/50" />
                            </div>
                            <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 -z-10"
                                style={{ background: "radial-gradient(circle, #b45309, transparent)" }} />
                        </div>
                        <h2 className="text-2xl font-black text-foreground">No Meals Yet</h2>
                        <p className="mt-3 text-muted-foreground max-w-sm leading-relaxed text-sm">
                            Your menu is empty. Start adding dishes to attract customers and grow your business.
                        </p>
                        <Link
                            href="/provider-dashboard/menu/add"
                            className="inline-flex items-center justify-center gap-2 mt-8 rounded-xl px-8 h-11 font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            style={{
                                background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
                                boxShadow: "0 4px 20px rgba(180,83,9,0.35)",
                            }}
                        >
                            <Plus className="h-4 w-4" />
                            Add Your First Meal
                        </Link>
                    </div>
                ) : (
                    /* ── Meals Grid ── */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {meals.map((meal) => (
                            <div
                                key={meal.id}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber-300/30"
                            >
                                {/* Hover glow overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(180,83,9,0.06) 0%, transparent 70%)" }} />

                                {/* Top accent stripe */}
                                <div className={`h-[3px] w-full rounded-t-3xl bg-gradient-to-r ${meal.isAvailable
                                    ? "from-amber-500 via-orange-400 to-yellow-500"
                                    : "from-muted-foreground/30 to-muted-foreground/20"
                                    }`} />

                                {/* ── MEAL IMAGE ── */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    {meal.image ? (
                                        <img
                                            src={meal.image}
                                            alt={meal.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center"
                                            style={{ background: "linear-gradient(135deg, rgba(180,83,9,0.08) 0%, rgba(217,119,6,0.04) 100%)" }}>
                                            <Utensils className="size-12 text-muted-foreground/30" />
                                        </div>
                                    )}

                                    {/* Availability badge (top-right) */}
                                    <div className="absolute top-3 right-3">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border backdrop-blur-md shadow-sm ${meal.isAvailable
                                            ? "bg-emerald-50/90 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                                            : "bg-white/80 dark:bg-muted/80 text-muted-foreground border-border"
                                            }`}>
                                            {meal.isAvailable
                                                ? <><CheckCircle2 className="h-3 w-3" /> Available</>
                                                : <><XCircle className="h-3 w-3" /> Unavailable</>
                                            }
                                        </span>
                                    </div>

                                    {/* Price badge (bottom-left) */}
                                    <div className="absolute bottom-3 left-3">
                                        <span
                                            className="inline-flex items-center rounded-xl px-3 py-1 text-sm font-black text-white shadow-lg"
                                            style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)", boxShadow: "0 3px 12px rgba(180,83,9,0.45)" }}
                                        >
                                            ৳{Number(meal.price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* ── MEAL DETAILS ── */}
                                <div className="relative flex flex-col flex-1 p-4">

                                    {/* Name */}
                                    <h2 className="font-black text-foreground text-base leading-snug line-clamp-1 mb-1.5">
                                        {meal.name}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                                        {meal.description || "No description provided."}
                                    </p>

                                    {/* Tags row */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {meal.cuisine && (
                                            <span className="inline-flex items-center gap-1 rounded-lg bg-muted/60 border border-border/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                                <Tag className="h-2.5 w-2.5" />
                                                {meal.cuisine}
                                            </span>
                                        )}
                                        {meal.dietary && (
                                            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                <LeafIcon className="h-2.5 w-2.5" />
                                                {meal.dietary}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action: Delete */}
                                    <div className="mt-auto border-t border-border/40 pt-3.5">
                                        <button
                                            className="group/del flex w-full items-center justify-center gap-2 rounded-xl h-9 text-xs font-bold text-destructive/70 hover:text-destructive-foreground border border-destructive/15 hover:border-destructive/40 hover:bg-destructive transition-all duration-300 hover:shadow-lg hover:shadow-destructive/20"
                                            aria-label={`Delete ${meal.name}`}
                                        >
                                            <Trash2 className="h-3.5 w-3.5 group-hover/del:scale-110 transition-transform duration-300" />
                                            Remove Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}