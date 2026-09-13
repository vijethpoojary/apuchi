"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { REASONS } from "../data";

function FlipCard({ reason, index }: { reason: (typeof REASONS)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 w-full"
      style={{ height: 200 }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={`Reason ${reason.id} — click to reveal`}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-lg border border-[#f8d7da] bg-gradient-to-br from-[#fff8f3] to-[#ffe4e9]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heart size={28} className="text-[#c97a8a]" fill="#f8d7da" strokeWidth={1.5} />
          <span
            className="text-4xl font-dancing text-[#8b3a4a]"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            {reason.front}
          </span>
          <span className="text-xs text-[#c97a8a]/60 tracking-widest uppercase font-poppins" style={{ fontFamily: "var(--font-poppins)" }}>
            Tap to reveal
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center p-5 shadow-xl bg-gradient-to-br from-[#8b3a4a] to-[#c97a8a]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p
            className="text-white text-center text-sm leading-relaxed font-poppins"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {reason.back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Reasons() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="reasons"
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#fff8f3] to-[#f8d7da]"
    >
      {/* Heading */}
      <div ref={headerRef} className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          From my heart to yours
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl sm:text-6xl text-[#8b3a4a] mt-2 font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Reasons I Love You
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-[#8b3a4a]/60 text-sm mt-3 font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Tap a card to read what's inside ♥
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
        {REASONS.map((r, i) => (
          <FlipCard key={r.id} reason={r} index={i} />
        ))}
      </div>
    </section>
  );
}
