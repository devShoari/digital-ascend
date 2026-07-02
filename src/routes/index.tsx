import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Tech } from "@/components/site/Tech";
import { Stats } from "@/components/site/Stats";
import { Education } from "@/components/site/Education";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "محتوا — استودیوی محصول دیجیتال" },
      { name: "description", content: "از ایده تا رشد — طراحی، توسعه، سئو و استراتژی محصول برای ساخت محصولات دیجیتال موفق." },
      { property: "og:title", content: "محتوا — استودیوی محصول دیجیتال" },
      { property: "og:description", content: "از ایده تا رشد — طراحی، توسعه، سئو و استراتژی محصول." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Process />
      <Services />
      <Projects />
      <WhyUs />
      <Tech />
      <Stats />
      <Education />
      <FinalCTA />
      <Footer />
    </main>
  );
}
