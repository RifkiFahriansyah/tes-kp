"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Gamepad2 } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

/**
 * MascotCorner — dual feature section.
 *
 * Displays two highlights in one connected horizontal row:
 *   1. Our Mascot          — the Coffee Guardian character
 *   2. Game Box Experience — board games available at the café
 *
 * Desktop (lg):  4-column grid — [Mascot Img] [Mascot Text] [Game Img] [Game Text]
 * Tablet  (md):  2-column grid — each row = image + text
 * Mobile:        1 column      — fully vertical
 *
 * Images act as visual anchors (w-40/w-44).
 * Text blocks are constrained to max-w-xs for readability.
 * hover:scale-105 on image cards for modern UX.
 */
export default function MascotCorner() {
  return (
    <section id="mascot" className="py-24 bg-forest-green">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section Header ── */}
        <FadeInUp className="text-center mb-14">
          <p className="text-deep-red tracking-[0.3em] uppercase text-xs font-bold mb-3">
            Our Character
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Meet the Triple A Experience
          </h2>
          <p className="mt-4 text-cream/55 max-w-xl mx-auto text-[0.95rem]">
            More than coffee — we offer a world of warmth, character, and play.
          </p>
        </FadeInUp>

        {/* ── 4-Column Horizontal Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">

          {/* ── Col 1: Mascot Image ── */}
          <FadeInUp delay={0.1}>
            <div className="relative mx-auto w-fit">
              {/* Ambient glow */}
              <div className="absolute -inset-3 rounded-3xl bg-deep-red/20 blur-xl" />

              {/* Card with hover scale */}
              <div className="relative rounded-3xl border-4 border-deep-red overflow-hidden shadow-[0_8px_48px_rgba(139,0,0,0.4)] hover:scale-105 transition duration-300">
                <div className="relative w-40 h-48 md:w-44 md:h-52 bg-forest-green/40">
                  <Image
                    src="/images/mascot/tesmaskotcenter.png"
                    alt="Triple A Mascot — The Coffee Guardian"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 160px, 180px"
                  />
                </div>
              </div>

              {/* Animated star badge */}
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-10 h-10 bg-deep-red rounded-full flex items-center justify-center shadow-lg border-2 border-cream/25"
              >
                <Star size={16} className="text-cream fill-cream" />
              </motion.div>
            </div>
          </FadeInUp>

          {/* ── Col 2: Mascot Text ── */}
          <FadeInUp delay={0.2}>
            <div className="text-cream max-w-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-deep-red text-xs font-bold tracking-widest uppercase mb-4">
                Our Mascot
              </span>
              <h3
                className="text-xl md:text-2xl font-black leading-snug mb-3"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Our Mascot
              </h3>
              <p className="text-cream/70 leading-relaxed text-sm mb-4">
                Our red mascot is the living soul of Triple A Coffee — radiating the
                warmth, passion, and welcoming spirit that goes into every cup. Bold
                in presence, warm in heart, it reminds us that every brew is an act
                of care for our community.
              </p>
              <ul className="space-y-2">
                {[
                  "Guardian of quality & freshness",
                  "Symbol of bold, fearless flavour",
                  "Icon of community & belonging",
                ].map((trait) => (
                  <li key={trait} className="flex items-center gap-2 text-xs text-cream/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-deep-red shrink-0" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* ── Col 3: Game Box Image ── */}
          <FadeInUp delay={0.3}>
            <div className="relative mx-auto w-fit">
              {/* Ambient glow */}
              <div className="absolute -inset-3 rounded-3xl bg-deep-red/20 blur-xl" />

              {/* Card with hover scale */}
              <div className="relative rounded-3xl border-4 border-deep-red/70 overflow-hidden shadow-[0_8px_48px_rgba(139,0,0,0.3)] hover:scale-105 transition duration-300">
                <div className="relative w-40 h-48 md:w-44 md:h-52 bg-forest-green/40">
                  <Image
                    src="/images/mascot/gamebox.png"
                    alt="Game Box Experience — Board Games at Triple A Coffee"
                    fill
                    className="object-center"
                    sizes="(max-width: 768px) 160px, 180px"
                  />
                </div>
              </div>

              {/* Animated game badge */}
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-10 h-10 bg-deep-red rounded-full flex items-center justify-center shadow-lg border-2 border-cream/25"
              >
                <Gamepad2 size={16} className="text-cream" />
              </motion.div>
            </div>
          </FadeInUp>

          {/* ── Col 4: Game Box Text ── */}
          <FadeInUp delay={0.4}>
            <div className="text-cream max-w-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-deep-red text-xs font-bold tracking-widest uppercase mb-4">
                Game Box Experience
              </span>
              <h3
                className="text-xl md:text-2xl font-black leading-snug mb-3"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Game Box Experience
              </h3>
              <p className="text-cream/70 leading-relaxed text-sm mb-4">
                Triple A Coffee offers a curated collection of board games so visitors
                can enjoy their coffee while playing with friends. Slow down, roll the
                dice, and make great memories over a perfectly brewed cup.
              </p>
              <ul className="space-y-2">
                {[
                  "Wide selection of board games",
                  "Perfect for groups & solo visitors",
                  "Free to play with any order",
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-cream/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-deep-red shrink-0" />
                    {perk}
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
