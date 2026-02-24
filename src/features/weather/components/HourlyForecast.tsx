'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { useTemperature } from '@/shared/hooks/useTemperature';
import type { HourlyForecast as HourlyData } from '@/shared/types';

interface Props {
  hours: HourlyData[];
}

export function HourlyForecast({ hours }: Props) {
  const { format } = useTemperature();

  if (!hours.length) return null;

  return (
    <GlassCard intensity="medium" className="p-4">
      <h2 className="text-caption font-semibold text-white/50 uppercase tracking-wider mb-3">
        תחזית שעתית
      </h2>
      <div
        className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
        role="list"
        aria-label="תחזית שעתית"
      >
        {hours.map((hour, i) => {
          const time = new Date(hour.time);
          const isNow = i === 0;
          const label = isNow ? 'עכשיו' : time.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
          const isDay = time.getHours() >= 6 && time.getHours() < 20;

          return (
            <motion.div
              key={hour.time}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
              className={`flex flex-col items-center gap-1.5 min-w-[58px] py-2.5 px-1.5 rounded-card transition-colors ${
                isNow ? 'glass-surface-light' : ''
              }`}
            >
              <span className={`text-caption ${isNow ? 'text-white font-bold' : 'text-white/50'}`}>
                {label}
              </span>
              <WeatherIcon
                code={hour.weatherCode}
                isDay={isDay}
                size={20}
                className="text-white/80"
              />
              <span className="text-body font-medium text-white" dir="ltr">
                {format(hour.temperature)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
