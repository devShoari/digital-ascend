import type { User } from "./types";

// Demo account #1 — normal user
export const demoUser: User = {
  id: "u_1001",
  name: "سارا رضایی",
  email: "sara.rezaei@mohtawa.ir",
  avatarUrl: undefined,
  accountType: "user",
  role: "عضو تیم",
  title: "طراح محصول ارشد",
  phone: "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
  location: "تهران، ایران",
  bio: "طراح محصول با ۶ سال تجربه در ساخت رابط‌های کاربری برای محصولات SaaS و فین‌تک. علاقه‌مند به سیستم‌های طراحی و تجربه‌های حرکتی.",
  skills: ["Figma", "Design Systems", "Motion Design", "User Research", "Prototyping"],
  joinedAt: "2024-03-12",
  emailVerified: true,
};

// Demo account #2 — specialist
export const demoSpecialist: User = {
  id: "u_2001",
  name: "پویا مرادی",
  email: "pouya.moradi@mohtawa.ir",
  avatarUrl: undefined,
  accountType: "specialist",
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

export const mockUsersDb: User[] = [demoUser, demoSpecialist];

export function findUserByEmail(email: string): User | undefined {
  return mockUsersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
