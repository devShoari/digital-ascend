import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  FolderKanban,
  ListTodo,
  Users,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { mockProjects } from "@/lib/mock/projects";
import { mockNotifications } from "@/lib/mock/notifications";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
 

 
const timelineStages = [
  { label: "Discovery", status: "completed" },
  { label: "UI/UX Design", status: "completed" },
  { label: "Development", status: "current" },
  { label: "Testing", status: "upcoming" },
  { label: "Launch", status: "upcoming" },
] as const;

const statusStyles = {
  completed: "bg-emerald-500/10 text-emerald-500",
  current: "bg-cyan-500/10 text-cyan-500",
  upcoming: "bg-foreground/5 text-muted-foreground",
} as const;

export default function ClientDashboardHome() {
  const { user } = useAuth();
  const activeProjects = mockProjects.filter((p) => p.status === "در حال انجام");
  const completedProjects = mockProjects.filter((p) => p.status === "تکمیل‌شده").length;
  const unread = mockNotifications.filter((n) => !n.read);
  const activeProject = activeProjects[0] ?? mockProjects[0];
  const pendingTasks = Math.max(activeProject.tasksTotal - activeProject.tasksDone, 0);
  const teamMembers = activeProject.teamAvatars.length;
  const pendingDeliverables = 3;

  const projectDueDate = new Date(activeProject.dueDate).toLocaleDateString("fa-IR", {
    month: "long",
    day: "numeric",
  });

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
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-3 py-1 text-[11px] text-muted-foreground">
              پنل کارفرما
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              خوش اومدی، {user?.name?.split(" ")[0] ?? "کارفرما"} 👋
            </h2>
            <p className="mt-2 text-muted-foreground">
              امروز {activeProjects.length} پروژه در حال انجام و {unread.length} اعلان خوانده‌نشده
              داری.
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={FolderKanban}
          label="پروژه‌های فعال"
          value={String(activeProjects.length)}
          gradient="from-cyan-400 to-cyan-600"
          delay={0}
        />
        <StatCard
          icon={CheckCircle2}
          label="پروژه‌های تکمیل‌شده"
          value={String(completedProjects)}
          gradient="from-emerald-400 to-emerald-600"
          delay={0.05}
        />
        <StatCard
          icon={ListTodo}
          label="وظایف در انتظار"
          value={String(pendingTasks)}
          gradient="from-amber-400 to-amber-600"
          delay={0.1}
        />
        <StatCard
          icon={Users}
          label="اعضای تیم"
          value={String(teamMembers)}
          gradient="from-violet-400 to-violet-600"
          delay={0.15}
        />
        <StatCard
          icon={CircleAlert}
          label="تحویل‌های معوق"
          value={String(pendingDeliverables)}
          gradient="from-rose-400 to-rose-600"
          delay={0.2}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">پروژه فعال</CardTitle>
                <CardDescription>نمای کلی وضعیت پروژه‌ی در حال اجرا</CardDescription>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-500">{activeProject.status}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="text-2xl font-black">{activeProject.name}</div>
              <div className="text-sm text-muted-foreground">وضعیت: {activeProject.status}</div>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">پیشرفت</span>
                <span className="num font-semibold">{activeProject.progress}%</span>
              </div>
              <Progress value={activeProject.progress} className="mt-3 h-2" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="text-xs text-muted-foreground">فاز فعلی</div>
                <div className="mt-2 text-sm font-semibold">Frontend Development</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="text-xs text-muted-foreground">مراحل بعدی</div>
                <div className="mt-2 text-sm font-semibold">Payment Integration</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              <span>Due: {projectDueDate}</span>
            </div>

      
          </CardContent>
        </Card>

        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader>
            <CardTitle className="text-lg">Project Timeline</CardTitle>
            <CardDescription>مراحل توسعه محصول از اکتشاف تا launch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {timelineStages.map((stage, index) => (
              <div
                key={stage.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.04] text-[10px] font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{stage.label}</div>
                </div>
                <Badge className={statusStyles[stage.status]}>
                  {stage.status === "completed"
                    ? "تکمیل‌شده"
                    : stage.status === "current"
                      ? "در حال انجام"
                      : "آینده"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
