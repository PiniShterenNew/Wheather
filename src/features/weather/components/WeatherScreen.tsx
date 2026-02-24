'use client';

import { motion } from 'framer-motion';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useSwipe } from '@/shared/hooks/useSwipe';
import { WeatherSkeleton } from '@/shared/ui/LoadingSkeleton';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useActiveWeather } from '../hooks/useActiveWeather';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { HourlyForecast } from './HourlyForecast';
import { DailyForecast } from './DailyForecast';
import { CityIndicators } from './CityIndicators';
import { screenVariants, screenTransition } from '@/shared/lib/motion';

export function WeatherScreen() {
  const { weather, loading, error, cityName, lastUpdated, refresh } = useActiveWeather();
  const navigateNext = useCitiesStore((s) => s.navigateNext);
  const navigatePrev = useCitiesStore((s) => s.navigatePrev);

  const swipeHandlers = useSwipe({
    onSwipeLeft: navigatePrev,
    onSwipeRight: navigateNext,
  });

  // Loading: show skeleton (not spinner)
  if (loading && !weather) {
    return <WeatherSkeleton />;
  }

  // Error with no cached data
  if (error && !weather) {
    const isNetwork = error.toLowerCase().includes('fetch') || error.toLowerCase().includes('network');
    return (
      <ErrorState
        message="לא ניתן לטעון נתוני מזג אוויר. בדוק את החיבור לאינטרנט ונסה שוב."
        onRetry={refresh}
        type={isNetwork ? 'network' : 'generic'}
      />
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      transition={screenTransition}
      className="flex flex-col gap-4 pb-4"
      {...swipeHandlers}
    >
      <CityIndicators />

      <CurrentWeatherCard
        current={weather.current}
        today={weather.daily[0]}
        cityName={cityName}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
        isRefreshing={loading}
      />

      <HourlyForecast hours={weather.hourly} />

      <DailyForecast days={weather.daily} />
    </motion.div>
  );
}
