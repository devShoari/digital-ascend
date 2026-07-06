import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  Terminal,
  GitBranch,
  Globe,
} from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ما — محتوا" },
      {
        name: "description",
        content:
          "محتوا یک استودیو محصول دیجیتال است که طراحی، توسعه و آموزش را با دیدگاه محصول‌محور ترکیب می‌کند.",
      },
      { property: "og:title", content: "درباره ما — محتوا" },
      {
        property: "og:description",
        content:
          "ما به برند‌های دیجیتال کمک می‌کنیم تا تجربه‌های دیجیتال کارآمد، زیبا و پایدار بسازند.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

/* ---------------------------------------------------------------- */
/* Signature element: an interactive constellation connecting the   */
/* studio's four disciplines. Cursor-reactive; falls back to a      */
/* single static frame under prefers-reduced-motion.                */
/* ---------------------------------------------------------------- */

const DISCIPLINES = ["طراحی", "مهندسی", "رشد", "محصول"];

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    if (!parent) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      label?: string;
    };

    let nodes: Node[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function seedNodes() {
      const count = width < 640 ? 14 : 24;
      const list: Node[] = [];
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.4 + Math.random() * 1.2,
        });
      }
      // Anchor the four discipline nodes at deliberate, evenly spread points.
      const anchors = [
        { x: 0.2, y: 0.3 },
        { x: 0.78, y: 0.22 },
        { x: 0.25, y: 0.75 },
        { x: 0.75, y: 0.72 },
      ];
      anchors.forEach((a, i) => {
        list[i] = {
          x: a.x * width,
          y: a.y * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 3.2,
          label: DISCIPLINES[i],
        };
      });
      nodes = list;
    }

    function resize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      const maxDist = Math.min(width, height) * 0.32;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const isAnchorLink = a.label && b.label;
            ctx.strokeStyle = isAnchorLink
              ? `rgba(255,165,87,${alpha + 0.15})`
              : `rgba(140,120,246,${alpha})`;
            ctx.lineWidth = isAnchorLink ? 1.1 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.label ? "rgba(255,190,120,0.95)" : "rgba(160,150,250,0.55)";
        ctx.shadowColor = n.label ? "rgba(255,165,87,0.8)" : "rgba(140,120,246,0.5)";
        ctx.shadowBlur = n.label ? 12 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (n.label) {
          ctx.font = "600 13px Vazirmatn, sans-serif";
          ctx.fillStyle = "rgba(237,239,244,0.85)";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y - 14);
        }
      }
    }

    function step() {
      for (const n of nodes) {
        // gentle drift
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // cursor repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 110;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          n.x += (dx / (dist || 1)) * force * 1.6;
          n.y += (dy / (dist || 1)) * force * 1.6;
        }
      }
      drawFrame();
      raf = requestAnimationFrame(step);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      raf = requestAnimationFrame(step);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ---------------------------------------------------------------- */
/* Bracket-frame module: the recurring structural device replacing  */
/* generic rounded glass cards. Corners tighten on hover/focus, and */
/* the surface tracks the cursor with a soft directional glow.      */
/* ---------------------------------------------------------------- */

function handleGlow(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function Module({
  tag,
  icon: Icon,
  title,
  children,
  className = "",
}: {
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      onMouseMove={handleGlow}
      className={`group relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-6 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(140,120,246,0.14), transparent 70%)",
        }}
      />
      <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-r-2 border-t-2 border-violet-400/30 transition group-hover:border-amber-300/70" />
      <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-violet-400/30 transition group-hover:border-amber-300/70" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-violet-400/30 transition group-hover:border-amber-300/70" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-violet-400/30 transition group-hover:border-amber-300/70" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center border border-foreground/10 bg-foreground/[0.03] text-amber-300/90">
            <Icon className="h-5 w-5" />
          </div>
          <span dir="ltr" className="font-mono text-[10px] tracking-[0.2em] text-violet-300/60">
            {tag}
          </span>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-[#EDEFF4]">{title}</h3>
        <div className="mt-2 text-sm leading-6 text-[#8A93A8]">{children}</div>
      </div>
    </div>
  );
}

function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const headlineWords = "پشت هر تجربه دیجیتال، یک تیم متعهد و خلاق ایستاده است".split(" ");

  const manifestoLines = [
    { label: "خلاقیت متمرکز", detail: "راهکارهایی که ساده، قدرتمند و احساس‌برانگیز هستند." },
    {
      label: "مشتری‌مداری جهانی",
      detail: "پروژه‌هایی که هم برای بازار محلی و هم برای مخاطب بین‌المللی آماده‌اند.",
    },
  ];

  const values = [
    {
      icon: HeartHandshake,
      tag: "COLLAB",
      title: "همکاری شفاف",
      description: "ارتباط مداوم، بازخورد منظم و تصمیم‌گیری مشترک در تمام مراحل پروژه.",
    },
    {
      icon: ShieldCheck,
      tag: "QUALITY",
      title: "تعهد به کیفیت",
      description: "تحویل کد تمیز، طراحی بی‌نقص و تجربه‌ای که فراتر از انتظارات عمل می‌کند.",
    },
    {
      icon: Sparkles,
      tag: "IMPACT",
      title: "نتایج واقعی",
      description: "تمرکز بر تاثیر کسب‌وکاری و ساخت محصولاتی که کاربر را به عمل وا می‌دارند.",
    },
  ];

  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-[#0A0C12] text-[#EDEFF4]">
      <Nav />

      {/* Blueprint grid, fixed and faint, present behind the whole page */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #0A0C12 75%)",
        }}
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="relative px-6 pt-40 pb-24 sm:px-8 lg:px-12">
        <div className="relative mx-auto h-[420px] max-w-6xl sm:h-[480px]">
          <ConstellationCanvas />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dir="ltr"
              className="mb-6 inline-flex items-center gap-2 border border-foreground/10 bg-foreground/[0.03] px-4 py-1.5 font-mono text-[11px] tracking-wider text-violet-300/80"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              STUDIO · ONLINE
              <span className="text-white/20">/</span>
              DESIGN × ENGINEERING × GROWTH
            </motion.div>

            <h1 className="flex max-w-3xl flex-wrap justify-center gap-x-3 gap-y-1 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22, rotateX: -35 }
                  }
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : 0.3 + i * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0.1 : 0.75 }}
              className="mt-6 max-w-2xl text-lg text-[#8A93A8]"
            >
              محتوا تیمی از طراحان، مهندسان و راهبران محصول است که با تمرکز بر کیفیت، سرعت اجرا و
              اثربخشی تجاری، محصولات دیجیتال را از ایده تا عرضه همراهی می‌کند.
            </motion.p>
          </div>
        </div>
      </section>
      <section className="relative px-6 py-24 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-foreground">ماموریت ما</h2>
              <p className="mt-4 text-muted-foreground leading-8">
                خلق تجربه‌های دیجیتال جذاب، قابل‌اعتماد و پایدار که کاربران را با برند شما همراه
                کند. ما به ساده‌سازی فرایندهای پیچیده و رسیدن به اهداف کسب‌وکار با سرعت و دقت اهمیت
                می‌دهیم.
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                  <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    طراحی مبتنی بر محصول
                  </div>
                  <div className="mt-3 text-2xl font-bold text-foreground">
                    تجربه‌ای که ارزش واقعی ایجاد می‌کند
                  </div>
                </div>
                <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                  <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    تحلیل و رشد
                  </div>
                  <div className="mt-3 text-2xl font-bold text-foreground">
                    تصمیم‌گیری بر پایه داده و حرکت رو به جلو
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-input bg-background/80 p-6 shadow-sm backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">تیم ارزش‌آفرین</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  مجموعه‌ای از متخصصان با تجربه در طراحی، توسعه و تجربه محصول.
                </p>
              </div>

              <div className="rounded-[28px] border border-input bg-background/80 p-6 shadow-sm backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">پایداری فرایند</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  رویکردی ساختاریافته برای تحویل محصولاتی که با رشد کسب‌وکار شما سازگار بمانند.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-input/50 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
              عقیده ما
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground">
              کاری که دوستش داریم انجام دهیم
            </h2>
            <p className="mt-4 text-muted-foreground leading-7">
              هر پروژه برای ما فرصتی است تا تجربه‌ای انسانی، دقیق و درباره‌محور بسازیم. ما با احترام
              به فرایند، مشتری و کاربر نهایی، نتایجی ایجاد می‌کنیم که هم زیباست و هم کارآمد.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-3xl border border-input/50 bg-background/70 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">خلاقیت متمرکز</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    راهکارهایی که ساده، قدرتمند و احساس‌برانگیز هستند.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-3xl border border-input/50 bg-background/70 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-500/10 text-slate-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">مشتری‌مداری جهانی</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    پروژه‌هایی که هم برای بازار محلی و هم برای مخاطب بین‌المللی آماده‌اند.
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              گفتگو با تیم ما
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: HeartHandshake,
              title: "همکاری شفاف",
              description: "ارتباط مداوم، بازخورد منظم و تصمیم‌گیری مشترک در تمام مراحل پروژه.",
            },
            {
              icon: ShieldCheck,
              title: "تعهد به کیفیت",
              description:
                "تحویل کد تمیز، طراحی بی‌نقص و تجربه‌ای که فراتر از انتظارات عمل می‌کند.",
            },
            {
              icon: Sparkles,
              title: "نتایج واقعی",
              description:
                "تمرکز بر تاثیر کسب‌وکاری و ساخت محصولاتی که کاربر را به عمل وا می‌دارند.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-3xl border border-input bg-background/80 p-6 shadow-sm backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-cyan-400">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
