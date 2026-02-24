'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/shared/stores/ui-store';
import { useWeatherStore } from '@/shared/stores/weather-store';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { getWeatherGradient } from '@/shared/lib/weather-codes';
import { BottomNav } from '@/shared/ui/BottomNav';
import { ToastContainer } from '@/shared/ui/Toast';
import { WeatherScreen } from '@/features/weather/components/WeatherScreen';
import { CitiesScreen } from '@/features/cities/components/CitiesScreen';
import { SettingsScreen } from '@/features/settings/components/SettingsScreen';
import { screenVariants, screenTransition } from '@/shared/lib/motion';
import { useEffect } from 'react';

export default function Home() {
  const activeScreen = useUIStore((s) => s.activeScreen);
  const activeCity = useCitiesStore((s) => s.cities[s.activeCityIndex]);
  const getCityWeather = useWeatherStore((s) => s.getCityWeather);
  const fetchCityWeather = useWeatherStore((s) => s.fetchCityWeather);

  // Prefetch weather for all cities on mount
  const cities = useCitiesStore((s) => s.cities);
  useEffect(() => {
    cities.forEach((city) => {
      fetchCityWeather(city.id, city.latitude, city.longitude);
    });
  }, [cities, fetchCityWeather]);

  const weather = activeCity ? getCityWeather(activeCity.id) : null;
  const gradient = weather
    ? getWeatherGradient(weather.current.weatherCode, weather.current.isDay)
    : 'from-sky-400 via-blue-500 to-cyan-400';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000`}>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:inset-x-4 focus:p-3 focus:rounded-card focus:glass-surface focus:text-white focus:text-center"
      >
        דלג לתוכן הראשי
      </a>

      <main
        id="main-content"
        className="mx-auto max-w-lg px-4 pt-12 pb-28 safe-top"
        role="main"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={screenTransition}
          >
            {activeScreen === 'weather' && <WeatherScreen />}
            {activeScreen === 'cities' && <CitiesScreen />}
            {activeScreen === 'settings' && <SettingsScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
      <ToastContainer />
    </div>
  );
}
