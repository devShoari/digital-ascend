import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHead } from "./Process";
import { Brain, Cloud, Code2, Database, Layers, Palette, Search, Zap } from "lucide-react";

const services = [
  { id: "ux", icon: Palette, t: "UI / UX", d: "طراحی محصول با تمرکز روی نتیجه — از پژوهش کاربر تا سیستم طراحی منسجم.", points: ["پژوهش کاربر و تست تجربه", "Wireframe و پروتوتایپ تعاملی", "سیستم طراحی مقیاس‌پذیر", "همکاری مستقیم با تیم توسعه"] },
  { id: "fe", icon: Code2, t: "Frontend", d: "رابط‌های پرسرعت، در دسترس و فوق‌العاده تعاملی روی استک‌های مدرن.", points: ["React / Next.js / TypeScript", "انیمیشن سطح بالا با Motion / GSAP", "دسترسی‌پذیری و عملکرد", "هم‌راستا با سیستم طراحی"] },
  { id: "be", icon: Database, t: "Backend", d: "معماری قابل اتکا و آماده برای مقیاس از روز اول.", points: ["Node, Python, PostgreSQL, Redis", "API های REST و GraphQL", "Event-driven و صف‌ها", "تست، مشاهده‌پذیری، CI/CD"] },
  { id: "seo", icon: Search, t: "SEO", d: "سئوی فنی و محتوایی برای رشد ارگانیک پایدار.", points: ["ممیزی فنی و Core Web Vitals", "استراتژی محتوا و کلیدواژه", "ساختاردهی و schema", "گزارش‌دهی شفاف"] },
  { id: "ai", icon: Brain, t: "AI", d: "ادغام هوشمندی واقعی در محصول — نه فقط دموی LLM.", points: ["RAG و agent ها", "ادغام مدل‌های متن، صوت و تصویر", "خط‌لوله داده و evaluation", "هزینه و امنیت بهینه"] },
  { id: "cloud", icon: Cloud, t: "Cloud", d: "زیرساخت ابری حرفه‌ای روی AWS و Cloudflare.", points: ["معماری چندناحیه", "Edge و serverless", "امنیت و IAM", "هزینه‌سازی هوشمند"] },
  { id: "infra", icon: Layers, t: "Infrastructure", d: "DevOps، رصد و قابلیت اطمینان به سبک شرکت‌های بزرگ.", points: ["Kubernetes و Docker", "CI/CD کامل", "Observability و SLO", "بازیابی فاجعه"] },
  { id: "auto", icon: Zap, t: "Automation", d: "اتوماسیون فرآیندها و گردش‌کار داخلی برای صرفه‌جویی واقعی.", points: ["یکپارچه‌سازی سیستم‌ها", "اتوماسیون داده و گزارش‌گیری", "ابزار داخلی و دشبورد", "Workflow های هوشمند"] },
];

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const cur = services.find((s) => s.id === active)!;
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="خدمات"
          title="یک استودیو، تمام مراحل ساخت محصول."
          subtitle="تیمی منسجم از طراح، توسعه‌دهنده، مهندس داده و متخصص رشد — کنار شما در تمام طول مسیر."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* sidebar */}
          <ul className="glass rounded-2xl p-2">
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="svc-pill"
                        className="absolute inset-0 rounded-xl bg-white/5 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className={`relative flex size-8 items-center justify-center rounded-lg ${isActive ? "gradient-brand text-primary-foreground" : "glass"}`}>
                      <Icon className="size-4" />
                    </span>
                    <span className="relative">{s.t}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* panel */}
          <div className="glass-strong relative min-h-[420px] overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="pointer-events-none absolute -inset-x-10 -top-20 h-60 bg-gradient-to-b from-electric/15 to-transparent blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">سرویس</div>
                <h3 className="mt-2 font-display text-4xl font-bold md:text-5xl">{cur.t}</h3>
                <p className="mt-4 max-w-2xl text-muted-foreground leading-8 md:text-lg">{cur.d}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {cur.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-xl glass p-3.5 text-sm">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full gradient-brand" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
