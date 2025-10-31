// src/components/layout/Footer.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { BsGem } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="mt-0">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Updated card with gradient background */}
        <div
          className="relative rounded-2xl ring-1 ring-white/20"
          style={{
            background: 'linear-gradient(to bottom, #efefef 0%, #efefef 20%, #c8d7ba 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Inner highlight for glass effect */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
          />

          {/* Top: brand/title - Now a link with 3D animation */}
          <Link 
            href="/"
            className="relative flex flex-col items-center gap-3 px-6 pt-8 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-full gem-container transition-transform group-hover:scale-110"
              style={{ backgroundColor: '#5DADE2' }}
            >
              <BsGem 
                size={32} 
                color="#fff" 
                className={`gem-3d ${isHovered ? 'rotating' : ''}`}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold tracking-wide uppercase text-center"
              style={{ color: '#2d3d2d' }}
            >
              Gemcare
            </h2>
          </Link>

          {/* Middle: 3 columns - Location, Contact, Touring Hours */}
          <div className="relative grid gap-6 px-6 py-6 md:grid-cols-3 md:gap-8 md:px-10 md:py-8">
            {/* Location */}
            <div className="text-center">
              <h3 
                className="text-lg font-semibold uppercase mb-3"
                style={{ color: '#2d3d2d' }}
              >
                Location
              </h3>
              <p 
                className="text-sm md:text-base"
                style={{ color: '#2d3d2d' }}
              >
                8714 9<sup>th</sup> Ave SE<br />
                Everett, WA 98208
              </p>
              <a
                href="https://www.google.com/maps/place/8714+9th+Ave+SE,+Everett,+WA+98208/@47.918771,-122.2202915,16z/data=!3m1!4b1!4m6!3m5!1s0x549000d6713ccfd9:0x6f52b110a4d3306c!8m2!3d47.918771!4d-122.2202915!16s%2Fg%2F11c0y_rnvv!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon mt-3"
                aria-label="View on Google Maps"
              >
                <FaMapMarkerAlt size={18} color="#fff" />
              </a>
            </div>

            {/* Contact Us */}
            <div className="text-center">
              <h3 
                className="text-lg font-semibold uppercase mb-3"
                style={{ color: '#2d3d2d' }}
              >
                Contact Us
              </h3>
              <p 
                className="text-sm md:text-base"
                style={{ color: '#2d3d2d' }}
              >
                <strong>Phone:</strong><br />
                +(425)-312-4477
              </p>
              <div 
                className="text-sm md:text-base mt-2"
                style={{ color: '#2d3d2d' }}
              >
                <strong>Email:</strong><br />
                <span className="font-semibold">Private:</span>{" "}
                <a href="mailto:Seifuseble@yahoo.com" className="hover:underline">
                  Seifuseble@yahoo.com
                </a>
                <br />
                <span className="font-semibold">Professional:</span>{" "}
                <a href="mailto:Sebleseifu@gemcareafh.com" className="hover:underline">
                  Sebleseifu@gemcareafh.com
                </a>
              </div>
            </div>

            {/* Touring Hours */}
            <div className="text-center">
              <h3 
                className="text-lg font-semibold uppercase mb-3"
                style={{ color: '#2d3d2d' }}
              >
                Touring Hours
              </h3>
              <p 
                className="text-sm md:text-base"
                style={{ color: '#2d3d2d' }}
              >
                <strong>Weekdays:</strong><br />
                8am - 8pm
              </p>
              <p 
                className="text-sm md:text-base mt-2"
                style={{ color: '#2d3d2d' }}
              >
                <strong>Weekends:</strong><br />
                8am - 6pm
              </p>
            </div>
          </div>

          {/* Schedule Button - Centered below the 3 columns */}
          <div className="relative flex justify-center px-6 pb-8">
            <Link href="/contact" className="btn btn-primary">
              Schedule a Tour
            </Link>
          </div>

          {/* Bottom bar - Designed by Pablo */}
          <div 
            className="relative border-t px-8 py-4 text-center text-sm"
            style={{ 
              borderColor: 'rgba(45, 61, 45, 0.2)',
              color: '#2d3d2d'
            }}
          >
            <p>
              Designed by <span className="font-semibold">Pablo Rojas</span>
            </p>
            <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}