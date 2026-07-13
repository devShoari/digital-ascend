import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, CircleDollarSign, Clock3, Wallet } from "lucide-react";

import { useRoleGuard } from "@/lib/use-role-guard";
import { mockEarnings } from "@/lib/mock/earnings";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/earnings")({
  component: EarningPage,
});

function formatToman(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

function EarningPage() {
  useRoleGuard("expert");

  const maxMonthlyAmount = Math.max(...mockEarnings.monthlyTrend.map((item) => item.amount));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="کل درآمد"
          value={formatToman(mockEarnings.totalEarned)}
          gradient="from-cyan-400 to-cyan-600"
          delay={0}
        />
        <StatCard
          icon={Clock3}
          label="در انتظار تسویه"
          value={formatToman(mockEarnings.pendingPayout)}
          gradient="from-amber-400 to-amber-600"
          delay={0.05}
        />
        <StatCard
          icon={CircleDollarSign}
          label="درآمد این ماه"
          value={formatToman(mockEarnings.thisMonth)}
          gradient="from-emerald-400 to-emerald-600"
          delay={0.1}
        />
        <StatCard
          icon={ArrowUpRight}
          label="روند رشد"
          value="+14%"
          trend="مقایسه با ماه قبل"
          gradient="from-violet-400 to-violet-600"
          delay={0.15}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">روند درآمد ماهانه</CardTitle>
            <CardDescription>مقایسه درآمد شش ماه اخیر برای برنامه‌ریزی بهتر.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockEarnings.monthlyTrend.map((item) => (
              <div key={item.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.month}</span>
                  <span className="font-semibold">{item.amount.toFixed(1)} میلیون تومان</span>
                </div>
                <div className="h-2 rounded-full bg-foreground/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    style={{ width: `${(item.amount / maxMonthlyAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">تسویه‌های اخیر</CardTitle>
                <CardDescription>گزارش آخرین پرداخت‌های شما به حساب بانکی.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                درخواستی جدید
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockEarnings.recentPayouts.map((payout) => (
              <motion.article
                key={payout.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-background/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{payout.project}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {new Date(payout.date).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold num">{formatToman(payout.amount)}</div>
                    <Badge
                      variant={payout.status === "پرداخت‌شده" ? "default" : "secondary"}
                      className="mt-2"
                    >
                      {payout.status}
                    </Badge>
                  </div>
                </div>
              </motion.article>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
