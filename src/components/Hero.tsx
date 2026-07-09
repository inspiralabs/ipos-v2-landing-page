'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { kontakLink } from '@/lib/site';
import { Button } from '@/components/ui/button';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={containerRef} className="py-14 lg:py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        initial={reduce ? false : 'hidden'}
        animate="visible"
        variants={container}
      >
        <div className="lg:col-span-7 text-center lg:text-left">
          <motion.h1 variants={item} className="text-4xl md:text-5xl font-extrabold text-charcoal mb-4 leading-tight">
            Kasir yang Tetap Jalan <span className="text-maroon-deep">Walau Internet Mati</span>
          </motion.h1>
          <motion.p variants={item} className="text-lg text-charcoal/60 mb-8 max-w-2xl mx-auto lg:mx-0">
            Inspira POS - kasir pintar untuk UMKM kuliner dan restoran Indonesia.
            Catat jualan, kelola stok, lihat untung. Mulai Rp 149 ribu/bulan atau sekali bayar Rp 299 ribu.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Button asChild variant="gold"><Link href="/demo">Coba Gratis 14 Hari</Link></Button>
            <Button asChild variant="outline">
              <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer">
                <MessageCircle className="w-4 h-4" aria-hidden /> Tanya Dulu via WA
              </a>
            </Button>
          </motion.div>
          <motion.p variants={item} className="text-xs text-charcoal/50 mt-3">Coba 14 hari gratis, tanpa kartu kredit.</motion.p>
        </div>
        <motion.div variants={item} className="hidden lg:block lg:col-span-5" style={reduce ? undefined : { scale, opacity }}>
          <Image
            src="/og-image.jpeg"
            alt="Tampilan aplikasi kasir Inspira POS"
            width={1200}
            height={630}
            priority
            className="rounded-xl border border-line shadow-[0_8px_32px_rgba(110,21,15,0.14)] w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
