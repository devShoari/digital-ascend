import type { EarningsSummary } from "./types";

export const mockEarnings: EarningsSummary = {
  totalEarned: 284_500_000,
  pendingPayout: 12_800_000,
  thisMonth: 38_200_000,
  monthlyTrend: [
    { month: "فروردین", amount: 21 },
    { month: "اردیبهشت", amount: 26 },
    { month: "خرداد", amount: 19 },
    { month: "تیر", amount: 33 },
    { month: "مرداد", amount: 28 },
    { month: "شهریور", amount: 38.2 },
  ],
  recentPayouts: [
    { id: "pay_1", project: "اپلیکیشن سلامتی طبیب", amount: 12_000_000, date: "2026-07-05", status: "پرداخت‌شده" },
    { id: "pay_2", project: "بازطراحی داشبورد کیان برند", amount: 9_500_000, date: "2026-06-28", status: "پرداخت‌شده" },
    { id: "pay_3", project: "بهینه‌سازی فروشگاه وستا", amount: 12_800_000, date: "2026-07-12", status: "در انتظار" },
  ],
};
