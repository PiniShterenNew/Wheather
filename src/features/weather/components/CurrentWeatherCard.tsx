'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Wind, CloudRain, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { useTemperature } from '@/shared/hooks/useTemperature';
import { useSettingsStore } from '@/shared/stores/settings-store';
import { getWeatherInfo } from '@/shared/lib/weather-codes';
import { cardVariants, cardTransition } from '@/shared/lib/motion';
import type { CurrentWeather, DailyForecast } from '@/shared/types';

interface Props {
  current: CurrentWeather;
  today: DailyForecast;
  cityName: string;
  lastUpdated: number | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

function formatLastUpdated(timestamp: number | null): string {
  if (!timestamp) return '';
  const mins = Math.round((Date.now() - timestamp) / 60000);
  if (mins < 1) return 'עודכן עכשיו';
  if (mins < 60) return `עודכן לפני ${mins} דק׳`;
  return `עודכן לפני ${Math.round(mins / 60)} שע׳`;
}

export function CurrentWeatherCard({ current, today, cityName, lastUpdated, onRefresh, isRefreshing }: Props) {
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
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={cardTransition}
      >
        <GlassCard className="p-6 text-center" intensity="medium">
          {/* Location header + refresh */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1" />
            <div className="text-center flex-[3]">
              <h1 className="text-title-lg text-white">{cityName}</h1>
              <p className="text-caption text-white/50 mt-0.5">{hebrewDate}</p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="רענן נתוני מזג אוויר"
                className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/10 transition-all touch-target"
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                >
                  <RefreshCw size={18} aria-hidden="true" />
                </motion.div>
              </button>
            </div>
          </div>

          {/* Last updated */}
          {lastUpdated && (
            <p className="text-micro text-white/30 mb-4">{formatLastUpdated(lastUpdated)}</p>
          )}

          {/* Hero: Icon + Temperature */}
          <div className="flex flex-col items-center gap-1 mb-5">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <WeatherIcon
                code={current.weatherCode}
                isDay={current.isDay}
                size={68}
                strokeWidth={1.5}
                className="text-white drop-shadow-lg"
              />
            </motion.div>

            <span className="text-display text-white" aria-label={`טמפרטורה ${format(current.temperature)}`}>
              {format(current.temperature)}
            </span>

            <p className="text-body text-white/80 font-medium">{weatherInfo.description}</p>

            {showFeelsLike && (
              <p className="text-caption text-white/40">
                מרגיש כמו {format(current.apparentTemperature)}
              </p>
            )}
          </div>

          {/* High / Low */}
          <div className="flex justify-center gap-6 mb-5" aria-label={`מקסימום ${format(today.temperatureMax)}, מינימום ${format(today.temperatureMin)}`}>
            <span className="text-body text-white/60">
              <span className="text-metric-tempHigh">↑</span> {format(today.temperatureMax)}
            </span>
            <span className="text-body text-white/60">
              <span className="text-metric-tempLow">↓</span> {format(today.temperatureMin)}
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <Droplets size={18} className="text-metric-humidity" aria-hidden="true" />
              <span className="text-caption text-white/40">לחות</span>
              <span className="text-body font-semibold text-white" dir="ltr">{current.humidity}%</span>
            </GlassCard>

            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <Wind size={18} className="text-metric-wind" aria-hidden="true" />
              <span className="text-caption text-white/40">רוח</span>
              <span className="text-body font-semibold text-white" dir="ltr">{Math.round(current.windSpeed)} קמ&quot;ש</span>
            </GlassCard>

            <GlassCard intensity="light" className="p-3 flex flex-col items-center gap-1">
              <CloudRain size={18} className="text-metric-rain" aria-hidden="true" />
              <span className="text-caption text-white/40">משקעים</span>
              <span className="text-body font-semibold text-white" dir="ltr">{current.precipitation} מ&quot;מ</span>
            </GlassCard>
          </div>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
}
