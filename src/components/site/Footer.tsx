export function Footer() {
  return (
    <footer className="relative border-t border-foreground/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="relative size-9 rounded-lg gradient-brand shadow-glow">
              <div className="absolute inset-1 rounded-md bg-background/60" />
              <div className="absolute inset-2 rounded-sm gradient-brand" />
            </div>
            <div>
              <div className="text-sm font-bold">مرکز حرفه‌ای توسعه وب ایران</div>
              <div className="text-xs text-muted-foreground">mohtawa.ir — Digital Product Studio</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground">خدمات</a>
            <a href="#projects" className="hover:text-foreground">پروژه‌ها</a>
            <a href="#education" className="hover:text-foreground">آموزش</a>
            <a href="mailto:hello@mohtawa.ir" className="hover:text-foreground">hello@mohtawa.ir</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-3 border-t border-foreground/5 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} محتوا — تمام حقوق محفوظ است.</div>
          <div className="font-mono">v2026.1 · ساخته شده با وسواس در تهران</div>
        </div>
      </div>
    </footer>
  );
}
