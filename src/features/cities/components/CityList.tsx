'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Trash2, CloudSun } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useUIStore } from '@/shared/stores/ui-store';
import { useWeatherStore } from '@/shared/stores/weather-store';
import { useTemperature } from '@/shared/hooks/useTemperature';

function CityRow({ city, index, isActive }: {
  city: { id: string; name: string; country: string; latitude: number; longitude: number };
  index: number;
  isActive: boolean;
}) {
  const removeCity = useCitiesStore((s) => s.removeCity);
  const setActiveCityIndex = useCitiesStore((s) => s.setActiveCityIndex);
  const setActiveScreen = useUIStore((s) => s.setActiveScreen);
  const getCityWeather = useWeatherStore((s) => s.getCityWeather);
  const citiesCount = useCitiesStore((s) => s.cities.length);
  const { format } = useTemperature();

  const weather = getCityWeather(city.id);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, -60], [1, 0]);
  const deleteScale = useTransform(x, [-100, -60], [1, 0.5]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 && citiesCount > 1) {
      removeCity(city.id);
    }
  };

  const handleTap = () => {
    setActiveCityIndex(index);
    setActiveScreen('weather');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete background */}
      <motion.div
        className="absolute inset-y-0 left-0 flex items-center pr-4 w-20"
        style={{ opacity: deleteOpacity, scale: deleteScale }}
      >
        <Trash2 size={20} className="text-red-400" />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative"
      >
        <GlassCard
          intensity={isActive ? 'medium' : 'light'}
          className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-1 ring-white/30' : ''}`}
          onClick={handleTap}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isActive ? 'bg-white/20' : 'bg-white/10'
              }`}>
                <MapPin size={18} className="text-white/70" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{city.name}</p>
                <p className="text-white/40 text-xs">{city.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {weather && (
                <>
                  <CloudSun size={16} className="text-white/50" />
                  <span className="text-white text-lg font-light">
                    {format(weather.current.temperature)}
                  </span>
                </>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export function CityList() {
  const cities = useCitiesStore((s) => s.cities);
  const activeCityIndex = useCitiesStore((s) => s.activeCityIndex);

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {cities.map((city, i) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.05 }}
            layout
          >
            <CityRow city={city} index={i} isActive={i === activeCityIndex} />
          </motion.div>
        ))}
      </AnimatePresence>

      {cities.length === 0 && (
        <p className="text-center text-white/40 py-8 text-sm">
          אין ערים שמורות. חפש עיר להוספה.
        </p>
      )}
    </div>
  );
}
