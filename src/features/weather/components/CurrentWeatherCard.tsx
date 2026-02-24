'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Wind, CloudRain } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { useTemperature } from '@/shared/hooks/useTemperature';
import { useSettingsStore } from '@/shared/stores/settings-store';
import { getWeatherInfo } from '@/shared/lib/weather-codes';
import type { CurrentWeather, DailyForecast } from '@/shared/types';

interface Props {
  current: CurrentWeather;
  today: DailyForecast;
  cityName: string;
}

export function CurrentWeatherCard({ current, today, cityName }: Props) {
  const { format } = useTemperature();
  const showFeelsLike = useSettingsStore((s) => s.showFeelsLike);
  const weatherInfo = getWeatherInfo(current.weatherCode, current.isDay);

  const hebrewDate = new Date().toLocaleDateString('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cityName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <GlassCard className="p-6 text-center" intensity="medium">
          {/* City & Date */}
          <motion.h1
            className="text-2xl font-bold text-white mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {cityName}
          </motion.h1>
          <p className="text-white/60 text-sm mb-6">{hebrewDate}</p>

          {/* Main Temperature */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <WeatherIcon
                code={current.weatherCode}
                isDay={current.isDay}
                size={72}
                strokeWidth={1.5}
                className="text-white drop-shadow-lg"
              />
            </motion.div>

            <motion.span
              className="text-7xl font-extralight text-white tracking-tighter"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {format(current.temperature)}
            </motion.span>

            <p className="text-white/80 text-base font-medium">{weatherInfo.description}</p>

            {showFeelsLike && (
              <p className="text-white/50 text-sm">
                מרגיש כמו {format(current.apparentTemperature)}
              </p>
            )}
          </div>

          {/* High/Low */}
          <div className="flex justify-center gap-6 mb-6">
            <span className="text-white/70 text-sm">
              ↑ {format(today.temperatureMax)}
            </span>
            <span className="text-white/70 text-sm">
              ↓ {format(today.temperatureMin)}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <Droplets size={18} className="text-blue-300" />
              <span className="text-xs text-white/50">לחות</span>
              <span className="text-sm font-semibold text-white">{current.humidity}%</span>
            </GlassCard>

            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <Wind size={18} className="text-teal-300" />
              <span className="text-xs text-white/50">רוח</span>
              <span className="text-sm font-semibold text-white">{Math.round(current.windSpeed)} קמ&quot;ש</span>
            </GlassCard>

            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <CloudRain size={18} className="text-indigo-300" />
              <span className="text-xs text-white/50">משקעים</span>
              <span className="text-sm font-semibold text-white">{current.precipitation} מ&quot;מ</span>
            </GlassCard>
          </div>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
}
