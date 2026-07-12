import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { AssignedProject } from "@/lib/mock/types";

const STATUS_STYLE: Record<AssignedProject["status"], string> = {
  "در حال انجام": "bg-cyan-500/10 text-cyan-500",
  "در انتظار بازبینی": "bg-amber-500/10 text-amber-500",
  "تکمیل‌شده": "bg-emerald-500/10 text-emerald-500",
  "متوقف‌شده": "bg-rose-500/10 text-rose-500",
};

export function ProjectCard({ project, delay = 0 }: { project: AssignedProject; delay?: number }) {
  const due = new Date(project.dueDate).toLocaleDateString("fa-IR", { month: "long", day: "numeric" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] p-5 transition hover:border-foreground/20"
    >
      <div className={`pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{project.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{project.client}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>پیشرفت</span>
          <span className="num">{project.progress}٪</span>
        </div>
        <Progress value={project.progress} className="mt-2 h-1.5" />
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex -space-x-2 space-x-reverse">
          {project.teamAvatars.map((initials) => (
            <div
              key={initials}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-cyan-400 to-violet-500 text-[10px] font-bold text-white"
            >
              {initials}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {due}
        </div>
      </div>

      <div className="relative mt-3 text-[11px] text-muted-foreground">
        <span className="num">{project.tasksDone}</span> از <span className="num">{project.tasksTotal}</span> تسک تکمیل شده
      </div>
    </motion.article>
  );
}
