// src/components/dashboard/ExpertDashboardHome.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Inbox, Wallet, CalendarClock, Star, CheckCircle2, ArrowLeft, Clock } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { mockClientRequests } from "@/lib/mock/requests";
import { mockAvailability } from "@/lib/mock/availability";
import { mockEarnings } from "@/lib/mock/earnings";
import { mockNotifications } from "@/lib/mock/notifications";
import { StatCard } from "@/components/dashboard/StatCard";
import { NotificationItem } from "@/components/dashboard/NotificationItem";

function formatToman(n: number) {
  return `${n.toLocaleString("fa-IR")} تومان`;
}

const REQUEST_STATUS_STYLE: Record<string, string> = {
  "در انتظار پاسخ": "bg-amber-500/10 text-amber-500",
  پذیرفته‌شده: "bg-emerald-500/10 text-emerald-500",
  "رد شده": "bg-rose-500/10 text-rose-500",
};

export default function ExpertDashboardHome() {
  const { user } = useAuth();
  const pendingRequests = mockClientRequests.filter((r) => r.status === "در انتظار پاسخ");
  const unread = mockNotifications.filter((n) => !n.read);
  const availableDays = mockAvailability.filter((d) => d.enabled).length;

  return (
    <div className="space-y-8">
      {/* welcome */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-violet-500/10 via-background to-cyan-500/10 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-3 py-1 text-[11px] text-muted-foreground">
              پنل متخصص
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              خوش اومدی، {user?.name?.split(" ")[0] ?? "متخصص"} 👋
            </h2>
            <p className="mt-2 text-muted-foreground">
              {pendingRequests.length} درخواست جدید در انتظار پاسخ و {unread.length} اعلان
              خوانده‌نشده داری.
            </p>
          </div>
          <Link
            to="/dashboard/requests"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            مشاهده درخواست‌ها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Inbox}
          label="درخواست‌های در انتظار"
          value={String(pendingRequests.length)}
          gradient="from-amber-400 to-amber-600"
          delay={0}
        />
        <StatCard
          icon={CheckCircle2}
          label="پروژه‌های تکمیل‌شده"
          value={String(user?.completedJobs ?? 0)}
          gradient="from-emerald-400 to-emerald-600"
          delay={0.05}
        />
        <StatCard
          icon={Wallet}
          label="درآمد این ماه"
          value={formatToman(mockEarnings.thisMonth)}
          gradient="from-cyan-400 to-cyan-600"
          delay={0.1}
        />
        <StatCard
          icon={Star}
          label="امتیاز"
          value={user?.rating ? user.rating.toFixed(1) : "—"}
          trend={user?.reviewsCount ? `${user.reviewsCount} نظر` : undefined}
          gradient="from-violet-400 to-violet-600"
          delay={0.15}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* recent client requests */}
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">درخواست‌های اخیر مشتریان</h3>
            <Link
              to="/dashboard/requests"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-3">
            {mockClientRequests.slice(0, 4).map((r, i) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-foreground/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-white">
                      {r.clientInitials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.clientName}</div>
                      <div className="text-xs text-muted-foreground">{r.service}</div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${REQUEST_STATUS_STYLE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{r.message}</p>
                <div className="mt-3 text-xs text-muted-foreground">بودجه پیشنهادی: {r.budget}</div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* sidebar: availability + notifications */}
        <div className="space-y-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">دسترس‌پذیری هفتگی</h3>
              <Link
                to="/dashboard/availability"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ویرایش
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-foreground/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-cyan-500" />
                <span>{availableDays} روز در هفته فعال</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {mockAvailability.map((d) => (
                  <span
                    key={d.day}
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      d.enabled
                        ? "bg-cyan-500/10 text-cyan-500"
                        : "bg-foreground/[0.04] text-muted-foreground/60"
                    }`}
                  >
                    {d.day}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">اعلان‌های اخیر</h3>
              <Link
                to="/dashboard/notifications"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="space-y-3">
              {mockNotifications.slice(0, 3).map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">پرداخت‌های اخیر</h3>
              <Link
                to="/dashboard/earnings"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                مشاهده همه
              </Link>
            </div>
            <ul className="space-y-3 rounded-2xl border border-border bg-foreground/[0.02] p-4">
              {mockEarnings.recentPayouts.slice(0, 3).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="truncate">{p.project}</span>
                  </span>
                  <span className="shrink-0 num text-foreground">{formatToman(p.amount)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
