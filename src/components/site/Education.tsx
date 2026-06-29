import { motion } from "motion/react";
import { GraduationCap, Lock, Users } from "lucide-react";
import { SectionHead } from "./Process";

export function Education() {
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 md:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-violet/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 -bottom-32 size-[28rem] rounded-full bg-electric/20 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <Lock className="size-3" />
                دعوت‌نامه‌ای — ظرفیت محدود
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                <span className="gradient-text">دانش حرفه‌ای،</span>
                <br />
                با ظرفیت محدود.
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground leading-8 md:text-lg">
                ما در هر ماه فقط حدود <span className="num text-foreground font-semibold">۵۰ نفر</span> را
                در دوره‌های حرفه‌ای می‌پذیریم. هدف، یادگیری عمیق و عملی است — نه ثبت‌نام انبوه.
                هر دانش‌جو از منتورینگ مستقیم اعضای استودیو بهره می‌برد.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  درخواست عضویت
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10">
                  معرفی برنامه آموزشی
                </a>
              </div>
            </div>

            {/* exclusive card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-2xl glass p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl gradient-brand text-primary-foreground shadow-glow">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">دوره‌های پیش‌رو</div>
                  <div className="text-xs text-muted-foreground">پاییز ۱۴۰۵</div>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "مهندسی Frontend در مقیاس",
                  "Backend پایدار و قابل اتکا",
                  "محصول‌گرایی و طراحی تجربه",
                  "AI Engineering عملی",
                ].map((c) => (
                  <li key={c} className="flex items-center justify-between rounded-xl glass px-3 py-2.5">
                    <span>{c}</span>
                    <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1">
                      <Users className="size-3" /> ۵۰ نفر
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl gradient-brand p-4 text-primary-foreground">
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">ظرفیت باقی‌مانده</div>
                <div className="mt-1 font-display num text-3xl font-bold">۱۲ / ۵۰</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
