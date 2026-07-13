import type { User } from "./types";

// Demo account #1 — client (project owner)
export const demoClient: User = {
  id: "u_1001",
  name: "سارا رضایی",
  email: "sara.rezaei@mohtawa.ir",
  avatarUrl: undefined,
  accountType: "client",
  role: "کارفرما",
  title: "مدیر محصول در استارتاپ فین‌تک",
  phone: "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
  location: "تهران، ایران",
  bio: "بنیان‌گذار و مدیر محصول یک استارتاپ فین‌تک؛ در حال ساخت محصولی که تجربه‌ی پرداخت را برای کسب‌وکارهای کوچک بازتعریف می‌کند.",
  skills: ["Product Strategy", "User Research", "Roadmapping", "Stakeholder Management"],
  joinedAt: "2024-03-12",
  emailVerified: true,
};

// Demo account #2 — expert
export const demoExpert: User = {
  id: "u_2001",
  name: "پویا مرادی",
  email: "pouya.moradi@mohtawa.ir",
  avatarUrl: undefined,
  accountType: "expert",
  role: "متخصص مستقل",
  title: "مهندس ارشد فرانت‌اند",
  phone: "+۹۸ ۹۱۲ ۹۸۷ ۶۵۴۳",
  location: "اصفهان، ایران",
  bio: "متخصص React و Three.js با ۷ سال تجربه ساخت رابط‌های تعاملی و پرفورمنس بالا برای استارتاپ‌ها و آژانس‌های دیجیتال.",
  skills: ["React", "TypeScript", "Three.js", "Performance", "WebGL"],
  joinedAt: "2023-11-02",
  emailVerified: true,
  specialty: "توسعه فرانت‌اند و رابط‌های تعاملی",
  rating: 4.9,
  reviewsCount: 62,
  hourlyRate: 850000,
  completedJobs: 47,
  availableForWork: true,
};

export const mockUsersDb: User[] = [demoClient, demoExpert];

export function findUserByEmail(email: string): User | undefined {
  return mockUsersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
