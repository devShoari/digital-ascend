import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما — محتوا" },
      {
        name: "description",
        content:
          "برای شروع پروژه یا دریافت مشاوره، تیم محتوا آماده است تا با شما تماس بگیرد.",
      },
      { property: "og:title", content: "تماس با ما — محتوا" },
      {
        property: "og:description",
        content: "برای همکاری، مشاوره استراتژیک یا درخواست قیمت با تیم محتوا در تماس باشید.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
              تماس با ما
            </span>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              آماده‌ایم گفتگو را شروع کنیم
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              هر سوالی درباره طراحی محصول، تجربه کاربری، توسعه وب یا رشد دیجیتال دارید، تیم محتوا
              با شما همراه است.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl">
                <h2 className="text-2xl font-semibold text-foreground">راه‌های ارتباطی</h2>
                <p className="mt-3 text-muted-foreground">
                  معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم. اگر پروژه فوری دارید، در پیام خود آن را ذکر کنید.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">ایمیل</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">hello@mohtawa.ir</p>
                  </div>

                  <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">تلفن</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">+۹۸ ۲۱ ۲۲۳۴۵۶۷۸</p>
                  </div>

                  <div className="rounded-3xl border border-input/50 bg-background/70 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">آدرس</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">تهران، ایران</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl">
                <h3 className="text-base font-semibold text-foreground">ساعات کاری</h3>
                <p className="mt-3 text-muted-foreground">شنبه تا چهارشنبه | ۹ صبح تا ۶ عصر</p>
                <p className="mt-4 text-muted-foreground">پاسخگویی در روزهای تعطیل ممکن است کمی طولانی‌تر شود.</p>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="rounded-[32px] border border-input bg-background/80 p-8 shadow-sm backdrop-blur-xl"
            >
              {submitted ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">پیام شما ارسال شد</h2>
                    <p className="mt-3 text-muted-foreground">
                      ممنون! به زودی تیم ما با شما تماس خواهد گرفت.
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    بازگشت به خانه
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm text-muted-foreground">
                      <span>نام و نام خانوادگی</span>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-foreground outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-muted-foreground">
                      <span>آدرس ایمیل</span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-foreground outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-muted-foreground">
                      <span>نام شرکت یا محصول</span>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-foreground outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-muted-foreground">
                      <span>پیام شما</span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="min-h-[160px] w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    ارسال پیام
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
