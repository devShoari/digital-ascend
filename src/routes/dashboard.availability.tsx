import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarClock, Clock3, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { useRoleGuard } from "@/lib/use-role-guard";
import { mockAvailability } from "@/lib/mock/availability";
import type { DayAvailability } from "@/lib/mock/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/availability")({
  component: AvailabilityPage,
});

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

function AvailabilityPage() {
  useRoleGuard("expert");
  const [availability, setAvailability] = useState<DayAvailability[]>(mockAvailability);

  const activeDays = useMemo(
    () => availability.filter((day) => day.enabled).length,
    [availability],
  );

  const weeklyHours = useMemo(() => {
    const totalMinutes = availability.reduce((sum, day) => {
      if (!day.enabled) return sum;
      const duration = toMinutes(day.to) - toMinutes(day.from);
      return sum + (duration > 0 ? duration : 0);
    }, 0);

    return Math.round((totalMinutes / 60) * 10) / 10;
  }, [availability]);

  const toggleDay = (dayName: DayAvailability["day"]) => {
    setAvailability((current) =>
      current.map((day) =>
        day.day === dayName ? { ...day, enabled: !day.enabled } : day,
      ),
    );
  };

  const updateTime = (
    dayName: DayAvailability["day"],
    field: "from" | "to",
    value: string,
  ) => {
    setAvailability((current) =>
      current.map((day) => (day.day === dayName ? { ...day, [field]: value } : day)),
    );
  };

  const handleSave = () => {
    toast.success("برنامه دسترس‌پذیری ذخیره شد");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-[28px] border border-border bg-gradient-to-br from-cyan-400/10 via-background to-violet-500/10 p-6 shadow-elevated sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              برنامه دسترس‌پذیری هفتگی
            </div>
            <h2 className="text-2xl font-black tracking-tight">زمان‌های کاری خود را مدیریت کنید</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              وضعیت روزهای فعال، بازه‌های کاری و زمان‌های پاسخ‌گویی خود را سریع و راحت تنظیم کنید.
            </p>
          </div>

          <Button onClick={handleSave} className="w-fit">
            <Save className="h-4 w-4" />
            ذخیره تغییرات
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="text-xs text-muted-foreground">روزهای فعال</div>
            <div className="mt-2 text-2xl font-black">{activeDays}</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              ساعت کاری هفتگی
            </div>
            <div className="mt-2 text-2xl font-black">{weeklyHours} ساعت</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              وضعیت سرویس
            </div>
            <div className="mt-2 text-lg font-black text-emerald-500">در دسترس</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {availability.map((day) => (
          <Card key={day.day} className="border-border bg-foreground/[0.02]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">{day.day}</CardTitle>
                <Switch checked={day.enabled} onCheckedChange={() => toggleDay(day.day)} />
              </div>
              <CardDescription>
                {day.enabled ? "روز کاری فعال است" : "این روز به صورت غیرفعال است"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>از</Label>
                  <Input
                    type="time"
                    dir="ltr"
                    disabled={!day.enabled}
                    value={day.from}
                    onChange={(e) => updateTime(day.day, "from", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>تا</Label>
                  <Input
                    type="time"
                    dir="ltr"
                    disabled={!day.enabled}
                    value={day.to}
                    onChange={(e) => updateTime(day.day, "to", e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                بازه کاری: {day.from} تا {day.to}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
