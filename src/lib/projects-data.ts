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

  image: string;
  url: string;

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
    slug: "iteller",
    name: "iTeller",
    tag: "FinTech · Crypto Exchange",
    category: "فین‌تک",
    year: "۱۴۰۴",
    problem:
      "طراحی رابط کاربری سریع و مدرن برای یک پلتفرم خرید و فروش ارز دیجیتال با تمرکز بر تجربه کاربری، عملکرد و مقیاس‌پذیری.",
    solution:
      "توسعه فرانت‌اند با Next.js، طراحی سیستم کامپوننت، SSR، بهینه‌سازی عملکرد و پیاده‌سازی رابط کاملاً Responsive.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query"],
    metrics: [
      { k: "SSR + SEO", v: "100%" },
      { k: "Reusable Components", v: "60+" },
      { k: "Responsive", v: "Responsive" },
    ],
    gradient: "from-electric/40 to-violet/40",
    image: "/projects/iTeller.avif",
    url: "https://www.iteller.io",

    client: "iTeller",
    role: "Front-end Developer",
    duration: "چند ماه",
    overview:
      "پیاده‌سازی رابط کاربری یک صرافی ارز دیجیتال با تمرکز بر عملکرد، سئو، معماری مقیاس‌پذیر و تجربه کاربری مدرن.",
    outcomes: [
      "طراحی سیستم کامپوننت قابل استفاده مجدد",
      "پیاده‌سازی کامل صفحات Responsive",
      "بهینه‌سازی عملکرد و SSR",
    ],
  },

  {
    slug: "camel-coin",
    name: "Camel Coin",
    tag: "Web3 · Crypto Marketplace",
    category: "کامرس",
    year: "۱۴۰۴",
    problem:
      "ساخت یک پلتفرم Web3 برای خرید، فروش و مدیریت دارایی‌های دیجیتال با تجربه کاربری روان.",
    solution:
      "پیاده‌سازی رابط مدرن با اتصال کیف پول، تعامل با قراردادهای هوشمند و بهینه‌سازی صفحات برای عملکرد بالا.",
    tech: ["Next.js", "TypeScript", "wagmi", "ethers.js", "Tailwind CSS"],
    metrics: [
      { k: "Web3 Integration", v: "Wallet" },
      { k: "Performance", v: "95+" },
      { k: "Responsive", v: "100%" },
    ],
    gradient: "from-cyan/40 to-electric/40",
    image: "/projects/Camel.avif",
    url: "https://camel-coin.vercel.app",

    client: "Camel Coin",
    role: "Front-end Developer",
    duration: "چند ماه",
    overview:
      "پلتفرم Web3 برای خرید و فروش دارایی‌های دیجیتال با اتصال کیف پول و تعامل با قراردادهای هوشمند.",
    outcomes: ["اتصال کیف پول کاربران", "پیاده‌سازی رابط مدرن Web3", "بهینه‌سازی عملکرد صفحات"],
  },

  {
    slug: "pepe",
    name: "Pepe",
    tag: "Community Platform",
    category: "SaaS",
    year: "۱۴۰۳",
    problem: "نیاز به یک وب‌سایت سریع، سئو محور و چندزبانه برای مدیریت محتوا و جامعه کاربران.",
    solution:
      "توسعه با Next.js App Router، SSR، سیستم چندزبانه، Dynamic Metadata، Sitemap و بهینه‌سازی Core Web Vitals.",
    tech: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS", "REST API"],
    metrics: [
      { k: "SEO", v: "Optimized" },
      { k: "Multi-language", v: "FA / EN" },
      { k: "SSR", v: "100%" },
    ],
    gradient: "from-violet/40 to-cyan/40",
    image: "/projects/pepe.png",
    url: "https://pepe.ir",

    client: "Pepe",
    role: "Front-end Developer",
    duration: "چند ماه",
    overview: "پلتفرم چندزبانه با تمرکز بر سئو، SSR، عملکرد بالا و معماری مدرن Next.js App Router.",
    outcomes: ["پیاده‌سازی Dynamic Metadata", "سیستم چندزبانه", "بهینه‌سازی Core Web Vitals"],
  },

  {
    slug: "teller-tech",
    name: "Teller Tech",
    tag: "Corporate Website",
    category: "برند",
    year: "۱۴۰۴",
    problem: "طراحی وب‌سایت شرکتی مدرن برای معرفی خدمات، افزایش اعتبار برند و بهبود نرخ تبدیل.",
    solution:
      "طراحی UI/UX، پیاده‌سازی صفحات با Next.js، انیمیشن‌های نرم، بهینه‌سازی Lighthouse و رعایت اصول دسترس‌پذیری.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { k: "Lighthouse", v: "95+" },
      { k: "Accessibility", v: "AA" },
      { k: "Performance", v: "Optimized" },
    ],
    gradient: "from-electric/40 to-cyan/40",
    image: "/projects/iTeller-Tech.png",
    url: "https://www.iteller.tech",

    client: "Teller Tech",
    role: "UI/UX Designer & Front-end Developer",
    duration: "چند ماه",
    overview: "طراحی و توسعه وب‌سایت شرکتی مدرن با تمرکز بر برندینگ، دسترس‌پذیری و عملکرد.",
    outcomes: ["بهینه‌سازی Lighthouse", "طراحی Responsive", "انیمیشن‌های روان"],
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