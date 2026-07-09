'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type Feature = { icon: ReactNode; title: string; desc: string };

type ProductHeroProps = {
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: Feature[];
  ctaHref: string;
  ctaLabel: string;
};

/** Hero halaman /produk/* — foto kiri, badge+judul+deskripsi+CTA+fitur di kolom kanan. */
export function ProductHero({ badge, title, description, image, imageAlt, features, ctaHref, ctaLabel }: ProductHeroProps) {
  const reduce = useReducedMotion();

  return (
    <div className="max-w-6xl mx-auto mb-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <motion.div
        className="rounded-xl overflow-hidden border border-line shadow-[0_8px_32px_rgba(110,21,15,0.14)]"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <Image src={image} alt={imageAlt} width={1376} height={768} priority className="w-full h-auto" />
      </motion.div>

      <motion.div
        initial={reduce ? false : 'hidden'}
        animate="visible"
        variants={container}
      >
        <motion.span variants={item} className="inline-block bg-gold-bright/30 text-maroon-deep text-xs font-bold px-3 py-1 rounded-full mb-4">
          {badge}
        </motion.span>
        <motion.h1 variants={item} className="text-3xl font-extrabold text-charcoal mb-3">{title}</motion.h1>
        <motion.p variants={item} className="text-charcoal/60 mb-6">{description}</motion.p>


        <motion.div variants={item} className="grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <Card key={f.title} className="card-brand p-4">
              <div className="icon-box mb-2.5 !p-2">{f.icon}</div>
              <h3 className="font-bold text-charcoal mb-1 text-sm">{f.title}</h3>
              <p className="text-xs text-charcoal/60">{f.desc}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
