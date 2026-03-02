"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

/**
 * Dedicated section for the Triple A mascot.
 * Features a floating card with a Deep Red border/glow and
 * an animated star badge to make the mascot "pop".
 */
export default function MascotCorner() {
  return (
    <section id="mascot" className="py-24 md:py-32 bg-forest-green">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Header */}
        <FadeInUp className="text-center mb-14">
          <p className="text-deep-red tracking-[0.3em] uppercase text-xs font-bold mb-3">
            Our Character
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Meet the Triple A Mascot
          </h2>
        </FadeInUp>

        {/* Two-column layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Mascot Visual Card ── */}
          <FadeInUp delay={0.1}>
            <div className="relative mx-auto w-fit">
              {/* Ambient glow ring */}
              <div className="absolute -inset-4 rounded-4xl bg-deep-red/25 blur-2xl" />

              {/* Deep Red bordered card */}
              <div className="relative rounded-4xl border-4 border-deep-red overflow-hidden shadow-[0_8px_60px_rgba(139,0,0,0.45)]">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-72 h-80 md:w-80 md:h-96"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=500&q=80"
                    alt="Triple A Mascot — The Coffee Guardian"
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                  {/* Subtle red tint */}
                  <div className="absolute inset-0 bg-deep-red/15 mix-blend-multiply" />
                </motion.div>
              </div>

              {/* Animated star badge */}
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-14 h-14 bg-deep-red rounded-full flex items-center justify-center shadow-xl border-2 border-cream/25"
              >
                <Star size={22} className="text-cream fill-cream" />
              </motion.div>
            </div>
          </FadeInUp>

          {/* ── Mascot Info ── */}
          <FadeInUp delay={0.2}>
            <div className="text-cream">
              <span className="inline-block px-4 py-1.5 rounded-full bg-deep-red text-xs font-bold tracking-widest uppercase mb-6">
                Coffee Guardian
              </span>

              <h3
                className="text-3xl md:text-4xl font-black leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                &ldquo;Brewed with Soul,
                <br />
                <span className="text-deep-red">Served with Heart.&rdquo;</span>
              </h3>

              <p className="text-cream/65 leading-relaxed mb-7 text-[0.95rem]">
                Our mascot embodies the spirit of Triple A Coffee — fierce in
                quality, warm in hospitality. Dressed in deep red, the Coffee
                Guardian watches over every bean from harvest to cup, ensuring
                nothing but perfection passes through.
              </p>

              <ul className="space-y-3.5">
                {[
                  "Guardian of quality & freshness",
                  "Symbol of bold, fearless flavour",
                  "Icon of community & belonging",
                ].map((trait) => (
                  <li key={trait} className="flex items-center gap-3 text-sm text-cream/80">
                    <span className="w-2 h-2 rounded-full bg-deep-red shrink-0" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
