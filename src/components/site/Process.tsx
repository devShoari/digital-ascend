import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  { t: "ایده", d: "همفکری برای تبدیل ایده اولیه به یک چشم‌انداز محصول قابل اجرا." },
  { t: "تحقیق", d: "تحلیل بازار، رقبا و کاربران واقعی برای پایه‌گذاری تصمیم‌های درست." },
  { t: "UX", d: "طراحی تجربه و معماری اطلاعات با تمرکز روی نتایج کسب‌و‌کار." },
  { t: "UI", d: "طراحی بصری دقیق، سیستم طراحی منسجم و حس برند." },
  { t: "توسعه", d: "پیاده‌سازی با کیفیت بالا، تست‌پذیر و قابل اتکا در مقیاس." },
  { t: "انتشار", d: "راه‌اندازی نرم، مانیتورینگ و آماده‌سازی برای رشد." },
  { t: "رشد", d: "بهینه‌سازی مداوم، سئو، آنالیتیکس و افزایش تبدیل." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          kicker="فرآیند"
          title="از ایده تا رشد، در ۷ گام دقیق"
          subtitle="هر گام به‌صورت مستقل ارزش می‌سازد و کنار هم، یک محصول دیجیتال قابل اتکا را شکل می‌دهد."
        />
        <div ref={ref} className="relative mt-20 pr-6 md:pr-10">
          {/* track */}
          <div className="absolute right-3 md:right-5 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute right-3 md:right-5 top-0 w-px gradient-brand shadow-glow"
          />
          <ul className="space-y-14">
            {steps.map((s, i) => (
              <Step key={s.t} index={i} {...s} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Step({ t, d, index }: { t: string; d: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, delay: index * 0.03 }}
      className="relative flex gap-6"
    >
      <div className="absolute right-0 md:right-2 -translate-y-1/2 top-5 flex size-7 items-center justify-center rounded-full glass-strong text-[10px] font-mono num text-foreground shadow-glow">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="mr-12 md:mr-16 flex-1">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">گام {index + 1}</div>
        <h3 className="mt-1 text-2xl font-semibold md:text-3xl">{t}</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground leading-8">{d}</p>
      </div>
    </motion.li>
  );
}

export function SectionHead({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="size-1.5 rounded-full gradient-brand" />
        {kicker}
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl text-balance">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground leading-8 md:text-lg">{subtitle}</p>}
    </div>
  );
}
