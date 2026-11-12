"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Check, ShieldCheck, UserSearch, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const inputClass =
  "h-11 rounded-lg border-white/10 bg-[#1b1b1c] px-4 text-white placeholder:text-white/30 focus-visible:border-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25";

export type SignUpRole = "seeker" | "recruiter" | "admin";

const ROLES: {
  value: SignUpRole;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  { value: "seeker", label: "Job Seeker", description: "Find your next role", icon: UserSearch },
  { value: "recruiter", label: "Recruiter", description: "Hire top talent", icon: Building2 },
  { value: "admin", label: "Admin", description: "Manage the platform", icon: ShieldCheck },
];

export type SignUpData = {
  name: string;
  email: string;
  password: string;
  role: SignUpRole;
};

export function SignUpForm({
  onSubmit,
}: {
  onSubmit: (data: SignUpData) => Promise<void> | void;
}) {
  const [role, setRole] = useState<SignUpRole>("seeker");
  const [agreed, setAgreed] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    // The form has noValidate, so check things ourselves.
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setPending(true);
    try {
      await onSubmit({ name, email, password, role });
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
        <Label className="text-white/80">I am a</Label>
        <RadioGroup
          value={role}
          onValueChange={(value) => setRole(value as SignUpRole)}
          disabled={pending}
          className="grid grid-cols-3 gap-2.5"
        >
          {ROLES.map((item) => {
            const selected = role === item.value;
            const Icon = item.icon;
            return (
              <Label
                key={item.value}
                htmlFor={`role-${item.value}`}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border px-2 py-4 text-center transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#5b4bf5]/40",
                  selected
                    ? "border-[#5b4bf5] bg-[#5b4bf5]/10 shadow-[0_0_24px_-6px_rgba(91,75,245,0.6)]"
                    : "border-white/10 bg-[#1b1b1c] hover:border-white/25 hover:bg-white/[0.04]",
                  pending && "cursor-not-allowed opacity-60"
                )}
              >
                {/* visually hidden, but still a real radio for keyboard + screen readers */}
                <RadioGroupItem
                  id={`role-${item.value}`}
                  value={item.value}
                  className="sr-only"
                />

                <span
                  className={cn(
                    "absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-[#5b4bf5] text-white transition-all",
                    selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  )}
                  aria-hidden
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>

                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg transition-colors",
                    selected
                      ? "bg-[#5b4bf5] text-white"
                      : "bg-white/6 text-white/60 group-hover:text-white"
                  )}
                >
                  <Icon className="size-5" />
                </span>

                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <span className="text-[11px] font-normal leading-tight text-white/50">
                    {item.description}
                  </span>
                </span>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-white/80">
          Full name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          disabled={pending}
          className={inputClass}
        />
      </div>

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
          autoComplete="new-password"
          minLength={8}
          placeholder="At least 8 characters"
          disabled={pending}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked === true)}
          disabled={pending}
          className="border-white/20 data-checked:border-[#5b4bf5] data-checked:bg-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25"
        />
        <Label htmlFor="terms" className="text-white/70">
          I agree to the{" "}
          <span className="text-[#7c6cf6]">Terms of Service</span> and{" "}
          <span className="text-[#7c6cf6]">Privacy Policy</span>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-[#5b4bf5] text-base text-white hover:bg-[#6c5ef7] disabled:opacity-70"
      >
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#7c6cf6] transition-colors hover:text-[#9a8dff]"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;