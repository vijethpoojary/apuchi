"use client";

import { useRef } from "react";
import PhotoFrame from "./PhotoFrame";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { STORY } from "../data";

// Pulsing heart node on the connecting wire
function HeartNode() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full bg-[#f8d7da] border-2 border-[#c97a8a] flex items-center justify-center shadow-md z-10"
      animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0 0 rgba(201,122,138,0.4)", "0 0 0 8px rgba(201,122,138,0)", "0 0 0 0 rgba(201,122,138,0)"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[#8b3a4a] text-sm leading-none">♥</span>
    </motion.div>
  );
}

// Individual story card
function StoryCard({ entry, index }: { entry: (typeof STORY)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-16 md:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Heart node on desktop */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <HeartNode />
      </div>

      {/* Photo side */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full md:w-[45%] rounded-2xl overflow-hidden shadow-xl border-2 border-[#f8d7da] group"
        style={{ aspectRatio: "4/3" }}
      >
        <div className="relative w-full h-full overflow-hidden bg-[#ffe4e9]/50" style={{ minHeight: 240 }}>
          {/* PASTE IMAGE HERE: Our Story Photo {entry.id} ({entry.label}) -> /public{entry.image} */}
          <PhotoFrame
            src={entry.image}
            alt={entry.alt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8b3a4a]/20 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isLeft ? 60 : -60, y: 20 },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className={`w-full md:w-[45%] text-center ${isLeft ? "md:text-left" : "md:text-right"}`}
      >
        {/* Mobile heart node */}
        <div className="flex md:hidden justify-center mb-3">
          <HeartNode />
        </div>

        <span className="inline-block text-xs font-semibold tracking-wide text-[#d4af37] mb-2 font-poppins" style={{ fontFamily: "var(--font-poppins)" }}>
          {entry.date}
        </span>
        <h3
          className="text-2xl sm:text-3xl text-[#8b3a4a] mb-3 font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {entry.label}
        </h3>
        <p
          className="text-[#7a3242]/75 leading-relaxed text-sm sm:text-base font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {entry.description}
        </p>
      </motion.div>
    </div>
  );
}

// The animated SVG connecting wire (desktop only)
function ConnectingWire() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring for organic feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const pathLength = useTransform(smoothProgress, [0.05, 0.9], [0, 1]);

  // Curved path through all 6 nodes — approximate vertical positions at 8%, 24%, 40%, 56%, 72%, 88%
  const d = `
    M 50 5
    C 20 10, 80 18, 50 22
    C 20 26, 80 34, 50 38
    C 20 42, 80 50, 50 54
    C 20 58, 80 66, 50 70
    C 20 74, 80 82, 50 86
    C 20 90, 80 95, 50 98
  `;

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-24 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Ghost track */}
        <path
          d={d}
          fill="none"
          stroke="#f8d7da"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Animated fill */}
        <motion.path
          d={d}
          fill="none"
          stroke="url(#wireGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="wireGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#c97a8a" />
            <stop offset="100%" stopColor="#8b3a4a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function OurStory() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="story"
      className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#fff8f3] to-[#ffe4e9]"
    >
      {/* Section heading */}
      <div ref={headerRef} className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          A journey worth remembering
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="text-5xl sm:text-6xl text-[#8b3a4a] mt-2 font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Our Story
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        <ConnectingWire />
        <div className="space-y-14 md:space-y-28">
          {STORY.map((entry, i) => (
            <StoryCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
