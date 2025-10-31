"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { FaHeart, FaStar } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const iconMap = {
  heart: FaHeart,
  smile: HiOutlineEmojiHappy,
  star: FaStar,
};

export default function TestimonialsPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedTestimonial) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTestimonial]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <main className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16"
            style={{
              background: 'linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.06)',
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
                style={{ color: '#6b7d6b' }}
              >
                TESTIMONIALS
              </motion.p>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" 
                style={{ color: '#2d3d2d' }}
              >
                What families say about Gemcare
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" 
                style={{ color: '#6b7d6b' }}
              >
                Real words from our own residents and families who trust us with their loved ones.
              </motion.p>
            </div>

            {/* Testimonials Grid */}
            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((testimonial, index) => {
                const IconComponent = iconMap[testimonial.icon];
                const isHovered = hoveredCard === index;
                
                return (
                  <motion.div
                    key={testimonial.id}
                    variants={fadeInUp}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group p-6 rounded-2xl transition-all hover:scale-105 cursor-pointer flex flex-col items-center text-center"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      minHeight: '280px'
                    }}
                  >
                    {/* Icon at top center with Rotate Animation */}
                    {IconComponent && (
                      <span
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
                        style={{ backgroundColor: '#5DADE2' }}
                      >
                        <motion.div
                          animate={isHovered ? {
                            rotate: [-8, 8, -8, 8, 0],
                            transition: {
                              duration: 0.8,
                              ease: "easeInOut"
                            }
                          } : {}}
                        >
                          <IconComponent size={28} color="#fff" />
                        </motion.div>
                      </span>
                    )}
                    
                    {/* Name */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#2d3d2d' }}>
                      {testimonial.author}
                    </h3>
                    
                    {/* Role */}
                    <p className="text-sm mb-auto" style={{ color: '#6b7d6b' }}>
                      {testimonial.role}
                    </p>
                    
                    {/* Read more button */}
                    <button className="btn btn-small mt-4">
                      Read more
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Modal with Background Image */}
      <AnimatePresence>
        {selectedTestimonial && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedTestimonial(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTestimonial(null)}
            >
              <div 
                className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0">
                  <Image
                    src={selectedTestimonial.img}
                    alt={selectedTestimonial.author}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 overflow-y-auto max-h-[90vh] p-6 sm:p-8 md:p-12">
                  <div 
                    className="rounded-2xl p-6 sm:p-8 md:p-10"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Icon and Name with Continuous Rotation Animation */}
                    <div className="flex items-start gap-4 mb-6">
                      <span
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#5DADE2' }}
                      >
                        <motion.div
                          animate={{
                            rotate: [-8, 8, -8, 8, 0],
                            transition: {
                              duration: 0.8,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 2
                            }
                          }}
                        >
                          {iconMap[selectedTestimonial.icon] && 
                            React.createElement(iconMap[selectedTestimonial.icon], { size: 28, color: "#fff" })
                          }
                        </motion.div>
                      </span>
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#2d3d2d' }}>
                          {selectedTestimonial.author}
                        </h2>
                        <p className="text-sm sm:text-base" style={{ color: '#6b7d6b' }}>
                          {selectedTestimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Quote with quotation marks */}
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-4" style={{ color: '#5DADE2' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    
                    <blockquote className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: '#2d3d2d' }}>
                      {selectedTestimonial.quote}
                    </blockquote>

                    {/* Close Button */}
                    <div className="flex gap-3">
                      <button onClick={() => setSelectedTestimonial(null)} className="btn btn-white">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}