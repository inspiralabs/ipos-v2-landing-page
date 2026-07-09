'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn('card-brand overflow-hidden', className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex min-h-11 flex-1 items-center justify-between gap-4 px-6 py-4 text-left font-bold text-charcoal',
          className
        )}
        {...props}
      >
        {children}
        <Plus
          className="h-5 w-5 shrink-0 text-maroon-deep transition-transform duration-300 group-data-[state=open]:rotate-45"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// Animasi tinggi pakai keyframe CSS bawaan Radix (--radix-accordion-content-height,
// didefinisikan di globals.css sebagai .accordion-content) — lebih pas daripada framer-motion
// karena Radix sudah expose var CSS tinggi kontennya secara native, tidak perlu ukur manual di JS.
export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="accordion-content overflow-hidden" {...props}>
      <div className={cn('px-6 pb-4 text-sm leading-relaxed text-charcoal/70', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
