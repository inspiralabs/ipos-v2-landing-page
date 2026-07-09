'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Wrapper tipis di atas div — visual tetap dari class brand (.card-brand/.card-dark/.card-gold
// di globals.css) yang dioper lewat className, komponen ini cuma menambahkan hover-lift motion.
// asChild (Radix Slot) dipakai saat kartu itu sendiri adalah link (mis. kartu kontak di /kontak).
const MotionDiv = motion.create('div');
const MotionSlot = motion.create(Slot);

export interface CardProps extends HTMLMotionProps<'div'> {
  asChild?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Card({ className, asChild, ...props }: CardProps) {
  const Comp = asChild ? MotionSlot : MotionDiv;
  return (
    <Comp
      className={cn(className)}
      whileHover={{ y: -4, transition: { duration: 0.4, ease: EASE } }}
      transition={{ duration: 0.4, ease: EASE }}
      {...props}
    />
  );
}
