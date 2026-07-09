'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="sheet-overlay fixed inset-0 z-50 bg-charcoal/40" />
      <DialogPrimitive.Content
        className={cn(
          'sheet-content fixed inset-y-0 right-0 z-50 w-72 max-w-[80vw] bg-surface p-4 shadow-xl focus:outline-none',
          className
        )}
        {...props}
      >
        <DialogPrimitive.Close className="ml-auto flex min-h-11 min-w-11 items-center justify-center text-charcoal/70" aria-label="Tutup menu">
          <X className="h-5 w-5" aria-hidden />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('sr-only', className)} {...props} />;
}
