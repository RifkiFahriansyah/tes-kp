"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInUpProps {
  children: React.ReactNode;
  delay?:   number;
  className?: string;
}

/**
 * Wraps children in a Framer Motion div that fades + slides up
 * once the element enters the viewport (fires only once).
 */
export default function FadeInUp({ children, delay = 0, className = "" }: FadeInUpProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
