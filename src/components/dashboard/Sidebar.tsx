import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Bell,
  Settings,
  LogOut,
  Inbox,
  CalendarClock,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const USER_NAV = [
  { to: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { to: "/dashboard/profile", label: "پروفایل", icon: User },
  { to: "/dashboard/projects", label: "پروژه‌ها", icon: FolderKanban },
  { to: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell },
  { to: "/dashboard/settings", label: "تنظیمات", icon: Settings },
] as const;

const SPECIALIST_NAV = [
  { to: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { to: "/dashboard/profile", label: "پروفایل", icon: User },
  { to: "/dashboard/requests", label: "درخواست‌های مشتریان", icon: Inbox },
  { to: "/dashboard/availability", label: "برنامه دسترس‌پذیری", icon: CalendarClock },
  { to: "/dashboard/earnings", label: "درآمد", icon: Wallet },
  { to: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell },
  { to: "/dashboard/settings", label: "تنظیمات", icon: Settings },
] as const;

export function Sidebar({ className = "" }: { className?: string }) {
  const { user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const NAV = user?.accountType === "specialist" ? SPECIALIST_NAV : USER_NAV;

  return (
    <aside className={`flex h-full flex-col justify-between p-4 ${className}`}>
      <div>
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-glow">
            <div className="h-4 w-4 rounded-md bg-white" />
          </div>
          <div>
            <div className="text-sm font-bold">محتوا</div>
            <div className="text-[10px] text-muted-foreground">Digital Product Studio</div>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {NAV.map((item) => {
            const isActive = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="relative block">
                {isActive && (
                  <motion.span
                    layoutId="dash-nav-pill"
                    className="absolute inset-0 rounded-xl bg-foreground/[0.06] ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-foreground/[0.02] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-white">
            {user?.name?.slice(0, 2) ?? "کا"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold">{user?.name ?? "کاربر"}</span>
              {user?.accountType === "specialist" && (
                <span className="shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  متخصص
                </span>
              )}
            </div>
            <div className="truncate text-xs text-muted-foreground">{user?.title}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
