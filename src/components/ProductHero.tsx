'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type Feature = { title: string; desc: string };

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
    <div className="max-w-6xl mx-auto mb-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      <motion.div
        className="relative rounded-2xl overflow-hidden border-4 border-surface shadow-[0_8px_32px_rgba(110,21,15,0.14)] ring-1 ring-line min-h-[320px] lg:min-h-full"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <Image src={image} alt={imageAlt} fill priority className="object-cover" />
      </motion.div>

      <motion.div
        initial={reduce ? false : 'hidden'}
        animate="visible"
        variants={container}
      >
        <motion.p variants={item} className="text-lg sm:text-xl font-extrabold text-maroon-deep mb-2">
          {badge}
        </motion.p>
        <motion.h1 variants={item} className="text-3xl font-extrabold text-charcoal mb-3">{title}</motion.h1>
        <motion.p variants={item} className="text-charcoal/60 mb-6">{description}</motion.p>


        <motion.div variants={item} className="grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <Card key={f.title} className="card-brand p-4">
              <h3 className="font-bold text-charcoal mb-1 text-sm">{f.title}</h3>
              <p className="text-xs text-charcoal/60">{f.desc}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
