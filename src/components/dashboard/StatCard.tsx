import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  gradient,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-border bg-foreground/[0.02] p-5"
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4 text-2xl font-bold num">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
