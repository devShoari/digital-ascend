import { SectionHead } from "./Process";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const tech = [
  "React", "Next.js", "TypeScript", "Node",
  "Python", "Docker", "PostgreSQL", "Redis",
  "Cloudflare", "AWS",
];

export function Tech() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // distribute on two orbits
  const inner = tech.slice(0, 5);
  const outer = tech.slice(5);
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {tech.map((t) => (
                <div key={t} className="glass rounded-xl px-4 py-3 text-sm font-mono">
                  <span className="gradient-text font-semibold">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-7">
              این فقط بخشی از ابزارهایی است که روزانه استفاده می‌کنیم. در هر پروژه،
              استک نهایی بر اساس نیاز محصول، تیم و مقیاس انتخاب می‌شود.
            </p>
          </div>

          {/* orbiting visual */}
          <div className="relative order-1 mx-auto aspect-square w-full max-w-[520px] lg:order-2">
            <div className="absolute inset-0 grid-bg opacity-40" />
            {/* orbit rings */}
            <div className="absolute inset-[18%] rounded-full border border-white/10" />
            <div className="absolute inset-[6%] rounded-full border border-white/10" />
            {/* center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative size-28 rounded-full gradient-brand shadow-glow animate-pulse-glow">
                <div className="absolute inset-2 rounded-full bg-background/70 backdrop-blur" />
                <div className="absolute inset-0 grid place-items-center text-xs font-bold tracking-widest">
                  CORE
                </div>
              </div>
            </div>

            {/* inner orbit */}
            {isClient && <Orbit items={inner} radius={32} duration={26} />}
            {/* outer orbit */}
            {isClient && <Orbit items={outer} radius={46} duration={42} reverse />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Orbit({ items, radius, duration, reverse }: { items: string[]; radius: number; duration: number; reverse?: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{ animation: `${reverse ? "spin-r" : "spin-n"} ${duration}s linear infinite` }}
    >
      {items.map((t, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.round((50 + Math.cos(angle) * radius) * 100) / 100;
        const y = Math.round((50 + Math.sin(angle) * radius) * 100) / 100;
        return (
          <div
            key={t}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            suppressHydrationWarning
          >
            <motion.div
              className="glass-strong rounded-full px-3.5 py-1.5 text-xs font-mono whitespace-nowrap shadow-elevated"
              animate={{ rotate: reverse ? -360 : 360 }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ rotate: 0 }}
            >
              {t}
            </motion.div>
          </div>
        );
      })}
      <style>{`
        @keyframes spin-n { to { transform: rotate(360deg); } }
        @keyframes spin-r { to { transform: rotate(-360deg); } }
        @keyframes counter { to { transform: translate(-50%,-50%) rotate(-360deg); } }
      `}</style>
    </div>
  );
}
