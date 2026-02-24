'use client';

import { motion } from 'framer-motion';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { springSnappy } from '@/shared/lib/motion';

export function CityIndicators() {
  const cities = useCitiesStore((s) => s.cities);
  const activeCityIndex = useCitiesStore((s) => s.activeCityIndex);

  if (cities.length <= 1) return null;

  return (
    <div
      className="flex justify-center gap-1.5 py-2"
      role="tablist"
      aria-label="בחירת עיר"
    >
      {cities.map((city, i) => (
        <motion.button
          key={city.id}
          role="tab"
          aria-selected={i === activeCityIndex}
          aria-label={city.name}
          onClick={() => useCitiesStore.getState().setActiveCityIndex(i)}
          className={`rounded-pill transition-all ${
            i === activeCityIndex
              ? 'w-6 h-2 bg-white'
              : 'w-2 h-2 bg-white/30 hover:bg-white/50'
          }`}
          layout
          transition={springSnappy}
        />
      ))}
    </div>
  );
}
