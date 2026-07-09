'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type ProductHeroProps = {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Hero halaman /produk/* — stagger entrance + scroll-zoom pada gambar, gambar di bawah teks. */
export function ProductHero({ icon, badge, title, description, image, imageAlt }: ProductHeroProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto mb-10">
      <motion.div
        className="text-center"
        initial={reduce ? false : 'hidden'}
        animate="visible"
        variants={container}
      >
        <motion.div variants={item} className="icon-box !p-4 mb-4 mx-auto w-fit">{icon}</motion.div>
        <motion.span variants={item} className="inline-block bg-gold-bright/30 text-maroon-deep text-xs font-bold px-3 py-1 rounded-full mb-4">
          {badge}
        </motion.span>
        <motion.h1 variants={item} className="text-3xl font-extrabold text-charcoal mb-3">{title}</motion.h1>
        <motion.p variants={item} className="text-charcoal/60 max-w-xl mx-auto mb-8">{description}</motion.p>
        <motion.div variants={item} className="rounded-xl overflow-hidden border border-line shadow-[0_8px_32px_rgba(110,21,15,0.14)]" style={reduce ? undefined : { scale, opacity }}>
          <Image src={image} alt={imageAlt} width={1376} height={768} priority className="w-full h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
