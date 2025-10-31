// src/components/layout/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGem } from "react-icons/bs";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const LinkItem = ({ href, label }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className="px-2 py-1 rounded-md transition-colors"
        style={{
          color: '#2d3d2d',
          backgroundColor: active ? '#c8d7ba' : 'transparent',
          fontWeight: active ? '600' : '500'
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'rgba(200, 215, 186, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="
            relative mt-3 mb-3 rounded-2xl ring-1 ring-white/10
            frosted
          "
        >
          <div className="flex items-center justify-between px-4 py-3">
            {/* Brand with 3D Gem */}
            <Link 
              href="/" 
              className="flex items-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span 
                className="inline-flex h-8 w-8 items-center justify-center rounded-full gem-container"
                style={{ backgroundColor: '#5DADE2' }}
              >
                {/* 2D Icon converted to 3D with CSS */}
                <BsGem 
                  size={18} 
                  color="#fff" 
                  className={`gem-3d ${isHovered ? 'rotating' : ''}`}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }}
                />
              </span>
              <span 
                className="font-semibold tracking-wide"
                style={{ color: '#2d3d2d' }}
              >
                GemCare
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5">
              {links.map((l) => (
                <LinkItem key={l.href} {...l} />
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
              style={{ color: '#2d3d2d' }}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d={open ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-white/15 px-4 py-3">
              <nav className="flex flex-col gap-2">
                {links.map((l) => (
                  <LinkItem key={l.href} {...l} />
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>  
    </header>
  );
}