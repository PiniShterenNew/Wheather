'use client';

import { motion } from 'framer-motion';
import { CitySearchBar } from './CitySearchBar';
import { CityList } from './CityList';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { screenVariants, screenTransition } from '@/shared/lib/motion';

export function CitiesScreen() {
  const citiesCount = useCitiesStore((s) => s.cities.length);

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={screenTransition}
      className="flex flex-col gap-4 pb-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-title-lg text-white">ערים</h1>
        <span className="text-caption text-white/30">{citiesCount} שמורות</span>
      </div>

      <CitySearchBar />

      <div className="mt-1">
        <p className="text-caption text-white/25 mb-3">
          החלק שמאלה למחיקה &middot; לחץ למעבר
        </p>
        <CityList />
      </div>
    </motion.div>
  );
}
