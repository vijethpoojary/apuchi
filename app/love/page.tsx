"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── falling symbols pool ────────────────────────────────────────
const SYMBOLS = [
  "♥", "♥", "♥", "♥", "♥", "♥",
  "💋", "💋", "💋",
  "🤗", "🤗",
  "😘", "😘",
  "I love you cho much much muddu bodedi💋💋💋",
  "Enna muddu bodedi😘😘😘",
  "My Chinchu",
  "💕", "💗", "💖", "💓",
  "Enna kinni bodedi😘",
  "You're my everything",
  "♥", "💋", "I love you cho much much bangaru😘😘😘",
];

// deterministic per-drop properties — SSR-safe, no Math.random()
function makeDrop(i: number) {
  // spread across full width using golden-angle
  const left = Math.round(((i * 6.18) % 100));
  // stagger start times
  const delay = (i * 0.23) % 8;
  // vary fall duration
  const duration = 5 + (i % 7);
  // size variation
  const isText = SYMBOLS[i % SYMBOLS.length].length > 2;
  const fontSize = isText
    ? 13 + (i % 4) * 3          // 13–22 px
    : 18 + (i % 6) * 7;         // 18–53 px
  // horizontal sway amount
  const swayX = ((i % 2 === 0) ? 1 : -1) * (20 + (i % 5) * 14);
  // opacity
  const opacity = 0.5 + (i % 5) * 0.1;  // 0.5–0.9
  // rotation
  const rotate = ((i * 37) % 60) - 30;
  const symbol = SYMBOLS[i % SYMBOLS.length];
  return { left, delay, duration, isText, fontSize, swayX, opacity, rotate, symbol };
}

const DROPS = Array.from({ length: 60 }, (_, i) => ({ id: i, ...makeDrop(i) }));

// ── single falling piece ────────────────────────────────────────
function Drop({ d, active }: { d: (typeof DROPS)[0]; active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={d.id}
          className="absolute top-0 pointer-events-none select-none"
          style={{ left: `${d.left}%` }}
          initial={{ y: -120, opacity: 0, rotate: d.rotate }}
          animate={{
            y: "110vh",
            opacity: [0, d.opacity, d.opacity, 0],
            x: [0, d.swayX, 0, -d.swayX * 0.5, 0],
            rotate: [d.rotate, d.rotate + 15, d.rotate - 10, d.rotate],
          }}
          transition={{
            y: { type: "tween", duration: d.duration, delay: d.delay, ease: "linear", repeat: Infinity, repeatDelay: (d.id * 0.1) % 3 },
            opacity: { type: "tween", duration: d.duration, delay: d.delay, ease: "easeInOut", times: [0, 0.1, 0.8, 1], repeat: Infinity, repeatDelay: (d.id * 0.1) % 3 },
            x: { type: "tween", duration: d.duration, delay: d.delay, ease: "easeInOut", repeat: Infinity, repeatDelay: (d.id * 0.1) % 3 },
            rotate: { type: "tween", duration: d.duration, delay: d.delay, ease: "easeInOut", repeat: Infinity, repeatDelay: (d.id * 0.1) % 3 },
          }}
        >
          {d.isText ? (
            <span
              className="font-dancing font-bold whitespace-nowrap"
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: d.fontSize,
                color: d.id % 3 === 0 ? "#8b3a4a" : d.id % 3 === 1 ? "#c97a8a" : "#d4af37",
                textShadow: "0 2px 8px rgba(139,58,74,0.2)",
              }}
            >
              {d.symbol}
            </span>
          ) : (
            <span style={{ fontSize: d.fontSize, filter: "drop-shadow(0 2px 4px rgba(139,58,74,0.2))" }}>
              {d.symbol}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── centre message ──────────────────────────────────────────────
function CentreMessage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="msg"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "tween", duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-6 select-none"
        >
          {/* pulsing big heart */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
            style={{ fontSize: "clamp(5rem,18vw,10rem)", lineHeight: 1 }}
          >
            ♥
          </motion.div>

          {/* Main text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", delay: 0.3, duration: 0.8 }}
            className="font-dancing text-[#8b3a4a]"
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(3rem,12vw,7rem)",
              lineHeight: 1.1,
            }}
          >
            I love you,
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", delay: 0.55, duration: 0.8 }}
            className="font-dancing text-[#c97a8a]"
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(3.5rem,14vw,8rem)",
              lineHeight: 1.1,
            }}
          >
            Chinchu 💋
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", delay: 1, duration: 1 }}
            className="mt-5 text-[#8b3a4a]/70 font-poppins max-w-sm leading-relaxed"
            style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(0.9rem,2.5vw,1.1rem)" }}
          >
            Enna mokeda muddu💋💋💋, bodedi😘😘😘🫂🫂🫂 bangaru😘😘😘💋jojja😘😘💋
            <br />
            Enden tudu i want you to be little smile and comes to me and gatti pathondu sama undud deed cheepeda korodu😁😁
          </motion.p>

          {/* Back link */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", delay: 1.6, duration: 0.7 }}
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c97a8a]/40 text-[#8b3a4a] text-sm font-poppins hover:bg-[#f8d7da]/60 transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            ← Back to our story
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── page ────────────────────────────────────────────────────────
export default function LovePage() {
  const [active, setActive] = useState(false);

  // Start rain after mount so SSR & client HTML match
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, #fff8f3 0%, #ffe4e9 35%, #f8d7da 65%, #fff0f3 100%)",
      }}
    >
      {/* Soft radial centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248,215,218,0.65) 0%, transparent 65%)",
        }}
      />

      {/* Falling love rain */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {DROPS.map((d) => (
          <Drop key={d.id} d={d} active={active} />
        ))}
      </div>

      {/* Centre message */}
      <CentreMessage />
    </main>
  );
}
