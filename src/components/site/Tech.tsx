import { SectionHead } from "./Process";
import { motion, AnimatePresence } from "motion/react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { useEffect, useState } from "react";
import {
  Atom,
  Triangle,
  FileCode2,
  Hexagon,
  Binary,
  Container,
  Database,
  Zap,
  Cloud,
  Server,
  type LucideIcon,
} from "lucide-react";

type Category = "core" | "infra";

type TechItem = {
  name: string;
  icon: LucideIcon;
  desc: string;
  category: Category;
};

const techs: TechItem[] = [
  {
    name: "React",
    icon: Atom,
    desc: "کتابخانه رابط کاربری تعاملی و کامپوننت‌محور.",
    category: "core",
  },
  {
    name: "Next.js",
    icon: Triangle,
    desc: "فریم‌ورک React برای رندر سمت سرور و عملکرد بالا.",
    category: "core",
  },
  {
    name: "TypeScript",
    icon: FileCode2,
    desc: "جاوااسکریپت با تایپ ایمن برای کد قابل اتکا.",
    category: "core",
  },
  {
    name: "Node",
    icon: Hexagon,
    desc: "اجرای جاوااسکریپت سمت سرور برای APIهای سریع.",
    category: "core",
  },
  {
    name: "Python",
    icon: Binary,
    desc: "زبان انعطاف‌پذیر برای اسکریپت، دیتا و اتوماسیون.",
    category: "core",
  },
  {
    name: "Docker",
    icon: Container,
    desc: "کانتینرسازی برای استقرار یکنواخت در هر محیط.",
    category: "infra",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    desc: "پایگاه‌داده رابطه‌ای قدرتمند و قابل اعتماد.",
    category: "infra",
  },
  {
    name: "Redis",
    icon: Zap,
    desc: "کش و صف پیام درون‌حافظه‌ای برای سرعت بالا.",
    category: "infra",
  },
  {
    name: "Cloudflare",
    icon: Cloud,
    desc: "CDN، امنیت شبکه و پردازش در لبه (Edge).",
    category: "infra",
  },
  {
    name: "AWS",
    icon: Server,
    desc: "زیرساخت ابری مقیاس‌پذیر برای هر بار ترافیکی.",
    category: "infra",
  },
];

const CATEGORY_STYLE: Record<Category, { border: string; bg: string; text: string; dot: string }> =
  {
    core: {
      border: "border-electric/60",
      bg: "bg-electric/10",
      text: "text-electric",
      dot: "bg-electric",
    },
    infra: {
      border: "border-violet/60",
      bg: "bg-violet/10",
      text: "text-violet",
      dot: "bg-violet",
    },
  };

export function Tech() {
  const [isClient, setIsClient] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => setIsClient(true), []);

  const inner = techs.filter((t) => t.category === "core");
  const outer = techs.filter((t) => t.category === "infra");
  const hoveredItem = techs.find((t) => t.name === hovered) ?? null;

  return (
    <section id="tech" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          kicker="تکنولوژی"
          title="استک مدرن، انتخاب شده با دلیل."
          subtitle="ابزار را بر اساس مسئله شما انتخاب می‌کنیم — نه براساس مد روز."
        />

        <div className="relative mt-16 grid items-center gap-10 lg:grid-cols-[1fr_520px]">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 pb-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-electric" />
                زبان و فریم‌ورک
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-violet" />
                زیرساخت و داده
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {techs.map((t) => {
                const style = CATEGORY_STYLE[t.category];
                const active = hovered === t.name;
                const Icon = t.icon;
                return (
                  <button
                    key={t.name}
                    onMouseEnter={() => setHovered(t.name)}
                    onMouseLeave={() => setHovered((h) => (h === t.name ? null : h))}
                    onFocus={() => setHovered(t.name)}
                    onBlur={() => setHovered((h) => (h === t.name ? null : h))}
                    className={`group flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-mono transition-all duration-300 ${
                      active
                        ? `glass-strong ${style.border} border shadow-glow`
                        : "glass border border-transparent"
                    }`}
                  >
                    <Icon
                      className={`size-3.5 shrink-0 transition-colors duration-300 ${active ? style.text : "text-muted-foreground/50"}`}
                    />
                    <span
                      className={
                        active ? "gradient-text font-semibold" : "font-semibold text-white/90"
                      }
                    >
                      {t.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              این فقط بخشی از ابزارهایی است که روزانه استفاده می‌کنیم. در هر پروژه، استک نهایی بر
              اساس نیاز محصول، تیم و مقیاس انتخاب می‌شود.
            </p>
          </div>

          {/* orbiting visual */}
          <div
            className="relative order-1 mx-auto aspect-square w-full max-w-[520px] lg:order-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
            }}
          >
            <div className="absolute inset-0 grid-bg opacity-40" />

            {/* radar sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gradient-to-b from-electric/70 to-transparent"
                style={{ translateX: "-50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* orbit rings + radar ticks */}
            <div className="absolute inset-[18%] rounded-full border border-white/10" />
            <div className="absolute inset-[6%] rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-[calc(50%-2px)] w-px origin-top bg-white/[0.06]"
                style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
              />
            ))}

            {/* center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative size-28 rounded-full gradient-brand shadow-glow animate-pulse-glow">
                <div className="absolute inset-2 overflow-hidden rounded-full bg-background/70 backdrop-blur">
                  <AnimatePresence mode="wait">
                    {hoveredItem ? (
                      <motion.div
                        key={hoveredItem.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-0 grid place-items-center px-2 text-center"
                      >
                        <div>
                          <hoveredItem.icon className="mx-auto size-5 text-white" />
                          <div className="mt-1 truncate text-[11px] font-bold tracking-wide">
                            {hoveredItem.name}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="core"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-0 grid place-items-center text-xs font-bold tracking-widest"
                      >
                        CORE
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {isClient && (
              <Orbit
                items={inner}
                radius={32}
                duration={26}
                hovered={hovered}
                setHovered={setHovered}
                paused={paused}
              />
            )}
            {isClient && (
              <Orbit
                items={outer}
                radius={46}
                duration={42}
                reverse
                hovered={hovered}
                setHovered={setHovered}
                paused={paused}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-n { to { transform: rotate(360deg); } }
        @keyframes spin-r { to { transform: rotate(-360deg); } }
      `}</style>
    </section>
  );
}

function Orbit({
  items,
  radius,
  duration,
  reverse,
  hovered,
  setHovered,
  paused,
}: {
  items: TechItem[];
  radius: number;
  duration: number;
  reverse?: boolean;
  hovered: string | null;
  setHovered: (v: string | null) => void;
  paused: boolean;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        animation: `${reverse ? "spin-r" : "spin-n"} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.round((50 + Math.cos(angle) * radius) * 100) / 100;
        const y = Math.round((50 + Math.sin(angle) * radius) * 100) / 100;
        const style = CATEGORY_STYLE[item.category];
        const active = hovered === item.name;
        const Icon = item.icon;

        return (
          <div
            key={item.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            suppressHydrationWarning
          >
            {/* counter-rotate: cancels the parent orbit spin so the icon stays upright */}
            <div
              style={{
                animation: `${reverse ? "spin-n" : "spin-r"} ${duration}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              <HoverCard.Root
                openDelay={60}
                closeDelay={60}
                onOpenChange={(open) => setHovered(open ? item.name : null)}
              >
                <HoverCard.Trigger asChild>
                  <button
                    type="button"
                    className={`relative flex size-11 items-center justify-center rounded-full border shadow-elevated transition-all duration-300 ${
                      active
                        ? `scale-125 ${style.border} ${style.bg} shadow-glow`
                        : "border-white/10 bg-background/80 backdrop-blur hover:border-white/25"
                    }`}
                  >
                    <Icon
                      className={`size-4 transition-colors duration-300 ${active ? style.text : "text-muted-foreground/70"}`}
                    />
                  </button>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    side="top"
                    sideOffset={12}
                    className="w-56 rounded-xl glass-strong p-4 text-right shadow-glow"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`size-4 ${style.text}`} />
                      <span className="font-mono text-sm font-semibold">{item.name}</span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.desc}</p>
                    <HoverCard.Arrow className="fill-white/10" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </div>
          </div>
        );
      })}
    </div>
  );
}
