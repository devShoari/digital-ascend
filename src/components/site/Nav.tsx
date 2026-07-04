import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "#process", label: "فرآیند" },
  { href: "#projects", label: "پروژه‌ها" },
  { href: "/experts", label: "متخصصین ما" },
  { href: "#tech", label: "تکنولوژی" },
  { href: "#education", label: "آموزش" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#services");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 px-3 py-2 backdrop-blur-2xl transition-all duration-500 ${
          scrolled ? "bg-black/55 shadow-2xl shadow-cyan-500/10" : "bg-black/25"
        }`}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10" />

        {/* Logo */}
        <a href="#" className="relative z-10 flex items-center gap-3 px-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.7 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500"
          >
            <div className="h-5 w-5 rounded-md bg-white" />
          </motion.div>

          <div>
            <div className="font-bold">محتوا</div>
            <div className="text-xs text-white/50">Digital Product Studio</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex items-center gap-1 rounded-full bg-white/5 p-1">
            {links.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <a href={item.href} onClick={() => setActive(item.href)} className="relative">
                    {active === item.href && (
                      <motion.div
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                        }}
                        className="absolute inset-0 rounded-full bg-white/10"
                      />
                    )}

                    <motion.span
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative block rounded-full px-5 py-2.5 text-sm transition-colors ${
                        active === item.href ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  </a>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* CTA */}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 md:inline-flex"
          >
            گفتگو با ما
          </motion.a>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] border-l border-white/10 bg-zinc-950 p-0 text-white"
            >
              <div className="border-b border-white/10 p-6">
                <h2 className="text-xl font-bold">محتوا</h2>
                <p className="mt-1 text-sm text-white/50">Digital Product Studio</p>
              </div>

              <div className="flex flex-col p-4">
                {links.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActive(item.href);
                      setOpen(false);
                    }}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="group flex items-center justify-between rounded-xl px-4 py-4 transition hover:bg-white/5"
                  >
                    <span className="text-lg">{item.label}</span>

                    <ArrowLeft className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                ))}

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-8 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 py-4 font-semibold text-white"
                >
                  گفتگو با ما
                </motion.a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </header>
  );
}
