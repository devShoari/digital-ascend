import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "./Process";
import { projects } from "@/lib/projects-data";

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="پروژه‌های منتخب"
          title="نتایج، نه فقط طراحی زیبا."
          subtitle="هر پروژه را با هدف کسب‌و‌کاری مشخص شروع می‌کنیم و موفقیت آن را با عدد می‌سنجیم."
        />
        <div className="mt-16 space-y-10 grid lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number]; reverse: boolean }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="group h-fit relative block overflow-hidden rounded-3xl glass-strong"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            width={600}
            height={400}
            className="object-contain w-full animate-image-scroll "
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <div className="translate-y-4 scale-90 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100">
            <span className="flex items-center gap-2">
              Visit Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 transition-all duration-300 group-hover:opacity-60 group-hover:blur-[1px]">
        <div className="text-xs text-left uppercase tracking-[0.3em] text-muted-foreground">
          {p.tag}
        </div>
        <h3 className="mt-2 text-left font-display text-3xl font-bold md:text-4xl">{p.name}</h3>

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

        <div dir="ltr" className="mt-8 grid grid-cols-3 gap-4">
          {p.metrics.map((m, index) => (
            <motion.div
              key={m.k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
              }}
              className="
        relative overflow-hidden rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-4
        backdrop-blur-xl
        transition-all duration-300
        group-hover:border-electric/30
        hover:-translate-y-1
      "
            >
              {/* glow */}
              <div
                className="
          absolute -right-8 -top-8
          h-20 w-20 rounded-full
          bg-electric/20 blur-3xl
          opacity-0 transition-opacity
          group-hover:opacity-100
        "
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase font-bold gradient-text">{m.v}</span>

                  <div className="h-2 w-2 rounded-full bg-electric shadow-[0_0_12px_currentColor]" />
                </div>

                <div className="mt-1 text-xs text-muted-foreground">{m.k}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5 transition-all duration-300 group-hover:border-electric/40" />
    </motion.a>
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
