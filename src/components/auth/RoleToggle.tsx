import { Briefcase, Building2 } from "lucide-react";
import type { AccountType } from "@/lib/mock/types";

const OPTIONS: { value: AccountType; label: string; icon: typeof Briefcase }[] = [
  { value: "client", label: "کارفرما", icon: Building2 },
  { value: "expert", label: "متخصص", icon: Briefcase },
];

export function RoleToggle({
  value,
  onChange,
}: {
  value: AccountType;
  onChange: (v: AccountType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-foreground/[0.02] p-1.5">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
