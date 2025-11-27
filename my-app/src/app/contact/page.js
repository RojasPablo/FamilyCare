"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";


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


// Parent container for staggered cards
const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.2,
    },
  },
};

// Child card animation
const item = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  show: {
    opacity: 1,
    scale: [0.9, 1.04, 1],
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Reusable icon hover animation
const rotateOnHover = (active) =>
  active
    ? {
        rotate: [-8, 8, -8, 8, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      }
    : {rotate: 0};

export default function ContactPage() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "ac8c3376-8d5b-4bcf-a998-c1666a855f04",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eyebrow animation
  const eyebrowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Subtitle animation (after title completes)
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.6 } },
  };

  return (
    <main className="py-20 sm:py-24 relative">
      {/* Waves SVG Background - Full Width */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/Waves.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div
          className="relative rounded-3xl ring-1 ring-white/20 p-4 sm:p-6 md:p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.06)",
            minHeight: "70vh",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
          />

          {/* Title Section with Word-by-Word Animation */}
          <div className="relative text-center mb-8 sm:mb-10 md:mb-12">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={eyebrowVariants}
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] uppercase mb-2 sm:mb-3"
              style={{ color: "#000" }}
            >
              CONTACT
            </motion.p>
            
            <AnimatedHeadline
              text="We're here to help"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4"
              delay={0.2}
            />
            
            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
              style={{ color: "#000" }}
            >
              Have questions or want to schedule a tour? Send us a note or give
              us a call.
            </motion.p>
          </div>

          {/* Content Grid with Staggered Animation */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Contact Info Card */}
            <motion.div
              variants={item}
              className="rounded-2xl p-6 sm:p-8 will-change-transform"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.15)",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                className="text-xl sm:text-2xl font-bold mb-6"
                style={{ color: "#000" }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Phone row */}
                <div
                  className="flex items-start gap-4 group"
                  onMouseEnter={() => setHoveredRow("phone")}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div
                    className="btn btn-icon-lg"
                    onMouseEnter={() => setHoveredRow("phone")}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <motion.div animate={rotateOnHover(hoveredRow === "phone")}>
                      <FaPhone size={18} color="#fff" />
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "#000" }}>
                      Phone
                    </p>
                    <a
                      href="tel:+14253124477"
                      className="text-sm hover:underline"
                      style={{ color: "#000" }}
                    >
                      +(425) 312-4477
                    </a>
                  </div>
                </div>

                {/* Email row */}
                <div
                  className="flex items-start gap-4 group"
                  onMouseEnter={() => setHoveredRow("email")}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div
                    className="btn btn-icon-lg"
                    onMouseEnter={() => setHoveredRow("email")}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <motion.div animate={rotateOnHover(hoveredRow === "email")}>
                      <FaEnvelope size={18} color="#fff" />
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "#000" }}>
                      Email
                    </p>
                    <div className="text-sm" style={{ color: "#000" }}>
                      <p>
                        <span className="font-semibold">Private:</span>{" "}
                        <a href="mailto:Seifuseble@yahoo.com" className="hover:underline">
                          Seifuseble@yahoo.com
                        </a>
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold">Professional:</span>{" "}
                        <a href="mailto:Sebleseifu@gemcareafh.com" className="hover:underline">
                          Sebleseifu@gemcareafh.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location row */}
                <a
                  href="https://www.google.com/maps/place/8714+9th+Ave+SE,+Everett,+WA+98208/@47.918771,-122.2202915,16z/data=!3m1!4b1!4m6!3m5!1s0x549000d6713ccfd9:0x6f52b110a4d3306c!8m2!3d47.918771!4d-122.2202915!16s%2Fg%2F11c0y_rnvv!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 transition-all hover:opacity-80 group"
                  onMouseEnter={() => setHoveredRow("location")}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div
                    className="btn btn-icon-lg"
                    onMouseEnter={() => setHoveredRow("location")}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <motion.div
                      animate={rotateOnHover(hoveredRow === "location")}
                    >
                      <FaMapMarkerAlt size={18} color="#fff" />
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "#000" }}>
                      Location
                    </p>
                    <p className="text-sm hover:underline" style={{ color: "#000" }}>
                      8714 9<sup>th</sup> Ave SE
                      <br />
                      Everett, WA 98208
                    </p>
                  </div>
                </a>

                {/* Touring Hours */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.2)" }}>
                  <p className="font-semibold mb-2" style={{ color: "#000" }}>
                    Touring Hours
                  </p>
                  <p className="text-sm" style={{ color: "#000" }}>
                    Weekdays: 8am - 8pm
                    <br />
                    Weekends: 8am - 6pm
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div
              variants={item}
              className="rounded-2xl p-6 sm:p-8 will-change-transform"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.15)",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: "#000" }}>
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#000" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "rgba(200, 215, 186, 0.5)",
                      color: "#000",
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#000" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderColor: "rgba(200, 215, 186, 0.5)",
                        color: "#000",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#000" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 555-5555"
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderColor: "rgba(200, 215, 186, 0.5)",
                        color: "#000",
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#000" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "rgba(200, 215, 186, 0.5)",
                      color: "#000",
                    }}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-3 rounded-md bg-green-100 border border-green-300">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Message sent successfully!
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 rounded-md bg-red-100 border border-red-300">
                    <p className="text-sm text-red-700 font-medium">
                      ✗ Failed to send message. Please try again.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-center" style={{ color: "#000" }}>
                  We typically respond within 24 hours
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}