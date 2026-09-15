import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full min-h-11 rounded-lg border border-line px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40',
        className
      )}
      {...props}
    />
  );
}
