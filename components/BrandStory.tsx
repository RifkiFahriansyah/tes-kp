"use client";

import Image from "next/image";
import { Coffee } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";
import { STORY_PILLARS } from "@/lib/data";

/**
 * Brand Story section — explains the Triple A philosophy.
 * Two-column layout: image on the left, pillar cards on the right.
 */
export default function BrandStory() {
  return (
    <section id="story" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Header */}
        <FadeInUp className="text-center mb-16">
          <p className="text-deep-red tracking-[0.3em] uppercase text-xs font-bold mb-3">
            Our Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-forest-green leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            The Triple A Philosophy
          </h2>
        </FadeInUp>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image Side ── */}
          <FadeInUp delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80"
                alt="Triple A Coffee ambience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-5 left-5 px-4 py-2 bg-forest-green rounded-full shadow-lg">
                <span className="text-cream text-xs font-bold tracking-widest uppercase">
                  Est. 2022
                </span>
              </div>
            </div>
          </FadeInUp>

          {/* ── Pillars Side ── */}
          <div className="flex flex-col gap-8">
            {STORY_PILLARS.map((pillar, i) => (
              <FadeInUp key={pillar.title} delay={0.15 + i * 0.12}>
                <div className="flex gap-5 items-start group">
                  {/* Letter Badge */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-forest-green flex items-center justify-center shadow-lg group-hover:bg-deep-red transition-colors duration-300">
                    <span
                      className="text-2xl font-black text-cream"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {pillar.letter}
                    </span>
                  </div>
                  {/* Copy */}
                  <div>
                    <h3
                      className="text-xl font-bold text-forest-green mb-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-forest-green/70 leading-relaxed text-[0.95rem]">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}

            {/* CTA */}
            <FadeInUp delay={0.5}>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-deep-red text-white font-semibold tracking-wider uppercase text-sm hover:opacity-90 hover:shadow-lg active:scale-95 transition-all duration-300 self-start"
              >
                <Coffee size={16} />
                Taste the Difference
              </a>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
