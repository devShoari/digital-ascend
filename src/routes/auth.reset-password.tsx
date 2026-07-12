import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Check } from "lucide-react";
import { motion } from "motion/react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPasswordRequest } from "@/lib/mock/auth-api";

function passwordChecks(pw: string) {
  return { length: pw.length >= 8, letter: /[A-Za-z]/.test(pw), number: /[0-9]/.test(pw) };
}

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [{ title: "بازنشانی رمز عبور — محتوا" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const checks = useMemo(() => passwordChecks(password), [password]);
  const valid = checks.length && checks.letter && checks.number;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setError("رمز عبور شرایط لازم را ندارد.");
      return;
    }
    if (password !== confirm) {
      setError("تکرار رمز عبور مطابقت ندارد.");
      return;
    }
    setError(null);
    setState("loading");
    const result = await resetPasswordRequest("mock-token", password);
    if (result.ok) {
      setState("success");
      setTimeout(() => navigate({ to: "/auth/login" }), 1200);
    } else {
      setState("idle");
      setError(result.error ?? "خطایی رخ داد.");
    }
  };

  return (
    <AuthLayout
      title="تعیین رمز عبور جدید"
      subtitle="یک رمز عبور قوی برای حساب کاربری خود انتخاب کنید."
      footer={
        <Link to="/auth/login" className="text-foreground hover:underline">
          بازگشت به صفحه ورود
        </Link>
      }
    >
      {state === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-foreground/[0.03] p-6 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">رمز عبور تغییر کرد</h3>
          <p className="mt-2 text-sm text-muted-foreground">در حال انتقال به صفحه ورود…</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور جدید</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
              {[
                { ok: checks.length, label: "حداقل ۸ کاراکتر" },
                { ok: checks.letter, label: "شامل حرف" },
                { ok: checks.number, label: "شامل عدد" },
              ].map((c) => (
                <span key={c.label} className={`flex items-center gap-1 ${c.ok ? "text-emerald-500" : "text-muted-foreground"}`}>
                  <Check className="h-3 w-3" /> {c.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">تکرار رمز عبور</Label>
            <PasswordInput
              id="confirm"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={state === "loading"}>
            {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {state === "loading" ? "در حال ذخیره…" : "تغییر رمز عبور"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
