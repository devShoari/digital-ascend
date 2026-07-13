import { motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

const quickLinks = [
  { href: "/#services", label: "خدمات" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact", label: "تماس" },
  { href: "/about", label: "درباره ما" },
];

const serviceList = [
  "طراحی رابط کاربری",
  "توسعه فرانت‌اند",
  "توسعه Next.js",
  "بهینه‌سازی سئو",
  "مشاوره محصول",
];

const socialLinks = [
  { href: "https://t.me/mohtawa", label: "Telegram", icon: Send },
  { href: "https://instagram.com/mohtawa.ir", label: "Instagram", icon: Instagram },
  { href: "mailto:hello@mohtawa.ir", label: "Email", icon: Mail },
  { href: "tel:+989123456789", label: "Phone", icon: Phone },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-12">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 shadow-[0_20px_80px_rgba(12,18,38,0.32)] backdrop-blur-3xl">
          <div className="pointer-events-none absolute -left-10 top-0 h-52 w-52 rounded-full bg-violet-500/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-14 right-0 h-56 w-56 rounded-full bg-cyan-400/25 blur-[120px]" />

          <div className="relative grid gap-14 p-6 sm:p-8 md:p-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="relative size-11 rounded-2xl gradient-brand shadow-glow">
                  <div className="absolute inset-1.25 rounded-[10px] bg-background/60" />
                  <div className="absolute inset-2 rounded-lg gradient-brand" />
                </div>
                <div className="text-[18px]">مرکز حرفه‌ای توسعه وب ایران</div>
              </div>

              <p className="max-w-md text-[15px] leading-8 text-muted-foreground">
                طراحی و توسعه محصولات دیجیتال مدرن، وب‌سایت‌های پرسرعت و تجربه‌های کاربری
                مقیاس‌پذیر؛ با تمرکز بر عملکرد، زیبایی و رشد برند شما.
              </p>

              <div className="h-px w-full bg-foreground/10" />

              <div className="space-y-4">
                <p className="text-xl font-bold text-foreground">
                  آماده‌ای محصول بعدیِ خودت را بسازی؟
                </p>

                <motion.a
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-2xl gradient-brand px-6 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  شروع پروژه
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">دسترسی سریع</p>

              <div className="mt-4 space-y-2">
                {quickLinks.map((item) => (
                  <motion.a
                    key={item.href}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl px-2 py-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:-translate-x-0.5 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">خدمات</p>

              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-muted-foreground">
                {serviceList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">تماس</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <motion.a
                    key={label}
                    whileHover={{ y: -4, rotate: 4 }}
                    transition={{ duration: 0.2 }}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex size-10 items-center justify-center rounded-xl border border-foreground/10 bg-white/3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-foreground/10 bg-white/3 p-4 text-sm text-muted-foreground">
                <a
                  href="mailto:hello@mohtawa.ir"
                  className="transition-colors hover:text-foreground"
                >
                  hello@mohtawa.ir
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-4 border-t border-foreground/10 px-6 pb-6 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>تهران، ایران</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span>© 2026 Mohtawa</span>
              <span>All rights reserved</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/3 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
