"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { FaHeart, FaHome, FaUserNurse } from "react-icons/fa";

export default function HomePage() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

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

  const facilityImages = [
    { src: "/images/Exterior.jpeg", alt: "GEM CARE Adult Family Home welcoming exterior" },
    { src: "/images/Dinning.jpeg", alt: "GEM CARE elegant dining room" },
    { src: "/images/Living.jpeg", alt: "GEM CARE comfortable living room" },
  ];

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ========== HERO SECTION ========== */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)",
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
              <motion.div variants={staggerContainer} className="space-y-4 sm:space-y-6">
                <motion.p variants={fadeInUp} className="text-eyebrow" style={{ color: "rgb(0,0,0)" }}>
                  GEM CARE AFH
                </motion.p>

                <motion.h1
                  variants={fadeInUp}
                  className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  Warm, trustworthy care that feels like home
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-base sm:text-lg"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  Located in Everett, Washington, GEM CARE AFH is dedicated to providing a supportive, quality and individualized environment for residents to be cared for and feel truly at home, creating peace of mind for families.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/contact" className="btn btn-primary">Schedule a Tour</Link>
                  <Link href="/services" className="btn btn-white">View Services</Link>
                </motion.div>
              </motion.div>

              {/* Carousel */}
              <motion.div
                variants={fadeInUp}
                className="relative rounded-2xl"
                style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
              >
                <ImageCarousel images={facilityImages} interval={6000} />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ========== ABOUT SECTION ========== */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16"
            style={{
              background: "linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)",
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

            <div className="relative text-center mb-8 sm:mb-12">
              <motion.p variants={fadeInUp} className="text-eyebrow mb-3" style={{ color: "rgb(0,0,0)" }}>
                OUR MISSION
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                style={{ color: "rgb(0,0,0)" }}
              >
                Compassionate care tailored to you
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-body-lg max-w-3xl mx-auto"
                style={{ color: "rgb(0,0,0)" }}
              >
                At GEMCARE AFH, we offer personalized care for individuals with a wide range of health conditions. Our team is trained to provide compassionate and professional support tailored to each resident&apos;s unique needs.
              </motion.p>
            </div>

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FaHeart, title: "Personalized Care", desc: "Every resident receives individualized attention" },
                { icon: FaHome, title: "Feels Like Home", desc: "A welcoming environment that promotes comfort" },
                { icon: FaUserNurse, title: "Professional Team", desc: "Trained staff dedicated to each residents wellbeing" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  onMouseEnter={() => setHoveredIcon(`about-${idx}`)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="flex flex-col items-center text-center p-6 rounded-2xl"
                  style={{ background: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)" }}
                >
                  <span
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
                    style={{ backgroundColor: "#5DADE2" }}
                  >
                    <motion.div
                      animate={
                        hoveredIcon === `about-${idx}`
                          ? { rotate: [-8, 8, -8, 8, 0], transition: { duration: 0.8, ease: "easeInOut" } }
                          : {}
                      }
                    >
                      <item.icon size={28} color="#fff" />
                    </motion.div>
                  </span>
                  <h3 className="text-heading text-xl sm:text-2xl font-bold mb-2" style={{ color: "rgb(0,0,0)" }}>
                    {item.title}
                  </h3>
                  <p className="text-body-md" style={{ color: "rgb(0,0,0)" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ========== WHO WE SERVE SECTION ========== */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16"
            style={{
              background: "linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)",
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
              <div className="text-center mb-8 sm:mb-12">
                <motion.p variants={fadeInUp} className="text-eyebrow mb-3" style={{ color: "rgb(0,0,0)" }}>
                  WHO WE SERVE
                </motion.p>

                <motion.h2
                  variants={fadeInUp}
                  className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  Providing care to individuals with diverse needs
                </motion.h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {[
                  {
                    icon: FaHeart,
                    title: "Alzheimer's & Dementia",
                    desc: "Structured routines and cognitive support for memory care",
                  },
                  {
                    icon: FaUserNurse,
                    title: "Mental Health Challenges",
                    desc: "Compassionate care focused on stability and wellness",
                  },
                  { icon: FaHome, title: "End-of-Life Care", desc: "Dignified hospice care with emotional support" },
                  {
                    icon: FaHeart,
                    title: "Developmental Disabilities",
                    desc: "Programs fostering independence and social engagement",
                  },
                  {
                    icon: FaUserNurse,
                    title: "Visual/Hearing Impairments",
                    desc: "Specialized care for sensory challenges",
                  },
                  { icon: FaHome, title: "General Senior Care", desc: "Comprehensive support for aging adults" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    onMouseEnter={() => setHoveredIcon(`serve-${idx}`)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    className="group p-6 rounded-2xl transition-all hover:scale-105"
                    style={{ background: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)" }}
                  >
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-4 transition-transform"
                      style={{ backgroundColor: "#5DADE2" }}
                    >
                      <motion.div
                        animate={
                          hoveredIcon === `serve-${idx}`
                            ? { rotate: [-8, 8, -8, 8, 0], transition: { duration: 0.8, ease: "easeInOut" } }
                            : {}
                        }
                      >
                        <item.icon size={24} color="#fff" />
                      </motion.div>
                    </span>
                    <h3 className="text-heading text-lg sm:text-xl font-bold mb-2" style={{ color: "rgb(0,0,0)" }}>
                      {item.title}
                    </h3>
                    <p className="text-body-md" style={{ color: "rgb(0,0,0)" }}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="text-center">
                <Link href="/services" className="btn btn-primary">
                  View All Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA SECTION */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative rounded-3xl ring-1 ring-white/20 p-8 sm:p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #5DADE2 0%, #c8d7ba 100%)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}
            />

            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                The right choice for the one you love
              </h2>
              <p className="text-body-lg text-white/90 mb-6 sm:mb-8">
                Schedule a tour today and see why families trust Gemcare with their loved ones
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
        </section>
      </div>
    </main>
  );
}