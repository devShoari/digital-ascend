import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";

/**
 * Cinematic particle network — a "living neural core".
 * Pure three.js (no R3F) for tight control + small footprint.
 */
function ParticleCore() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- particles on a sphere shell ---
    const COUNT = 1400;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const base = new Float32Array(COUNT * 3);

    const c1 = new THREE.Color("#5b8cff"); // electric blue
    const c2 = new THREE.Color("#b07bff"); // violet
    const c3 = new THREE.Color("#7ee3ff"); // cyan

    for (let i = 0; i < COUNT; i++) {
      // sphere with slight shell thickness
      const r = 2.3 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = base[i * 3] = x;
      positions[i * 3 + 1] = base[i * 3 + 1] = y;
      positions[i * 3 + 2] = base[i * 3 + 2] = z;

      const m = Math.random();
      const col = m < 0.5 ? c1 : m < 0.85 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      sizes[i] = 0.6 + Math.random() * 1.8;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // round soft particle sprite
    const sprite = (() => {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.3, "rgba(255,255,255,0.6)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, s, s);
      const t = new THREE.CanvasTexture(c);
      return t;
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: sprite,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // --- inner glowing core ---
    const coreGeom = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x5b8cff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    const core2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.MeshBasicMaterial({
        color: 0xb07bff,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      }),
    );
    scene.add(core2);

    // --- mouse parallax ---
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;

      points.rotation.y = t * 0.08 + cur.x * 0.5;
      points.rotation.x = Math.sin(t * 0.15) * 0.15 + cur.y * 0.3;
      core.rotation.y = t * 0.2;
      core.rotation.x = t * 0.15;
      core2.rotation.y = -t * 0.12;
      core2.rotation.z = t * 0.08;

      // breathing displacement
      const pos = geom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const bx = base[ix], by = base[ix + 1], bz = base[ix + 2];
        const n = Math.sin(t * 0.6 + bx * 1.4 + by * 1.1 + bz * 0.8) * 0.06;
        pos.array[ix] = bx + bx * n;
        pos.array[ix + 1] = by + by * n;
        pos.array[ix + 2] = bz + bz * n;
      }
      pos.needsUpdate = true;

      camera.position.x = cur.x * 0.6;
      camera.position.y = -cur.y * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      sprite.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Aurora + grid backdrop */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-70" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
              </span>
              استودیوی محصول دیجیتال · فعال در ۲۰۲۶
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl text-balance"
            >
              <span className="gradient-text">از ایده تا رشد،</span>
              <br />
              تیم ما کنار شماست.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg"
            >
              ما با طراحی، توسعه، سئو و استراتژی محصول، ایده‌های شما را به
              محصولات دیجیتال موفق تبدیل می‌کنیم.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="size-4" />
                شروع همکاری
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                نمونه پروژه‌ها
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex items-center gap-6 text-xs text-muted-foreground"
            >
              <div className="flex -space-x-2 space-x-reverse">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-7 rounded-full border border-white/10 bg-gradient-to-br from-electric/40 to-violet/40"
                    style={{ background: `linear-gradient(135deg, hsl(${220 + i * 18} 80% 65%), hsl(${280 + i * 12} 70% 60%))` }}
                  />
                ))}
              </div>
              <div>
                <span className="num text-foreground font-semibold">۱۲۰+</span>{" "}
                تیم و کسب‌و‌کار به ما اعتماد کرده‌اند
              </div>
            </motion.div>
          </div>

          {/* 3D visual */}
          <div className="relative h-[420px] md:h-[560px] lg:h-[640px]">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
              <ParticleCore />
            </div>
            {/* glow blobs */}
            <div className="pointer-events-none absolute -inset-10 -z-10">
              <div className="absolute right-1/4 top-1/3 size-72 rounded-full bg-electric/30 blur-3xl animate-pulse-glow" />
              <div className="absolute left-1/4 bottom-1/4 size-72 rounded-full bg-violet/30 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
            </div>
            {/* floating labels */}
            <FloatingLabel className="left-2 top-12" delay={0.8}>Idea</FloatingLabel>
            <FloatingLabel className="right-2 top-1/3" delay={1.0}>Creativity</FloatingLabel>
            <FloatingLabel className="left-4 bottom-1/3" delay={1.2}>Technology</FloatingLabel>
            <FloatingLabel className="right-6 bottom-10" delay={1.4}>Growth</FloatingLabel>
          </div>
        </div>
      </div>

      {/* fade-out bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function FloatingLabel({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute z-10 ${className}`}
    >
      <div className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground animate-float-slow">
        {children}
      </div>
    </motion.div>
  );
}
