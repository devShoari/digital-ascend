import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import type { AccountType } from "@/lib/mock/types";

/**
 * Guards a dashboard page so only the given account type can view it.
 * Mismatched roles are redirected to their own dashboard home instead of
 * seeing a broken/irrelevant page. Purely a UX nicety in this mock setup —
 * a real backend would also enforce this server-side.
 */
export function useRoleGuard(required: AccountType) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.accountType !== required) {
      navigate({ to: "/dashboard" });
    }
  }, [user, required, navigate]);
}
