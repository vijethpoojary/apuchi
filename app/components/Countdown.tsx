"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TOGETHER_SINCE, NEXT_ANNIVERSARY } from "../data";

type TimeUnit = { value: number; label: string };

function getTimeDiff(from: Date, to: Date) {
  const diff = Math.max(0, to.getTime() - from.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);
  return { days, hours, minutes, seconds };
}

// Animated number that flips when value changes
function AnimatedNumber({ value, label }: TimeUnit) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  if (changed) prev.current = value;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #8b3a4a 0%, #c97a8a 100%)",
        }}
      >
        {/* Subtle gloss */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-2xl pointer-events-none" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-white font-bold text-2xl sm:text-3xl tabular-nums"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-2 text-xs tracking-[0.15em] uppercase text-[#8b3a4a]/70 font-semibold font-poppins"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {label}
      </span>
    </div>
  );
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function Countdown() {
  // Start with zeros so server and client render identical HTML.
  // The real values are set in useEffect (client-only).
  const [together, setTogether] = useState(ZERO);
  const [toAnniv, setToAnniv] = useState(ZERO);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    setMounted(true);
    setTogether(getTimeDiff(TOGETHER_SINCE, new Date()));
    setToAnniv(getTimeDiff(new Date(), NEXT_ANNIVERSARY));

    const id = setInterval(() => {
      setTogether(getTimeDiff(TOGETHER_SINCE, new Date()));
      setToAnniv(getTimeDiff(new Date(), NEXT_ANNIVERSARY));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const units: TimeUnit[] = [
    { value: together.days, label: "Days" },
    { value: together.hours, label: "Hours" },
    { value: together.minutes, label: "Minutes" },
    { value: together.seconds, label: "Seconds" },
  ];

  const annivUnits: TimeUnit[] = [
    { value: toAnniv.days, label: "Days" },
    { value: toAnniv.hours, label: "Hours" },
    { value: toAnniv.minutes, label: "Minutes" },
    { value: toAnniv.seconds, label: "Seconds" },
  ];

  return (
    <section
      id="countdown"
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#f8d7da] to-[#fff8f3]"
    >
      <div ref={ref} className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Every second counts
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl sm:text-6xl text-[#8b3a4a] mt-2 font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Our Time Together
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Together counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-[#f8d7da] p-8 relative overflow-hidden"
        >
          {/* Pulse glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{ boxShadow: ["0 0 0px rgba(201,122,138,0)", "0 0 30px rgba(201,122,138,0.15)", "0 0 0px rgba(201,122,138,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <p
            className="text-center text-[#8b3a4a] font-dancing text-2xl mb-6"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            We&apos;ve been together for...
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            {units.map((u) => (
              <AnimatedNumber key={u.label} {...u} />
            ))}
          </div>
        </motion.div>

        {/* Next anniversary countdown — only show after mount to avoid hydration mismatch */}
        {mounted && toAnniv.days >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-[#fff8f3] to-[#ffe4e9] rounded-3xl shadow-md border border-[#f8d7da] p-8"
          >
            <p
              className="text-center text-[#8b3a4a] font-dancing text-2xl mb-6"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Next anniversary in...
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
              {annivUnits.map((u) => (
                <AnimatedNumber key={u.label} {...u} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
