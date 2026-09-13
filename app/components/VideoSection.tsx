"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// PASTE VIDEO HERE: /public/video/our-video.mp4

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-play when section scrolls into view
  useEffect(() => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;      // required by all browsers for autoplay
    v.play().catch(() => {
      // silently ignore if browser blocks autoplay
    });
  }, [inView]);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#ffe4e9] to-[#fff8f3]"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ type: "tween", duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Just for you ♥
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "tween", delay: 0.15, duration: 0.7 }}
          className="font-dancing text-[#8b3a4a] mt-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2rem, 7vw, 4rem)",
            lineHeight: 1.2,
          }}
        >
          Enna life da most ishta aayina video😁😁😁
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ type: "tween", delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
      </div>

      {/* Video card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: "tween", delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#f8d7da]"
        style={{ background: "#fff0f3" }}
      >
        {/* PASTE VIDEO HERE: /public/video/our-video.mp4 */}
        <video
          ref={videoRef}
          src="/video/our-video.mp4"
          className="w-full h-auto block"
          style={{ maxHeight: "70vh" }}
          controls
          playsInline
          loop
          preload="auto"
        />
      </motion.div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "tween", delay: 0.55, duration: 0.7 }}
        className="mt-6 text-center text-[#8b3a4a]/65 text-sm sm:text-base font-poppins max-w-sm mx-auto leading-relaxed"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Every time I watch this, my heart smiles.😁😁 ♥
      </motion.p>
    </section>
  );
}
