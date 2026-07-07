export type Category = "همه" | "فین‌تک" | "کامرس" | "SaaS" | "هوش مصنوعی" | "برند";

export type Project = {
  slug: string;
  name: string;
  tag: string;
  category: Exclude<Category, "همه">;
  year: string;
  problem: string;
  solution: string;
  tech: string[];
  metrics: { k: string; v: string }[];
  gradient: string;
  client?: string;
  role?: string;
  duration?: string;
  overview?: string;
  challenges?: string[];
  approach?: { title: string; body: string }[];
  outcomes?: string[];
  testimonial?: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "nova-fintech",
    name: "نوا فین‌تک",
    tag: "Fintech · Web App",
    category: "فین‌تک",
    year: "۱۴۰۳",
    problem: "تجربه پیچیده سرمایه‌گذاری و افت نرخ تبدیل در onboarding.",
    solution: "بازطراحی کامل تجربه، خلاصه‌سازی فلوها و ساخت داشبورد بلادرنگ.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    metrics: [
      { k: "افزایش نرخ تبدیل", v: "۲٫۸×" },
      { k: "کاهش زمان onboarding", v: "−۶۴٪" },
      { k: "NPS", v: "+۴۲" },
    ],
    gradient: "from-cyan-400 to-violet-500",
    client: "نوا فین‌تک",
    role: "طراحی محصول، مهندسی فرانت‌اند، معماری داده",
    duration: "۵ ماه",
    overview:
      "نوا یک پلتفرم سرمایه‌گذاری خرد است که می‌خواست تجربه‌ای شبیه اپلیکیشن‌های مصرفی مدرن به بازار ایران بیاورد. ما از صفر با تیم محصول همکاری کردیم تا onboarding، داشبورد و جریان معاملات را بازطراحی کنیم.",
    challenges: [
      "فرم ثبت‌نام ۱۱ مرحله‌ای با نرخ ریزش ۶۸٪",
      "داشبورد کند با کوئری‌های سنگین SQL",
      "نبود سیستم طراحی مشترک بین وب و موبایل",
    ],
    approach: [
      {
        title: "پژوهش و کشف",
        body: "با ۲۲ کاربر مصاحبه کردیم و رفتار ۱۰ هزار سشن را با ابزارهای تحلیلی بررسی کردیم تا نقاط اصطکاک واقعی را پیدا کنیم.",
      },
      {
        title: "طراحی و پروتوتایپ",
        body: "onboarding را به ۴ مرحله رساندیم، فرم‌ها را با smart defaults ساده کردیم و پروتوتایپ را با ۱۲ کاربر واقعی تست کردیم.",
      },
      {
        title: "مهندسی و اجرا",
        body: "با Next.js و RSC، صفحات را سریع‌تر رندر کردیم و لایه کش Redis برای کوئری‌های سنگین اضافه کردیم.",
      },
    ],
    outcomes: [
      "نرخ تبدیل onboarding از ۳۲٪ به ۹۰٪ رسید",
      "زمان بارگذاری داشبورد از ۴٫۲s به ۰٫۸s کاهش یافت",
      "NPS تیم محصول ۴۲ واحد افزایش داشت",
    ],
    testimonial: {
      quote:
        "استودیو نه فقط یک تیم اجرایی، بلکه شریک استراتژیک ما بود. تصمیم‌های محصولی که با هم گرفتیم، مسیر شرکت را عوض کرد.",
      author: "سارا رضایی",
      role: "مدیر محصول، نوا فین‌تک",
    },
  },
  {
    slug: "stella-commerce",
    name: "اِستلا کامرس",
    tag: "E-commerce · Headless",
    category: "کامرس",
    year: "۱۴۰۳",
    problem: "کندی فروشگاه و افت سئو در صفحات محصول.",
    solution: "مهاجرت به معماری headless، بهینه‌سازی Core Web Vitals و سئو فنی.",
    tech: ["React", "Edge", "Cloudflare", "Algolia"],
    metrics: [
      { k: "LCP", v: "۰٫۹s" },
      { k: "ترافیک ارگانیک", v: "+۲۱۰٪" },
      { k: "درآمد ماهانه", v: "+۱٫۷×" },
    ],
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    slug: "atlas-ai",
    name: "اَتلس AI",
    tag: "SaaS · AI Platform",
    category: "هوش مصنوعی",
    year: "۱۴۰۳",
    problem: "نیاز به دستیار هوشمند برای تیم‌های پشتیبانی با دانش داخلی.",
    solution: "پلتفرم RAG با کنترل دقیق، evaluation و داشبورد مدیریت دانش.",
    tech: ["Python", "FastAPI", "pgvector", "OpenAI"],
    metrics: [
      { k: "زمان پاسخ", v: "−۷۸٪" },
      { k: "دقت پاسخ", v: "۹۴٪" },
      { k: "صرفه‌جویی ماهانه", v: "۳۲۰h" },
    ],
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "orbit-saas",
    name: "اوربیت اَنالیتیکس",
    tag: "SaaS · Analytics",
    category: "SaaS",
    year: "۱۴۰۲",
    problem: "داشبوردهای کند و پراکنده برای تیم‌های محصول.",
    solution: "طراحی مجدد معماری داده، کوئری‌های استریمی و UI کاملاً کیبورد-محور.",
    tech: ["Remix", "ClickHouse", "tRPC", "D3"],
    metrics: [
      { k: "زمان کوئری", v: "−۸۱٪" },
      { k: "نرخ نگه‌داشت", v: "+۳۸٪" },
      { k: "ARR", v: "+۲٫۲×" },
    ],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    slug: "mira-bank",
    name: "میرا بانک",
    tag: "Fintech · Mobile",
    category: "فین‌تک",
    year: "۱۴۰۲",
    problem: "اپلیکیشن قدیمی با تجربه ناهماهنگ در iOS و Android.",
    solution: "طراحی سیستم طراحی مشترک و بازنویسی با React Native و ماژول‌های بومی.",
    tech: ["React Native", "Swift", "Kotlin", "Sentry"],
    metrics: [
      { k: "کرش‌ریت", v: "۰٫۰۲٪" },
      { k: "امتیاز اپ استور", v: "۴٫۸" },
      { k: "کاربر فعال روزانه", v: "+۱٫۹×" },
    ],
    gradient: "from-orange-400 to-pink-500",
  },
  {
    slug: "kian-brand",
    name: "بازآفرینی برند کیان",
    tag: "Brand · Identity",
    category: "برند",
    year: "۱۴۰۲",
    problem: "هویت بصری قدیمی و ناهماهنگ در نقاط تماس دیجیتال و چاپی.",
    solution: "استراتژی برند، سیستم بصری کامل و راهنمای صدای برند دو زبانه.",
    tech: ["Figma", "After Effects", "Design Tokens"],
    metrics: [
      { k: "یادآوری برند", v: "+۵۵٪" },
      { k: "زمان تولید محتوا", v: "−۴۰٪" },
      { k: "پوشش رسانه‌ای", v: "+۳×" },
    ],
    gradient: "from-rose-400 to-amber-400",
  },
  {
    slug: "pulse-marketplace",
    name: "پالس مارکت‌پلیس",
    tag: "E-commerce · Marketplace",
    category: "کامرس",
    year: "۱۴۰۱",
    problem: "مدیریت هزاران فروشنده با پنل‌های ناکارآمد.",
    solution: "پنل چند‌مستأجری، سیستم پرداخت تفکیک‌شده و ابزارهای اتوماسیون.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Stripe Connect"],
    metrics: [
      { k: "GMV سالانه", v: "+۲٫۴×" },
      { k: "فروشندگان فعال", v: "+۱۸۰٪" },
      { k: "تیکت پشتیبانی", v: "−۵۲٪" },
    ],
    gradient: "from-teal-400 to-blue-500",
  },
  {
    slug: "vera-copilot",
    name: "وِرا کوپایلوت",
    tag: "AI · Productivity",
    category: "هوش مصنوعی",
    year: "۱۴۰۱",
    problem: "تیم‌های حقوقی درگیر بازبینی دستی قراردادهای طولانی.",
    solution: "کوپایلوت اختصاصی با ارزیابی ریسک و پیشنهاد بازنویسی بند به بند.",
    tech: ["LangChain", "Postgres", "Next.js", "Vercel AI"],
    metrics: [
      { k: "زمان بازبینی", v: "−۷۰٪" },
      { k: "دقت شناسایی ریسک", v: "۹۱٪" },
      { k: "قرارداد در ماه", v: "×۴" },
    ],
    gradient: "from-fuchsia-500 to-purple-600",
  },
];

export const categories: Category[] = ["همه", "فین‌تک", "کامرس", "SaaS", "هوش مصنوعی", "برند"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return projects.slice(0, limit);
  const sameCat = projects.filter((p) => p.slug !== slug && p.category === current.category);
  const others = projects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}