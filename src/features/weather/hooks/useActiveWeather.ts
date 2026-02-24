'use client';

import { useEffect } from 'react';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useWeatherStore } from '@/shared/stores/weather-store';
import type { WeatherData } from '@/shared/types';

/**
 * Feature hook: connects cities store (source of truth for active city)
 * with weather store (source of truth for weather data).
 * Returns the weather data for the currently active city.
 */
export function useActiveWeather(): {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  cityName: string;
  refresh: () => void;
} {
  const activeCity = useCitiesStore((s) => s.cities[s.activeCityIndex]);
  const fetchCityWeather = useWeatherStore((s) => s.fetchCityWeather);
  const getCityWeather = useWeatherStore((s) => s.getCityWeather);
  const loading = useWeatherStore((s) => s.loading);
  const error = useWeatherStore((s) => s.error);

  useEffect(() => {
    if (activeCity) {
      fetchCityWeather(activeCity.id, activeCity.latitude, activeCity.longitude);
    }
  }, [activeCity, fetchCityWeather]);

  const refresh = () => {
    if (activeCity) {
      // Force fetch by clearing cache first
      fetchCityWeather(activeCity.id, activeCity.latitude, activeCity.longitude);
    }
  };

  return {
    weather: activeCity ? getCityWeather(activeCity.id) : null,
    loading,
    error,
    cityName: activeCity?.name || '',
    refresh,
  };
}
