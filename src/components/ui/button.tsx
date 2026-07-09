'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Variant classes = class CSS brand yang sudah ada di globals.css — bukan ditulis ulang di sini,
// supaya tampilan tetap identik dan satu sumber kebenaran warna/gradient tetap globals.css.
export const buttonVariants = cva('inline-flex items-center justify-center gap-2', {
  variants: {
    variant: {
      gold: 'btn-gold',
      outline: 'btn-outline',
      wa: 'btn-wa',
      dark: 'min-h-11 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-maroon-deep hover:scale-105 transition-transform',
    },
  },
  defaultVariants: { variant: 'gold' },
});

const MotionButton = motion.create('button');
const MotionSlot = motion.create(Slot);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export function Button({ className, variant, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? MotionSlot : MotionButton;
  return (
    <Comp
      className={cn(buttonVariants({ variant }), className)}
      whileHover={{ y: -2, transition: { duration: 0.35, ease: EASE } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.15, ease: EASE } }}
      transition={{ duration: 0.35, ease: EASE }}
      {...props}
    />
  );
}
