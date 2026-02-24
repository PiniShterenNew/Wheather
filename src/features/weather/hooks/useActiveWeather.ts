'use client';

import { useEffect } from 'react';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useWeatherStore } from '@/shared/stores/weather-store';
import type { WeatherData } from '@/shared/types';

export function useActiveWeather(): {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  cityName: string;
  lastUpdated: number | null;
  refresh: () => void;
} {
  const activeCity = useCitiesStore((s) => s.cities[s.activeCityIndex]);
  const fetchCityWeather = useWeatherStore((s) => s.fetchCityWeather);
  const getCityWeather = useWeatherStore((s) => s.getCityWeather);
  const getLastUpdated = useWeatherStore((s) => s.getLastUpdated);
  const isLoading = useWeatherStore((s) => s.isLoading);
  const error = useWeatherStore((s) => s.error);

  const cityId = activeCity?.id || '';

  useEffect(() => {
    if (activeCity) {
      fetchCityWeather(activeCity.id, activeCity.latitude, activeCity.longitude);
    }
  }, [activeCity, fetchCityWeather]);

  const refresh = () => {
    if (activeCity) {
      fetchCityWeather(activeCity.id, activeCity.latitude, activeCity.longitude, true);
    }
  };

  return {
    weather: cityId ? getCityWeather(cityId) : null,
    loading: cityId ? isLoading(cityId) : false,
    error,
    cityName: activeCity?.name || '',
    lastUpdated: cityId ? getLastUpdated(cityId) : null,
    refresh,
  };
}
