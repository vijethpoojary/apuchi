"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";
import { MUSIC } from "../data";

// Animated equalizer bars
function EqualizerBars() {
  const heights = [0.4, 0.8, 0.6, 1, 0.5, 0.9, 0.3, 0.7];
  return (
    <div className="flex items-end gap-0.5 h-5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-[#c97a8a] rounded-full"
          animate={{ scaleY: [h, h * 0.4, h * 1.2, h * 0.6, h] }}
          transition={{
            duration: 0.8 + i * 0.07,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.06,
          }}
          style={{ height: `${h * 20}px`, transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only in browser
    audioRef.current = new Audio(MUSIC.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked — user must interact first
      });
      setPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 1.5 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50"
        >
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-[#f8d7da] px-4 py-3">
            {/* Equalizer / static icon */}
            <div className="w-8 h-8 flex items-center justify-center">
              {playing ? (
                <EqualizerBars />
              ) : (
                <Music2 size={18} className="text-[#c97a8a]" />
              )}
            </div>

            {/* Track info */}
            <div className="hidden sm:block max-w-[120px] overflow-hidden">
              <p
                className="text-xs font-semibold text-[#8b3a4a] truncate font-poppins"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {MUSIC.title}
              </p>
              <p
                className="text-[10px] text-[#c97a8a]/70 truncate font-poppins"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {/* PASTE AUDIO HERE: Our Song -> /public/audio/our-song.mp3 */}
                {MUSIC.artist}
              </p>
            </div>

            {/* Play / Pause */}
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, #8b3a4a, #c97a8a)",
              }}
              aria-label={playing ? "Pause music" : "Play music"}
            >
              {playing ? <Pause size={15} fill="white" /> : <Play size={15} fill="white" />}
            </motion.button>

            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              className="text-[#c97a8a]/40 hover:text-[#c97a8a] text-xs ml-1 transition-colors"
              aria-label="Close music player"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
