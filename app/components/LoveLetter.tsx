"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LOVE_LETTER } from "../data";

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    indexRef.current = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <span>
      {displayed}
      {active && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-[#8b3a4a] ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export default function LoveLetter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Build full body text
  const fullBody = LOVE_LETTER.body;

  return (
    <section
      id="letter"
      className="py-20 px-4 sm:px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fff8f3 0%, #ffe4e9 40%, #fff0f3 70%, #fff8f3 100%)",
      }}
    >
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Decorative corner hearts */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} text-[#f8d7da] text-3xl pointer-events-none select-none`}
        >
          ♥
        </span>
      ))}

      <div className="max-w-2xl mx-auto relative">
        {/* Section heading */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Written for you
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl sm:text-6xl text-[#8b3a4a] mt-2 font-dancing"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            A Love Letter
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
          />
        </div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#f8d7da] p-8 sm:p-12"
        >
          {/* Salutation */}
          <p
            className="text-[#8b3a4a] font-dancing text-2xl sm:text-3xl mb-5"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            {LOVE_LETTER.salutation}
          </p>

          {/* Typewriter body */}
          <div ref={ref}>
            <p
              className="text-[#5a2a35]/85 font-poppins text-sm sm:text-base leading-[2] whitespace-pre-line"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <TypewriterText text={fullBody} active={inView} />
            </p>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 text-right"
          >
            <p
              className="text-[#8b3a4a] font-dancing text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              {LOVE_LETTER.signature}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
