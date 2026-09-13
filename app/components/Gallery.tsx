"use client";

import { useState, useRef } from "react";
import PhotoFrame from "./PhotoFrame";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY } from "../data";

function LightboxModal({
  photo,
  onClose,
}: {
  photo: (typeof GALLERY)[0];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-[#fff8f3]" style={{ aspectRatio: "4/3" }}>
            {/* PASTE IMAGE HERE: Gallery Photo (lightbox) -> /public{photo.src} */}
            <PhotoFrame
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 95vw, 800px"
              className="object-cover"
            />
          </div>
          <div className="bg-[#fff8f3] px-6 py-3 text-center">
            <p
              className="text-[#8b3a4a] font-dancing text-xl"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              {photo.caption}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryCard({ photo, onClick }: { photo: (typeof GALLERY)[0]; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md group"
      style={{ aspectRatio: "1" }}
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(139,58,74,0.18)" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative w-full h-full bg-[#ffe4e9]/40">
        {/* PASTE IMAGE HERE: Gallery Photo {photo.id} -> /public{photo.src} */}
        <PhotoFrame
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b3a4a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p
          className="text-white font-dancing text-lg"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<(typeof GALLERY)[0] | null>(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#ffe4e9] to-[#fff8f3]"
    >
      {/* Heading */}
      <div ref={headerRef} className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-poppins"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Captured moments
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl sm:text-6xl text-[#8b3a4a] mt-2 font-dancing"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Our Gallery
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-[#c97a8a]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {GALLERY.map((photo) => (
          <GalleryCard key={photo.id} photo={photo} onClick={() => setSelected(photo)} />
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <LightboxModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
