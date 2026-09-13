"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FOOTER, HERO } from "../data";

const HEARTS = "♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <footer
      id="footer"
      className="py-16 px-4 bg-gradient-to-b from-[#fff8f3] to-[#f8d7da] overflow-hidden"
    >
      {/* Repeating heart divider top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-[#f8d7da] text-sm tracking-widest text-center mb-10 overflow-hidden whitespace-nowrap select-none"
      >
        <motion.span
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
          style={{ letterSpacing: "0.4em" }}
        >
          {HEARTS} {HEARTS}
        </motion.span>
      </motion.div>

      <div ref={ref} className="max-w-xl mx-auto text-center">
        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl text-[#8b3a4a] font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {HERO.name}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-4 text-[#8b3a4a]/70 text-sm sm:text-base leading-relaxed font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {FOOTER.note}
        </motion.p>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-6 text-[#c97a8a]/80 italic text-sm font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {FOOTER.closing}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-8 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-5 text-[#8b3a4a] font-dancing text-2xl"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          — {FOOTER.name}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-1 text-[#c97a8a]/50 text-xs tracking-widest font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {today}
        </motion.p>

        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
          className="mt-8 text-5xl"
        >
          <motion.span
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ♥
          </motion.span>
        </motion.div>
      </div>

      {/* Repeating heart divider bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="text-[#f8d7da] text-sm tracking-widest text-center mt-10 overflow-hidden whitespace-nowrap select-none"
      >
        <motion.span
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
          style={{ letterSpacing: "0.4em" }}
        >
          {HEARTS} {HEARTS}
        </motion.span>
      </motion.div>
    </footer>
  );
}
