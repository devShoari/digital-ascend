import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHead } from "./Process";
import { Code2, Database, Palette, Search, ShieldCheck } from "lucide-react";

const services = [
  {
    id: "ux",
    icon: Palette,
    t: "UI / UX Design",
    d: "طراحی تجربه‌های کاربری مدرن، کاربردی و داده‌محور از ایده تا محصول نهایی.",
    points: [
      "UX Research & User Flow",
      "Wireframe & Interactive Prototype",
      "Design System & Component Library",
      "Developer Handoff & Design QA",
    ],
  },
  {
    id: "fe",
    icon: Code2,
    t: "Frontend Development",
    d: "توسعه رابط‌های کاربری سریع، واکنش‌گرا و بهینه با جدیدترین تکنولوژی‌های وب.",
    points: [
      "React, Next.js & TypeScript",
      "Tailwind CSS & Modern UI",
      "SSR, Performance & Accessibility",
      "Advanced Animations (Motion / GSAP)",
    ],
  },
  {
    id: "be",
    icon: Database,
    t: "Backend Development",
    d: "طراحی و پیاده‌سازی APIها و زیرساخت‌های مقیاس‌پذیر با تمرکز بر امنیت و عملکرد.",
    points: [
      "Node.js & Python",
      "REST API & Authentication",
      "PostgreSQL, Redis & Caching",
      "Docker, CI/CD & Monitoring",
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    t: "Application Security",
    d: "افزایش امنیت برنامه‌های تحت وب بر اساس استانداردهای OWASP و مفاهیم SANS SEC542.",
    points: [
      "Web Application Security Review",
      "OWASP Top 10 Assessment",
      "Secure Coding Best Practices",
      "SANS SEC542 Methodology",
    ],
  },
  {
    id: "seo",
    icon: Search,
    t: "Technical SEO",
    d: "بهینه‌سازی فنی و محتوایی برای افزایش دیده‌شدن، سرعت و رشد ارگانیک.",
    points: [
      "Technical SEO Audit",
      "Core Web Vitals Optimization",
      "Structured Data & Schema",
      "Content Strategy & Analytics",
    ],
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const cur = services[activeIndex];

  const goToService = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="خدمات"
          title="یک استودیو، تمام مراحل ساخت محصول."
          subtitle="تیمی منسجم از طراح، توسعه‌دهنده، مهندس داده و متخصص رشد — کنار شما در تمام طول مسیر."
        />

        <div dir="ltr" className="mt-16 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* sidebar */}
          <ul className="glass h-fit rounded-2xl p-2">
            {services.map((s, index) => {
              const Icon = s.icon;
              const isActive = activeIndex === index;

              return (
                <li key={s.id}>
                  <button
                    onClick={() => goToService(index)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="svc-pill"
                        className="absolute inset-0 rounded-xl bg-foreground/5 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative flex size-8 items-center justify-center rounded-lg ${isActive ? "gradient-brand text-primary-foreground" : "glass"}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="relative">{s.t}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* panel */}
          <div
            className="glass-strong relative min-h-105 overflow-hidden rounded-3xl p-8 md:p-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="pointer-events-none absolute -inset-x-10 -top-20 h-60 bg-linear-to-b from-electric/15 to-transparent blur-2xl" />
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  key={activeIndex}
                  className="h-full rounded-full gradient-brand"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isHovered ? undefined : "100%",
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                  }}
                  onAnimationComplete={() => {
                    if (!isHovered) {
                      setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
                    }
                  }}
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                auto
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  سرویس
                </div>
                <h3 className="mt-2 text-center w-full font-display text-4xl font-bold md:text-5xl">
                  {cur.t}
                </h3>
                <p
                  dir="rtl"
                  className="mt-4 text-center w-full text-muted-foreground leading-8 md:text-lg"
                >
                  {cur.d}
                </p>
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
