import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPost, getRelated } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "مقاله پیدا نشد — بلاگ محتوا" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — بلاگ محتوا` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:author", content: post.author.name },
        { property: "article:section", content: post.category },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  errorComponent: PostError,
  component: PostPage,
});

function PostNotFound() {
  return (
    <main dir="rtl" className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-32 pt-40 text-center">
        <h1 className="text-4xl font-bold">مقاله پیدا نشد</h1>
        <p className="mt-4 text-white/60">به نظر می‌رسد این مقاله جابه‌جا یا حذف شده است.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <ArrowLeft className="h-4 w-4" />
          بازگشت به بلاگ
        </Link>
      </div>
      <Footer />
    </main>
  );
}

function PostError() {
  return (
    <main dir="rtl" className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-40 text-center">
        <h1 className="text-3xl font-bold">خطایی رخ داد</h1>
        <p className="mt-4 text-white/60">لطفاً دوباره تلاش کنید.</p>
      </div>
      <Footer />
    </main>
  );
}

function PostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div className={`absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br ${post.gradient} opacity-25 blur-3xl`} />
      </div>

      {/* Header */}
      <article className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به بلاگ
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${post.gradient} px-3 py-1 font-semibold text-black/80`}>
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/60"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
              <span className="inline-flex items-center gap-1.5 text-white/60"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            </div>

            <h1 className="mt-6 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">{post.excerpt}</p>

            {/* Author + share */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-white/10 py-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${post.gradient} text-sm font-bold text-black`}>
                  {post.author.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{post.author.name}</div>
                  <div className="text-xs text-white/50">{post.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <span className="ml-1 text-xs">اشتراک‌گذاری:</span>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"><Twitter className="h-4 w-4" /></button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"><Linkedin className="h-4 w-4" /></button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>

          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-8 rounded-2xl border border-white/20 backdrop-blur-sm" />
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert mt-14 max-w-none"
          >
            {post.content.map((block, i) => (
              <div key={i} className="mb-8">
                {block.heading && (
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    {block.heading}
                  </h2>
                )}
                <p className="text-[17px] leading-[2] text-white/75">{block.body}</p>
              </div>
            ))}
          </motion.div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-8">
            <span className="text-xs text-white/50">برچسب‌ها:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">مقالات مرتبط</h2>
            <Link to="/blog" className="text-sm text-white/60 transition hover:text-white">
              همه مقالات ←
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} opacity-80 transition-transform duration-700 group-hover:scale-110`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] text-white backdrop-blur-xl">
                    {r.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold leading-snug text-white transition group-hover:text-cyan-300">
                    {r.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{r.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" />{r.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}