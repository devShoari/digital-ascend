import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

const stats = [
  { k: "پروژه موفق", v: 140, suffix: "+" },
  { k: "سال تجربه", v: 9, suffix: "" },
  { k: "رضایت مشتری", v: 98, suffix: "٪" },
  { k: "میانگین بهبود عملکرد", v: 73, suffix: "٪" },
];

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14">
          <div className="pointer-events-none absolute -inset-x-20 -top-32 h-72 bg-gradient-to-b from-electric/15 via-violet/10 to-transparent blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Counter key={s.k} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ k, v, suffix, index }: { k: string; v: number; suffix: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (n) => Math.round(n).toLocaleString("fa-IR"));
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, v, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, mv, v]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="flex items-baseline gap-1 font-display text-5xl font-bold md:text-6xl num">
        <motion.span className="gradient-text">{rounded}</motion.span>
        <span className="gradient-text">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{k}</div>
    </motion.div>
  );
}
