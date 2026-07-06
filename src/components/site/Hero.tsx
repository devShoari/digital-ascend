import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { ArrowLeft, MouseIcon, Sparkles } from "lucide-react";

/* ----------------------------------------------------------------------- */
/*  Scene: full-bleed living particle ecosystem                            */
/* ----------------------------------------------------------------------- */
function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a14, 0.05);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ----- main particle cloud (sphere shell) ----- */
    const COUNT = 2400;
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocity = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);

    const cBlue = new THREE.Color("#5b8cff");
    const cViolet = new THREE.Color("#b07bff");
    const cCyan = new THREE.Color("#7ee3ff");

    for (let i = 0; i < COUNT; i++) {
      // distribute on two shells for depth
      const inner = Math.random() < 0.6;
      const r = inner ? 2.4 + Math.random() * 0.5 : 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = base[i * 3] = x;
      positions[i * 3 + 1] = base[i * 3 + 1] = y;
      positions[i * 3 + 2] = base[i * 3 + 2] = z;

      const m = Math.random();
      const col = m < 0.5 ? cBlue : m < 0.85 ? cViolet : cCyan;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      seed[i] = Math.random();
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // soft round sprite
    const sprite = (() => {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.35, "rgba(255,255,255,0.55)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: sprite,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    /* ----- inner wireframe cores ----- */
    const coreGroup = new THREE.Group();
    const coreA = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 2),
      new THREE.MeshBasicMaterial({ color: 0x5b8cff, wireframe: true, transparent: true, opacity: 0.22 }),
    );
    const coreB = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({ color: 0xb07bff, wireframe: true, transparent: true, opacity: 0.1 }),
    );
    const coreC = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 0),
      new THREE.MeshBasicMaterial({ color: 0x7ee3ff, wireframe: true, transparent: true, opacity: 0.06 }),
    );
    coreGroup.add(coreA, coreB, coreC);
    scene.add(coreGroup);

    /* ----- ambient depth particles (small stars) ----- */
    const STARS = 600;
    const sPos = new Float32Array(STARS * 3);
    const sCol = new Float32Array(STARS * 3);
    for (let i = 0; i < STARS; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 40;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      sPos[i * 3 + 2] = -8 - Math.random() * 30;
      const c = Math.random() < 0.7 ? cBlue : cViolet;
      sCol[i * 3] = c.r; sCol[i * 3 + 1] = c.g; sCol[i * 3 + 2] = c.b;
    }
    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.6,
      depthWrite: false, blending: THREE.AdditiveBlending, map: sprite,
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    /* ----- mouse / pointer reactivity ----- */
    const pointer = new THREE.Vector2(0, 0);   // -1..1 NDC
    const parallax = new THREE.Vector2(0, 0);
    const cur = new THREE.Vector2(0, 0);
    const mouseWorld = new THREE.Vector3(0, 0, 0);

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    /* ----- render loop ----- */
    let raf = 0;
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();

    const render = () => {
      const t = clock.getElapsedTime();
      const scroll = scrollProgress.get(); // 0..1

      // smooth parallax
      cur.x += (pointer.x - cur.x) * 0.05;
      cur.y += (pointer.y - cur.y) * 0.05;
      parallax.copy(cur);

      // unproject pointer onto z=0 plane
      tmp.set(pointer.x, pointer.y, 0.5).unproject(camera);
      const dir = tmp.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));

      // particle behaviour
      const pos = geom.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const bx = base[ix], by = base[ix + 1], bz = base[ix + 2];

        // breathing
        const breath = Math.sin(t * 0.7 + seed[i] * 6.28) * 0.04;
        let x = bx * (1 + breath);
        let y = by * (1 + breath);
        let z = bz * (1 + breath);

        // scroll: explode outward + push toward camera
        const sExp = 1 + scroll * 1.6;
        x *= sExp; y *= sExp; z *= sExp;
        z += scroll * 8 * (0.4 + seed[i]);

        // velocity from previous frame (damped)
        velocity[ix] *= 0.92;
        velocity[ix + 1] *= 0.92;
        velocity[ix + 2] *= 0.92;

        // mouse interaction
        const dx = x - mouseWorld.x;
        const dy = y - mouseWorld.y;
        const dz = z - mouseWorld.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 4) {
          const f = (1 - d2 / 4);
          // half attract, half repel by seed
          const sign = seed[i] > 0.5 ? 1 : -1;
          const k = 0.06 * f * sign;
          velocity[ix] += dx * k;
          velocity[ix + 1] += dy * k;
          velocity[ix + 2] += dz * k;
        }

        arr[ix] = x + velocity[ix];
        arr[ix + 1] = y + velocity[ix + 1];
        arr[ix + 2] = z + velocity[ix + 2];
      }
      pos.needsUpdate = true;

      // global rotation + parallax
      points.rotation.y = t * 0.06 + parallax.x * 0.4;
      points.rotation.x = Math.sin(t * 0.12) * 0.1 - parallax.y * 0.3;

      coreGroup.rotation.y = t * 0.2 + parallax.x * 0.25;
      coreGroup.rotation.x = t * 0.14 - parallax.y * 0.2;
      const breath = 1 + Math.sin(t * 1.2) * 0.04 + scroll * 0.6;
      coreGroup.scale.setScalar(breath);

      stars.rotation.y = t * 0.01 + parallax.x * 0.1;

      // camera dolly + parallax + scroll zoom
      camera.position.x = parallax.x * 0.6;
      camera.position.y = parallax.y * 0.6;
      camera.position.z = 9 - scroll * 6.5;
      camera.lookAt(0, 0, 0);

      // material opacity fade with scroll (foreground fast, bg slow)
      mat.opacity = 0.95 * (1 - scroll * 0.7);
      starMat.opacity = 0.6 * (1 - scroll * 0.3);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose();
      starGeom.dispose();
      mat.dispose();
      starMat.dispose();
      coreA.geometry.dispose();
      coreB.geometry.dispose();
      coreC.geometry.dispose();
      (coreA.material as THREE.Material).dispose();
      (coreB.material as THREE.Material).dispose();
      (coreC.material as THREE.Material).dispose();
      sprite.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [scrollProgress]);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}

/* ----------------------------------------------------------------------- */
/*  Magnetic CTA button                                                     */
/* ----------------------------------------------------------------------- */
function MagneticButton({ children, href, variant = "primary" }: { children: React.ReactNode; href: string; variant?: "primary" | "ghost" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const cls = variant === "primary"
    ? "gradient-brand text-primary-foreground shadow-glow"
    : "glass-strong text-foreground hover:bg-foreground/10";

  return (
    <motion.a
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${cls}`}
    >
      {children}
    </motion.a>
  );
}

/* ----------------------------------------------------------------------- */
/*  Cursor halo (desktop only)                                              */
/* ----------------------------------------------------------------------- */
function CursorHalo() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 25, mass: 0.4 });
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] -ml-[140px] -mt-[140px] h-[280px] w-[280px] rounded-full mix-blend-screen"
    >
      <div className="h-full w-full rounded-full bg-electric/25 blur-3xl" />
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/*  Floating holographic UI chips                                           */
/* ----------------------------------------------------------------------- */
const CHIPS = [
  { x: "8%", y: "22%", label: "// init.product", delay: 0.9 },
  { x: "84%", y: "18%", label: "deploy → edge", delay: 1.1 },
  { x: "10%", y: "78%", label: "scale: ∞", delay: 1.3 },
  { x: "86%", y: "82%", label: "uptime 99.99%", delay: 1.5 },
];

/* ----------------------------------------------------------------------- */
/*  Hero                                                                    */
/* ----------------------------------------------------------------------- */
const HEADLINE_TOP = "از ایده تا رشد،";
const HEADLINE_BOTTOM = "تیم ما کنار شماست.";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // scene reactivity
  const sceneProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  // text dissolve
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.5], [0, 14]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const filter = useTransform(textBlur, (b) => `blur(${b}px)`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh]"
    >
      {/* sticky stage = always visible while inside the hero section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* layered backdrop */}
        <div className="absolute inset-0 aurora-bg opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-90 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

        {/* 3D scene fills the whole stage */}
        {mounted && <HeroScene scrollProgress={sceneProgress} />}

        {/* cursor halo */}
        <CursorHalo />

        {/* radial vignette to keep text readable */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,oklch(0.13_0.012_270/0.85)_0%,oklch(0.13_0.012_270/0.55)_35%,transparent_75%)]" />

        {/* floating holographic chips */}
        {CHIPS.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: c.delay }}
            style={{ left: c.x, top: c.y }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="glass rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground animate-float-slow shadow-elevated">
              {c.label}
            </div>
          </motion.div>
        ))}

        {/* CENTERED content */}
        <motion.div
          style={{ opacity: textOpacity, filter, scale: textScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
           مرکز توسعه و طراحی وب ایران
          </motion.div>

          {/* Headline with per-line stagger */}
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl text-balance max-w-5xl">
            <StaggerLine text={HEADLINE_TOP} delay={0.25} className="gradient-text" />
            <br />
            <StaggerLine text={HEADLINE_BOTTOM} delay={0.55} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
          >
            ما با طراحی، توسعه، سئو و استراتژی محصول، ایده‌های شما را به
            محصولات دیجیتال موفق تبدیل می‌کنیم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="/contact">
              <Sparkles className="size-4" />
              شروع همکاری
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              نمونه پروژه‌ها
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <MouseIcon className="size-4 animate-float-slow" />
            <span>برای کاوش حرکت کنید</span>
          </div>
        </motion.div>

        {/* fade to next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Per-word stagger with blur reveal                                       */
/* ----------------------------------------------------------------------- */
function StaggerLine({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
