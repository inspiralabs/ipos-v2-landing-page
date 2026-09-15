import * as React from 'react';
import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-line px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40',
        className
      )}
      {...props}
    />
  );
}
