'use client';

import { useMemo } from 'react';
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

  // Compute range once outside the loop
  const { allMin, range } = useMemo(() => {
    const min = Math.min(...days.map((d) => d.temperatureMin));
    const max = Math.max(...days.map((d) => d.temperatureMax));
    return { allMin: min, range: max - min || 1 };
  }, [days]);

  if (!days.length) return null;

  return (
    <GlassCard intensity="medium" className="p-4">
      <h2 className="text-caption font-semibold text-white/50 uppercase tracking-wider mb-3">
        תחזית שבועית
      </h2>
      <div className="flex flex-col divide-y divide-white/[0.08]" role="list" aria-label="תחזית שבועית">
        {days.map((day, i) => {
          const date = new Date(day.date);
          const isToday = i === 0;
          const dayName = isToday
            ? 'היום'
            : date.toLocaleDateString('he-IL', { weekday: 'short' });
          const info = getWeatherInfo(day.weatherCode, true);

          const startPct = ((day.temperatureMin - allMin) / range) * 100;
          const widthPct = ((day.temperatureMax - day.temperatureMin) / range) * 100;

          return (
            <motion.div
              key={day.date}
              role="listitem"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2.5 py-3"
              aria-label={`${dayName}: ${info.description}, ${format(day.temperatureMin)} עד ${format(day.temperatureMax)}`}
            >
              <span className={`text-body w-12 shrink-0 ${isToday ? 'text-white font-bold' : 'text-white/60'}`}>
                {dayName}
              </span>

              <WeatherIcon code={day.weatherCode} size={18} className="text-white/70 shrink-0" />

              <span className="text-caption text-white/40 w-14 truncate hidden sm:block">
                {info.description}
              </span>

              <span className="text-body text-metric-tempLow w-9 text-start shrink-0" dir="ltr">
                {format(day.temperatureMin)}
              </span>

              {/* Temperature Range Bar */}
              <div className="flex-1 h-1.5 bg-white/[0.08] rounded-pill relative min-w-[60px]">
                <motion.div
                  className="absolute h-full rounded-pill bg-gradient-to-l from-metric-tempHigh to-metric-tempLow"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(widthPct, 10)}%` }}
                  transition={{ delay: i * 0.04 + 0.15, duration: 0.5 }}
                  style={{ insetInlineStart: `${startPct}%` }}
                />
              </div>

              <span className="text-body text-metric-tempHigh w-9 text-end shrink-0" dir="ltr">
                {format(day.temperatureMax)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
