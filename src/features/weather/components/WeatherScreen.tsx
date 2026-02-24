'use client';

import { motion } from 'framer-motion';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useSwipe } from '@/shared/hooks/useSwipe';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { useActiveWeather } from '../hooks/useActiveWeather';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { HourlyForecast } from './HourlyForecast';
import { DailyForecast } from './DailyForecast';
import { CityIndicators } from './CityIndicators';

export function WeatherScreen() {
  const { weather, loading, error, cityName } = useActiveWeather();
  const navigateNext = useCitiesStore((s) => s.navigateNext);
  const navigatePrev = useCitiesStore((s) => s.navigatePrev);

  // RTL: swipe left = next, swipe right = prev
  const swipeHandlers = useSwipe({
    onSwipeLeft: navigatePrev,
    onSwipeRight: navigateNext,
  });

  if (loading && !weather) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-white/60 text-center">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 pb-4"
      {...swipeHandlers}
    >
      <CityIndicators />

      <CurrentWeatherCard
        current={weather.current}
        today={weather.daily[0]}
        cityName={cityName}
      />

      <HourlyForecast hours={weather.hourly} />

      <DailyForecast days={weather.daily} />
    </motion.div>
  );
}
