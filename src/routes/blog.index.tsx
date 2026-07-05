import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Calendar, Clock } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { posts } from "@/lib/blog-data";

const MotionLink = motion.create(Link);

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "بلاگ محتوا — بینش‌هایی از دنیای محصول دیجیتال" },
      {
        name: "description",
        content:
          "مقالات، تجربه‌ها و تحلیل‌های تیم محتوا در حوزه طراحی محصول، مهندسی وب، سئو تکنیکال و استراتژی رشد.",
      },
      { property: "og:title", content: "بلاگ محتوا" },
      {
        property: "og:description",
        content: "مقالات و تحلیل‌های تیم محتوا در حوزه محصول دیجیتال، طراحی، مهندسی و رشد.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogPage,
});

const categories = ["همه", "طراحی", "مهندسی", "سئو و رشد", "استراتژی", "خلاقیت"] as const;

function BlogPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("همه");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = cat === "همه" || p.category === cat;
      const q = query.trim();
      const matchQuery = !q || p.title.includes(q) || p.excerpt.includes(q);
      return matchCat && matchQuery;
    });
  }, [cat, query]);

  const featured = posts.find((p) => p.featured);

  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-40 right-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-60 left-10 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <section className="px-6 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              بلاگ محتوا · بینش‌هایی از خط مقدم محصول
            </span>
            <h1 className="max-w-3xl bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
              آنچه در استودیو می‌آموزیم
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              مقالات، تجربه‌ها و تحلیل‌های تیم محتوا در حوزه طراحی محصول، مهندسی وب، سئو تکنیکال و استراتژی رشد.
            </p>
          </motion.div>

          {/* Search + filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در مقالات…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-4 pr-12 pl-4 text-sm text-white placeholder:text-white/40 backdrop-blur-xl outline-none transition focus:border-cyan-400/40 focus:bg-white/10"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${
                    cat === c
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featured && cat === "همه" && !query && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <MotionLink
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-20 transition-opacity group-hover:opacity-30`} />
              <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
                    مقاله ویژه · {featured.category}
                  </span>
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-white/70">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-5 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3">
                    خواندن مقاله
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 md:block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-90`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="absolute inset-6 rounded-xl border border-white/30 backdrop-blur-sm" />
                </div>
              </div>
            </MotionLink>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/60">
              مقاله‌ای با این جستجو پیدا نشد.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered
                .filter((p) => !(p.featured && cat === "همه" && !query))
                .map((post, i) => (
                  <MotionLink
                    key={post.slug}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80 transition-transform duration-700 group-hover:scale-110`} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                      <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] text-white backdrop-blur-xl">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold leading-snug text-white transition group-hover:text-cyan-300">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm text-white/60">{post.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/50">
                        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{post.date}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readTime}</span>
                      </div>
                    </div>
                  </MotionLink>
                ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}