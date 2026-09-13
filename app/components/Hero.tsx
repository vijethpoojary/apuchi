"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO } from "../data";

// Floating heart particle
function Heart({ style, index }: { style: React.CSSProperties; index: number }) {
  // Deterministic drift values derived from index — no Math.random()
  const driftX1 = ((index * 17) % 40) - 20;
  const driftX2 = ((index * 29) % 60) - 30;
  const duration = 4 + (index % 5);
  const repeatDelay = (index * 0.7) % 6;

  return (
    <motion.div
      className="absolute select-none pointer-events-none text-rose-300 opacity-0"
      style={style}
      animate={{
        y: [0, -120, -240],
        x: [0, driftX1, driftX2],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.3],
        rotate: [0, 15, -15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay,
        ease: "easeInOut",
      }}
    >
      ♥
    </motion.div>
  );
}

// Envelope SVG with flap animation
function Envelope({ onClick, opened }: { onClick: () => void; opened: boolean }) {
  return (
    <motion.div
      className="cursor-pointer mx-auto mt-10"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: 90, height: 70, position: "relative" }}
      aria-label="Open envelope to begin"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="70">
        {/* Envelope body */}
        <rect x="2" y="20" width="86" height="48" rx="4" fill="#fff0f3" stroke="#c97a8a" strokeWidth="2" />
        {/* Bottom flap lines */}
        <line x1="2" y1="68" x2="45" y2="44" stroke="#c97a8a" strokeWidth="1.5" />
        <line x1="88" y1="68" x2="45" y2="44" stroke="#c97a8a" strokeWidth="1.5" />
        {/* Top flap */}
        <motion.polygon
          points="2,20 88,20 45,44"
          fill="#ffe4e9"
          stroke="#c97a8a"
          strokeWidth="2"
          animate={opened ? { rotateX: -180, y: -10, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ transformOrigin: "center top" }}
        />
        {/* Heart inside */}
        <AnimatePresence>
          {!opened && (
            <motion.text
              x="45" y="54"
              textAnchor="middle"
              fontSize="14"
              fill="#c97a8a"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 2, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              ♥
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-rose-300"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      />
    </motion.div>
  );
}

// Fixed heart positions — module-level constant, computed once, fully deterministic.
// Values are rounded to integers to guarantee identical strings on server and client.
const HEART_POSITIONS = Array.from({ length: 18 }, (_, i) => {
  const t = (i * 137.508) % 360;
  const left = Math.round(((Math.sin(t) + 1) / 2) * 96 + 2);
  const bottom = Math.round(((Math.cos(t * 1.3) + 1) / 2) * 18);
  return {
    id: i,
    left: `${left}%`,
    bottom: `${bottom}%`,
    fontSize: `${10 + (i % 5) * 4}px`,
  };
});

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const hearts = useRef(HEART_POSITIONS);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      const next = document.getElementById("story");
      if (next) next.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff8f3] via-[#ffe4e9] to-[#f8d7da]">
      {/* Floating hearts */}
      {hearts.current.map((h) => (
        <Heart
          key={h.id}
          index={h.id}
          style={{
            left: h.left,
            bottom: h.bottom,
            fontSize: h.fontSize,
          }}
        />
      ))}

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(248,215,218,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-12">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-dancing text-[clamp(4rem,16vw,9rem)] leading-none text-[#8b3a4a] drop-shadow-sm"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {HERO.name}
        </motion.h1>

        {/* Decorative line with heart */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 my-4"
        >
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#c97a8a]" />
          <span className="text-[#c97a8a] text-xl">♥</span>
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#c97a8a]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: "easeOut" }}
          className="font-poppins text-[clamp(0.95rem,2.5vw,1.25rem)] text-[#8b3a4a]/80 max-w-md mt-2 leading-relaxed"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {HERO.tagline}
        </motion.p>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="font-poppins text-sm text-[#c97a8a]/70 mt-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {HERO.subTagline}
        </motion.p>

        {/* Envelope CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <Envelope onClick={handleOpen} opened={opened} />
          <AnimatePresence>
            {!opened && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="mt-3 text-xs text-[#c97a8a]/60 tracking-widest uppercase font-poppins"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Click to open
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#c97a8a]/50 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
