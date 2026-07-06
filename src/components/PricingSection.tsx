'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, MessageCircle } from 'lucide-react';
import { RevealGroup, RevealItem } from './Reveal';

export type PricingPlan = {
  key: string;
  name: string;
  tagline: string;
  badge?: string;
  featured?: boolean;
  price: { oneTime?: string; monthly?: string; buyout?: string; setup?: string };
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
  const [mode, setMode] = useState<'monthly' | 'buyout'>('monthly');
  const cols = plans.length >= 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <div>
      {billing && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-maroon-deep/5 border border-line">
            {(['monthly', 'buyout'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors min-h-11 ${
                  mode === m ? 'text-white' : 'text-charcoal hover:text-maroon-deep'
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="billingToggle"
                    className="absolute inset-0 bg-maroon-deep rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {m === 'monthly' ? 'Langganan Bulanan' : 'Beli Putus'}
              </button>
            ))}
          </div>
        </div>
      )}

      <RevealGroup className={`grid grid-cols-1 ${cols} gap-6 max-w-5xl mx-auto`}>
        {plans.map((p) => {
          const dark = p.featured;
          const showBuyout = billing && mode === 'buyout' && p.price.buyout;
          const displayPrice = showBuyout ? p.price.buyout : p.price.monthly ?? p.price.oneTime;
          const suffix = showBuyout ? 'sekali bayar' : p.price.oneTime ? 'sekali bayar / perangkat' : '/bulan';

          return (
            <RevealItem
              key={p.key}
              className={`relative flex flex-col rounded-xl p-6 sm:p-8 ${dark ? 'card-dark' : 'card-brand'}`}
            >
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
                {showBuyout && p.price.setup && (
                  <span className={`block text-xs mt-1 ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>
                    + biaya setup {p.price.setup}
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

              <a href={p.ctaHref} target="_blank" rel="noreferrer" className={`w-full ${dark ? 'btn-gold' : 'btn-outline'}`}>
                <MessageCircle className="w-4 h-4" aria-hidden /> {p.ctaLabel}
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {note && <p className="text-sm text-charcoal/60 text-center mt-6">{note}</p>}
    </div>
  );
}
