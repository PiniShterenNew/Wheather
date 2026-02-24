'use client';

import { motion } from 'framer-motion';
import { useCitiesStore } from '@/shared/stores/cities-store';

export function CityIndicators() {
  const cities = useCitiesStore((s) => s.cities);
  const activeCityIndex = useCitiesStore((s) => s.activeCityIndex);

  if (cities.length <= 1) return null;

  return (
    <div className="flex justify-center gap-1.5 py-2">
      {cities.map((city, i) => (
        <motion.div
          key={city.id}
          className={`rounded-full transition-all ${
            i === activeCityIndex
              ? 'w-6 h-2 bg-white'
              : 'w-2 h-2 bg-white/30'
          }`}
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      ))}
    </div>
  );
}
