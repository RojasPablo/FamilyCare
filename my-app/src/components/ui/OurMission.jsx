"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaHome, FaUserNurse } from "react-icons/fa";
import Gradient from "@/components/ui/Gradient";

const AUTOPLAY_DELAY = 4000; // ms

const missionItems = [
  {
    icon: FaHeart,
    title: "Personalized Care",
    desc: "Every resident receives individualized attention and support.",
    image: "/images/PersonalizedCare.jpeg",
    alt: "Caregiver spending time with residents doing activities",
  },
  {
    icon: FaHome,
    title: "Feels Like Home",
    desc: "A warm, inviting environment that promotes comfort and dignity.",
    image: "/images/FeelsLikeHome.jpeg",
    alt: "Cozy living room space at GEM CARE AFH",
  },
  {
    icon: FaUserNurse,
    title: "Professional Team",
    desc: "Trained staff dedicated to each resident's health and wellbeing.",
    image: "/images/ProfessionalTeam.jpeg",
    alt: "Professional care team supporting residents",
  },
];

// Simple scroll-triggered animated headline (local to this component)
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

export default function OurMission() {
  const [activeIndex, setActiveIndex] = useState(0);
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
            // Reset to first card when first viewed
            setActiveIndex(0);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasBeenViewed]);

  // Autoplay only when in view
  useEffect(() => {
    if (!isInView || !missionItems.length) {
      // Clear timer when not in view
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Start timer when in view
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % missionItems.length);
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
      transition: { staggerChildren: 0.2 },
    },
  };

  const activeItem = missionItems[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-16"
    >
      {/* Soft geometric gradient behind the panel */}
      <Gradient className="absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

          <div className="relative space-y-8 sm:space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <motion.p
                variants={fadeInUp}
                className="text-eyebrow mb-3"
                style={{ color: "rgb(0,0,0)" }}
              >
                OUR MISSION
              </motion.p>

              <AnimatedHeadlineOnScroll
                text="Compassionate, tailored care"
                className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                as="h2"
              />

              <motion.p
                variants={fadeInUp}
                className="text-body-lg"
                style={{ color: "rgb(0,0,0)" }}
              >
                At GEMCARE AFH, every resident receives warm, individualized
                support from a professional team dedicated to comfort and
                dignity.
              </motion.p>
            </div>

            {/* Big slideshow image */}
            <motion.div
              variants={fadeInUp}
              className="relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden ring-1 ring-black/10 bg-black/5"
            >
              {missionItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="absolute inset-0"
                  initial={{ opacity: idx === activeIndex ? 1 : 0 }}
                  animate={{ opacity: idx === activeIndex ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ pointerEvents: "none" }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {/* slight gradient overlay for readability if needed later */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </motion.div>
              ))}

              {/* Small label over image showing active title */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="px-3 py-1.5 rounded-full bg-black/55 backdrop-blur text-xs sm:text-sm text-white font-medium max-w-[70%]">
                  {activeItem.title}
                </div>
              </div>
            </motion.div>

            {/* Mission cards with progress bar */}
            <motion.div
              variants={fadeInUp}
              className="grid gap-4 sm:grid-cols-3"
            >
              {missionItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="group text-left rounded-2xl p-5 sm:p-6 flex flex-col h-full focus:outline-none"
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
                    {/* Icon */}
                    <div className="mb-4">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: isActive ? "#5DADE2" : "#e5f3fb",
                        }}
                      >
                        <Icon
                          size={22}
                          color={isActive ? "#ffffff" : "#5DADE2"}
                        />
                      </span>
                    </div>

                    {/* Text */}
                    <h3
                      className="text-base sm:text-lg md:text-xl font-semibold mb-1.5"
                      style={{ color: "rgb(0,0,0)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base flex-1"
                      style={{ color: "rgba(0,0,0,0.7)" }}
                    >
                      {item.desc}
                    </p>

                    {/* Progress bar - only animate when in view */}
                    <div className="mt-4 h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
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
                            backgroundColor: isActive
                              ? "#5DADE2"
                              : "transparent",
                            width: isActive && !isInView ? "100%" : "0%",
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
