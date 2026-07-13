import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/experts", label: "متخصصین ما" },
  { href: "/about", label: "درباره" },
  // { href: "/learn", label: "آموزش" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact", label: "تماس با ما" },
];

export function Nav() {
  const { user, logout } = useAuth();
  const prefersReducedMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#services");
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Real scroll-spy — only meaningful for in-page hash links.
  useEffect(() => {
    const hashLinks = links.filter((l) => l.href.startsWith("#"));
    const sections = hashLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Cursor-follow glow on the desktop pill
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-full border border-border backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? "bg-background/75 px-3 py-2 shadow-2xl shadow-cyan-500/10"
            : "bg-background/50 px-4 py-2.5"
        }`}
      >
        {/* Ambient gradient wash */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10" />

        {/* Logo */}
        <a
          href="/"
          className="relative z-10 flex items-center gap-3 rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { rotate: 180 }}
            transition={{ duration: 0.7 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500"
          >
            <div className="h-5 w-5 rounded-md bg-white" />
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500"
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          <div>
            <div className="font-bold">محتوا</div>
            <div className="text-xs text-muted-foreground">Digital Product Studio</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList
            style={
              {
                "--x": "50%",
                "--y": "50%",
              } as React.CSSProperties
            }
            className="relative flex flex-row-reverse items-center gap-1 overflow-hidden rounded-full bg-foreground/[0.06] p-1"
          >
            {/* Cursor spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120px circle at var(--x) var(--y), rgba(34,211,238,0.15), transparent 70%)",
              }}
            />

            {links.map((item) => {
              const isActive = active === item.href;
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      onClick={() => setActive(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className="absolute inset-0 rounded-full bg-foreground/15"
                        />
                      )}

                      <motion.span
                        whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative block rounded-full px-5 py-2.5 text-sm transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger className="hidden cursor-pointer items-center gap-2 rounded-full border border-border bg-foreground/[0.05] px-3 py-2 text-sm font-semibold text-foreground outline-none transition hover:bg-foreground/[0.08] focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:inline-flex">
                {user.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <a href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    داشبورد
                  </DropdownMenuItem>
                </a>
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  خروج از حساب
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <a
                href="/auth/login"
                className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                ورود
              </a>
              <a
                href="/auth/register"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                ثبت‌نام
              </a>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="باز کردن منو"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-xl transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] border-l border-border bg-background p-0 text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <div>
                  <h2 className="text-xl font-bold">محتوا</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Digital Product Studio</p>
                </div>
                <button
                  aria-label="بستن منو"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col p-4">
                {links.map((item, index) => {
                  const isActive = active === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActive(item.href);
                        setOpen(false);
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 transition hover:bg-foreground/5"
                    >
                      <span className="flex items-center gap-2 text-lg">
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                        )}
                        {item.label}
                      </span>
                      <ArrowLeft className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </motion.a>
                  );
                })}

                <div className="mt-4 flex items-center justify-between rounded-xl bg-foreground/[0.05] px-4 py-3">
                  <span className="text-sm text-muted-foreground">پوسته</span>
                  <ThemeToggle />
                </div>

                {user ? (
                  <div className="mt-4 space-y-2 rounded-2xl border border-border bg-foreground/[0.05] p-4 text-sm">
                    <div className="text-xs text-muted-foreground">حساب کاربری</div>
                    <div className="font-semibold">{user.name}</div>
                    <a
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-foreground/[0.05] px-3 py-2 font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      داشبورد
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 font-medium text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      خروج از حساب
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-border bg-background py-3 text-sm font-semibold"
                    >
                      ورود
                    </a>
                    <a
                      href="/auth/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 text-sm font-semibold text-white"
                    >
                      ثبت‌نام
                    </a>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </header>
  );
}
