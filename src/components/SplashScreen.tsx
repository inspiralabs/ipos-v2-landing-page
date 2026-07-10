'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ponytail: visible starts true so the splash is part of the FIRST server-rendered HTML,
// not injected later by an effect - an effect (layout or not) only runs after that first
// HTML already painted, which is what let the homepage flash before the splash appeared.
// Root layout also doesn't remount on client-side <Link> navigation, so this only shows
// on a real reload/first visit - no sessionStorage gate needed.
export function SplashScreen() {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hold = setTimeout(() => setFading(true), 1200);
    return () => clearTimeout(hold);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const remove = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(remove);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-surface transition-opacity duration-200 ease-in-out"
      style={{ opacity: fading ? 0 : 1 }}
      aria-hidden="true"
    >
      <Image src="/inspirapos-icon.svg" alt="" width={72} height={72} priority className="rounded-xl" />
      <p className="text-sm font-semibold text-charcoal/60">Inspira POS <span className="text-charcoal/35">by InspiraLabs</span></p>
    </div>
  );
}
