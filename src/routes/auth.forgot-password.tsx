import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Loader2, MailCheck, ArrowRight } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/mock/auth-api";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "فراموشی رمز عبور — محتوا" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("ایمیل معتبر وارد کنید.");
      return;
    }
    setError(null);
    setState("loading");
    await requestPasswordReset(email);
    setState("sent");
  };

  return (
    <AuthLayout
      title="فراموشی رمز عبور"
      subtitle="ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود."
      footer={
        <Link to="/auth/login" className="inline-flex items-center gap-1 text-foreground hover:underline">
          <ArrowRight className="h-3.5 w-3.5" />
          بازگشت به صفحه ورود
        </Link>
      }
    >
      {state === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-foreground/[0.03] p-6 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
            <MailCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">ایمیل ارسال شد</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            اگر حسابی با آدرس <span className="text-foreground">{email}</span> وجود داشته باشد، لینک
            بازیابی رمز عبور برای آن ارسال می‌شود.
          </p>
          <Button variant="outline" className="mt-5 w-full" onClick={() => setState("idle")}>
            ارسال مجدد
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pr-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={state === "loading"}>
            {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {state === "loading" ? "در حال ارسال…" : "ارسال لینک بازیابی"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
