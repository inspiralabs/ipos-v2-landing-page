'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, MessageCircle } from 'lucide-react';
import { RevealGroup, RevealItem } from './Reveal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type PricingPlan = {
  key: string;
  name: string;
  tagline: string;
  badge?: string;
  featured?: boolean;
  price: { oneTime?: string; monthly?: string; yearly?: string; setup?: string; setupYearly?: string };
  ctaLabel: string;
  ctaHref: string;
  features: { label: string; included: boolean }[];
};

export function PricingSection({
  plans,
  billing,
  note,
}: {
  plans: PricingPlan[];
  billing?: boolean;
  note?: string;
}) {
  const [mode, setMode] = useState<'monthly' | 'yearly'>('monthly');
  const fourUp = plans.length >= 4;
  // 4 paket butuh lebar ekstra supaya tiap card tidak terperas - naik ke grid-cols-4
  // baru di xl (>=1280px), bukan lg (>=1024px), supaya tetap 2 kolom yang lega di layar
  // laptop kecil alih-alih 4 kolom sempit dengan teks fitur ter-wrap.
  const cols = fourUp ? 'sm:grid-cols-2 xl:grid-cols-4' : plans.length >= 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2';
  const maxWidth = fourUp ? 'max-w-7xl' : 'max-w-5xl';

  return (
    <div>
      {billing && (
        <div className="flex justify-center mb-8">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'monthly' | 'yearly')}>
            <TabsList>
              {(['monthly', 'yearly'] as const).map((m) => (
                <TabsTrigger key={m} value={m} className="relative">
                  {mode === m && (
                    <motion.span
                      layoutId="billingToggle"
                      className="absolute inset-0 bg-maroon-deep rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    />
                  )}
                  {m === 'monthly' ? 'Langganan Bulanan' : 'Langganan Tahunan'}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      <RevealGroup className={`grid grid-cols-1 ${cols} gap-5 xl:gap-4 ${maxWidth} mx-auto`}>
        {plans.map((p) => {
          const dark = p.featured;
          const showYearly = billing && mode === 'yearly' && p.price.yearly;
          const displayPrice = showYearly ? p.price.yearly : p.price.monthly ?? p.price.oneTime;
          const suffix = showYearly ? '/tahun' : p.price.oneTime ? 'sekali bayar / perangkat' : '/bulan';
          const setupPrice = showYearly ? p.price.setupYearly ?? p.price.setup : p.price.setup;

          return (
            <RevealItem key={p.key}>
              <Card className={`relative flex flex-col rounded-xl p-6 sm:p-8 ${dark ? 'card-dark' : 'card-brand'}`}>
                {p.badge && (
                  <span
                    className={`absolute top-4 right-4 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      dark ? 'bg-gold-bright text-maroon-deep' : 'bg-maroon-deep/10 text-maroon-deep'
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
                <h3 className={`font-extrabold text-lg mb-1 pr-20 ${dark ? 'text-white' : 'text-charcoal'}`}>{p.name}</h3>
                <p className={`text-xs mb-5 ${dark ? 'text-white/60' : 'text-charcoal/60'}`}>{p.tagline}</p>

                <div className="mb-6">
                  <span className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {displayPrice}
                  </span>
                  <span className={`block text-xs font-medium mt-1 ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>
                    {suffix}
                  </span>
                  {setupPrice && (
                    <span className={`block text-xs mt-1 ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>
                      + biaya setup {setupPrice}{showYearly ? ' (hemat 50%)' : ''}
                    </span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-gold-bright' : 'text-maroon-deep'}`} aria-hidden />
                      ) : (
                        <X className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-white/30' : 'text-charcoal/30'}`} aria-hidden />
                      )}
                      <span className={f.included ? (dark ? 'text-white/85' : 'text-charcoal/70') : dark ? 'text-white/40' : 'text-charcoal/40'}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={dark ? 'gold' : 'outline'} className="w-full">
                  <a href={p.ctaHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4" aria-hidden /> {p.ctaLabel}
                  </a>
                </Button>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {note && <p className="text-sm text-charcoal/60 text-center mt-6">{note}</p>}
    </div>
  );
}
