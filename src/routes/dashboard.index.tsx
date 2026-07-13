// src/routes/dashboard.index.tsx
import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/lib/auth-context";
import ExpertDashboardHome from "@/components/dashboard/ExpertDashboardHome";
import ClientDashboardHome from "@/components/dashboard/ClientDashboardHome";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  const { user } = useAuth();

  if (user && user.accountType === "expert") {
    return <ExpertDashboardHome />;
  }

  return <ClientDashboardHome />;
}
