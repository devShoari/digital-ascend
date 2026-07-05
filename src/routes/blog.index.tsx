import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, Search, Calendar, Clock, X } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { posts } from "@/lib/blog-data";

const categories = ["همه", "طراحی", "مهندسی", "سئو و رشد", "استراتژی", "خلاقیت"] as const;
type Category = (typeof categories)[number];

type BlogSearch = {
  q?: string;
  category?: string;
  tag?: string;
};

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    tag: typeof search.tag === "string" && search.tag ? search.tag : undefined,
  }),
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

function BlogPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const initialCat: Category = categories.includes(search.category as Category)
    ? (search.category as Category)
    : "همه";

  const [query, setQuery] = useState(search.q ?? "");
  const [cat, setCatLocal] = useState<Category>(initialCat);
  const tag = search.tag;

  // Sync typed query to the URL, debounced so we're not pushing history on every keystroke.
  useEffect(() => {
    const handle = setTimeout(() => {
      navigate({
        search: (prev) => ({ ...prev, q: query.trim() || undefined }),
        replace: true,
      });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const setCat = (c: Category) => {
    setCatLocal(c);
    navigate({
      search: (prev) => ({ ...prev, category: c === "همه" ? undefined : c, tag: undefined }),
      replace: true,
    });
  };

  const clearTag = () => {
    navigate({ search: (prev) => ({ ...prev, tag: undefined }), replace: true });
  };

  const clearAll = () => {
    setQuery("");
    setCatLocal("همه");
    navigate({ search: {}, replace: true });
  };

  const filtered = posts.filter((p) => {
    const matchTag = tag ? p.tags.includes(tag) : true;
    const matchCat = tag ? true : cat === "همه" || p.category === cat;
    const q = query.trim();
    const matchQuery = !q || p.title.includes(q) || p.excerpt.includes(q);
    return matchTag && matchCat && matchQuery;
  });

  const showFeatured = cat === "همه" && !query && !tag;
  const featured = showFeatured ? posts.find((p) => p.featured) : undefined;

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 };
  const initialUp = (y: number) => (prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y });

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
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
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-input bg-background/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
              بلاگ محتوا · بینش‌هایی از خط مقدم محصول
            </span>
            <h1 className="max-w-3xl bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
              آنچه در استودیو می‌آموزیم
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              مقالات، تجربه‌ها و تحلیل‌های تیم محتوا در حوزه طراحی محصول، مهندسی وب، سئو تکنیکال و
              استراتژی رشد.
            </p>
          </motion.div>

          {/* Search + filters */}
          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.15 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <label htmlFor="blog-search" className="sr-only">
              جستجو در مقالات
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40"
                aria-hidden="true"
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در مقالات…"
                className="w-full rounded-full border border-input bg-background/80 py-4 pr-12 pl-12 text-sm text-foreground placeholder:text-muted-foreground/40 backdrop-blur-xl outline-none transition focus:border-cyan-400/40 focus:bg-background/90"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="پاک کردن جستجو"
                  className="absolute left-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground/50 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={!tag && cat === c}
                  className={`relative rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${
                    !tag && cat === c
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-background/80 text-foreground/70 hover:bg-background/90"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {tag && (
              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>
                  در حال فیلتر بر اساس برچسب: <span className="text-foreground">#{tag}</span>
                </span>
                <button
                  type="button"
                  onClick={clearTag}
                  aria-label="حذف فیلتر برچسب"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-input bg-background/80 transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            )}

            <p className="sr-only" role="status" aria-live="polite">
              {filtered.length} مقاله یافت شد
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={initialUp(24)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group relative block overflow-hidden rounded-3xl border border-input bg-background/80 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-20 transition-opacity group-hover:opacity-30`}
                />
                <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-input/20 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl">
                      مقاله ویژه · {featured.category}
                    </span>
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {featured.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {featured.readTime}
                      </span>
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition group-hover:gap-3">
                      خواندن مقاله
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div
                    className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-input/50 md:block"
                    aria-hidden="true"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-90`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
                    <div className="absolute inset-6 rounded-xl border border-input/30 backdrop-blur-sm" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-input bg-background/80 p-12 text-center text-muted-foreground/70">
              <p>مقاله‌ای با این جستجو پیدا نشد.</p>
              <button
                type="button"
                onClick={clearAll}
                className="rounded-full border border-input bg-background/80 px-4 py-2 text-sm text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                پاک کردن فیلترها
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered
                .filter((p) => !(featured && p.slug === featured.slug))
                .map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={initialUp(20)}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.05 }}
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-input bg-background/80 backdrop-blur-xl transition hover:-translate-y-1 hover:border-input/70 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80 transition-transform duration-700 group-hover:scale-110`}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                        <span className="absolute right-3 top-3 rounded-full border border-input/30 bg-background/70 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur-xl">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-bold leading-snug text-foreground transition group-hover:text-cyan-300">
                          {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground/70">
                          {post.excerpt}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-input/20 pt-4 text-xs text-muted-foreground/60">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
