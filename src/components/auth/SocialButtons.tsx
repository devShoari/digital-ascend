import { toast } from "sonner";

const PROVIDERS = [
  { id: "google", label: "گوگل" },
  { id: "github", label: "گیت‌هاب" },
  { id: "apple", label: "اپل" },
] as const;

export function SocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => toast.info(`ورود با ${p.label} در نسخه دمو فعال نیست`)}
          className="flex h-11 items-center justify-center rounded-xl border border-input bg-background text-sm text-foreground/80 transition hover:bg-accent"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
