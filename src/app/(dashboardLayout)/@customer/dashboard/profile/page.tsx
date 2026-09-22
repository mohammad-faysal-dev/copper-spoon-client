"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Save, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email"),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),

  address: z
    .string()
    .min(10, "Delivery address must be at least 10 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const form = useForm({
    defaultValues: {
      name: "FoodHub Customer",
      email: "customer@example.com",
      phone: "",
      address: "",
    } as ProfileFormValues,

    onSubmit: async ({ value }) => {
      const result = profileSchema.safeParse(value);

      if (!result.success) {
        return;
      }

      console.log(result.data);
    },
  });

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your personal information and delivery details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="h-5 w-5 text-primary" />
            </div>

            <div>
              <CardTitle>Personal Information</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Update your account information.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
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
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Full Name</Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your name"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
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
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    disabled
                  />

                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed here.
                  </p>
                </div>
              )}
            </form.Field>

            {/* Phone */}
            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  const result = profileSchema.shape.phone.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Phone Number
                  </Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Address */}
            <form.Field
              name="address"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    profileSchema.shape.address.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Delivery Address
                  </Label>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your delivery address"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}