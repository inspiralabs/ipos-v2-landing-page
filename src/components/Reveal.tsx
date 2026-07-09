'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// Ease dipakai sama seperti transisi hover di globals.css (ease-out-quint).
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type RevealProps = { children: ReactNode; className?: string };

/** Fade + rise satu blok saat masuk viewport. Untuk section/kartu tunggal. */
export function Reveal({ children, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

/** Parent grid/list — stagger tiap RevealItem anaknya saat masuk viewport. */
export function RevealGroup({ children, className, stagger = 0.12 }: RevealProps & { stagger?: number }) {
  const reduce = useReducedMotion();
  const variants: Variants = { hidden: {}, visible: { transition: { staggerChildren: stagger } } };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Item di dalam RevealGroup — jangan dipakai berdiri sendiri. */
export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div className={className} variants={itemFadeUp}>
      {children}
    </motion.div>
  );
}
