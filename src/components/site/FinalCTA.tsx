"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const EMBERS = [
  { x: 18, dur: 6.2, delay: 0 },
  { x: 32, dur: 7.4, delay: 1.1 },
  { x: 48, dur: 5.6, delay: 2.3 },
  { x: 64, dur: 8.1, delay: 0.5 },
  { x: 78, dur: 6.9, delay: 3.0 },
  { x: 88, dur: 7.0, delay: 1.8 },
];

function Orb({
  tiltRef,
  reducedMotion,
}: {
  tiltRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // rig holds everything so pointer-tilt can rotate it as one rigid body,
    // independent of each mesh's own ambient spin
    const rig = new THREE.Group();
    scene.add(rig);

    const geom = new THREE.IcosahedronGeometry(1.5, 4);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x7aa5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geom, mat);
    rig.add(mesh);

    const geom2 = new THREE.IcosahedronGeometry(2, 2);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0xb07bff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const mesh2 = new THREE.Mesh(geom2, mat2);
    rig.add(mesh2);

    // glowing inner core — the "energy source" the wireframes orbit
    const coreGeom = new THREE.IcosahedronGeometry(0.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xdfe8ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    rig.add(core);

    // drifting dust particles for depth
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.3 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x9ab8ff,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    rig.add(particles);

    let raf = 0;
    let impulse = 0;
    const clock = new THREE.Clock();
    const speed = reducedMotion ? 0.08 : 1;

    const onResize = () => {
      const w2 = mount.clientWidth;
      const h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", onResize);

    // click the orb for a little burst of energy
    const onPointerDown = () => {
      impulse = 1;
    };
    mount.addEventListener("pointerdown", onPointerDown);

    const animate = () => {
      const t = clock.getElapsedTime() * speed;
      const spin = 1 + impulse * 1.8;

      mesh.rotation.y = t * 0.25 * spin;
      mesh.rotation.x = t * 0.18 * spin;
      mesh2.rotation.y = -t * 0.15 * spin;
      mesh2.rotation.z = t * 0.1 * spin;
      particles.rotation.y = t * 0.05;

      const pulse = 1 + Math.sin(t * 1.2) * 0.04 + impulse * 0.22;
      mesh.scale.setScalar(pulse);
      core.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08 + impulse * 0.45);
      coreMat.opacity = 0.7 + Math.sin(t * 2.4) * 0.15 + impulse * 0.25;

      // ease the rig toward the pointer-driven tilt target
      rig.rotation.y += (tiltRef.current.x - rig.rotation.y) * 0.06;
      rig.rotation.x += (tiltRef.current.y - rig.rotation.x) * 0.06;

      impulse *= 0.93;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      geom2.dispose();
      mat2.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [tiltRef, reducedMotion]);

  return <div ref={ref} className="absolute inset-0 cursor-pointer" aria-hidden />;
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const handleMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function FinalCTA() {
  const reducedMotion = useReducedMotion();
  const tiltRef = useRef({ x: 0, y: 0 });
  const orbWrapRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = orbWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    tiltRef.current = {
      x: Math.max(-1, Math.min(1, relX)) * 0.35,
      y: Math.max(-1, Math.min(1, relY)) * -0.35,
    };
  };

  const handlePointerLeave = () => {
    tiltRef.current = { x: 0, y: 0 };
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          ref={orbWrapRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative mx-auto h-72 w-72 md:h-96 md:w-96"
        >
          <span
            className="ring-pulse pointer-events-none absolute inset-0 rounded-full"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="ring-pulse pointer-events-none absolute inset-0 rounded-full"
            style={{ animationDelay: "1.3s" }}
          />
          <span
            className="ring-pulse pointer-events-none absolute inset-0 rounded-full"
            style={{ animationDelay: "2.6s" }}
          />

          <Orb tiltRef={tiltRef} reducedMotion={!!reducedMotion} />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-electric/20 blur-3xl" />
        </motion.div>

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
          <MagneticLink
            href="mailto:hello@mohtawa.ir"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full gradient-brand px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">شروع همکاری</span>
            <ArrowLeft className="relative size-4" />
          </MagneticLink>
          <MagneticLink
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold transition-colors hover:bg-foreground/10"
          >
            مشاهده پروژه‌ها
          </MagneticLink>
        </div>
      </div>

      {/* ambient embers rising behind the CTA */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {EMBERS.map((e, i) => (
          <motion.span
            key={i}
            className="absolute size-1 rounded-full bg-electric/60"
            style={{ left: `${e.x}%`, bottom: "16%" }}
            animate={{ y: [0, -140, -230], opacity: [0, 0.7, 0] }}
            transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ring-pulse {
          0% { transform: scale(0.82); opacity: 0.4; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .ring-pulse {
          border: 1px solid rgba(122, 165, 255, 0.35);
          animation: ring-pulse 3.9s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
