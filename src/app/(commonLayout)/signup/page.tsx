import { SignupForm } from "@/components/modules/signup-form";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* Right side: Image (Reversed for signup) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-muted">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1600"
          alt="Restaurant ambience"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="space-y-6 rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-md shadow-2xl">
            <p className="text-xl font-medium leading-9 text-white/90">
              "Joining Copper Spoon was the best decision. The private dining options and exclusive menu sneak peeks are incredible."
            </p>
            <footer className="text-sm">
              <p className="font-bold text-white">— Michael Chen</p>
              <p className="text-white/60">Copper Spoon Member</p>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Left side: Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              Join Us
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Experience the best of Copper Spoon by becoming a member.
            </p>
          </div>
          <SignupForm className="!min-h-0 !p-0 !bg-transparent w-full" />
        </div>
      </div>

    </div>
  );
}
