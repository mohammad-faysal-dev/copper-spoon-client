"use client";
import { cn } from "cn";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth";
import { Button } from "../ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is requires"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        console.log(data);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Signed in successfully", { id: toastId });

        // Redirect to homepage with a hard refresh so navbar updates immediately
        window.location.href = "/";
      } catch (err) {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <form
        id="login-form"
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold mb-1 block"
                  >
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="you@example.com"
                      autoComplete="off"
                      className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between mb-1">
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-semibold block"
                    >
                      Password
                    </FieldLabel>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary hover:underline hover:underline-offset-4"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <Button
          form="login-form"
          type="submit"
          className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-medium">
          <span className="bg-background px-4 text-muted-foreground font-semibold">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        className="w-full h-12 rounded-xl border border-border bg-card hover:bg-muted font-bold text-foreground transition-colors shadow-sm"
        onClick={() => handleGoogleLogin()}
        variant="outline"
        type="button"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Login with Google
      </Button>

      <p className="text-center text-sm font-medium text-muted-foreground mt-4">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="font-bold text-primary hover:underline hover:underline-offset-4"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
