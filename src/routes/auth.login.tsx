import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { RoleToggle } from "@/components/auth/RoleToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { DEMO_CREDENTIALS } from "@/lib/mock/auth-api";
import type { AccountType } from "@/lib/mock/types";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "ورود — محتوا" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<AccountType>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "ایمیل معتبر وارد کنید.";
    if (password.length < 6) next.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    const result = await login(email, password);
    if (result.ok) {
      setState("success");
      toast.success("ورود موفق بود");
      setTimeout(() => navigate({ to: "/dashboard" }), 500);
    } else {
      setState("idle");
      setErrors({ form: result.error });
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
    setErrors({});
  };

  return (
    <AuthLayout
      title="خوش برگشتید 👋"
      subtitle="برای ادامه به داشبورد خود وارد شوید."
      footer={
        <>
          حساب کاربری ندارید؟{" "}
          <Link to="/auth/register" className="font-semibold text-foreground hover:underline">
            ثبت‌نام کنید
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <RoleToggle value={role} onChange={setRole} />

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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">رمز عبور</Label>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              فراموشی رمز عبور؟
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={(c) => setRemember(!!c)} />
          <Label htmlFor="remember" className="cursor-pointer font-normal text-muted-foreground">
            مرا به خاطر بسپار
          </Label>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={state !== "idle"}>
          {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {state === "success" && <CheckCircle2 className="h-4 w-4" />}
          {state === "loading" ? "در حال ورود…" : state === "success" ? "خوش آمدید!" : "ورود"}
        </Button>

        <button
          type="button"
          onClick={fillDemo}
          className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          استفاده از حساب دمو {role === "specialist" ? "متخصص" : "کاربر"} (
          {DEMO_CREDENTIALS[role].email})
        </button>

        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-background px-3">یا ادامه با</span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        </div>

        <SocialButtons />
      </form>
    </AuthLayout>
  );
}
