import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="بازگشت به بالا"
          className="fixed bottom-6 cursor-pointer right-6 z-50 flex items-center gap-3 rounded-full border border-border bg-background/90 px-3 py-3 text-sm font-semibold text-foreground shadow-[0_32px_80px_-40px_rgba(56,189,248,0.55)] backdrop-blur-xl ring-1 ring-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-background"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-violet-500 text-primary-foreground shadow-lg shadow-cyan-500/20">
            <ArrowUp className="h-5 w-5" />
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
