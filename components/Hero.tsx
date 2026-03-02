"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Full-height hero section.
 *
 * Layer order (back → front):
 *  1. Café interior photo  (full-bleed background)
 *  2. Forest Green overlay (rgba 0.72) + subtle backdrop-blur
 *  3. Watermark image      (opacity-[0.08]) — a top-down coffee ring/bean
 *     shot centred behind the heading; adds depth without distraction.
 *  4. All text & UI content
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 1: Background Photo ── */}
      <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=85"
        alt="Triple A Coffee interior"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      {/* ── Layer 2: Forest Green Overlay ── */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{ backgroundColor: "rgba(27,48,34,0.72)" }}
      />

      {/* ── Layer 3: Watermark — semi-transparent coffee image behind the title ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-3">
        <div className="relative w-120 h-120 md:w-170 md:h-170 opacity-[0.08]">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=60"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover rounded-full"
            sizes="680px"
          />
        </div>
      </div>

      {/* ── Layer 4: Hero Content ── */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">

        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-cream/70 tracking-[0.35em] uppercase text-xs md:text-sm font-medium mb-4"
        >
          Welcome to
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
        >
          TRIPLE A
          <br />
          <span className="text-cream">COFFEE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 text-cream/75 text-base md:text-lg max-w-md tracking-[0.18em]"
        >
          Authentic · Aroma · Atmosphere
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-9 flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#menu"
            className="px-8 py-3.5 rounded-full bg-deep-red text-white font-semibold tracking-widest uppercase text-sm hover:opacity-90 hover:shadow-[0_0_30px_rgba(139,0,0,0.6)] active:scale-95 transition-all duration-300"
          >
            Explore Menu
          </a>
          <a
            href="#story"
            className="px-8 py-3.5 rounded-full border-2 border-white/60 text-white font-semibold tracking-widest uppercase text-sm hover:bg-white/10 active:scale-95 transition-all duration-300"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* ── Scroll Cue ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}
