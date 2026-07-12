import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

const BLURBS = [
  { k: "پروژه موفق", v: "۱۴۰+" },
  { k: "رضایت مشتری", v: "۹۸٪" },
  { k: "اعضای تیم", v: "۳۲" },
];

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute right-1/4 top-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* form column */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-20">
          <Link to="/" className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand shadow-glow">
              <div className="h-5 w-5 rounded-md bg-white" />
            </div>
            <div>
              <div className="font-bold">محتوا</div>
              <div className="text-xs text-muted-foreground">Digital Product Studio</div>
            </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md"
          >
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>

            <div className="mt-8">{children}</div>

            {footer && <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>}
          </motion.div>
        </div>

        {/* visual column */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-background to-violet-500/15" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative flex h-full flex-col items-center justify-center gap-10 p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-sm rounded-3xl border border-border bg-background/60 p-8 shadow-elevated backdrop-blur-xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                استودیوی محتوا
              </div>
              <p className="mt-5 leading-8 text-foreground/90">
                «محتوا نه فقط یک تیم اجرایی، بلکه شریک استراتژیک ماست. تصمیم‌هایی که با هم می‌گیریم،
                مسیر محصول را تغییر می‌دهد.»
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-white">
                  س.ر
                </div>
                <div>
                  <div className="text-sm font-semibold">سارا رضایی</div>
                  <div className="text-xs text-muted-foreground">مدیر محصول، نوا فین‌تک</div>
                </div>
              </div>
            </motion.div>

            <div className="grid w-full max-w-sm grid-cols-3 gap-3">
              {BLURBS.map((b) => (
                <div
                  key={b.k}
                  className="rounded-2xl border border-border bg-background/60 p-4 text-center backdrop-blur-xl"
                >
                  <div className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-xl font-bold text-transparent num">
                    {b.v}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{b.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
