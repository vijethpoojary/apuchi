"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// PASTE VIDEO HERE: Drop your mp4 as -> /public/video/our-video.mp4

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play as soon as the page mounts
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // required for autoplay in all browsers
    v.play().catch(() => {
      // Autoplay blocked — user will see the controls to tap play
    });
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start px-4 py-12 sm:py-16"
      style={{
        background:
          "linear-gradient(160deg, #fff8f3 0%, #ffe4e9 40%, #f8d7da 70%, #fff0f3 100%)",
      }}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 sm:mb-10 max-w-xl w-full"
      >
        {/* Decorative label */}
        <p
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold mb-3 font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Just for you ♥
        </p>

        {/* Main heading — normal sentence case as requested */}
        <h1
          className="font-dancing text-[#8b3a4a]"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
            lineHeight: 1.15,
          }}
        >
          Enna life da most ishta aayina video
        </h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: "tween", delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
      </motion.div>

      {/* ── Video card ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "tween", delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#f8d7da]"
        style={{ background: "#fff0f3" }}
      >
        {/* PASTE VIDEO HERE: /public/video/our-video.mp4 */}
        <video
          ref={videoRef}
          src="/video/our-video.mp4"
          className="w-full h-auto block"
          style={{ maxHeight: "75vh" }}
          controls
          playsInline      // essential for iOS autoplay
          loop
          preload="auto"
        />
      </motion.div>

      {/* ── Caption below video ──────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", delay: 0.6, duration: 0.7 }}
        className="mt-6 text-center text-[#8b3a4a]/70 text-sm sm:text-base font-poppins max-w-sm leading-relaxed"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Every time I watch this, my heart smiles. ♥
      </motion.p>

      {/* ── Back link ─────────────────────────────────────────── */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", delay: 0.9, duration: 0.6 }}
        className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c97a8a]/40 text-[#8b3a4a] text-sm font-poppins hover:bg-[#f8d7da]/60 transition-colors"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        ← Back to our story
      </motion.a>
    </main>
  );
}
