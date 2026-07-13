import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Check, Link2 } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPost, getRelated, type Post } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "مقاله پیدا نشد — بلاگ محتوا" }, { name: "robots", content: "noindex" }],
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
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author.name },
            datePublished: post.date,
            articleSection: post.category,
          }),
        },
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
        <p className="mt-4 text-foreground/60">به نظر می‌رسد این مقاله جابه‌جا یا حذف شده است.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
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
        <p className="mt-4 text-foreground/60">لطفاً دوباره تلاش کنید.</p>
      </div>
      <Footer />
    </main>
  );
}

/** Thin progress bar tracking scroll position through the article. */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300"
      aria-hidden="true"
    />
  );
}

function ShareRow({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const shareTwitter = () =>
    openShare(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
    );

  const shareLinkedin = () =>
    openShare(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    );

  const handleCopyOrNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url: shareUrl });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <div className="flex items-center gap-2 text-foreground/60">
      <span className="ml-1 text-xs">اشتراک‌گذاری:</span>
      <button
        type="button"
        onClick={shareTwitter}
        className={iconBtn}
        aria-label="اشتراک‌گذاری در توییتر"
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={shareLinkedin}
        className={iconBtn}
        aria-label="اشتراک‌گذاری در لینکدین"
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleCopyOrNativeShare}
        className={iconBtn}
        aria-label={copied ? "لینک کپی شد" : "کپی یا اشتراک‌گذاری لینک"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
        ) : typeof navigator !== "undefined" && "share" in navigator ? (
          <Share2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

function PostPage() {
  const { post, related } = Route.useLoaderData() as { post: Post; related: Post[] };
  const prefersReducedMotion = useReducedMotion();
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  // Reset any transient UI state when navigating between posts.
  useEffect(() => {
    setCopiedTag(null);
  }, [post.slug]);

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <ReadingProgress />
      <Nav />

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div
          className={`absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br ${post.gradient} opacity-25 blur-3xl`}
        />
      </div>

      {/* Header */}
      <article className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={initial} animate={animate} transition={{ duration: 0.5 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              بازگشت به بلاگ
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span
                className={`inline-flex items-center rounded-full bg-gradient-to-r ${post.gradient} px-3 py-1 font-semibold text-foreground`}
              >
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-6 bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            {/* Author + share */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-foreground/10 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${post.gradient} text-sm font-bold text-foreground`}
                >
                  {post.author.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{post.author.name}</div>
                  <div className="text-xs text-muted-foreground/70">{post.author.role}</div>
                </div>
              </div>
              <ShareRow post={post} />
            </div>
          </motion.div>

          {/* Cover */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-foreground/10"
            aria-hidden="true"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-8 rounded-2xl border border-input/30 backdrop-blur-sm" />
          </motion.div>

          {/* Body */}
          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="prose prose-invert mt-14 max-w-none"
          >
            {post.content.map((block) => {
              const anchorId = block.heading
                ? block.heading.trim().replace(/\s+/g, "-").toLowerCase()
                : undefined;
              return (
                <div key={block.heading ?? block.body.slice(0, 40)} className="mb-8">
                  {block.heading && (
                    <h2
                      id={anchorId}
                      className="mb-4 scroll-mt-24 text-2xl font-bold text-foreground md:text-3xl"
                    >
                      {block.heading}
                    </h2>
                  )}
                  <p className="text-[17px] leading-[2] text-muted-foreground/80">{block.body}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-foreground/10 pt-8">
            <span className="text-xs text-foreground/50">برچسب‌ها:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to="/blog"
                search={{ tag }}
                className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/70 transition hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">مقالات مرتبط</h2>
            <Link
              to="/blog"
              className="text-sm text-muted-foreground/70 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              همه مقالات ←
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-input bg-background/80 backdrop-blur-xl transition hover:-translate-y-1 hover:border-input/70 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${r.gradient} opacity-80 transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="absolute right-3 top-3 rounded-full border border-input/30 bg-background/70 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur-xl">
                    {r.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold leading-snug text-foreground transition group-hover:text-cyan-300">
                    {r.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {r.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {r.readTime}
                    </span>
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
