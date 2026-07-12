import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, CheckCircle2, AlertCircle, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth-context";
import { resendVerificationEmail, verifyEmailRequest } from "@/lib/mock/auth-api";

export const Route = createFileRoute("/auth/verify-email")({
  head: () => ({ meta: [{ title: "تایید ایمیل — محتوا" }] }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    setError(null);
    setState("loading");
    const result = await verifyEmailRequest(code);
    if (result.ok) {
      setState("success");
      updateUser({ emailVerified: true });
      toast.success("ایمیل شما تایید شد");
      setTimeout(() => navigate({ to: "/dashboard" }), 900);
    } else {
      setState("idle");
      setError(result.error ?? "خطایی رخ داد.");
    }
  };

  const handleResend = async () => {
    setResending(true);
    await resendVerificationEmail();
    setResending(false);
    toast.success("کد جدید ارسال شد");
  };

  return (
    <AuthLayout
      title="تایید ایمیل"
      subtitle={
        <>
          کد ۶ رقمی ارسال‌شده به{" "}
          <span className="text-foreground">{user?.email ?? "ایمیل شما"}</span> را وارد کنید.
        </>
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
          <h3 className="mt-4 font-semibold">تایید شد!</h3>
          <p className="mt-2 text-sm text-muted-foreground">در حال انتقال به داشبورد…</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-500">
            <MailCheck className="h-6 w-6" />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-center" dir="ltr">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={code.length !== 6 || state === "loading"}
            onClick={handleVerify}
          >
            {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {state === "loading" ? "در حال بررسی…" : "تایید کد"}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground disabled:opacity-60"
          >
            {resending ? "در حال ارسال مجدد…" : "کد را دریافت نکردید؟ ارسال مجدد"}
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
