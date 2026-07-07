import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProject, getRelatedProjects, type Project } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    const related = getRelatedProjects(params.slug);
    return { project, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "پروژه یافت نشد — استودیوی محتوا" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    const title = `${p.name} — مطالعه موردی`;
    const description = p.overview ?? p.solution;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectError,
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, related } = Route.useLoaderData() as {
    project: Project;
    related: Project[];
  };

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
        <div className="mx-auto max-w-5xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به پروژه‌ها
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {project.tag} · {project.year}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl"
          >
            <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
              {project.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            {project.overview ?? project.solution}
          </motion.p>
        </div>

        {/* Cover */}
        <div className="mx-auto mt-14 max-w-6xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-end p-10">
              <div className="text-white/90">
                <div className="text-xs uppercase tracking-[0.4em]">{project.category}</div>
                <div className="mt-2 font-display text-4xl font-bold md:text-6xl">{project.name}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-3xl border border-border bg-background/60 p-8 backdrop-blur-xl md:grid-cols-4">
          {[
            { k: "کارفرما", v: project.client ?? project.name },
            { k: "نقش ما", v: project.role ?? "طراحی و مهندسی" },
            { k: "زمان اجرا", v: project.duration ?? "—" },
            { k: "سال", v: project.year },
          ].map((m) => (
            <div key={m.k}>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {m.k}
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold md:text-4xl">اعداد کلیدی</h2>
            <div className="text-xs text-muted-foreground">اثر واقعی، اندازه‌گیری‌شده</div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((m) => (
              <div
                key={m.k}
                className="rounded-2xl border border-border bg-foreground/[0.03] p-8 text-center"
              >
                <div className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text font-display text-5xl font-bold text-transparent">
                  {m.v}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{m.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body: challenge + approach */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl font-bold">چالش</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.problem}</p>
            {project.challenges && project.challenges.length > 0 && (
              <ul className="mt-6 space-y-3">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-bold">رویکرد</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.solution}</p>

            {project.approach && project.approach.length > 0 && (
              <div className="mt-8 space-y-4">
                {project.approach.map((a, i) => (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{a.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-background/60 p-10 backdrop-blur-xl md:p-14">
            <h2 className="font-display text-3xl font-bold md:text-4xl">نتایج</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {project.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-foreground/[0.03] p-5 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tech */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold">تکنولوژی‌ها</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-foreground/[0.04] px-4 py-2 font-mono text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 p-10 text-center backdrop-blur-xl md:p-14">
            <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
              «{project.testimonial.quote}»
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{project.testimonial.author}</span> ·{" "}
              {project.testimonial.role}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-bold">پروژه‌های مرتبط</h2>
              <Link
                to="/projects"
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                همه پروژه‌ها
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/projects/$slug"
                  params={{ slug: r.slug }}
                  className="group overflow-hidden rounded-3xl border border-border bg-background/60 backdrop-blur-xl transition hover:border-foreground/20"
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient}`} />
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/80">
                          {r.tag}
                        </div>
                        <div className="mt-1 text-xl font-bold text-white">{r.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {r.solution}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 p-12 text-center backdrop-blur-xl md:p-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            پروژه شبیه {project.name} در ذهن دارید؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            بیایید درباره اهداف، محدودیت‌ها و اولین قدم‌ها صحبت کنیم.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-xl hover:shadow-violet-500/20"
          >
            شروع گفتگو
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProjectNotFound() {
  const { slug } = Route.useParams();
  return (
    <main dir="rtl" className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">پروژه یافت نشد</h1>
        <p className="mt-4 text-muted-foreground">
          پروژه‌ای با شناسه «{slug}» در دسترس نیست.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-foreground/30"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به فهرست پروژه‌ها
        </Link>
      </section>
      <Footer />
    </main>
  );
}

function ProjectError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main dir="rtl" className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-4xl font-bold">خطایی رخ داد</h1>
        <p className="mt-4 text-muted-foreground">در بارگذاری این پروژه مشکلی پیش آمد.</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-foreground/30"
        >
          تلاش دوباره
        </button>
      </section>
      <Footer />
    </main>
  );
}