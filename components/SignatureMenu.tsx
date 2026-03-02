"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeInUp from "@/components/FadeInUp";
import { MENU_ITEMS } from "@/lib/data";
import type { DisplayMenuItem } from "@/lib/menu-utils";

// ─── Props ─────────────────────────────────────────────────────────────────

interface SignatureMenuProps {
  /** Pass dynamic items from Supabase; falls back to static data.ts items. */
  items?: DisplayMenuItem[];
}

/**
 * Signature Menu section.
 * Responsive 3-column grid of menu cards, each with:
 *  - Coffee photo with badge overlay
 *  - Name + price
 *  - Short description
 *  - Scale-up hover effect (Framer Motion spring)
 */
export default function SignatureMenu({ items }: SignatureMenuProps) {
  // Static fallback: map data.ts items to the unified display model
  const staticItems: DisplayMenuItem[] = MENU_ITEMS.map((m, i) => ({
    id:    `static-${i}`,
    name:  m.name,
    price: m.price,
    desc:  m.desc,
    img:   m.img,
    badge: m.badge,
    notes: m.notes,
  }));

  // Merge: static dummy items first, then any real DB items appended after
  const displayItems = items && items.length > 0 ? [...staticItems, ...items] : staticItems;

  return (
    <section id="menu" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Header */}
        <FadeInUp className="text-center mb-16">
          <p className="text-deep-red tracking-[0.3em] uppercase text-xs font-bold mb-3">
            Curated Selection
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-forest-green leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Signature Menu
          </h2>
          <p className="mt-4 text-forest-green/60 max-w-xl mx-auto text-[0.95rem]">
            Each cup is a story. Crafted with precision, poured with passion.
          </p>
        </FadeInUp>

        {/* Responsive 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayItems.map((item, i) => (
            <FadeInUp key={item.id} delay={0.05 * i}>
              <motion.div
                whileHover={{ scale: 1.035, y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
              >
                {/* ── Card Image ── */}
                <div className="relative w-full h-52 overflow-hidden bg-cream">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    // No-image placeholder that still looks premium
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-forest-green/20 text-4xl select-none">☕</span>
                    </div>
                  )}
                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-deep-red text-white text-[10px] font-bold tracking-widest uppercase shadow">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* ── Card Content ── */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="text-lg font-bold text-forest-green leading-snug"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.name}
                    </h3>
                    <span className="shrink-0 text-base font-black text-deep-red">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-forest-green/60 text-sm leading-relaxed flex-1">
                    {item.desc}
                  </p>

                  {/* Flavor Notes — shown only when available (static data has them) */}
                  {item.notes.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-forest-green/10 flex flex-wrap gap-2">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 rounded-full bg-cream text-forest-green/70 text-[11px] font-semibold tracking-wider border border-forest-green/15"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
