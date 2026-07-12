import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, FolderKanban } from "lucide-react";

import { mockProjects, projectStatusOptions } from "@/lib/mock/projects";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof projectStatusOptions)[number]>("همه");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchStatus = status === "همه" || p.status === status;
      const q = query.trim();
      const matchQuery = !q || p.name.includes(q) || p.client.includes(q);
      return matchStatus && matchQuery;
    });
  }, [query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در پروژه‌ها…"
            className="h-11 w-full rounded-full border border-border bg-foreground/[0.02] pr-10 pl-4 text-sm outline-none transition focus:border-cyan-400/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {projectStatusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                status === s
                  ? "border-transparent bg-foreground text-background"
                  : "border-border bg-foreground/[0.02] text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-2xl border border-border p-5">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-1.5 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="پروژه‌ای پیدا نشد"
          description="فیلترها یا عبارت جستجو را تغییر دهید تا پروژه‌های بیشتری ببینید."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.04} />
          ))}
        </div>
      )}
    </div>
  );
}
