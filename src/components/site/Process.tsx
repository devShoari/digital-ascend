"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Progress from "@radix-ui/react-progress";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Lightbulb,
  Search,
  LayoutPanelTop,
  PenTool,
  Code2,
  Rocket,
  LineChart,
  type LucideIcon,
} from "lucide-react";

type Step = { t: string; d: string; icon: LucideIcon };

const steps: Step[] = [
  {
    t: "ایده",
    d: "همفکری برای تبدیل ایده اولیه به یک چشم‌انداز محصول قابل اجرا.",
    icon: Lightbulb,
  },
  {
    t: "تحقیق",
    d: "تحلیل بازار، رقبا و کاربران واقعی برای پایه‌گذاری تصمیم‌های درست.",
    icon: Search,
  },
  { t: "UX", d: "طراحی تجربه و معماری اطلاعات با تمرکز روی نتایج کسب‌وکار.", icon: LayoutPanelTop },
  { t: "UI", d: "طراحی بصری دقیق، سیستم طراحی منسجم و حس برند.", icon: PenTool },
  { t: "توسعه", d: "پیاده‌سازی با کیفیت بالا، تست‌پذیر و قابل اتکا در مقیاس.", icon: Code2 },
  { t: "انتشار", d: "راه‌اندازی نرم، مانیتورینگ و آماده‌سازی برای رشد.", icon: Rocket },
  { t: "رشد", d: "بهینه‌سازی مداوم، سئو، آنالیتیکس و افزایش تبدیل.", icon: LineChart },
];

// ---------- circuit layout (viewBox units) ----------
const VW = 1000;
const STEP_H = 200;
const VH = steps.length * STEP_H;
const TRUNK_X = 500;
const STUB_LEN = 130;

const nodeY = (i: number) => STEP_H / 2 + i * STEP_H;
const TRUNK_PATH = `M ${TRUNK_X} 60 L ${TRUNK_X} ${VH - 60}`;

function stubPath(y: number, dir: 1 | -1) {
  const kx = TRUNK_X + dir * 22;
  const ex = TRUNK_X + dir * STUB_LEN;
  return `M ${TRUNK_X} ${y} L ${kx} ${y + 16} L ${ex} ${y + 16}`;
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduceMotion = useReducedMotion();

  const [pathLength, setPathLength] = useState(0);
  const [beaconY, setBeaconY] = useState(60);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 35%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const dashOffset = useTransform(smoothProgress, (v) => pathLength * (1 - v));

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));

    if (pathRef.current && pathLength) {
      const pt = pathRef.current.getPointAtLength(clamped * pathLength);
      setBeaconY(pt.y);
    }

    const idx = Math.min(steps.length - 1, Math.floor(clamped * steps.length));
    setActiveIndex((prev) => (idx !== prev ? idx : prev));
  });

  return (
    <Tooltip.Provider delayDuration={150}>
      <section id="process" ref={sectionRef} dir="rtl" className="relative overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 -top-40 size-[500px] -translate-x-1/2 rounded-full bg-electric/5 blur-[140px]" />
          <div className="absolute right-1/4 -bottom-40 size-[500px] translate-x-1/2 rounded-full bg-violet/5 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              kicker="فرآیند"
              title="از ایده تا رشد، در ۷ گام دقیق"
              subtitle="هر گام به‌صورت مستقل ارزش می‌سازد و کنار هم، مسیر یک محصول دیجیتال قابل اتکا را شکل می‌دهد."
            />
         </div>

          {/* ---------- desktop circuit ---------- */}
          <div className="relative mt-20 hidden md:block" style={{ height: VH }}>
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              preserveAspectRatio="none"
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <filter id="beaconGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="9" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* base trunk */}
              <path d={TRUNK_PATH} fill="none" strokeWidth={2} className="stroke-white/[0.07]" />

              {/* branch stubs */}
              {steps.map((_, i) => (
                <path
                  key={i}
                  d={stubPath(nodeY(i), i % 2 === 0 ? -1 : 1)}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className={
                    i <= activeIndex
                      ? "stroke-electric/70 transition-[stroke] duration-500"
                      : "stroke-white/[0.07] transition-[stroke] duration-500"
                  }
                />
              ))}

              {/* animated trunk glow + crisp line */}
              <motion.path
                d={TRUNK_PATH}
                fill="none"
                strokeWidth={6}
                strokeLinecap="round"
                className="stroke-electric/40 blur-[3px]"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: reduceMotion ? 0 : dashOffset,
                }}
              />
              <motion.path
                ref={pathRef}
                d={TRUNK_PATH}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                className="stroke-electric"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: reduceMotion ? 0 : dashOffset,
                }}
              />

              {!reduceMotion && pathLength > 0 && (
                <g filter="url(#beaconGlow)">
                  <circle cx={TRUNK_X} cy={beaconY} r={7} className="fill-white" />
                  <circle cx={TRUNK_X} cy={beaconY} r={3} className="fill-electric" />
                </g>
              )}
            </svg>

            <div className="relative h-full">
              {steps.map((s, i) => (
                <CircuitNode
                  key={s.t}
                  step={s}
                  index={i}
                  dir={i % 2 === 0 ? -1 : 1}
                  active={i <= activeIndex}
                />
              ))}
            </div>
          </div>

          {/* ---------- mobile timeline ---------- */}
          <div className="relative mt-16 md:hidden">
            <div className="absolute right-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-electric/40 via-violet/30 to-transparent" />
            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <MobileStep key={s.t} step={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
}

function CircuitNode({
  step,
  index,
  dir,
  active,
}: {
  step: Step;
  index: number;
  dir: 1 | -1;
  active: boolean;
}) {
  const Icon = step.icon;
  const topPct = (nodeY(index) / VH) * 100;
  const percentHere = Math.round(((index + 1) / steps.length) * 100);
  const nodeLeftPct = (TRUNK_X / VW) * 100;
  const cardEdgePct = ((TRUNK_X + dir * STUB_LEN) / VW) * 100;

  // Node and card are positioned directly against the full-width track
  // (the "relative h-full" wrapper in Process()), not against each other —
  // an intermediate zero-width absolute wrapper is what previously made
  // everything collapse onto one side regardless of `dir`.
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="absolute cursor-default"
        style={{ top: `${topPct}%`, left: `${48}%`, transform: "translate(-50%, -50%)" }}
      >
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="relative">
              <div
                className={`flex size-12 rotate-45 items-center justify-center rounded-lg border transition-all duration-500 ${
                  active
                    ? "border-electric/60 gradient-brand shadow-glow"
                    : "border-foreground/10 bg-foreground/[0.02]"
                }`}
              >
                <Icon
                  className={`size-4 -rotate-45 transition-colors duration-500 ${
                    active ? "text-white" : "text-muted-foreground/50"
                  }`}
                />
              </div>
              <span className="absolute -left-2 -top-2 size-2 border-l border-t border-white/15" />
              <span className="absolute -right-2 -bottom-2 size-2 border-b border-r border-white/15" />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={12}
              className="rounded-lg glass-strong px-3 py-1.5 text-xs text-muted-foreground shadow-glow"
            >
              {`${percentHere}% از مسیر طی شده`}
              <Tooltip.Arrow className="fill-white/10" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </motion.div>

      {/* card, anchored to the outer end of its branch stub */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="absolute w-[300px]"
        style={
          dir === -1
            ? { top: `${topPct}%`, right: `${100 - cardEdgePct}%`, transform: "translateY(-50%)" }
            : { top: `${topPct}%`, left: `${cardEdgePct}%`, transform: "translateY(-50%)" }
        }
      >
        <div className="group relative rounded-2xl border border-foreground/[0.06] glass-strong p-6 text-right transition-all duration-500 hover:border-electric/25 hover:shadow-glow">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-electric/[0.03] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {`گام ${String(index + 1).padStart(2, "0")}`}
            </div>
            <h3 className="mt-1 text-lg font-semibold md:text-xl">{step.t}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{step.d}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function MobileStep({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex gap-4 pr-12"
    >
      <div className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-lg border border-foreground/10 bg-background">
        <Icon className="size-4 text-electric" />
      </div>
      <div className="flex-1 rounded-2xl border border-foreground/[0.06] glass-strong p-5 text-right">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {`گام ${String(index + 1).padStart(2, "0")}`}
        </div>
        <h3 className="mt-1 text-lg font-semibold">{step.t}</h3>
        <p className="mt-2 leading-7 text-muted-foreground">{step.d}</p>
      </div>
    </motion.div>
  );
}

export function SectionHead({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}): ReactNode {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="size-1.5 rounded-full gradient-brand" />
        {kicker}
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 leading-8 text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
