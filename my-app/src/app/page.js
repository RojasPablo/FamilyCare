"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ParallaxHero from "@/components/ui/ParallaxHero";
import Gradient from "@/components/ui/Gradient";
import WhoWeServe from "@/components/ui/WhoWeServe";
import OurMission from "@/components/ui/OurMission";

// ─────────────────────────────────────────────
// Word-by-word animated headline (clean, no blur)
// ─────────────────────────────────────────────
function AnimatedHeadline({ text, className = "", delay = 0.1 }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// Scroll-triggered version for sections below the fold
function AnimatedHeadlineOnScroll({ text, className = "", as = "h2" }) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            variants={{
              hidden: { opacity: 0, y: 40, rotateX: -40 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Inline carousel with Apple-style progress dot + FADE
// ─────────────────────────────────────────────
function Carousel({ images = [], interval = 4500 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden">
      {/* fade transition */}
      {images.map((img, idx) => (
        <motion.div
          key={img.src ?? idx}
          className="absolute inset-0"
          initial={{ opacity: idx === current ? 1 : 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ pointerEvents: idx === current ? "auto" : "none" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </motion.div>
      ))}

      {/* progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {images.map((_, idx) => {
          const isActive = idx === current;
          
          if (!isActive) {
            return (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="h-2 w-2 rounded-full bg-white/35 hover:bg-white/60 transition-colors"
                aria-label={`Go to image ${idx + 1}`}
              />
            );
          }
          
          return (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="relative h-2.5 w-10 rounded-full bg-white/20 overflow-hidden"
              aria-label={`Current image ${idx + 1}`}
            >
              <motion.div
                key={current}
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: interval / 1000,
                  ease: "linear",
                }}
                style={{ borderRadius: 9999 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const tiltRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Tilt parallax effect
  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    tiltRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    tiltRef.current.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    tiltRef.current.style.transition = "transform 0.3s ease-out";
  };

  const facilityImages = [
    {
      src: "/images/Exterior.jpeg",
      alt: "GEM CARE Adult Family Home welcoming exterior",
    },
    {
      src: "/images/Dinning.jpeg",
      alt: "GEM CARE elegant dining room",
    },
    {
      src: "/images/Living.jpeg",
      alt: "GEM CARE comfortable living room",
    },
  ];

  return (
    <>
      {/* Parallax Hero Image */}
      <ParallaxHero
        imageSrc="/images/Home.jpeg"
        alt="Caregiver providing compassionate care to resident"
      />

      {/* Main Content with Moonlight Background */}
      <main className="relative z-10">
        {/* ========== HERO SECTION ========== */}
        <section className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 bg-[var(--moonlight-bg)]">
          {/* Waves SVG Background - Full Width */}
          <div
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url(/images/Waves.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
              />

              <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Text */}
                <motion.div
                  variants={staggerContainer}
                  className="space-y-4 sm:space-y-6"
                >
                  <motion.p
                    variants={fadeInUp}
                    className="text-eyebrow"
                    style={{ color: "rgb(0,0,0)" }}
                  >
                    GEM CARE AFH
                  </motion.p>

                  <AnimatedHeadline
                    text="Warm, trustworthy care that feels like home"
                    className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                    delay={0.3}
                  />

                  <motion.p
                    variants={fadeInUp}
                    className="text-base sm:text-lg"
                    style={{ color: "rgb(0,0,0)" }}
                  >
                    Located in Everett, Washington, GEM CARE AFH is dedicated to
                    providing a supportive, quality and individualized environment
                    for residents to be cared for and feel truly at home, creating
                    peace of mind for families.
                  </motion.p>

                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Link href="/contact" className="btn btn-primary">
                      Schedule a Tour
                    </Link>
                    <Link href="/services" className="btn btn-white">
                      View Services
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Carousel */}
                <motion.div
                  variants={fadeInUp}
                  className="relative rounded-2xl"
                  style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
                >
                  <Carousel images={facilityImages} interval={4500} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== OUR MISSION (new component) ========== */}
        <OurMission />

        {/* ========== WHO WE SERVE SECTION ========== */}
        <WhoWeServe />

        {/* CTA SECTION WITH TILT PARALLAX */}
        <section className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-16">
          {/* Gradient Background */}
          <Gradient className="absolute inset-0 -z-10" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              ref={tiltRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-3xl ring-1 ring-white/20 p-8 sm:p-12 md:p-16 text-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #5DADE2 0%, #c8d7ba 100%)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}
              />

              <div
                className="relative max-w-3xl mx-auto"
                style={{ transform: "translateZ(40px)" }}
              >
                <AnimatedHeadlineOnScroll
                  text="The right choice for the one you love"
                  className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
                  as="h2"
                />
                <p className="text-body-lg text-white/90 mb-6 sm:mb-8">
                  Schedule a tour today and see why families trust Gemcare with
                  their loved ones
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn btn-primary">
                    Schedule a Tour
                  </Link>
                  <Link href="tel:+14253124477" className="btn btn-white">
                    Call Us: (425) 312-4477
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}