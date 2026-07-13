// Shared types for the mock data layer.
// These mirror what a future real API would return, so swapping the
// mock functions in `auth-api.ts` / `*.ts` for real fetch calls later
// should not require touching any component.

export type AccountType = "client" | "expert";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  accountType: AccountType;
  role: "مدیر" | "عضو تیم" | "کارفرما" | "متخصص مستقل";
  title: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  joinedAt: string; // ISO date
  emailVerified: boolean;
  // Expert-only fields (present when accountType === "expert")
  specialty?: string;
  rating?: number;
  reviewsCount?: number;
  hourlyRate?: number;
  completedJobs?: number;
  availableForWork?: boolean;
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

export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

// ---------- Specialist-only dashboard data ----------

export type RequestStatus = "در انتظار پاسخ" | "پذیرفته‌شده" | "رد شده";

export type ClientRequest = {
  id: string;
  clientName: string;
  clientInitials: string;
  service: string;
  message: string;
  budget: string;
  status: RequestStatus;
  createdAt: string; // ISO date
};

export type DayAvailability = {
  day: "شنبه" | "یکشنبه" | "دوشنبه" | "سه‌شنبه" | "چهارشنبه" | "پنجشنبه" | "جمعه";
  enabled: boolean;
  from: string; // "09:00"
  to: string; // "17:00"
};

export type EarningsSummary = {
  totalEarned: number; // تومان
  pendingPayout: number;
  thisMonth: number;
  monthlyTrend: { month: string; amount: number }[];
  recentPayouts: {
    id: string;
    project: string;
    amount: number;
    date: string;
    status: "پرداخت‌شده" | "در انتظار";
  }[];
};
