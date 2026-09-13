"use client";

import { useState } from "react";
import Image from "next/image";

interface PhotoFrameProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Wrapper around next/image that shows a soft blush placeholder
 * when the image file hasn't been added yet.
 */
export default function PhotoFrame({
  src,
  alt,
  fill,
  sizes,
  className = "",
  priority,
}: PhotoFrameProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#ffe4e9] to-[#f8d7da] ${className}`}
      >
        <span className="text-4xl text-[#c97a8a]/30 mb-2">♥</span>
        <span
          className="text-[10px] text-[#c97a8a]/40 font-poppins text-center px-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Add your photo here
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setErrored(true)}
    />
  );
}
