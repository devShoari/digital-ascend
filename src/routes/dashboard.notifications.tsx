import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Check, Lock, Globe } from "lucide-react";

import { mockNotifications } from "@/lib/mock/notifications";
import { NotificationItem } from "@/components/dashboard/NotificationItem";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import type { AppNotification } from "@/lib/mock/types";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
});

type Filter = "همه" | "خوانده‌نشده" | "عمومی" | "خصوصی";
const FILTERS: Filter[] = ["همه", "خوانده‌نشده", "عمومی", "خصوصی"];

function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>(mockNotifications);
  const [filter, setFilter] = useState<Filter>("همه");
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  const filtered = items.filter((n) => {
    if (filter === "خوانده‌نشده") return !n.read;
    if (filter === "عمومی") return n.visibility === "public";
    if (filter === "خصوصی") return n.visibility === "private";
    return true;
  });

  const selected = items.find((n) => n.id === selectedId) ?? null;

  const openNotification = (n: AppNotification) => {
    setSelectedId(n.id);
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  };

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                  filter === f
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-foreground/[0.02] text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4" /> علامت‌گذاری همه به‌عنوان خوانده‌شده
          </Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Bell} title="اعلانی یافت نشد" description="فیلتر دیگری را امتحان کنید." />
        ) : (
          <div className="space-y-3">
            {filtered.map((n) => (
              <NotificationItem key={n.id} notification={n} active={n.id === selectedId} onClick={() => openNotification(n)} />
            ))}
          </div>
        )}
      </section>

      <aside className="h-fit rounded-2xl border border-border bg-foreground/[0.02] p-6">
        {selected ? (
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {selected.visibility === "private" ? <Lock className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
              {selected.visibility === "private" ? "خصوصی" : "عمومی"} · {selected.category}
            </div>
            <h3 className="mt-3 text-lg font-semibold">{selected.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{selected.body}</p>
            <div className="mt-6 text-xs text-muted-foreground">
              {new Date(selected.createdAt).toLocaleString("fa-IR")}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">برای مشاهده جزئیات، یک اعلان را انتخاب کنید.</p>
        )}
      </aside>
    </div>
  );
}
