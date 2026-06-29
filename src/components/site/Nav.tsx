import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "#process", label: "فرآیند" },
  { href: "#projects", label: "پروژه‌ها" },
  { href: "#tech", label: "تکنولوژی" },
  { href: "#education", label: "آموزش" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-elevated" : "glass"
        }`}
      >
        <a href="#" className="flex items-center gap-2.5 pr-2">
          <div className="relative size-8 rounded-lg gradient-brand shadow-glow">
            <div className="absolute inset-1 rounded-md bg-background/60" />
            <div className="absolute inset-2 rounded-sm gradient-brand" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">محتوا</div>
            <div className="text-[10px] text-muted-foreground">Digital Product Studio</div>
          </div>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
        >
          گفتگو با ما
        </a>
      </nav>
    </header>
  );
}
