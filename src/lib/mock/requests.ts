import type { ClientRequest } from "./types";

export const mockClientRequests: ClientRequest[] = [
  {
    id: "r_1",
    clientName: "استودیو کیان برند",
    clientInitials: "ک.ب",
    service: "پیاده‌سازی رابط کاربری React",
    message: "به دنبال یک متخصص فرانت‌اند برای بازطراحی داشبورد مدیریت محتوا هستیم. زمان‌بندی حدود ۳ هفته.",
    budget: "۱۵–۲۵ میلیون تومان",
    status: "در انتظار پاسخ",
    createdAt: "2026-07-11T10:00:00",
  },
  {
    id: "r_2",
    clientName: "فروشگاه آنلاین وستا",
    clientInitials: "و.س",
    service: "بهینه‌سازی عملکرد (Performance)",
    message: "سرعت بارگذاری فروشگاه پایین است و نیاز به بازبینی و بهینه‌سازی باندل و رندر داریم.",
    budget: "۸–۱۲ میلیون تومان",
    status: "در انتظار پاسخ",
    createdAt: "2026-07-10T15:30:00",
  },
  {
    id: "r_3",
    clientName: "اپلیکیشن سلامتی طبیب",
    clientInitials: "ط.ب",
    service: "توسعه ویجت سه‌بعدی WebGL",
    message: "می‌خواهیم یک نمایش سه‌بعدی تعاملی از بدن انسان در اپ وب اضافه کنیم.",
    budget: "۳۰+ میلیون تومان",
    status: "پذیرفته‌شده",
    createdAt: "2026-07-05T09:00:00",
  },
  {
    id: "r_4",
    clientName: "پلتفرم آموزشی درسا",
    clientInitials: "د.ر",
    service: "مشاوره معماری فرانت‌اند",
    message: "نیاز به یک جلسه مشاوره ۲ ساعته درباره انتخاب استک مناسب برای پلتفرم جدید داریم.",
    budget: "۲ میلیون تومان",
    status: "رد شده",
    createdAt: "2026-06-28T12:00:00",
  },
];
