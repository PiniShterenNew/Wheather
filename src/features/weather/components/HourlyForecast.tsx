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

  return (
    <GlassCard intensity="medium" className="p-4">
      <h2 className="text-sm font-semibold text-white/70 mb-3">תחזית שעתית</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {hours.map((hour, i) => {
          const time = new Date(hour.time);
          const isNow = i === 0;
          const label = isNow ? 'עכשיו' : time.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
          const isDay = time.getHours() >= 6 && time.getHours() < 20;

          return (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex flex-col items-center gap-1.5 min-w-[60px] py-2 px-1 rounded-xl ${
                isNow ? 'bg-white/15' : ''
              }`}
            >
              <span className={`text-xs ${isNow ? 'text-white font-bold' : 'text-white/60'}`}>
                {label}
              </span>
              <WeatherIcon
                code={hour.weatherCode}
                isDay={isDay}
                size={22}
                className="text-white/90"
              />
              <span className="text-sm font-medium text-white">
                {format(hour.temperature)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
