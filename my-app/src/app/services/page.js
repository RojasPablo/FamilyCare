"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/ui/Hero";
import { services } from "@/data/services";
import { 
  MdOutlineHealthAndSafety, 
  MdDryCleaning 
} from "react-icons/md";
import { 
  GiMedicines, 
  GiMeal 
} from "react-icons/gi";
import { 
  FaChess, 
  FaUmbrellaBeach
} from "react-icons/fa";

// Short descriptions for cards
const shortDescriptions = {
  specialized: "Alzheimer's, mental health, hospice & more",
  medication: "Professional medication management",
  meals: "Customized meals tailored to dietary needs",
  activities: "Engaging programs for mind and body",
  "personal-care": "Dignified assistance with daily living",
  amenities: "Comfortable, accessible facilities"
};

// Icon mapping
const iconMap = {
  specialized: MdOutlineHealthAndSafety,
  medication: GiMedicines,
  meals: GiMeal,
  activities: FaChess,
  personal: MdDryCleaning,
  amenities: FaUmbrellaBeach
};

// Extended details for modal
const serviceDetails = {
  specialized: [
    "Alzheimer's & Dementia Care: Structured routines, cognitive support, and emotional care",
    "Mental Health & Wellness: Care for individuals managing mental health challenges",
    "Hospice & End-of-Life Care: Compassionate care ensuring dignity and comfort",
    "Development Disabilities: Tailored programs fostering independence and engagement"
  ],
  medication: [
    "Medication Administration: Professional administration of prescribed medications",
    "Medication Management: Careful tracking and coordination with healthcare providers",
    "Medication Reminders: Timely reminders for self-administered medications",
    "Care for Pressure Sores: Specialized wound care and monitoring"
  ],
  meals: [
    "Customized Meals: Tailored to individual dietary requirements",
    "Mechanical Soft Chew: Specially prepared for those with swallowing difficulties",
    "Meal Preparation: Fresh, home-cooked meals prepared daily",
    "Nutritional Planning: Coordinated with healthcare providers"
  ],
  activities: [
    "Cognitive Stimulation: Games and activities to keep minds active",
    "Adult Day Care Services: Structured daily activities and socialization",
    "Wellness Center: Programs focused on overall wellbeing",
    "Alternative Therapy: Including massage and other therapeutic activities"
  ],
  personal: [
    "Bathing/Showering: Assisted bathing with dignity and respect",
    "Dressing & Grooming: Help with clothing and personal appearance",
    "Toileting Care: Basic, ostomy, and peri care assistance",
    "Incontinence Care: Professional and compassionate support",
    "Catheter Care: Specialized medical assistance",
    "Transfer Assistance: Basic and Hoyer lift support",
    "Feeding Support: Help with meals as needed"
  ],
  amenities: [
    "Wheelchair/walker accessible home and bathrooms",
    "Cozy living room with cable TV",
    "Free internet and phone access",
    "Manicured lawn and outdoor spaces",
    "Large outdoor deck for resident use",
    "Care for Visual/Hearing Impaired residents",
    "Memory Care in unlocked unit"
  ]
};

// Updated amenities description
const amenitiesFullDesc = "We offer a variety of beneficial amenities to maximize residents' overall experience and comfort at our facility. Our home is designed to feel welcoming and accessible for all residents.";

// Accordion Item Component
function AccordionItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/10"
      >
        <h3 className="text-heading text-lg sm:text-xl font-bold text-white">
          {title}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl flex-shrink-0"
        >
          ▼
        </motion.span>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-6 pb-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Refs for scroll-triggered animations
  const servicesGridRef = useRef(null);
  const additionalServicesRef = useRef(null);

  // Detect when sections are in view
  const servicesInView = useInView(servicesGridRef, { 
    once: true,
    amount: 0.2
  });

  const additionalInView = useInView(additionalServicesRef, { 
    once: true,
    amount: 0.2
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  // Handle hash navigation (e.g., from "View Services" button)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);

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
      <main>
        {/* HERO SECTION - Let Hero component control font sizing */}
        <Hero
          eyebrow="Services"
          title="Care services designed for safety, comfort, and dignity"
          subtitle={
            <>
              <p>
                At GEM CARE AFH, we provide personalized care services designed to support seniors at every stage of aging. Our dedicated team works closely with families to create customized care plans that meet the unique needs of each resident, ensuring they receive the right level of assistance while maintaining their independence.
              </p>
              <p className="mt-4">
                With a focus on comfort, dignity, and well-being, our compassionate caregivers offer the support needed to help residents thrive in a warm and welcoming home environment.
              </p>
            </>
          }
        />

        {/* SERVICES GRID SECTION - FROSTED GLASS STYLE */}
        <section id="services" className="relative w-full py-16" ref={servicesGridRef}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="relative rounded-3xl ring-1 ring-white/30 p-6 sm:p-8 md:p-12 lg:p-16"
              style={{
                background: 'linear-gradient(to bottom, rgba(239, 239, 239, 0.7) 0%, rgba(184, 216, 232, 0.7) 100%)',
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
                boxShadow: '0 1px 0 rgba(255, 255, 255, 0.25) inset, 0 10px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.15) inset" }}
              />

              <div className="relative">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <motion.p 
                    variants={fadeInUp}
                    className="text-eyebrow mb-3" 
                    style={{ color: '#6b7d6b' }}
                  >
                    OUR SERVICES
                  </motion.p>
                  
                  <motion.h2 
                    variants={fadeInUp}
                    className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" 
                    style={{ color: '#2d3d2d' }}
                  >
                    Specialized care for every need
                  </motion.h2>
                </div>

                {/* Services Grid */}
                <motion.div 
                  initial="hidden"
                  animate={servicesInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {services.map((service, index) => {
                    const IconComponent = iconMap[service.icon];
                    const isHovered = hoveredCard === index;
                    
                    return (
                      <motion.div
                        key={service.id}
                        variants={fadeInUp}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => setSelectedService(service)}
                        className="group relative flex flex-col items-center rounded-2xl p-6 cursor-pointer transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        whileHover={{
                          y: -4,
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Icon with Rotate Animation */}
                        <div
                          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
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
                            {IconComponent && <IconComponent size={36} color="#fff" />}
                          </motion.div>
                        </div>

                        {/* Service Title */}
                        <h3 
                          className="text-heading text-lg sm:text-xl font-bold text-center mb-2"
                          style={{ color: '#2d3d2d' }}
                        >
                          {service.title}
                        </h3>

                        {/* Short Description */}
                        <p 
                          className="text-body-md text-center mb-4"
                          style={{ color: '#6b7d6b' }}
                        >
                          {shortDescriptions[service.id]}
                        </p>

                        {/* Read More Button */}
                        <button
                          className="px-4 py-2 text-sm font-medium rounded-full transition-all"
                          style={{
                            backgroundColor: 'rgba(93, 173, 226, 0.2)',
                            color: '#2d3d2d',
                          }}
                        >
                          Learn more
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ADDITIONAL INFORMATION SECTION - ACCORDION STYLE */}
        <section className="relative w-full py-16" ref={additionalServicesRef}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={additionalInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 md:p-12 lg:p-16"
              style={{
                background: 'linear-gradient(135deg, #5DADE2 0%, #c8d7ba 100%)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="text-center mb-8">
                <h2 className="text-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Additional Information
                </h2>
              </div>

              {/* Accordion */}
              <div className="space-y-4 mb-8">
                <AccordionItem 
                  title="Care Options"
                  defaultOpen={true}
                >
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Hospice Accepted</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>In-Home Care Companies Welcome</span>
                    </li>
                  </ul>
                </AccordionItem>

                <AccordionItem title="Room Availability">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">•</span>
                      <span>Total existing rooms: 6</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">•</span>
                      <span>Rooms currently available for new residents: 2</span>
                    </li>
                  </ul>
                </AccordionItem>

                <AccordionItem title="Therapy Services">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Physical, Occupational, Speech Therapy</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Respiratory Therapy</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Alternative & Massage Therapy</span>
                    </li>
                  </ul>
                </AccordionItem>

                <AccordionItem title="Staff Availability">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Staff Available 24/7</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Registered Nurse (RN) Available 24/7</span>
                    </li>
                  </ul>
                </AccordionItem>

                <AccordionItem title="Payment Methods">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Private Pay</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/90 text-body-md">
                      <span className="text-white font-bold">✓</span>
                      <span>Medicaid (on arrival, payments, step-down)</span>
                    </li>
                  </ul>
                </AccordionItem>
              </div>

              <div className="text-center pt-6 border-t border-white/30">
                <p className="text-body-lg text-white/90 mb-6">
                  Ready to learn more about our services?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn btn-primary">
                    Contact Us Today
                  </Link>
                  <Link href="tel:+14253124477" className="btn btn-white">
                    Call Us: (425) 312-4477
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMMITMENT SECTION - Let Hero component control font sizing */}
        <Hero
          eyebrow="Our Commitment"
          title="Personalized care, delivered with presence and heart"
          subtitle={
            <>
              <p>
                At GEM CARE AFH, our commitment to personalized care goes beyond just providing a service—it is about creating a true home for our residents. Provider Seble Seifu is dedicated and available to support our staff, residents, and their families. This ensures that any concerns are addressed promptly and personally, giving families peace of mind.
              </p>
              <p className="mt-4">
                We provide round-the-clock care delivered by highly trained, professional staff who are passionate about senior well-being. Our team is committed to fostering a warm, supportive environment where every resident feels valued and cared for.
              </p>
            </>
          }
        />
      </main>

      {/* Service Detail Modal with Plant Background and Frosted Glass */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedService(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedService(null)}
            >
              <div 
                className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0">
                  <Image
                    src={selectedService.img}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
                </div>

                {/* Content Layer with Frosted Glass */}
                <div className="relative z-10 overflow-y-auto max-h-[90vh] p-6 sm:p-8 md:p-12">
                  <div 
                    className="rounded-2xl p-6 sm:p-8 md:p-10"
                    style={{
                      background: 'rgba(239, 239, 239, 0.65)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {/* Icon and Title with Rotate Animation */}
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
                          {iconMap[selectedService.icon] && 
                            React.createElement(iconMap[selectedService.icon], { size: 28, color: "#fff" })
                          }
                        </motion.div>
                      </span>
                      <div className="flex-1">
                        <h2 className="text-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#2d3d2d' }}>
                          {selectedService.title}
                        </h2>
                        <p className="text-body-md" style={{ color: '#6b7d6b' }}>
                          {selectedService.tag}
                        </p>
                      </div>
                    </div>

                    {/* Full Description */}
                    <p className="text-body-lg mb-6 leading-relaxed" style={{ color: '#2d3d2d' }}>
                      {selectedService.id === 'amenities' ? amenitiesFullDesc : selectedService.desc}
                    </p>

                    {/* What's Included List - Integrated into main body */}
                    {serviceDetails[selectedService.id] && (
                      <>
                        <h3 className="text-heading text-lg sm:text-xl font-bold mb-4" style={{ color: '#2d3d2d' }}>
                          What's Included:
                        </h3>
                        <ul className="space-y-3 mb-6">
                          {serviceDetails[selectedService.id].map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span 
                                className="inline-flex h-6 w-6 items-center justify-center flex-shrink-0 mt-0.5 relative"
                              >
                                {/* Azure circle background */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute" style={{ color: '#5DADE2' }}>
                                  <circle cx="12" cy="12" r="9.75" />
                                </svg>
                                {/* White checkmark on top */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative z-10" style={{ color: '#fff' }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              </span>
                              <span className="text-body-md" style={{ color: '#2d3d2d' }}>
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link href="/contact" className="btn btn-primary">
                        Contact us about this service
                      </Link>
                      <button onClick={() => setSelectedService(null)} className="btn btn-white">
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