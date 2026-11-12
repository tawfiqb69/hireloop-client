"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inputClass =
  "h-11 rounded-lg border-white/10 bg-[#1b1b1c] px-4 text-white placeholder:text-white/30 focus-visible:border-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25";

export type SignInData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function SignInForm({
  onSubmit,
}: {
  onSubmit: (data: SignInData) => Promise<void> | void;
}) {
  const [rememberMe, setRememberMe] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    // The form has noValidate, so check things ourselves.
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setPending(true);
    try {
      await onSubmit({ email, password, rememberMe });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-white/80">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={pending}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-white/80">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Your password"
          disabled={pending}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
          disabled={pending}
          className="border-white/20 data-checked:border-[#5b4bf5] data-checked:bg-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25"
        />
        <Label htmlFor="remember" className="text-white/70">
          Remember me
        </Label>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-[#5b4bf5] text-base text-white hover:bg-[#6c5ef7] disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign In"}
      </Button>

      <p className="text-center text-sm text-white/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[#7c6cf6] transition-colors hover:text-[#9a8dff]"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;