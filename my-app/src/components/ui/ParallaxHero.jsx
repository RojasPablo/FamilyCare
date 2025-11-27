"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ParallaxHero({
  imageSrc,
  alt = "Hero Image",
  text = "GEM CARE",
}) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!imageRef.current) return;
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.7;
      const yOffset = scrolled * parallaxSpeed;
      imageRef.current.style.transform = `translateY(${yOffset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[45vh] overflow-hidden"
    >
      {/* Parallax Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
          priority
          quality={90}
        />
      </div>

      {/* Fade Up + Glass Card + Underline Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.2,
            }}
            className="px-10 sm:px-12 py-6 sm:py-8 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 20px 40px rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {text}
            </h1>
          </motion.div>

          {/* Animated Underline */}
          <motion.div
            className="h-1 bg-white rounded-full mt-5"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.7,
            }}
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
