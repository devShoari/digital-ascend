import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plus,
  FileText,
  Users,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { mockProjects } from "@/lib/mock/projects";
import { mockNotifications } from "@/lib/mock/notifications";
import { mockActivities } from "@/lib/mock/activities";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { NotificationItem } from "@/components/dashboard/NotificationItem";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const QUICK_ACTIONS = [
  { icon: Plus, label: "پروژه جدید" },
  { icon: FileText, label: "گزارش جدید" },
  { icon: Users, label: "دعوت هم‌تیمی" },
];

function DashboardHome() {
  const { user } = useAuth();
  const activeProjects = mockProjects.filter((p) => p.status === "در حال انجام");
  const doneProjects = mockProjects.filter((p) => p.status === "تکمیل‌شده");
  const unread = mockNotifications.filter((n) => !n.read);

  return (
    <div className="space-y-8">
      {/* welcome */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              خوش اومدی، {user?.name?.split(" ")[0] ?? "کاربر"} 👋
            </h2>
            <p className="mt-2 text-muted-foreground">
              امروز {activeProjects.length} پروژه در حال انجام و {unread.length} اعلان خوانده‌نشده داری.
            </p>
          </div>
          <Link
            to="/dashboard/projects"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            مشاهده پروژه‌ها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FolderKanban} label="پروژه‌های فعال" value={String(activeProjects.length)} gradient="from-cyan-400 to-cyan-600" delay={0} />
        <StatCard icon={CheckCircle2} label="پروژه‌های تکمیل‌شده" value={String(doneProjects.length)} trend="+۱ این ماه" gradient="from-emerald-400 to-emerald-600" delay={0.05} />
        <StatCard icon={Clock} label="مهلت این هفته" value="۲" gradient="from-amber-400 to-amber-600" delay={0.1} />
        <StatCard icon={TrendingUp} label="نرخ تکمیل تسک‌ها" value="۸۴٪" trend="+۶٪" gradient="from-violet-400 to-violet-600" delay={0.15} />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* assigned projects overview */}
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">پروژه‌های اخیر شما</h3>
            <Link to="/dashboard/projects" className="text-sm text-muted-foreground hover:text-foreground">
              مشاهده همه
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockProjects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.05} />
            ))}
          </div>
        </section>

        {/* sidebar: notifications preview + quick actions + activity */}
        <div className="space-y-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">اعلان‌های اخیر</h3>
              <Link to="/dashboard/notifications" className="text-sm text-muted-foreground hover:text-foreground">
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
            <h3 className="mb-4 font-semibold">اقدامات سریع</h3>
            <div className="grid grid-cols-3 gap-3">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-foreground/[0.02] p-4 text-xs text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
                >
                  <a.icon className="h-5 w-5" />
                  {a.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 font-semibold">فعالیت‌های اخیر</h3>
            <ul className="space-y-4 rounded-2xl border border-border bg-foreground/[0.02] p-4">
              {mockActivities.slice(0, 4).map((a) => (
                <li key={a.id} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{a.actor}</span> {a.action}{" "}
                    <span className="text-foreground">{a.target}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
