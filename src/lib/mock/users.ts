import type { User } from "./types";

// The "seed" account — used whenever someone logs in with the demo
// credentials shown on the login screen, and as the base record that
// register() clones for newly "created" accounts.
export const demoUser: User = {
  id: "u_1001",
  name: "سارا رضایی",
  email: "sara.rezaei@mohtawa.ir",
  avatarUrl: undefined,
  role: "عضو تیم",
  title: "طراح محصول ارشد",
  phone: "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
  location: "تهران، ایران",
  bio: "طراح محصول با ۶ سال تجربه در ساخت رابط‌های کاربری برای محصولات SaaS و فین‌تک. علاقه‌مند به سیستم‌های طراحی و تجربه‌های حرکتی.",
  skills: ["Figma", "Design Systems", "Motion Design", "User Research", "Prototyping"],
  joinedAt: "2024-03-12",
  emailVerified: true,
};

export const mockUsersDb: User[] = [demoUser];

export function findUserByEmail(email: string): User | undefined {
  return mockUsersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
