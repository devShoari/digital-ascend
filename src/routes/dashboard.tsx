import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "داشبورد",
  "/dashboard/profile": "پروفایل",
  "/dashboard/projects": "پروژه‌های من",
  "/dashboard/messages": "گفتگو با تیم",
  "/dashboard/requests": "درخواست‌های کارفرمایان",
  "/dashboard/availability": "برنامه دسترس‌پذیری",
  "/dashboard/earnings": "درآمد",
  "/dashboard/notifications": "اعلان‌ها",
  "/dashboard/settings": "تنظیمات حساب",
};

function DashboardLayout() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate({ to: "/auth/login" });
    }
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div dir="rtl" className="flex min-h-screen bg-background text-foreground">
      <div className="hidden w-64 shrink-0 border-l border-border lg:block">
        <Sidebar className="sticky top-0 h-screen" />
      </div>

      <div className="min-w-0 flex-1">
        <Topbar title={PAGE_TITLES[pathname] ?? "داشبورد"} />
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
