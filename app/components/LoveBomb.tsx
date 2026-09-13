"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── what can fly out of the explosion ──────────────────────────
const PARTICLES = [
  "♥", "♥", "♥", "♥", "♥", "♥",
  "💋", "💋", "💋",
  "I love you", "I love you", "I love you",
  "😘", "😍", "🌹",
  "♥", "💋", "I love you",
  "♥", "♥", "💋",
];

// deterministic spread — no Math.random(), SSR-safe
function getParticleProps(i: number) {
  const angle = (i * 137.508 * Math.PI) / 180;
  const radius = 120 + (i * 47) % 220;
  const x = Math.round(Math.cos(angle) * radius);
  const y = Math.round(Math.sin(angle) * radius);
  const rotation = (i * 53) % 360;
  const scale = 0.7 + (i % 5) * 0.22;
  const delay = (i * 0.035) % 0.4;
  const duration = 0.9 + (i % 4) * 0.25;
  const emoji = PARTICLES[i % PARTICLES.length];
  const isText = emoji.length > 2;
  return { x, y, rotation, scale, delay, duration, emoji, isText };
}

const TOTAL = 80;
const particleData = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  ...getParticleProps(i),
}));

// ── fuse spark ──────────────────────────────────────────────────
function FuseSpark({ lit }: { lit: boolean }) {
  return (
    <AnimatePresence>
      {lit && (
        <motion.div
          key="spark"
          className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* fuse rope burns down */}
          <motion.div
            className="w-0.5 bg-[#d4af37] rounded-full origin-bottom"
            initial={{ height: 28 }}
            animate={{ height: 0 }}
            transition={{ duration: 1.8, ease: "linear" }}
          />
          {/* spark glow — tween so multi-keyframe works fine */}
          <motion.div
            className="w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_#fde68a] -mt-1"
            animate={{ scale: [1, 1.4, 0.8, 1.2, 1], opacity: [1, 0.8, 1, 0.7, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── single particle ─────────────────────────────────────────────
function Particle({
  data,
  exploded,
}: {
  data: (typeof particleData)[0];
  exploded: boolean;
}) {
  return (
    <AnimatePresence>
      {exploded && (
        <motion.div
          key="p"
          className="absolute top-1/2 left-1/2 pointer-events-none select-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: data.x,
            y: data.y,
            // opacity array is fine — default transition is tween
            opacity: [1, 1, 0],
            scale: data.scale,   // single target value — tween, no problem
            rotate: data.rotation,
          }}
          exit={{ opacity: 0 }}
          transition={{
            // tween for everything
            type: "tween",
            duration: data.duration,
            delay: data.delay,
            ease: [0.16, 1, 0.3, 1],
            opacity: { times: [0, 0.6, 1], duration: data.duration + 0.3 },
          }}
        >
          {data.isText ? (
            <span
              className="text-[#8b3a4a] font-dancing font-bold whitespace-nowrap drop-shadow-lg"
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: `${10 + (data.id % 6) * 3}px`,
                textShadow: "0 0 8px rgba(212,175,55,0.6)",
              }}
            >
              {data.emoji}
            </span>
          ) : (
            <span
              className="drop-shadow-lg"
              style={{ fontSize: `${16 + (data.id % 5) * 6}px` }}
            >
              {data.emoji}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── shockwave rings ──────────────────────────────────────────────
function ShockWave({ exploded }: { exploded: boolean }) {
  return (
    <AnimatePresence>
      {exploded && (
        <>
          {[0, 0.12, 0.24].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c97a8a] pointer-events-none"
              initial={{ width: 60, height: 60, opacity: 0.9 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              exit={{}}
              transition={{ type: "tween", duration: 1.2, delay, ease: "easeOut" }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

// ── full-screen flash overlay ────────────────────────────────────
function FullscreenBurst({ exploded }: { exploded: boolean }) {
  return (
    <AnimatePresence>
      {exploded && (
        <motion.div
          key="burst"
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0] }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(248,215,218,0.95) 0%, rgba(255,228,233,0.7) 40%, transparent 70%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

// ── the bomb ────────────────────────────────────────────────────
function Bomb({ lit }: { lit: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center cursor-default select-none"
      // entrance: spring with only two keyframes (0 → 1) — fine
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
    >
      <FuseSpark lit={lit} />

      {/* Bomb body wobble while fuse burns */}
      <motion.div
        className="relative"
        animate={lit ? { rotate: [-2, 2, -2, 3, -3, 2, -1, 1, 0] } : {}}
        transition={{ type: "tween", duration: 1.8, ease: "easeInOut" }}
      >
        <span
          className="block"
          style={{
            fontSize: 110,
            lineHeight: 1,
            filter: "drop-shadow(0 8px 24px rgba(139,58,74,0.35))",
          }}
        >
          💣
        </span>

        {/* Pulsing glow — multi-keyframe tween loop */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#f8d7da] blur-xl opacity-60 -z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ type: "tween", duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Scroll hint */}
      <AnimatePresence>
        {!lit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", delay: 1.2, duration: 0.6 }}
            className="mt-4 text-xs text-[#c97a8a]/60 tracking-widest uppercase font-poppins"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            scroll down ↓
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── post-explosion heart ─────────────────────────────────────────
function ExplosionHeart() {
  // Two-phase: pop in large with tween, then settle, then pulse loop
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.span
        className="block text-[#8b3a4a]"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          settled
            ? { scale: [1.1, 1.08, 1], opacity: 1 }   // settle + pulse — tween
            : { scale: 1.5, opacity: 1 }                // pop — tween
        }
        transition={
          settled
            ? { type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { type: "tween", duration: 0.35, ease: "easeOut" }
        }
        style={{ fontSize: 90, display: "block" }}
      >
        ♥
      </motion.span>
    </div>
  );
}

// ── main component ───────────────────────────────────────────────
export default function LoveBomb() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [lit, setLit] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setLit(true), 300);
    const t2 = setTimeout(() => {
      setExploded(true);
      setLit(false);
    }, 2300);
    const t3 = setTimeout(() => setShowMessage(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView]);

  return (
    <section className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8d7da] via-[#ffe4e9] to-[#fff8f3]">

      {/* Full-screen flash */}
      <FullscreenBurst exploded={exploded} />

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "tween", duration: 0.7 }}
        className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold mb-4 font-poppins"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        One last thing...
      </motion.p>

      {/* Stage */}
      <div
        ref={ref}
        className="relative flex items-center justify-center"
        style={{ width: 320, height: 320 }}
      >
        <ShockWave exploded={exploded} />

        {/* 80 particles */}
        {particleData.map((p) => (
          <Particle key={p.id} data={p} exploded={exploded} />
        ))}

        {/* Bomb — hide when exploded */}
        <AnimatePresence>
          {!exploded && (
            <motion.div
              key="bomb-wrapper"
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeIn" }}
            >
              <Bomb lit={lit} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heart appears after explosion */}
        <AnimatePresence>
          {exploded && (
            <motion.div key="heart-wrapper" initial={{}} animate={{}}>
              <ExplosionHeart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Love message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-4 px-4"
          >
            <h2
              className="text-[clamp(2.8rem,10vw,6rem)] text-[#8b3a4a] leading-tight font-dancing"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              I love you,
            </h2>
            <h2
              className="text-[clamp(3.5rem,12vw,7.5rem)] text-[#c97a8a] leading-tight font-dancing -mt-2"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Chinchu ♥
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "tween", delay: 0.5, duration: 0.8 }}
              className="mt-4 text-[#8b3a4a]/65 text-sm sm:text-base max-w-xs mx-auto leading-relaxed font-poppins"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              More than all the hearts in the universe.
              <br />
              Always &amp; forever. 💋
            </motion.p>

            {/* ── link to the love rain page ── */}
            <motion.a
              href="/love"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", delay: 1.1, duration: 0.7 }}
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full text-white text-sm font-semibold shadow-lg font-poppins hover:scale-105 active:scale-95 transition-transform"
              style={{
                fontFamily: "var(--font-poppins)",
                background: "linear-gradient(135deg, #8b3a4a 0%, #c97a8a 100%)",
                boxShadow: "0 4px 24px rgba(139,58,74,0.35)",
              }}
            >
              ♥ Open your surprise
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
