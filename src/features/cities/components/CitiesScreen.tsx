'use client';

import { motion } from 'framer-motion';
import { CitySearchBar } from './CitySearchBar';
import { CityList } from './CityList';

export function CitiesScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 pb-4"
    >
      <h1 className="text-xl font-bold text-white">ערים</h1>

      <CitySearchBar />

      <div className="mt-2">
        <p className="text-xs text-white/40 mb-3">
          החלק שמאלה למחיקה • לחץ למעבר
        </p>
        <CityList />
      </div>
    </motion.div>
  );
}
