"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

/**
 * Sticky navigation bar.
 * - Transparent + glassmorphism when at the top of the page.
 * - Solid Forest Green (#1B3022) after scrolling 60 px.
 * - Collapses to a hamburger drawer on mobile.
 */
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-forest-green shadow-2xl" : "glass"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-9 h-9 rounded-full bg-deep-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Coffee size={18} className="text-white" />
          </span>
          <span
            className="text-white text-xl font-bold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Triple A
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-white/85 hover:text-white text-sm tracking-wider uppercase font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-deep-red after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#footer"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-deep-red text-white text-sm font-semibold tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
            >
              <MapPin size={14} />
              Visit Us
            </a>
          </li>
        </ul>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-forest-green border-t border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      setTimeout(() => {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="block text-white/85 hover:text-white text-base font-medium tracking-wide py-1 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#footer"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.querySelector("#footer")?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-deep-red text-white font-semibold tracking-wider uppercase text-sm hover:opacity-90 transition-all duration-200"
                >
                  <MapPin size={14} />
                  Visit Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
