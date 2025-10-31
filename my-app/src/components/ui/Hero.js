// src/components/ui/Hero.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Card from "@/components/ui/Card";

export default function Hero({
  title,
  subtitle,          // string or JSX
  eyebrow,           // small label
  actions,
  height = "70vh",   // matches ServicesGrid shell
  offset = 72,       // space below navbar
}) {
  // Ref for scroll-triggered wave animation
  const waveRef = useRef(null);
  const waveInView = useInView(waveRef, { 
    once: true,
    amount: 0.3
  });

  // Animation variants
  const eyebrowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Scale up animation for title
  const titleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth scale
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4  // Delay so it appears after the header
      }
    }
  };

  return (
    <section className="relative isolate pb-16">
      {/* same wrapper as ServicesGrid, plus top gap */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ marginTop: offset }}>
        {/* Canvas card with smooth gradient transition */}
        <div
          ref={waveRef}
          className="relative rounded-3xl ring-1 ring-white/20 p-3 sm:p-4 md:p-6 lg:p-8 transition-none overflow-hidden"
          style={{ 
            height,
            minHeight: '400px',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Static gradient base - light at top fading to sage */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)',
              zIndex: 0
            }}
          />
          
          {/* Animated gradient layer at bottom - one-time wave that stays */}
          <div 
            className={`absolute inset-0 rounded-3xl ${waveInView ? 'animate-gradient-wave' : ''}`}
            style={{
              background: 'linear-gradient(45deg, #7a9470, #c8d7ba, #e8f1e3, #5d7a54, #a8bfa0, #c8d7ba)',
              backgroundSize: '400% 400%',
              backgroundPosition: waveInView ? '0% 50%' : '100% 50%',
              maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 65%, black 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 65%, black 85%)',
              zIndex: 1
            }}
          />
          
          {/* Keyframe animation for gradient - one-time wave */}
          <style jsx global>{`
            @keyframes gradientWave {
              0% { 
                background-position: 0% 50%;
              }
              100% { 
                background-position: 100% 50%;
              }
            }
            
            .animate-gradient-wave {
              animation: gradientWave 5s ease-out forwards;
            }
          `}</style>

          {/* Updated inner highlight for lighter look */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)", zIndex: 2 }}
          />

          {/* Foreground glass card — updated for lighter appearance */}
          <div
            className="h-full relative"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 10px rgba(0, 0, 0, 0.05), 0 12px 20px rgba(0, 0, 0, 0.06), 0 20px 40px rgba(0, 0, 0, 0.08)',
              borderRadius: '1rem',
              zIndex: 3
            }}
          >
            <Card
              variant="glass"
              hover={false}
              className="relative w-full h-full rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 pointer-events-none transition-none overflow-y-auto"
            >
              {/* Put all interactive/content back to interactive */}
              <div className="relative pointer-events-auto max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 w-full pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-8">
                {/* Eyebrow - using new utility class */}
                {eyebrow && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={eyebrowVariants}
                    className="text-eyebrow"
                    style={{ color: '#000' }}
                  >
                    {eyebrow}
                  </motion.div>
                )}

                {/* spacing */}
                {eyebrow && <div className="h-2 sm:h-3 md:h-4" />}

                {/* Title - using heading font and display size */}
                <motion.h1 
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
                  style={{ color: '#000' }}
                >
                  {title}
                </motion.h1>

                {/* spacing */}
                <div className="h-3 sm:h-4 md:h-6" />

                {/* Body content - Large, readable text using text-hero-body utility */}
                {subtitle &&
                  (typeof subtitle === "string" ? (
                    <motion.p 
                      initial="hidden"
                      animate="visible"
                      variants={contentVariants}
                      className="max-w-3xl text-hero-body"
                      style={{ color: '#000' }}
                    >
                      {subtitle}
                    </motion.p>
                  ) : (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={contentVariants}
                      className="max-w-3xl text-hero-body [&>p]:mt-4 first:[&>p]:mt-0"
                      style={{ color: '#000' }}
                    >
                      {subtitle}
                    </motion.div>
                  ))}

                {/* optional actions - with animation (delayed) */}
                {actions && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="mt-6 flex flex-wrap gap-3"
                  >
                    {actions}
                  </motion.div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}