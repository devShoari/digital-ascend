import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "پروژه‌ها — استودیوی محتوا" },
      {
        name: "description",
        content:
          "منتخبی از پروژه‌های استودیوی محتوا در حوزه فین‌تک، تجارت الکترونیک، هوش مصنوعی و SaaS — با نتایج قابل اندازه‌گیری.",
      },
      { property: "og:title", content: "پروژه‌ها — استودیوی محتوا" },
      {
        property: "og:description",
        content: "کارهای منتخب ما با نتایج واقعی: نرخ تبدیل، سرعت، درآمد و رشد ارگانیک.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProjectsPage,
});

type Category = "همه" | "فین‌تک" | "کامرس" | "SaaS" | "هوش مصنوعی" | "برند";

type Project = {
  slug: string;
  name: string;
  tag: string;
  category: Exclude<Category, "همه">;
  year: string;
  problem: string;
  solution: string;
  tech: string[];
  metrics: { k: string; v: string }[];
  gradient: string;
};

const projects: Project[] = [
  {
    slug: "nova-fintech",
    name: "نوا فین‌تک",
    tag: "Fintech · Web App",
    category: "فین‌تک",
    year: "۱۴۰۳",
    problem: "تجربه پیچیده سرمایه‌گذاری و افت نرخ تبدیل در onboarding.",
    solution: "بازطراحی کامل تجربه، خلاصه‌سازی فلوها و ساخت داشبورد بلادرنگ.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    metrics: [
      { k: "افزایش نرخ تبدیل", v: "۲٫۸×" },
      { k: "کاهش زمان onboarding", v: "−۶۴٪" },
      { k: "NPS", v: "+۴۲" },
    ],
    gradient: "from-cyan-400 to-violet-500",
  },
  {
    slug: "stella-commerce",
    name: "اِستلا کامرس",
    tag: "E-commerce · Headless",
    category: "کامرس",
    year: "۱۴۰۳",
    problem: "کندی فروشگاه و افت سئو در صفحات محصول.",
    solution: "مهاجرت به معماری headless، بهینه‌سازی Core Web Vitals و سئو فنی.",
    tech: ["React", "Edge", "Cloudflare", "Algolia"],
    metrics: [
      { k: "LCP", v: "۰٫۹s" },
      { k: "ترافیک ارگانیک", v: "+۲۱۰٪" },
      { k: "درآمد ماهانه", v: "+۱٫۷×" },
    ],
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    slug: "atlas-ai",
    name: "اَتلس AI",
    tag: "SaaS · AI Platform",
    category: "هوش مصنوعی",
    year: "۱۴۰۳",
    problem: "نیاز به دستیار هوشمند برای تیم‌های پشتیبانی با دانش داخلی.",
    solution: "پلتفرم RAG با کنترل دقیق، evaluation و داشبورد مدیریت دانش.",
    tech: ["Python", "FastAPI", "pgvector", "OpenAI"],
    metrics: [
      { k: "زمان پاسخ", v: "−۷۸٪" },
      { k: "دقت پاسخ", v: "۹۴٪" },
      { k: "صرفه‌جویی ماهانه", v: "۳۲۰h" },
    ],
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "orbit-saas",
    name: "اوربیت اَنالیتیکس",
    tag: "SaaS · Analytics",
    category: "SaaS",
    year: "۱۴۰۲",
    problem: "داشبوردهای کند و پراکنده برای تیم‌های محصول.",
    solution: "طراحی مجدد معماری داده، کوئری‌های استریمی و UI کاملاً کیبورد-محور.",
    tech: ["Remix", "ClickHouse", "tRPC", "D3"],
    metrics: [
      { k: "زمان کوئری", v: "−۸۱٪" },
      { k: "نرخ نگه‌داشت", v: "+۳۸٪" },
      { k: "ARR", v: "+۲٫۲×" },
    ],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    slug: "mira-bank",
    name: "میرا بانک",
    tag: "Fintech · Mobile",
    category: "فین‌تک",
    year: "۱۴۰۲",
    problem: "اپلیکیشن قدیمی با تجربه ناهماهنگ در iOS و Android.",
    solution: "طراحی سیستم طراحی مشترک و بازنویسی با React Native و ماژول‌های بومی.",
    tech: ["React Native", "Swift", "Kotlin", "Sentry"],
    metrics: [
      { k: "کرش‌ریت", v: "۰٫۰۲٪" },
      { k: "امتیاز اپ استور", v: "۴٫۸" },
      { k: "کاربر فعال روزانه", v: "+۱٫۹×" },
    ],
    gradient: "from-orange-400 to-pink-500",
  },
  {
    slug: "kian-brand",
    name: "بازآفرینی برند کیان",
    tag: "Brand · Identity",
    category: "برند",
    year: "۱۴۰۲",
    problem: "هویت بصری قدیمی و ناهماهنگ در نقاط تماس دیجیتال و چاپی.",
    solution: "استراتژی برند، سیستم بصری کامل و راهنمای صدای برند دو زبانه.",
    tech: ["Figma", "After Effects", "Design Tokens"],
    metrics: [
      { k: "یادآوری برند", v: "+۵۵٪" },
      { k: "زمان تولید محتوا", v: "−۴۰٪" },
      { k: "پوشش رسانه‌ای", v: "+۳×" },
    ],
    gradient: "from-rose-400 to-amber-400",
  },
  {
    slug: "pulse-marketplace",
    name: "پالس مارکت‌پلیس",
    tag: "E-commerce · Marketplace",
    category: "کامرس",
    year: "۱۴۰۱",
    problem: "مدیریت هزاران فروشنده با پنل‌های ناکارآمد.",
    solution: "پنل چند‌مستأجری، سیستم پرداخت تفکیک‌شده و ابزارهای اتوماسیون.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Stripe Connect"],
    metrics: [
      { k: "GMV سالانه", v: "+۲٫۴×" },
      { k: "فروشندگان فعال", v: "+۱۸۰٪" },
      { k: "تیکت پشتیبانی", v: "−۵۲٪" },
    ],
    gradient: "from-teal-400 to-blue-500",
  },
  {
    slug: "vera-copilot",
    name: "وِرا کوپایلوت",
    tag: "AI · Productivity",
    category: "هوش مصنوعی",
    year: "۱۴۰۱",
    problem: "تیم‌های حقوقی درگیر بازبینی دستی قراردادهای طولانی.",
    solution: "کوپایلوت اختصاصی با ارزیابی ریسک و پیشنهاد بازنویسی بند به بند.",
    tech: ["LangChain", "Postgres", "Next.js", "Vercel AI"],
    metrics: [
      { k: "زمان بازبینی", v: "−۷۰٪" },
      { k: "دقت شناسایی ریسک", v: "۹۱٪" },
      { k: "قرارداد در ماه", v: "×۴" },
    ],
    gradient: "from-fuchsia-500 to-purple-600",
  },
];

const categories: Category[] = ["همه", "فین‌تک", "کامرس", "SaaS", "هوش مصنوعی", "برند"];

function ProjectsPage() {
  const [category, setCategory] = useState<Category>("همه");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchC = category === "همه" || p.category === category;
      const query = q.trim().toLowerCase();
      const matchQ =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query));
      return matchC && matchQ;
    });
  }, [category, q]);

  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute right-1/4 top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/4 top-64 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-40 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            پروژه‌های منتخب استودیو
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl"
          >
            کارهایی که به آن‌ها{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              افتخار می‌کنیم
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            هر پروژه با یک هدف تجاری روشن شروع می‌شود و با اعداد واقعی سنجیده می‌شود. اینجا نمونه‌ای
            از همکاری‌های ما با استارتاپ‌ها و برندهای بزرگ را می‌بینید.
          </motion.p>
        </div>

        {/* Search + Filter */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در پروژه‌ها، تکنولوژی‌ها یا صنایع..."
              className="w-full rounded-2xl border border-border bg-background/60 py-4 pr-12 pl-4 text-sm backdrop-blur-xl transition placeholder:text-muted-foreground focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === c
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-foreground/[0.04] text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border py-24 text-center text-muted-foreground">
              چیزی برای «{q || category}» پیدا نشد.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background/60 backdrop-blur-xl transition hover:border-foreground/20"
                >
                  {/* Cover */}
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/80">
                          {p.tag}
                        </div>
                        <div className="mt-1 text-2xl font-bold text-white">{p.name}</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 rounded-full bg-black/30 px-3 py-1 text-[11px] text-white backdrop-blur-md">
                      {p.year}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-7 text-muted-foreground">
                      <span className="text-foreground/90">مسئله: </span>
                      {p.problem}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="text-foreground/90">راه‌حل: </span>
                      {p.solution}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {p.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="rounded-xl border border-border bg-foreground/[0.03] p-3 text-center"
                        >
                          <div className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-lg font-bold text-transparent">
                            {m.v}
                          </div>
                          <div className="mt-1 text-[10px] leading-tight text-muted-foreground">
                            {m.k}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 transition group-hover:text-foreground"
                    >
                      درخواست مطالعه موردی
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 p-12 text-center backdrop-blur-xl md:p-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            پروژه بعدی شما اینجا جای دارد.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            اگر ایده‌ای دارید که می‌خواهد جهان را کمی بهتر کند، ما آماده‌ایم کنارتان باشیم — از
            استراتژی تا اجرا.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-xl hover:shadow-violet-500/20"
          >
            شروع گفتگو
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}