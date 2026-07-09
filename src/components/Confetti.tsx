'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const COLORS = ['var(--color-maroon-vibrant)', 'var(--color-gold-antique)', 'var(--color-gold-bright)'];
const PARTICLES_PER_BURST = 24;
const BURST_COUNT = 3;
const BURST_INTERVAL_MS = 400;

function makeParticles(seed: number) {
  return Array.from({ length: PARTICLES_PER_BURST }, (_, i) => ({
    id: `${seed}-${i}`,
    x: (Math.random() - 0.5) * 320,
    y: 200 + Math.random() * 160,
    rotate: (Math.random() - 0.5) * 360,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 6,
    delay: Math.random() * 0.15,
  }));
}

/** Confetti otomatis 3x saat `trigger` berubah dari false ke true. Tidak butuh klik. */
export function Confetti({ trigger }: { trigger: boolean }) {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<number[]>([]);

  useEffect(() => {
    if (!trigger || reduce) return;
    let count = 0;
    setBursts([0]);
    const id = setInterval(() => {
      count += 1;
      if (count >= BURST_COUNT) {
        clearInterval(id);
        return;
      }
      setBursts((b) => [...b, count]);
    }, BURST_INTERVAL_MS);
    return () => clearInterval(id);
  }, [trigger, reduce]);

  if (reduce || bursts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((seed) =>
          makeParticles(seed).map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-1/3 rounded-sm"
              style={{ width: p.size, height: p.size, background: p.color }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
              transition={{ type: 'spring', damping: 12, stiffness: 60, delay: p.delay }}
            />
          )),
        )}
      </AnimatePresence>
    </div>
  );
}
