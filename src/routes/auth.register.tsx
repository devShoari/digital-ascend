import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { User as UserIcon, Mail, Loader2, CheckCircle2, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "ثبت‌نام — محتوا" }] }),
  component: RegisterPage,
});

function passwordChecks(pw: string) {
  return {
    length: pw.length >= 8,
    letter: /[A-Za-z]/.test(pw),
    number: /[0-9]/.test(pw),
  };
}

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const checks = useMemo(() => passwordChecks(password), [password]);
  const passwordValid = checks.length && checks.letter && checks.number;

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "نام و نام خانوادگی را وارد کنید.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "ایمیل معتبر وارد کنید.";
    if (!passwordValid) next.password = "رمز عبور شرایط لازم را ندارد.";
    if (!agree) next.agree = "برای ادامه باید قوانین را بپذیرید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    const result = await register({ name, email, password });
    if (result.ok) {
      setState("success");
      toast.success("حساب کاربری با موفقیت ساخته شد");
      setTimeout(() => navigate({ to: "/auth/verify-email" }), 500);
    } else {
      setState("idle");
      setErrors({ form: result.error ?? "خطایی رخ داد." });
    }
  };

  return (
    <AuthLayout
      title="بسازیم شروع کنیم 🚀"
      subtitle="در کمتر از یک دقیقه حساب کاربری خود را بسازید."
      footer={
        <>
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link to="/auth/login" className="font-semibold text-foreground hover:underline">
            وارد شوید
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {errors.form}
          </motion.div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <div className="relative">
            <UserIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              autoComplete="name"
              placeholder="سارا رضایی"
              className="pr-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">رمز عبور</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
            {[
              { ok: checks.length, label: "حداقل ۸ کاراکتر" },
              { ok: checks.letter, label: "شامل حرف" },
              { ok: checks.number, label: "شامل عدد" },
            ].map((c) => (
              <span
                key={c.label}
                className={`flex items-center gap-1 ${c.ok ? "text-emerald-500" : "text-muted-foreground"}`}
              >
                <Check className="h-3 w-3" /> {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <Checkbox id="agree" checked={agree} onCheckedChange={(c) => setAgree(!!c)} className="mt-0.5" />
            <Label htmlFor="agree" className="cursor-pointer font-normal leading-6 text-muted-foreground">
              با <a className="text-foreground hover:underline">قوانین و مقررات</a> و{" "}
              <a className="text-foreground hover:underline">حریم خصوصی</a> موافقم.
            </Label>
          </div>
          {errors.agree && <p className="text-xs text-destructive">{errors.agree}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={state !== "idle"}>
          {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {state === "success" && <CheckCircle2 className="h-4 w-4" />}
          {state === "loading" ? "در حال ساخت حساب…" : state === "success" ? "ساخته شد!" : "ساخت حساب کاربری"}
        </Button>

        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-background px-3">یا ادامه با</span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        </div>

        <SocialButtons />
      </form>
    </AuthLayout>
  );
}
