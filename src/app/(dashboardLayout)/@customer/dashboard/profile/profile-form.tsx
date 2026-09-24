"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Save, UserRound, Phone, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { userClientService } from "@/services/user-client.service";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  address: z
    .string()
    .min(10, "Delivery address must be at least 10 characters"),
});

type ProfileFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },

    validators: {
      onSubmit: profileSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving changes...");

      try {
        const { data, error } = await userClientService.updateUser(user.id, {
          name: value.name,
          phone: value.phone,
          address: value.address,
        });
        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Profile updated successfully", { id: toastId });
      } catch {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8 bg-[#111111] px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 opacity-20" />
        <div className="absolute -right-4 -bottom-8 h-32 w-32 rounded-full border border-white/10 opacity-10" />
        <div className="relative flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 text-white text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : <UserRound className="h-7 w-7" />}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {user.name || "My Profile"}
            </h1>
            <p className="mt-1 text-white/60 text-sm">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          {/* Card Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Update your account information.</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              {/* Name */}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const result = profileSchema.shape.name.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold">
                      <UserRound className="h-3.5 w-3.5 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your full name"
                      className="rounded-xl h-11"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result = profileSchema.shape.email.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      disabled
                      className="rounded-xl h-11 bg-muted/50 cursor-not-allowed opacity-70"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email address cannot be changed here.
                    </p>
                  </div>
                )}
              </form.Field>

              <Separator />

              {/* Phone */}
              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) => {
                    const result = profileSchema.shape.phone.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="rounded-xl h-11"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Address */}
              <form.Field
                name="address"
                validators={{
                  onChange: ({ value }) => {
                    const result = profileSchema.shape.address.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Delivery Address
                    </Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your full delivery address"
                      className="rounded-xl resize-none"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              <Button type="submit" className="rounded-xl px-8 h-11 group">
                <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
