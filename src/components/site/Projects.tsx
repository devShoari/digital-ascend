import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { SectionHead } from "./Process";

const projects = [
  {
    name: "نوا فین‌تک",
    tag: "Fintech · Web App",
    problem: "تجربه پیچیده سرمایه‌گذاری و افت نرخ تبدیل در onboarding.",
    solution: "بازطراحی کامل تجربه، خلاصه‌سازی فلوها و ساخت داشبورد بلادرنگ.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    metrics: [
      { k: "افزایش نرخ تبدیل", v: "۲٫۸×" },
      { k: "کاهش زمان onboarding", v: "−۶۴٪" },
      { k: "NPS", v: "+۴۲" },
    ],
    accent: "from-electric/40 to-violet/40",
  },
  {
    name: "اِستلا کامرس",
    tag: "E-commerce · Headless",
    problem: "کندی فروشگاه و افت سئو در صفحات محصول.",
    solution: "مهاجرت به معماری headless، بهینه‌سازی Core Web Vitals و سئو فنی.",
    tech: ["React", "Edge", "Cloudflare", "Algolia"],
    metrics: [
      { k: "LCP", v: "۰٫۹s" },
      { k: "ترافیک ارگانیک", v: "+۲۱۰٪" },
      { k: "درآمد ماهانه", v: "+۱٫۷×" },
    ],
    accent: "from-cyan/40 to-electric/40",
  },
  {
    name: "اَتلس AI",
    tag: "SaaS · AI Platform",
    problem: "نیاز به دستیار هوشمند برای تیم‌های پشتیبانی با دانش داخلی.",
    solution: "پلتفرم RAG با کنترل دقیق، evaluation و داشبورد مدیریت دانش.",
    tech: ["Python", "FastAPI", "pgvector", "OpenAI"],
    metrics: [
      { k: "زمان پاسخ", v: "−۷۸٪" },
      { k: "دقت پاسخ", v: "۹۴٪" },
      { k: "صرفه‌جویی ماهانه", v: "۳۲۰h" },
    ],
    accent: "from-violet/40 to-cyan/40",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="پروژه‌های منتخب"
          title="نتایج، نه فقط طراحی زیبا."
          subtitle="هر پروژه را با هدف کسب‌و‌کاری مشخص شروع می‌کنیم و موفقیت آن را با عدد می‌سنجیم."
        />
        <div className="mt-16 space-y-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, reverse }: { p: (typeof projects)[number]; reverse: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative grid items-stretch gap-0 overflow-hidden rounded-3xl glass-strong md:grid-cols-2"
    >
      {/* visual */}
      <div
        className={`relative order-1 ${reverse ? "md:order-2" : ""} aspect-[5/4] md:aspect-auto`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* mock browser frame */}
        <div className="absolute inset-6 rounded-2xl glass shadow-elevated overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
          </div>
          <div className="p-5 space-y-3">
            <div className="h-3 w-3/5 rounded-full gradient-brand opacity-90" />
            <div className="h-2 w-4/5 rounded-full bg-white/10" />
            <div className="h-2 w-2/5 rounded-full bg-white/10" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-14 rounded-lg glass" />
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-background/60 via-transparent to-transparent" />
      </div>

      {/* content */}
      <div
        className={`relative order-2 ${reverse ? "md:order-1" : ""} flex flex-col justify-center p-8 md:p-12`}
      >
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{p.tag}</div>
        <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">{p.name}</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Block label="مسئله" value={p.problem} />
          <Block label="راه‌حل" value={p.solution} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full glass px-3 py-1 text-[11px] font-mono text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {p.metrics.map((m) => (
            <div key={m.k} className="rounded-xl glass p-3">
              <div className="text-xl font-bold num gradient-text">{m.v}</div>
              <div className="mt-1 text-[10px] text-muted-foreground leading-snug">{m.k}</div>
            </div>
          ))}
        </div>

        <a
          href="/contact"
          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground/90 hover:text-foreground"
        >
          مشاهده مطالعه موردی
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      <p className="mt-1.5 text-sm leading-7 text-foreground/90">{value}</p>
    </div>
  );
}
