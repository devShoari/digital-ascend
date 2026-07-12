import { motion } from "motion/react";
import { Lock, Globe } from "lucide-react";
import type { AppNotification } from "@/lib/mock/types";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return "چند دقیقه پیش";
  if (hours < 24) return `${hours} ساعت پیش`;
  const days = Math.floor(hours / 24);
  return `${days} روز پیش`;
}

const CATEGORY_STYLE: Record<AppNotification["category"], string> = {
  "پروژه": "bg-cyan-500/10 text-cyan-500",
  "سیستم": "bg-violet-500/10 text-violet-500",
  "پیام": "bg-emerald-500/10 text-emerald-500",
  "امنیت": "bg-rose-500/10 text-rose-500",
};

export function NotificationItem({
  notification,
  onClick,
  active,
}: {
  notification: AppNotification;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-right transition ${
        active
          ? "border-cyan-400/40 bg-cyan-500/[0.04]"
          : "border-border bg-foreground/[0.02] hover:border-foreground/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />}
          <div className="min-w-0">
            <div className={`truncate text-sm ${notification.read ? "text-muted-foreground" : "font-semibold"}`}>
              {notification.title}
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{notification.body}</p>
          </div>
        </div>
        <span className="shrink-0 text-[11px] text-muted-foreground">{timeAgo(notification.createdAt)}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_STYLE[notification.category]}`}>
          {notification.category}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          {notification.visibility === "private" ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
          {notification.visibility === "private" ? "خصوصی" : "عمومی"}
        </span>
      </div>
    </motion.button>
  );
}
