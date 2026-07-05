import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Cpu, Layers, Sparkles, ShieldCheck } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const courses = [
  {
    title: "مهندسی Frontend در مقیاس",
    gradient: "from-cyan-400 to-violet-500",
    description:
      "ساخت رابط‌های کاربری پیچیده و تعاملی با React، TypeScript و معماری مؤلفه‌ای که در هر اندازه‌ای سریع و قابل اعتماد باقی بماند.",
    features: [
      "کامپوننت‌های مقیاس‌پذیر",
      "بهینه‌سازی عملکرد و رندر ۶۰fps",
      "پشتیبانی از تجربیات سه‌بعدی و Motion",
    ],
  },
  {
    title: "Backend پایدار و قابل اتکا",
    gradient: "from-emerald-400 to-cyan-500",
    description:
      "طراحی و پیاده‌سازی معماری سروری که بتواند رشد ترافیک، بار کاری و نیازهای داده را با ثبات مدیریت کند.",
    features: [
      "معماری سرویس‌محور و APIهای مقیاس‌پذیر",
      "امنیت و کنترل دسترسی",
      "پایداری و تست انتها به انتها",
    ],
  },
  {
    title: "محصول‌گرایی و طراحی تجربه",
    gradient: "from-fuchsia-400 to-pink-500",
    description:
      "یادگیری روش‌های طراحی محصول و تجربه کاربری که مخاطب را در مسیر خرید و تعامل همراه نگه دارد.",
    features: [
      "طراحی استراتژیک محصول",
      "تحلیل رفتار کاربر و مسیرهای تبدیل",
      "طراحی رابط و تجربه کاربردی",
    ],
  },
  {
    title: "AI Engineering عملی",
    gradient: "from-violet-500 to-indigo-500",
    description:
      "کار با ابزارها و معماری‌های هوش مصنوعی برای افزودن قابلیت‌های هوشمند به محصول و جریان‌های کار دیجیتال.",
    features: [
      "یکپارچه‌سازی مدل‌های هوش مصنوعی",
      "پروژه‌های عملی با داده واقعی",
      "مهندسی مبتنی بر نتایج تجاری",
    ],
  },
];

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "یادگیری — دوره‌های محتوا" },
      {
        name: "description",
        content:
          "دوره‌های تخصصی محتوا برای مهندسان، طراحان و مدیران محصول که علاقه‌مند به ساخت محصولات دیجیتال پایدار هستند.",
      },
      { property: "og:title", content: "یادگیری — دوره‌های محتوا" },
      {
        property: "og:description",
        content: "آموزش های عملی در زمینه frontend، backend، طراحی محصول و AI engineering با ظرفیت محدود.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      <section className="relative px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-input bg-background/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-xl">
              آموزش تخصصی
            </span>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              دوره‌هایی برای ساخت محصولات دیجیتال واقعی
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              برنامه‌های آموزشی محتوا بر اساس رویکرد عملی و محدودیت ظرفیت طراحی شده‌اند تا شما را برای پروژه‌های حرفه‌ای آماده کنند.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_0.8fr] lg:items-start">
            <div className="space-y-8">
              <div className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl">
                <h2 className="text-2xl font-semibold text-foreground">چه چیزی در این دوره‌ها می‌بینید</h2>
                <p className="mt-4 text-muted-foreground leading-8">
                  چهار مسیر آموزشی با تمرکز بر تجربه فرانت‌اند، پایداری بک‌اند، طراحی محصول و مهندسی هوش مصنوعی آماده شده‌اند.
                  هر مسیر با پروژه‌های واقعی، بازخورد تخصصی و تمرکز بر مقیاس‌پذیری همراه است.
                </p>
                <div className="mt-8 grid gap-4">
                  <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                    <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">ظرفیت محدود</div>
                    <div className="mt-3 text-2xl font-bold text-foreground">۱۲ نفر در هر دوره</div>
                  </div>
                  <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                    <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">پروژه‌های عملی</div>
                    <div className="mt-3 text-2xl font-bold text-foreground">تمرکز بر اجرای واقعی</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[28px] border border-input bg-background/80 p-6 shadow-sm backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">یادگیری عملی</h3>
                  <p className="mt-2 text-sm text-muted-foreground">تمرکز بر اجرای پروژه‌های واقعی به جای مباحث انتزاعی.</p>
                </div>
                <div className="rounded-[28px] border border-input bg-background/80 p-6 shadow-sm backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">پشتیبانی تخصصی</h3>
                  <p className="mt-2 text-sm text-muted-foreground">منتورینگ و بازخورد تخصصی از تیم محتوا در طول دوره.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-input/50 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                آموزش محدود</div>
              <h2 className="mt-4 text-3xl font-bold text-foreground">شروع کنید</h2>
              <p className="mt-4 text-muted-foreground leading-7">
                اگر می‌خواهید وارد مسیر حرفه‌ای در تیم‌های محصول، فرانت‌اند یا AI شوید، این دوره‌ها برای شما طراحی شده‌اند.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                ثبت درخواست مشاوره
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {courses.map((course) => (
              <motion.article
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group overflow-hidden rounded-3xl border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-input/70 hover:bg-background/90"
              >
                <span
                  className={`inline-flex rounded-full bg-gradient-to-r ${course.gradient} px-4 py-2 text-sm font-semibold text-foreground`}
                >
                  {course.title}
                </span>
                <p className="mt-6 text-muted-foreground leading-7">{course.description}</p>
                <div className="mt-6 space-y-3">
                  {course.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-foreground/20" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
