import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { SectionHead } from "./Process";

const rows = [
  { typical: "تحویل بر اساس checklist و feature", ours: "تحویل بر اساس نتیجه کسب‌و‌کار" },
  { typical: "طراحی جدا از توسعه، با رفت‌و‌برگشت زیاد", ours: "تیم منسجم طراح + توسعه‌دهنده، یک زبان مشترک" },
  { typical: "تمرکز روی تحویل اولیه", ours: "همراهی پس از انتشار برای رشد واقعی" },
  { typical: "تکنولوژی بر اساس عادت", ours: "انتخاب استک بر اساس مسئله و مقیاس" },
  { typical: "گزارش‌گیری مبهم", ours: "متریک‌های شفاف، داشبورد و پاسخگویی" },
  { typical: "پروژه‌های زیاد، توجه کم", ours: "ظرفیت محدود، تمرکز بالا روی هر پروژه" },
];

export function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          kicker="چرا ما"
          title="تفاوت در رویکرد، نه فقط در خروجی."
          subtitle="ما کنار تیم شما می‌نشینیم تا تصمیم‌های درست بگیریم، نه فقط تسک‌ها را تیک بزنیم."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Column
            title="شرکت‌های معمول"
            badge="معمولی"
            tone="muted"
            items={rows.map((r) => r.typical)}
            Icon={X}
          />
          <Column
            title="استودیوی ما"
            badge="نتیجه‌محور"
            tone="brand"
            items={rows.map((r) => r.ours)}
            Icon={Check}
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  title, badge, tone, items, Icon,
}: {
  title: string; badge: string; tone: "muted" | "brand"; items: string[]; Icon: typeof Check;
}) {
  const brand = tone === "brand";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`relative overflow-hidden rounded-3xl p-7 md:p-9 ${
        brand ? "glass-strong shadow-glow" : "glass"
      }`}
    >
      {brand && (
        <div className="pointer-events-none absolute -inset-x-10 -top-20 h-48 bg-gradient-to-b from-violet/20 to-transparent blur-2xl" />
      )}
      <div className="relative flex items-center justify-between">
        <h3 className={`text-2xl font-semibold ${brand ? "gradient-text" : "text-muted-foreground"}`}>{title}</h3>
        <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
          brand ? "gradient-brand text-primary-foreground" : "glass text-muted-foreground"
        }`}>{badge}</span>
      </div>
      <ul className="relative mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 rounded-xl glass p-3.5">
            <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
              brand ? "gradient-brand text-primary-foreground" : "bg-white/5 text-muted-foreground"
            }`}>
              <Icon className="size-3" />
            </span>
            <span className={`text-sm leading-7 ${brand ? "text-foreground" : "text-muted-foreground"}`}>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
