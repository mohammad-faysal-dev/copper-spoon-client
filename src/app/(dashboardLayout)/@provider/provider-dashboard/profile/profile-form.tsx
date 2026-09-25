"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Save, Store, Phone, MapPin, Mail, FileText, Sparkles, ChefHat } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const providerProfileSchema = z.object({
    restaurantName: z.string().min(2, "Restaurant Name must be at least 2 characters"),
    description: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
});

type ProviderProfileFormProps = {
    user: {
        id: string;
        name: string;
        email: string;
    };
    provider: {
        id?: string;
        userId?: string;
        restaurantName?: string;
        description?: string | null;
        phone?: string | null;
        address?: string | null;
        image?: string | null;
    } | null;
};

export default function ProviderProfileForm({ user, provider }: ProviderProfileFormProps) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            restaurantName: provider?.restaurantName || "",
            description: provider?.description || "",
            phone: provider?.phone || "",
            address: provider?.address || "",
        },

        validators: {
            onSubmit: providerProfileSchema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Saving changes...");

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                });

                if (!res.ok) {
                    throw new Error("Failed to update profile");
                }

                toast.success("Profile updated successfully", { id: toastId });
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong, please try again", { id: toastId });
            }
        },
    });

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* ══ HERO BANNER ══ */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#111111] shadow-2xl">
                {/* Glows */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#d97706_0%,_transparent_60%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#b45309_0%,_transparent_60%)]" />

                {/* Decorative lines */}
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.15]"
                    style={{
                        backgroundImage: "linear-gradient(45deg, transparent 45%, #b87333 45%, #b87333 55%, transparent 55%)",
                        backgroundSize: "24px 24px"
                    }}
                />

                <div className="relative px-8 py-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar Orbit */}
                    <div className="relative shrink-0 group/avatar cursor-pointer">
                        <div className="absolute -inset-1.5 rounded-full blur-md opacity-60 bg-gradient-to-br from-[#92400e] to-[#d97706] group-hover/avatar:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#111] border border-amber-500/30 text-amber-100 text-3xl font-black shadow-inner">
                            {user.name ? user.name.charAt(0).toUpperCase() : <ChefHat className="h-10 w-10" />}
                        </div>
                    </div>

                    <div className="text-center md:text-left mt-1">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 mb-2.5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                                Official Partner
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-1.5"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                            {provider?.restaurantName || "Partner Dashboard"}
                        </h1>
                        <p className="text-white/50 text-sm font-medium">
                            {user.email} <span className="mx-2 opacity-50">•</span> Manage business settings
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl relative overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:border-amber-300/20">

                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-border/50 bg-muted/20">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-inner">
                                <Store className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Business Profile</h2>
                                <p className="text-sm text-muted-foreground mt-0.5">Customize how your restaurant appears to customers.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-8"
                        >
                            {/* Read-Only Info Block */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-muted/40 border border-border/50 shadow-sm relative overflow-hidden">
                                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#92400e] to-[#d97706]" />

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Owner Name
                                    </Label>
                                    <Input
                                        value={user.name}
                                        disabled
                                        className="h-11 bg-background/50 border-border/40 cursor-not-allowed opacity-70 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Account Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="h-11 pl-10 bg-background/50 border-border/40 cursor-not-allowed opacity-70 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Editable Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                                {/* Restaurant Name */}
                                <form.Field
                                    name="restaurantName"
                                    validators={{
                                        onChange: ({ value }) => {
                                            const result = providerProfileSchema.shape.restaurantName.safeParse(value);
                                            return result.success ? undefined : result.error.issues[0]?.message;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <div className="space-y-2 md:col-span-2 group/field">
                                            <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <Store className="h-4 w-4" />
                                                Restaurant Name <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="E.g., Copper Spoon Kitchen"
                                                className="h-12 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                            />
                                            {field.state.meta.errors.length > 0 && (
                                                <p className="text-xs font-semibold text-destructive">{String(field.state.meta.errors[0])}</p>
                                            )}
                                        </div>
                                    )}
                                </form.Field>

                                {/* Phone */}
                                <form.Field name="phone">
                                    {(field) => (
                                        <div className="space-y-2 group/field">
                                            <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <Phone className="h-4 w-4" />
                                                Business Phone
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                                    <span className="text-muted-foreground text-sm font-medium">+880</span>
                                                </div>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="tel"
                                                    value={field.state.value || ""}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder="1XXXXXXXXX"
                                                    className="h-12 pl-14 bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </form.Field>

                                {/* Empty space for grid alignment if needed, or put something else here */}
                                <div className="hidden md:block"></div>

                                {/* Description */}
                                <form.Field name="description">
                                    {(field) => (
                                        <div className="space-y-2 md:col-span-2 group/field">
                                            <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <FileText className="h-4 w-4" />
                                                About Restaurant
                                            </Label>
                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                rows={4}
                                                value={field.state.value || ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Tell customers about your culinary specialties and history..."
                                                className="resize-none bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors p-4"
                                            />
                                        </div>
                                    )}
                                </form.Field>

                                {/* Address */}
                                <form.Field name="address">
                                    {(field) => (
                                        <div className="space-y-2 md:col-span-2 group/field">
                                            <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold group-focus-within/field:text-amber-600 transition-colors">
                                                <MapPin className="h-4 w-4" />
                                                Location Address
                                            </Label>
                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                rows={2}
                                                value={field.state.value || ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter full physical address for deliveries..."
                                                className="resize-none bg-background shadow-sm border-border/80 focus-visible:ring-amber-500/20 focus-visible:border-amber-500 transition-colors p-4"
                                            />
                                        </div>
                                    )}
                                </form.Field>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    type="submit"
                                    className="relative h-11 px-8 rounded-xl font-bold text-white shadow-lg overflow-hidden group hover:-translate-y-0.5 transition-all outline-none"
                                    style={{
                                        background: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
                                        boxShadow: "0 4px 15px rgba(180,83,9,0.3)",
                                    }}
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 relative z-10" />
                                    <span className="relative z-10">Save Changes</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
