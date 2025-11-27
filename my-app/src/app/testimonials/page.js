"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ParallaxHero from "@/components/ui/ParallaxHero";
import { FaHeart, FaStar } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const AUTOPLAY_DELAY = 7000; // ms

// ─────────────────────────────────────────────
// Word-by-word animated headline (scroll-triggered)
// ─────────────────────────────────────────────
function AnimatedHeadlineOnScroll({ text, className = "", as = "h1" }) {
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

const iconMap = {
  heart: FaHeart,
  smile: HiOutlineEmojiHappy,
  star: FaStar,
};

export const testimonials = [
  {
    id: "t1",
    quote:
      "Seble is incredible as an owner, friend, and human being. She treats us like human beings, and lets me be me. She makes the home very personal.",
    author: "Carlene Nelson",
    role: "Resident",
    icon: "heart",
    img: "/images/Carlene.jpeg",
  },
  {
    id: "t2",
    quote:
      "She is very receptive, very intelligent, has a great sense of humor, and you can feel the care coming through her.",
    author: "Mary Bergeman",
    role: "Resident",
    icon: "smile",
    img: "/images/Mary.jpeg",
  },
  {
    id: "t3",
    quote:
      "This place is wonderful! I haven't seen my sister so happy since she came. It's such a warm welcoming place, and all the residents are so friendly.",
    author: "Sister of Resident",
    role: "Family Member",
    icon: "star",
    img: "/images/Sister.jpeg",
  },
];

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Detect when section enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && !hasBeenViewed) {
            setHasBeenViewed(true);
            setActiveIndex(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasBeenViewed]);

  // Autoplay only when in view
  useEffect(() => {
    if (!isInView || !testimonials.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInView]);

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
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <>
      {/* Parallax Hero */}
      <ParallaxHero
        imageSrc="/images/Testimonials.jpeg"
        alt="Residents and families sharing kind words about Gemcare"
        text="Testimonials"
      />

      <main className="py-20 sm:py-24 relative">
        {/* Waves SVG Background */}
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
          <motion.section
            ref={sectionRef}
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

            {/* Header */}
            <div className="relative text-center mb-8 sm:mb-12">
              <motion.p
                variants={fadeInUp}
                className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-3"
                style={{ color: "#6b7d6b" }}
              >
                TESTIMONIALS
              </motion.p>

              <AnimatedHeadlineOnScroll
                text="What families say about Gemcare"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                as="h1"
              />

              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: "#6b7d6b" }}
              >
                Real words from our residents and families who trust us with
                their loved ones.
              </motion.p>
            </div>

            {/* Horizontal layout: cards left, big quote right */}
            <motion.div
              variants={fadeInUp}
              className="relative grid gap-6 md:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-stretch"
            >
              {/* Left: stacked selector cards (compact) */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {testimonials.map((testimonial, index) => {
                  const IconComponent = iconMap[testimonial.icon];
                  const isHovered = hoveredCard === index;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={testimonial.id}
                      type="button"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => setActiveIndex(index)}
                      className="group text-left rounded-2xl p-4 sm:p-5 focus:outline-none"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.7)",
                        boxShadow: isActive
                          ? "0 14px 35px rgba(0,0,0,0.12)"
                          : "0 6px 18px rgba(0,0,0,0.06)",
                        border: isActive
                          ? "1px solid rgba(93,173,226,0.6)"
                          : "1px solid rgba(0,0,0,0.03)",
                        transform: isActive ? "translateY(-2px)" : "none",
                        transition:
                          "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease",
                      }}
                    >
                      <div className="flex flex-col items-center text-center">
                        {/* Icon */}
                        {IconComponent && (
                          <span
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-3"
                            style={{
                              backgroundColor: isActive ? "#5DADE2" : "#e5f3fb",
                            }}
                          >
                            <motion.div
                              animate={
                                isHovered
                                  ? {
                                      rotate: [-8, 8, -8, 8, 0],
                                      transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                      },
                                    }
                                  : { rotate: 0 }
                              }
                            >
                              <IconComponent
                                size={22}
                                color={isActive ? "#ffffff" : "#5DADE2"}
                              />
                            </motion.div>
                          </span>
                        )}

                        {/* Name + role below icon */}
                        <div>
                          <h3
                            className="text-base sm:text-lg font-semibold"
                            style={{ color: "#2d3d2d" }}
                          >
                            {testimonial.author}
                          </h3>
                          <p
                            className="text-xs sm:text-sm"
                            style={{ color: "#6b7d6b" }}
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar for active card */}
                      <div className="mt-3 h-1 w-full rounded-full bg-black/5 overflow-hidden">
                        {isActive && isInView ? (
                          <motion.div
                            key={`${activeIndex}-${isInView}`}
                            className="h-full bg-[#5DADE2]"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: AUTOPLAY_DELAY / 1000,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          <div
                            className="h-full"
                            style={{
                              backgroundColor: isActive ? "#5DADE2" : "transparent",
                              width: isActive && !isInView ? "100%" : "0%",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right: big quote panel with image */}
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex flex-col"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={activeTestimonial.img}
                    alt={activeTestimonial.author}
                    fill
                    className="object-cover"
                  />

                  {/* Stronger overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-end h-full text-white">
                  {/* Quote icon - larger and more prominent */}
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-4 opacity-80"
                    style={{ color: "#ffffff" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>

                  {/* Quote - larger and more prominent */}
                  <p 
                    className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-6"
                    style={{ 
                      textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    "{activeTestimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-lg sm:text-xl font-semibold">
                        {activeTestimonial.author}
                      </p>
                      <p className="text-sm sm:text-base opacity-80">
                        {activeTestimonial.role}
                      </p>
                    </div>

                    {/* progress accent */}
                    <div className="hidden sm:block h-1.5 w-24 rounded-full bg-white/30 overflow-hidden">
                      {isInView ? (
                        <motion.div
                          key={`quote-${activeIndex}-${isInView}`}
                          className="h-full bg-white"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: AUTOPLAY_DELAY / 1000,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <div className="h-full bg-white w-full" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </>
  );
}