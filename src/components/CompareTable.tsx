'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';

const rowFadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function CompareTable({ headers, rows, highlightCol }: {
  headers: string[];
  rows: string[][];
  highlightCol?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal className="overflow-x-auto card-brand">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="border-b-2 border-gold-antique/25">
            {headers.map((h, i) => (
              <th key={h} className={`text-left px-4 py-3.5 font-extrabold ${i === 0 ? 'text-charcoal w-2/5' : 'text-center'} ${i === highlightCol ? 'text-maroon-deep bg-gold-bright/10' : 'text-charcoal'}`}>
                {h}{i === highlightCol && <span className="block text-[10px] font-bold text-gold-antique">TERLARIS</span>}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {rows.map((r, ri) => (
            <motion.tr key={r[0]} variants={rowFadeUp} className={ri % 2 ? 'bg-cream/50' : ''}>
              {r.map((cell, ci) => (
                <td key={ci} className={`px-4 py-2.5 ${ci === 0 ? 'text-charcoal/80' : 'text-center'} ${ci === highlightCol ? 'bg-gold-bright/10' : ''} ${ri === 0 && ci > 0 ? 'font-extrabold text-maroon-deep' : ''}`}>
                  {cell === '✓' ? <span className="text-maroon-deep font-bold" aria-label="termasuk">✓</span>
                    : cell === '—' ? <span className="text-charcoal/30" aria-label="tidak termasuk">—</span>
                    : cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </Reveal>
  );
}
