// Mock team chat for the client portal — one thread per assigned project.
// Swap this with a real API layer later without touching the UI.

export type ChatAuthor = {
  id: string;
  name: string;
  initials: string;
  role: string;
  self?: boolean;
};

export type ChatMessage = {
  id: string;
  author: ChatAuthor;
  body: string;
  createdAt: string; // ISO
};

export type ProjectThread = {
  projectId: string;
  projectName: string;
  team: ChatAuthor[];
  messages: ChatMessage[];
};

const self: ChatAuthor = {
  id: "me",
  name: "شما",
  initials: "شما",
  role: "کارفرما",
  self: true,
};

const pouya: ChatAuthor = {
  id: "u_2001",
  name: "پویا مرادی",
  initials: "پ.م",
  role: "مهندس ارشد فرانت‌اند",
};

const negar: ChatAuthor = {
  id: "u_2002",
  name: "نگار احمدی",
  initials: "ن.ا",
  role: "سرپرست طراحی محصول",
};

const kian: ChatAuthor = {
  id: "u_2003",
  name: "کیان دلاور",
  initials: "ک.د",
  role: "مدیر پروژه",
};

export const mockThreads: ProjectThread[] = [
  {
    projectId: "p_1",
    projectName: "بازطراحی اپلیکیشن نوا فین‌تک",
    team: [pouya, negar, kian, self],
    messages: [
      {
        id: "m1",
        author: kian,
        body: "سلام. نسخه‌ی جدید فلوی پرداخت آماده‌ی بازبینی شماست. لطفاً تا فردا نظرتون رو بدید.",
        createdAt: "2026-07-12T09:12:00Z",
      },
      {
        id: "m2",
        author: negar,
        body: "لینک پروتوتایپ رو داخل بخش فایل‌های پروژه گذاشتم.",
        createdAt: "2026-07-12T09:18:00Z",
      },
      {
        id: "m3",
        author: self,
        body: "عالیه، امروز نگاه می‌کنم و بازخورد می‌دم 🙏",
        createdAt: "2026-07-12T10:04:00Z",
      },
      {
        id: "m4",
        author: pouya,
        body: "من هم پیاده‌سازی فرانت رو تا ۷۰٪ جلو بردم؛ پیشرفت پروژه به‌روز شد.",
        createdAt: "2026-07-13T08:30:00Z",
      },
    ],
  },
  {
    projectId: "p_2",
    projectName: "سیستم طراحی اِستلا کامرس",
    team: [negar, kian, self],
    messages: [
      {
        id: "m1",
        author: negar,
        body: "توکن‌های رنگ نهایی شد. منتظر تأیید شما هستیم تا وارد فاز مستندسازی بشیم.",
        createdAt: "2026-07-11T12:00:00Z",
      },
      {
        id: "m2",
        author: self,
        body: "تأیید می‌کنم. ممنون از سرعت عمل تیم.",
        createdAt: "2026-07-11T13:20:00Z",
      },
    ],
  },
  {
    projectId: "p_3",
    projectName: "داشبورد مدیریت اَتلس AI",
    team: [pouya, kian, self],
    messages: [
      {
        id: "m1",
        author: kian,
        body: "کیک‌آف پروژه فردا ساعت ۱۰ برگزار می‌شود. لینک جلسه رو در اعلان‌ها ببینید.",
        createdAt: "2026-07-13T07:00:00Z",
      },
    ],
  },
];
