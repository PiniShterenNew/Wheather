'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { MapPin, Trash2 } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { EmptyState } from '@/shared/ui/EmptyState';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useUIStore } from '@/shared/stores/ui-store';
import { useWeatherStore } from '@/shared/stores/weather-store';
import { useTemperature } from '@/shared/hooks/useTemperature';
import { useToast } from '@/shared/ui/Toast';
import { getWeatherInfo } from '@/shared/lib/weather-codes';
import { listItemVariants, listItemTransition } from '@/shared/lib/motion';
import type { City } from '@/shared/types';

function CityRow({ city, index, isActive }: {
  city: City;
  index: number;
  isActive: boolean;
}) {
  const removeCity = useCitiesStore((s) => s.removeCity);
  const setActiveCityIndex = useCitiesStore((s) => s.setActiveCityIndex);
  const setActiveScreen = useUIStore((s) => s.setActiveScreen);
  const getCityWeather = useWeatherStore((s) => s.getCityWeather);
  const citiesCount = useCitiesStore((s) => s.cities.length);
  const { format } = useTemperature();
  const toast = useToast((s) => s.show);

  const weather = getCityWeather(city.id);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, -60], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 && citiesCount > 1) {
      removeCity(city.id);
      toast(`${city.name} הוסרה`);
    }
  };

  const handleTap = () => {
    setActiveCityIndex(index);
    setActiveScreen('weather');
  };

  const handleDelete = () => {
    if (citiesCount > 1) {
      removeCity(city.id);
      toast(`${city.name} הוסרה`);
    }
  };

  const weatherInfo = weather ? getWeatherInfo(weather.current.weatherCode, weather.current.isDay) : null;

  return (
    <div className="relative overflow-hidden rounded-card-lg">
      {/* Swipe-to-delete background */}
      <motion.div
        className="absolute inset-y-0 inset-inline-start-0 flex items-center ps-4 w-20"
        style={{ opacity: deleteOpacity }}
        aria-hidden="true"
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
          className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-1 ring-white/25' : ''}`}
          onClick={handleTap}
          whileTap={{ scale: 0.98 }}
          role="button"
          aria-label={`${city.name}${weather ? `, ${format(weather.current.temperature)}` : ''}. לחץ למעבר`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* City info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-10 h-10 rounded-card flex items-center justify-center shrink-0 ${
                isActive ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {weather ? (
                  <WeatherIcon
                    code={weather.current.weatherCode}
                    isDay={weather.current.isDay}
                    size={20}
                    className="text-white/70"
                  />
                ) : (
                  <MapPin size={18} className="text-white/50" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-body text-white font-medium truncate">{city.name}</p>
                <p className="text-caption text-white/35 truncate">
                  {weatherInfo ? weatherInfo.description : city.country}
                </p>
              </div>
            </div>

            {/* Temperature + Hi/Lo */}
            <div className="flex items-center gap-3 shrink-0">
              {weather && (
                <div className="text-end">
                  <span className="text-title-lg text-white font-light" dir="ltr">
                    {format(weather.current.temperature)}
                  </span>
                </div>
              )}
              {/* Keyboard-accessible delete */}
              {citiesCount > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                  aria-label={`הסר ${city.name}`}
                  className="p-2 rounded-card text-white/20 hover:text-red-400 hover:bg-white/10 transition-all touch-target"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
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

  if (cities.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="אין ערים שמורות"
        description="חפש עיר או השתמש במיקום הנוכחי כדי להתחיל"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2" role="list" aria-label="ערים שמורות">
      <AnimatePresence>
        {cities.map((city, i) => (
          <motion.div
            key={city.id}
            role="listitem"
            variants={listItemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={listItemTransition(i)}
            layout
          >
            <CityRow city={city} index={i} isActive={i === activeCityIndex} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
