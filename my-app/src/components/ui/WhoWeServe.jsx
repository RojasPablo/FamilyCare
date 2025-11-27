"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaHeart,
  FaHome,
  FaUserNurse,
  FaBrain,
  FaHandHoldingHeart,
  FaEye,
} from "react-icons/fa";

// Scroll-triggered animated headline
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

// Image wrapper
function CardImage({ src, alt, className = "" }) {
  if (src) {
    return (
      <Image src={src} alt={alt} fill className={`object-cover ${className}`} />
    );
  }

  // Fallback gradient (shouldn’t be used now that all have images)
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#c8d7ba] to-[#a8c098] flex items-center justify-center ${className}`}
    >
      <span className="text-white/40 text-xs">Photo</span>
    </div>
  );
}

const careTypes = [
  {
    icon: FaBrain,
    title: "Alzheimer's & Dementia",
    shortTitle: "Memory Care",
    desc: "Structured routines and cognitive support for memory care",
    image: "/images/MemoryCare.jpeg",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Mental Health Challenges",
    shortTitle: "Mental Health",
    desc: "Compassionate care focused on stability and wellness",
    image: "/images/MentalHealth.jpeg",
  },
  {
    icon: FaHeart,
    title: "End-of-Life Care",
    shortTitle: "Hospice",
    desc: "Dignified hospice care with emotional support",
    image: "/images/Hospice.jpeg",
  },
  {
    icon: FaUserNurse,
    title: "Developmental Disabilities",
    shortTitle: "Developmental",
    desc: "Programs fostering independence and social engagement",
    image: "/images/Developmental.jpeg",
  },
  {
    icon: FaEye,
    title: "Visual/Hearing Impairments",
    shortTitle: "Sensory Care",
    desc: "Specialized care for sensory challenges",
    image: "/images/Sensory.jpeg",
  },
  {
    icon: FaHome,
    title: "General Senior Care",
    shortTitle: "Senior Care",
    desc: "Comprehensive support for aging adults",
    image: "/images/SeniorCare.jpeg",
  },
];

export default function WhoWeServe() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);

  // Find which card is closest to center
  const findCenteredCard = useCallback(() => {
    if (!scrollRef.current || !cardRefs.current.length) return 0;

    const container = scrollRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  // Handle scroll - debounced to detect scroll end
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const centeredIndex = findCenteredCard();
      setActiveIndex(centeredIndex);
    }, 100);
  }, [isProgrammaticScroll, findCenteredCard]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToCard = useCallback((index) => {
    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      setIsProgrammaticScroll(true);
      setActiveIndex(index);

      const scrollContainer = scrollRef.current;
      const containerRect = scrollContainer.getBoundingClientRect();

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const containerCenter = containerRect.width / 2;
      const scrollPosition = cardCenter - containerCenter;

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsProgrammaticScroll(false);
      }, 500);
    }
  }, []);

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

  return (
    <section className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-16 bg-[var(--moonlight-bg)]">
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

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <motion.p
                variants={fadeInUp}
                className="text-eyebrow mb-3"
                style={{ color: "rgb(0,0,0)" }}
              >
                WHO WE SERVE
              </motion.p>

              <AnimatedHeadlineOnScroll
                text="Caring for individuals with diverse needs"
                className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                as="h2"
              />
            </div>

            {/* Filter Buttons + View All */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              {careTypes.map((type, index) => {
                const isActive = activeIndex === index;
                const isHovered = hoveredButton === index;

                return (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "#5DADE2"
                        : isHovered
                        ? "rgba(93, 173, 226, 0.2)"
                        : "rgba(255, 255, 255, 0.6)",
                      color: isActive ? "#fff" : "#4A6A3E",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(93, 173, 226, 0.3)"
                        : "none",
                    }}
                  >
                    {type.shortTitle}
                  </button>
                );
              })}

              {/* Distinct "View All Services" chip */}
              <Link
                href="/services"
                className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-[#5DADE2] bg-white/80 text-[#2b5a7a] hover:bg-[#5DADE2] hover:text-white hover:shadow-md transition-all duration-300 inline-flex items-center gap-1"
              >
                View All Services
                <span className="text-[0.9em]">↗</span>
              </Link>
            </motion.div>

            {/* Horizontal Scroll Cards */}
            <motion.div
              variants={fadeInUp}
              className="relative -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16"
            >
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto pb-6 px-6 sm:px-8 md:px-12 lg:px-16 snap-x snap-mandatory scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {careTypes.map((item, index) => {
                  const isActive = activeIndex === index;
                  const isHovered = hoveredCard === index;

                  return (
                    <motion.div
                      key={index}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="flex-shrink-0 snap-center cursor-pointer transition-all duration-300"
                      style={{
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        opacity: isActive ? 1 : 0.7,
                      }}
                      onClick={() => scrollToCard(index)}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      whileHover={{
                        opacity: 1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Inset Frame Polaroid Card */}
                      <div
                        className="rounded-2xl p-2 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? "#f5f5f5" : "#fafafa",
                          boxShadow: isActive
                            ? "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)"
                            : "0 4px 16px rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        {/* Inner white card */}
                        <div className="flex bg-white p-3 sm:p-4 rounded-xl w-[360px] sm:w-[460px] md:w-[500px]">
                          {/* Image container */}
                          <div className="w-36 sm:w-52 h-32 sm:h-44 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-black/5 relative">
                            <CardImage src={item.image} alt={item.title} />
                            {/* Icon badge */}
                            <div
                              className="absolute bottom-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300"
                              style={{
                                backgroundColor: "#5DADE2",
                                transform: isHovered
                                  ? "scale(1.1)"
                                  : "scale(1)",
                              }}
                            >
                              <item.icon size={16} color="#fff" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 pl-4 sm:pl-5 pr-2 flex flex-col justify-center">
                            <h3
                              className="text-lg sm:text-xl font-bold mb-2 leading-tight"
                              style={{ color: "#2d3d2d" }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-sm sm:text-base leading-relaxed"
                              style={{ color: "#6b7d6b" }}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Progress Dots */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-2 mt-4 sm:mt-6"
            >
              {careTypes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6" : "w-2"
                  }`}
                  style={{
                    backgroundColor:
                      activeIndex === idx
                        ? "#5DADE2"
                        : "rgba(93, 173, 226, 0.3)",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
