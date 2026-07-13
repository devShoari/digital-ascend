import type { DayAvailability } from "./types";

export const mockAvailability: DayAvailability[] = [
  { day: "شنبه", enabled: true, from: "09:00", to: "17:00" },
  { day: "یکشنبه", enabled: true, from: "09:00", to: "17:00" },
  { day: "دوشنبه", enabled: true, from: "09:00", to: "17:00" },
  { day: "سه‌شنبه", enabled: true, from: "09:00", to: "17:00" },
  { day: "چهارشنبه", enabled: true, from: "09:00", to: "14:00" },
  { day: "پنجشنبه", enabled: false, from: "10:00", to: "14:00" },
  { day: "جمعه", enabled: false, from: "10:00", to: "14:00" },
];
