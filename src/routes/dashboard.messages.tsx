import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Users } from "lucide-react";

import { useRoleGuard } from "@/lib/use-role-guard";
import { mockThreads, type ChatMessage, type ProjectThread } from "@/lib/mock/messages";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const Route = createFileRoute("/dashboard/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  useRoleGuard("client");

  const [threads, setThreads] = useState<ProjectThread[]>(mockThreads);
  const [activeId, setActiveId] = useState<string>(mockThreads[0]?.projectId ?? "");
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => threads.find((t) => t.projectId === activeId),
    [threads, activeId],
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, activeId]);

  const send = () => {
    const body = draft.trim();
    if (!body || !active) return;
    const message: ChatMessage = {
      id: `m_${Date.now()}`,
      author: { id: "me", name: "شما", initials: "شما", role: "کارفرما", self: true },
      body,
      createdAt: new Date().toISOString(),
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.projectId === active.projectId ? { ...t, messages: [...t.messages, message] } : t,
      ),
    );
    setDraft("");
  };

  if (threads.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="هنوز مکالمه‌ای ندارید"
        description="به محض شروع اولین پروژه، ارتباط با تیم توسعه از اینجا در دسترس خواهد بود."
      />
    );
  }

  return (
    <div className="grid h-[calc(100vh-11rem)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      {/* Thread list */}
      <aside className="overflow-y-auto rounded-2xl border border-border bg-foreground/[0.02] p-2">
        <div className="p-3">
          <h3 className="text-sm font-semibold">مکالمات پروژه‌ها</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            برای هر پروژه یک گفتگوی اختصاصی با تیم توسعه دارید.
          </p>
        </div>
        <ul className="space-y-1 p-1">
          {threads.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const isActive = t.projectId === activeId;
            return (
              <li key={t.projectId}>
                <button
                  onClick={() => setActiveId(t.projectId)}
                  className={`w-full rounded-xl p-3 text-right transition ${
                    isActive
                      ? "bg-foreground/[0.06] ring-1 ring-border"
                      : "hover:bg-foreground/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{t.projectName}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {t.team.length} نفر
                    </span>
                  </div>
                  {last && (
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      <span className="font-medium">{last.author.name}:</span> {last.body}
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Conversation */}
      <section className="flex min-h-0 flex-col rounded-2xl border border-border bg-foreground/[0.02]">
        {active && (
          <>
            <header className="flex items-center justify-between gap-3 border-b border-border p-4">
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{active.projectName}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  تیم اختصاصی: {active.team.filter((m) => !m.self).map((m) => m.name).join("، ")}
                </p>
              </div>
              <div className="flex -space-x-2 space-x-reverse">
                {active.team.slice(0, 5).map((m) => (
                  <div
                    key={m.id}
                    title={m.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-cyan-400 to-violet-500 text-[10px] font-bold text-white"
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
            </header>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              <AnimatePresence initial={false}>
                {active.messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${m.author.self ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                        m.author.self
                          ? "bg-gradient-to-br from-emerald-400 to-cyan-500"
                          : "bg-gradient-to-br from-cyan-400 to-violet-500"
                      }`}
                    >
                      {m.author.initials}
                    </div>
                    <div className={`max-w-[75%] ${m.author.self ? "text-left" : ""}`}>
                      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{m.author.name}</span>
                        <span>·</span>
                        <span>{m.author.role}</span>
                        <span>·</span>
                        <span>
                          {new Date(m.createdAt).toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                          m.author.self
                            ? "bg-foreground text-background"
                            : "border border-border bg-background"
                        }`}
                      >
                        {m.body}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="پیامی برای تیم بنویسید…"
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-cyan-400/40"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex h-11 items-center gap-2 rounded-full gradient-brand px-5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-40"
              >
                ارسال
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
