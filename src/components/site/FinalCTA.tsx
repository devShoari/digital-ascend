import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

function Orb() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geom = new THREE.IcosahedronGeometry(1.5, 4);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x7aa5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    const mat2 = new THREE.MeshBasicMaterial({
      color: 0xb07bff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 2), mat2);
    scene.add(mesh2);

    let raf = 0;
    const clock = new THREE.Clock();
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const animate = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.y = t * 0.25;
      mesh.rotation.x = t * 0.18;
      mesh2.rotation.y = -t * 0.15;
      mesh2.rotation.z = t * 0.1;
      const s = 1 + Math.sin(t * 1.2) * 0.04;
      mesh.scale.setScalar(s);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      mat2.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="relative mx-auto h-72 w-72 md:h-96 md:w-96">
          <Orb />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-electric/20 blur-3xl" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-balance"
        >
          <span className="gradient-text">پروژه بعدی شما،</span>
          <br />
          می‌تواند موفق‌ترین محصول دیجیتال شما باشد.
        </motion.h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg leading-8">
          یک گفتگوی ۳۰ دقیقه‌ای کافی است تا ببینیم چطور می‌توانیم به ایده‌ی شما شکل دهیم.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@mohtawa.ir"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            شروع همکاری
            <ArrowLeft className="size-4" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold hover:bg-white/10"
          >
            مشاهده پروژه‌ها
          </a>
        </div>
      </div>
    </section>
  );
}
