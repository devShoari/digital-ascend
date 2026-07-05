export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "طراحی" | "مهندسی" | "سئو و رشد" | "استراتژی" | "خلاقیت";
  readTime: string;
  date: string;
  gradient: string;
  author: { name: string; role: string; initials: string };
  featured?: boolean;
  content: { heading?: string; body: string }[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "webgl-3d-interfaces",
    title: "طراحی رابط‌های سه‌بعدی با WebGL؛ از ایده تا ۶۰ فریم بر ثانیه",
    excerpt:
      "چطور با Three.js و React Three Fiber تجربه‌های تعاملی می‌سازیم که در موبایل هم روان اجرا می‌شوند — از بهینه‌سازی shaderها تا مدیریت حافظه.",
    category: "مهندسی",
    readTime: "۱۲ دقیقه",
    date: "۱۴ تیر ۱۴۰۵",
    gradient: "from-cyan-400 via-violet-500 to-fuchsia-500",
    featured: true,
    author: { name: "پویا مرادی", role: "مهندس ارشد فرانت‌اند", initials: "PM" },
    tags: ["WebGL", "Three.js", "React Three Fiber", "Performance"],
    content: [
      {
        body: "چند سال پیش، ساخت یک تجربه سه‌بعدی روی وب یعنی قربانی کردن نیمی از کاربران موبایل. امروز با ابزارهایی مثل React Three Fiber و درک بهتر از GPU، می‌توانیم صحنه‌هایی بسازیم که هم چشم‌نواز باشند و هم روی گوشی‌های میان‌رده روان اجرا شوند.",
      },
      {
        heading: "شروع با یک ذهنیت درست",
        body: "قبل از اولین خط کد، باید بدانید بودجه‌ی فریم شما چقدر است. برای ۶۰fps فقط ۱۶ میلی‌ثانیه در اختیار دارید — و بخش زیادی از آن صرف کارهای مرورگر می‌شود. یعنی JavaScript، فراخوانی‌های GPU و به‌روزرسانی DOM باید جمعاً زیر ۸ میلی‌ثانیه بمانند.",
      },
      {
        heading: "بهینه‌سازی هندسه",
        body: "بیشتر پروژه‌هایی که ما ممیزی می‌کنیم با مدل‌های چند صد هزار پلی‌گانی شروع کرده‌اند. کاهش تعداد vertex، ادغام geometryهای مشابه با InstancedMesh و استفاده از LOD (Level of Detail) معمولاً بین ۳۰ تا ۶۰ درصد بار GPU را کم می‌کند.",
      },
      {
        heading: "shaderها؛ جایی که جادو اتفاق می‌افتد",
        body: "shader سفارشی به شما اجازه می‌دهد افکت‌هایی بسازید که با ماده‌های استاندارد ممکن نیست. اما هر varying اضافه، هر texture lookup و هر شاخه‌ی if در fragment shader هزینه دارد. اصل ما این است: ابتدا ساده‌ترین نسخه را بسازید، بعد لایه به لایه اضافه کنید و بعد از هر لایه اندازه بگیرید.",
      },
      {
        heading: "مدیریت حافظه",
        body: "نشت حافظه در Three.js یک قاتل خاموش است. هر geometry، material و texture که می‌سازید باید dispose شود. در React Three Fiber معمولاً این کار خودکار است، اما وقتی خارج از چرخه‌ی حیات کامپوننت چیزی می‌سازید، مسئولیت با شماست.",
      },
      {
        heading: "جمع‌بندی",
        body: "ساخت تجربه‌های سه‌بعدی روی وب هنر تعادل است: بین زیبایی و کارایی، بین جزئیات و سادگی. اگر از روز اول با ذهنیت performance-first کار کنید، محصول نهایی هم چشم‌نواز خواهد بود و هم در دست میلیون‌ها کاربر روان اجرا می‌شود.",
      },
    ],
  },
  {
    slug: "core-web-vitals-2026",
    title: "Core Web Vitals در سال ۲۰۲۶؛ راهنمای عملی برای تیم‌های محصول",
    excerpt: "معیارهای جدید گوگل، ابزارهای اندازه‌گیری و تکنیک‌هایی که در پروژه‌های واقعی جواب داده‌اند.",
    category: "سئو و رشد",
    readTime: "۹ دقیقه",
    date: "۷ تیر ۱۴۰۵",
    gradient: "from-amber-400 to-rose-500",
    author: { name: "امیرحسین طاهری", role: "متخصص ارشد سئو تکنیکال", initials: "AT" },
    tags: ["SEO", "Core Web Vitals", "Performance"],
    content: [
      { body: "معیارهای Core Web Vitals از ۲۰۲۰ تا امروز مسیر طولانی طی کرده‌اند. INP جای FID را گرفته و انتظارات کاربر بالاتر رفته است." },
      { heading: "LCP در ۲۰۲۶", body: "زیر ۲.۵ ثانیه دیگر یک آرزو نیست، یک استاندارد است. تصاویر hero را با priority و srcset درست بارگذاری کنید و از فونت‌های variable با display=swap استفاده کنید." },
      { heading: "INP؛ قاتل جدید تجربه", body: "Interaction to Next Paint سخت‌گیرتر از FID است چون هر تعامل را می‌سنجد، نه فقط اولی را. long taskها را بشکنید و از scheduler.yield یا setTimeout برای yield کردن به مرورگر استفاده کنید." },
      { heading: "CLS در دنیای انیمیشن", body: "با transformها و opacity کار کنید، نه با تغییر ابعاد لایه. هر تصویر بدون aspect-ratio یک بمب ساعتی است." },
    ],
  },
  {
    slug: "design-system-as-product",
    title: "Design System به مثابه محصول؛ چرا کتابخانه‌ی UI شما شکست می‌خورد",
    excerpt: "درس‌هایی از ساخت دیزاین‌سیستم برای تیم‌های چند-محصولی و اشتباهات رایجی که باید از آن‌ها اجتناب کنید.",
    category: "طراحی",
    readTime: "۸ دقیقه",
    date: "۳۰ خرداد ۱۴۰۵",
    gradient: "from-fuchsia-400 to-cyan-400",
    author: { name: "نگار احمدی", role: "سرپرست طراحی محصول", initials: "NA" },
    tags: ["Design System", "Figma", "Component Library"],
    content: [
      { body: "دیزاین‌سیستم یک پروژه نیست، یک محصول است. با کاربر، roadmap و versioning. اگر با ذهنیت پروژه‌ای بسازیدش، در سال دوم رها می‌شود." },
      { heading: "کاربر اصلی شما توسعه‌دهنده است", body: "طراحی که فقط در Figma زیبا باشد و در کد پیاده‌سازی سختی داشته باشد، شکست خورده است. تیم شما باید در هر دو دنیا زندگی کند." },
      { heading: "Tokenها را جدی بگیرید", body: "رنگ، spacing، radius و typography باید token باشند، نه مقادیر hardcode. این تنها راه پشتیبانی از multi-brand و dark mode است." },
    ],
  },
  {
    slug: "edge-runtime-future",
    title: "معماری Edge؛ چرا Cloudflare Workers آینده‌ی بک‌اند است",
    excerpt: "مقایسه‌ی serverless سنتی با edge runtime و راهنمای مهاجرت پروژه‌های واقعی.",
    category: "مهندسی",
    readTime: "۱۱ دقیقه",
    date: "۲۲ خرداد ۱۴۰۵",
    gradient: "from-emerald-400 to-cyan-500",
    author: { name: "سارا کاظمی", role: "مهندس فول‌استک", initials: "SK" },
    tags: ["Edge", "Cloudflare Workers", "Serverless"],
    content: [
      { body: "cold start چند صد میلی‌ثانیه‌ای Lambda برای کاربرانی که در آن سوی دنیا هستند غیرقابل تحمل است. edge runtime این معادله را بازنویسی می‌کند." },
      { heading: "چه چیز تغییر کرد", body: "کد شما نزدیک کاربر اجرا می‌شود، نه در یک منطقه دور. latency از ۳۰۰ میلی‌ثانیه به زیر ۵۰ می‌رسد بدون هیچ کاری از طرف شما." },
      { heading: "محدودیت‌ها", body: "همه چیز رنگین‌کمان نیست. Node APIهای محدود، حافظه‌ی محدود و مدل قیمت‌گذاری متفاوت. برای هر پروژه باید حساب کرد." },
    ],
  },
  {
    slug: "brand-in-saas",
    title: "روایت برند در محصولات SaaS؛ فراتر از لوگو و رنگ",
    excerpt: "چطور صدای برند را در جزئیات تجربه کاربری، میکروکپی و انیمیشن‌ها تزریق کنیم.",
    category: "خلاقیت",
    readTime: "۷ دقیقه",
    date: "۱۵ خرداد ۱۴۰۵",
    gradient: "from-pink-400 to-orange-400",
    author: { name: "الهام سلطانی", role: "طراح تعاملی و حرکتی", initials: "ES" },
    tags: ["Brand", "UX Writing", "Motion Design"],
    content: [
      { body: "برند شما در empty stateها زندگی می‌کند، در پیام خطا، در آن انیمیشن ۳۰۰ میلی‌ثانیه‌ای که وقتی کاری تمام می‌شود پخش می‌شود." },
      { heading: "میکروکپی جدی است", body: "متن دکمه، placeholder فرم، پیام تأیید. اینجا جایی است که کاربر واقعاً با برند شما صحبت می‌کند." },
    ],
  },
  {
    slug: "mvp-to-pmf",
    title: "از MVP تا Product-Market Fit؛ چارچوبی که در ۱۲ استارتاپ آزموده‌ایم",
    excerpt: "متریک‌ها، آزمون‌ها و تصمیم‌های سختی که مسیر یک محصول را تعیین می‌کنند.",
    category: "استراتژی",
    readTime: "۱۴ دقیقه",
    date: "۸ خرداد ۱۴۰۵",
    gradient: "from-sky-400 to-blue-600",
    author: { name: "کیان دلاور", role: "مدیر پروژه و اسکرام‌مستر", initials: "KD" },
    tags: ["Strategy", "PMF", "Startup"],
    content: [
      { body: "PMF یک لحظه نیست، یک طیف است. و بیشتر تیم‌ها زودتر از موعد جشن می‌گیرند و بعد سردرگم می‌شوند." },
      { heading: "متریک‌های واقعی", body: "retention هفتگی، نه ثبت‌نام. NPS پس از ۳۰ روز استفاده، نه بلافاصله. تعداد کاربرانی که ناراحت می‌شوند اگر محصول شما ناپدید شود." },
    ],
  },
  {
    slug: "scroll-animations-gsap-lenis",
    title: "انیمیشن‌های اسکرول با GSAP و Lenis؛ راهنمای جامع",
    excerpt: "الگوهایی که در پروژه‌های واقعی برای ساخت تجربه‌های اسکرول سینمایی استفاده می‌کنیم.",
    category: "طراحی",
    readTime: "۱۰ دقیقه",
    date: "۱ خرداد ۱۴۰۵",
    gradient: "from-violet-500 to-indigo-500",
    author: { name: "آرمین رستمی", role: "مدیر خلاقیت و بنیان‌گذار", initials: "AR" },
    tags: ["GSAP", "Lenis", "Scroll", "Animation"],
    content: [
      { body: "اسکرول smooth یک ترند نیست، یک ابزار روایت است. با آن می‌توانید سرعت خواندن کاربر را کنترل کنید و توجهش را هدایت کنید." },
      { heading: "Lenis برای smoothness", body: "Lenis سبک است، RAF-based و با scroll events مرورگر سازگار. بدون jank، بدون تداخل با انیمیشن‌های CSS." },
      { heading: "GSAP ScrollTrigger", body: "قدرت واقعی وقتی می‌آید که Lenis را با ScrollTrigger ترکیب می‌کنید. pin کردن سکشن‌ها، scrub انیمیشن، parallax واقعی." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}