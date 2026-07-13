import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BackToTop } from "@/components/site/BackToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "مرکز توسعه وب ایران | طراحی و توسعه محصولات دیجیتال" },
      {
        name: "description",
        content:
          "مرکز توسعه وب ایران؛ تیم تخصصی طراحی و توسعه وب‌سایت، اپلیکیشن و محصولات دیجیتال با تمرکز بر تجربه کاربری، کیفیت و رشد کسب‌وکارها.",
      },
      { name: "author", content: "مرکز توسعه وب ایران" },
      {
        property: "og:title",
        content: "مرکز توسعه وب ایران | توسعه محصولات دیجیتال",
      },
      {
        property: "og:description",
        content: "طراحی، توسعه و مدیریت محصولات دیجیتال توسط تیم متخصص مرکز توسعه وب ایران.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "مرکز توسعه وب ایران" },
      {
        name: "twitter:description",
        content: "تیم توسعه محصول دیجیتال برای ساخت وب‌سایت‌ها و اپلیکیشن‌های مدرن.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';}if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        {" "}
        <AuthProvider>
          {children}
          <Scripts />
        </AuthProvider>
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <BackToTop />
    </QueryClientProvider>
  );
}
