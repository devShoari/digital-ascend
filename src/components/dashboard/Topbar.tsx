import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Bell, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Sidebar } from "./Sidebar";
import { mockNotifications } from "@/lib/mock/notifications";

export function Topbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/5 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <Sidebar className="h-full" />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-bold sm:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="جستجو…"
            className="h-10 w-56 rounded-full border border-border bg-foreground/[0.03] pr-9 pl-4 text-sm outline-none transition focus:border-cyan-400/40"
          />
        </div>

        <Link
          to="/dashboard/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/5 transition hover:bg-foreground/10"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -left-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
