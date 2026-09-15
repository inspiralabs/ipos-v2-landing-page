'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { MessageCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { waLink } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { SLIDES } from './Hero.content';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const playing = !userPaused && !hoverPaused;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduce || !playing) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduce, playing, index]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative h-[560px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-charcoal"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlay} to-charcoal/10 md:bg-gradient-to-r md:to-transparent`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
        <h1 className="sr-only">Inspira POS — Kasir untuk UMKM dan Restoran Indonesia</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-xl"
            initial={reduce ? false : 'hidden'}
            animate="visible"
            exit={reduce ? undefined : 'exit'}
          >
            <motion.p variants={item} className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              {slide.headline1} <span className="text-gold-bright">{slide.headline2}</span>
            </motion.p>
            <motion.p variants={item} className="text-lg text-white/85 mb-8">
              {slide.sub}
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="gold"><Link href={slide.ctaHref}>Coba Gratis 14 Hari</Link></Button>
              <Button asChild variant="outline" className="!border-white !text-white hover:!bg-white/10">
                <a href={waLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-4 h-4" aria-hidden /> Tanya Dulu via WA
                </a>
              </Button>
            </motion.div>
            <motion.p variants={item} className="text-xs text-white/70 mt-3">Coba 14 hari gratis, tanpa kartu kredit.</motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Slide sebelumnya"
        className="absolute left-4 bottom-6 sm:left-6 lg:left-10 grid place-items-center w-11 h-11 rounded-full bg-white text-charcoal hover:scale-105 transition-transform shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Slide berikutnya"
        className="absolute right-4 bottom-6 sm:right-6 lg:right-10 grid place-items-center w-11 h-11 rounded-full bg-white text-charcoal hover:scale-105 transition-transform shadow-lg"
      >
        <ChevronRight className="w-5 h-5" aria-hidden />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.headline1}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === index}
            className="min-h-11 min-w-11 grid place-items-center"
          >
            <span className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? 'Lanjutkan slide otomatis' : 'Jeda slide otomatis'}
          className="min-h-11 min-w-11 grid place-items-center text-white/70 hover:text-white"
        >
          {userPaused ? <Play className="w-4 h-4" aria-hidden /> : <Pause className="w-4 h-4" aria-hidden />}
        </button>
      </div>
    </section>
  );
}
