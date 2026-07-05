import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, Github, Linkedin, Twitter, Search } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/experts")({
  head: () => ({
    meta: [
      { title: "متخصصین ما — محتوا" },
      {
        name: "description",
        content:
          "تیمی از طراحان، مهندسان، متخصصان سئو و استراتژیست‌های محصول که در استودیوی محتوا کنار هم محصولات دیجیتال جهانی می‌سازند.",
      },
      { property: "og:title", content: "متخصصین ما — محتوا" },
      {
        property: "og:description",
        content: "با تیم استودیوی محتوا آشنا شوید — طراحی، توسعه، سئو و استراتژی محصول.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: ExpertsPage,
});

type Expert = {
  name: string;
  role: string;
  team: "طراحی" | "مهندسی" | "سئو و رشد" | "استراتژی" | "خلاقیت";
  bio: string;
  skills: string[];
  gradient: string;
  initials: string;
};

const experts: Expert[] = [
  { name: "آرمین رستمی", role: "مدیر خلاقیت و بنیان‌گذار", team: "استراتژی", bio: "بیش از ۱۲ سال تجربه در طراحی محصولات دیجیتال برای برندهای بین‌المللی و استارتاپ‌های ایرانی.", skills: ["Product Vision", "Design Systems", "Brand"], gradient: "from-cyan-400 to-violet-500", initials: "AR" },
  { name: "نگار احمدی", role: "سرپرست طراحی محصول", team: "طراحی", bio: "طراحی تجربه‌های تعاملی، حرکتی و سه‌بعدی برای محصولات SaaS و اپلیکیشن‌های موبایل.", skills: ["Figma", "Motion", "3D UI"], gradient: "from-fuchsia-400 to-cyan-400", initials: "NA" },
  { name: "پویا مرادی", role: "مهندس ارشد فرانت‌اند", team: "مهندسی", bio: "متخصص React، Three.js و WebGL؛ سازنده رابط‌های کاربری با فریم‌ریت ۶۰ در تمام دستگاه‌ها.", skills: ["React", "Three.js", "GSAP"], gradient: "from-emerald-400 to-cyan-500", initials: "PM" },
  { name: "سارا کاظمی", role: "مهندس فول‌استک", team: "مهندسی", bio: "طراحی و پیاده‌سازی معماری‌های مقیاس‌پذیر با TypeScript، Node و پایگاه‌های داده ابری.", skills: ["TypeScript", "Node", "Postgres"], gradient: "from-violet-500 to-indigo-500", initials: "SK" },
  { name: "امیرحسین طاهری", role: "متخصص ارشد سئو تکنیکال", team: "سئو و رشد", bio: "بهینه‌سازی Core Web Vitals، معماری اطلاعات و رشد ارگانیک برای وب‌سایت‌های سازمانی.", skills: ["Technical SEO", "CWV", "Analytics"], gradient: "from-amber-400 to-rose-500", initials: "AT" },
  { name: "مریم فراهانی", role: "استراتژیست محتوا و برند", team: "سئو و رشد", bio: "روایت برند، معماری محتوا و کمپین‌های رشد ارگانیک برای بازارهای فارسی‌زبان و انگلیسی.", skills: ["Content Strategy", "SEO Copy", "Brand Voice"], gradient: "from-pink-400 to-orange-400", initials: "MF" },
  { name: "کیان دلاور", role: "مدیر پروژه و اسکرام‌مستر", team: "استراتژی", bio: "هدایت تیم‌های چندتخصصی با متدولوژی چابک و تحویل پیوسته پروژه‌های محصولی پیچیده.", skills: ["Agile", "Delivery", "Ops"], gradient: "from-sky-400 to-blue-600", initials: "KD" },
  { name: "الهام سلطانی", role: "طراح تعاملی و حرکتی", team: "خلاقیت", bio: "طراحی میکرو-اینتراکشن‌ها، انیمیشن‌های اسکرول و تجربه‌های تعاملی روی WebGL.", skills: ["Framer", "Rive", "After Effects"], gradient: "from-teal-400 to-lime-400", initials: "ES" },
];

const teams = ["همه", "طراحی", "مهندسی", "سئو و رشد", "استراتژی", "خلاقیت"] as const;

function ExpertsPage() {
  const [team, setTeam] = useState<(typeof teams)[number]>("همه");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return experts.filter((e) => {
      const matchTeam = team === "همه" || e.team === team;
      const q = query.trim();
      const matchQuery =
        !q ||
        e.name.includes(q) ||
        e.role.includes(q) ||
        e.skills.some((s) => s.toLowerCase().includes(q.toLowerCase()));
      return matchTeam && matchQuery;
    });
  }, [team, query]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_500px_at_90%_20%,rgba(168,85,247,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
      </div>

      <section className="relative px-6 pb-16 pt-40 md:pt-44">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-foreground/70 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]" />
            تیم استودیوی محتوا
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl"
          >
            متخصصینی که{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
              محصولات بزرگ
            </span>{" "}
            می‌سازند
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60"
          >
            تیمی چندتخصصی از طراحان، مهندسان، متخصصان سئو و استراتژیست‌ها که در کنار هم تجربه‌های
            دیجیتال ماندگار خلق می‌کنند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 md:flex-row"
          >
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو بر اساس نام، نقش یا مهارت…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-11 pl-4 text-sm text-foreground placeholder:text-foreground/40 backdrop-blur-xl outline-none transition focus:border-cyan-400/40 focus:bg-white/10"
              />
            </div>
          </motion.div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {teams.map((t) => (
              <button
                key={t}
                onClick={() => setTeam(t)}
                className={`relative rounded-full border px-4 py-2 text-sm transition ${
                  team === t
                    ? "border-transparent bg-foreground text-background"
                    : "border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <motion.article
              key={e.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div
                className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${e.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${e.gradient} font-bold text-white shadow-lg`}
                >
                  {e.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight">{e.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{e.role}</p>
                  <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-foreground/70">
                    {e.team}
                  </span>
                </div>
              </div>

              <p className="relative mt-5 text-sm leading-6 text-foreground/70">{e.bio}</p>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {e.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-foreground/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-2 text-foreground/50">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="rounded-full p-1.5 transition hover:bg-white/10 hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="rounded-full p-1.5 transition hover:bg-white/10 hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="rounded-full p-1.5 transition hover:bg-white/10 hover:text-foreground"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
                <span className="text-[11px] text-foreground/40">در دسترس برای پروژه</span>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-white/10 p-16 text-center text-foreground/50">
              متخصصی با این فیلتر پیدا نشد.
            </div>
          )}
        </div>

        <div className="mx-auto mt-20 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-10 text-center backdrop-blur-xl">
          <h2 className="text-3xl font-bold md:text-4xl">به تیم ما بپیوندید</h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/60">
            به دنبال افرادی هستیم که ساختن محصولات کلاس‌جهانی برایشان یک وسواس است.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
            >
              ارسال رزومه
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-foreground/80 backdrop-blur-xl transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به خانه
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
