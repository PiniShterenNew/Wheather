'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { useTemperature } from '@/shared/hooks/useTemperature';
import { getWeatherInfo } from '@/shared/lib/weather-codes';
import type { DailyForecast as DailyData } from '@/shared/types';

interface Props {
  days: DailyData[];
}

export function DailyForecast({ days }: Props) {
  const { format } = useTemperature();

  return (
    <GlassCard intensity="medium" className="p-4">
      <h2 className="text-sm font-semibold text-white/70 mb-3">תחזית שבועית</h2>
      <div className="flex flex-col divide-y divide-white/10">
        {days.map((day, i) => {
          const date = new Date(day.date);
          const isToday = i === 0;
          const dayName = isToday
            ? 'היום'
            : date.toLocaleDateString('he-IL', { weekday: 'short' });
          const info = getWeatherInfo(day.weatherCode, true);

          // Temperature bar calculation
          const allMin = Math.min(...days.map((d) => d.temperatureMin));
          const allMax = Math.max(...days.map((d) => d.temperatureMax));
          const range = allMax - allMin || 1;
          const leftPct = ((day.temperatureMin - allMin) / range) * 100;
          const widthPct = ((day.temperatureMax - day.temperatureMin) / range) * 100;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-3"
            >
              <span className={`text-sm w-14 ${isToday ? 'text-white font-bold' : 'text-white/70'}`}>
                {dayName}
              </span>

              <WeatherIcon code={day.weatherCode} size={20} className="text-white/80" />

              <span className="text-xs text-white/50 w-16 truncate hidden sm:block">
                {info.description}
              </span>

              <span className="text-sm text-blue-200 w-10 text-left">
                {format(day.temperatureMin)}
              </span>

              {/* Temperature Range Bar */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative">
                <motion.div
                  className="absolute h-full rounded-full bg-gradient-to-l from-amber-400 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.max(widthPct, 8)}%`,
                    right: `${leftPct}%`,
                  }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                  style={{ left: `${leftPct}%` }}
                />
              </div>

              <span className="text-sm text-amber-200 w-10 text-right">
                {format(day.temperatureMax)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
