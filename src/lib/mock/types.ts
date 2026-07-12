// Shared types for the mock data layer.
// These mirror what a future real API would return, so swapping the
// mock functions in `auth-api.ts` / `*.ts` for real fetch calls later
// should not require touching any component.

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "مدیر" | "عضو تیم" | "مشتری";
  title: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  joinedAt: string; // ISO date
  emailVerified: boolean;
};

export type ProjectStatus = "در حال انجام" | "در انتظار بازبینی" | "تکمیل‌شده" | "متوقف‌شده";

export type AssignedProject = {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number; // 0-100
  dueDate: string; // ISO date
  gradient: string;
  teamAvatars: string[]; // initials
  tasksDone: number;
  tasksTotal: number;
};

export type NotificationVisibility = "public" | "private";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  visibility: NotificationVisibility;
  read: boolean;
  createdAt: string; // ISO date
  category: "پروژه" | "سیستم" | "پیام" | "امنیت";
};

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string; // ISO date
};

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string };
