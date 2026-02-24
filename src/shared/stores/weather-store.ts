// ===== Source of Truth: Weather Data State =====
// Single source of truth for weather data cache.
// Weather data is keyed by city ID to support multi-city caching.

import { create } from 'zustand';
import type { WeatherData } from '../types';
import { fetchWeather } from '../api/weather-api';

interface WeatherCache {
  data: WeatherData;
  timestamp: number;
}

interface WeatherState {
  cache: Record<string, WeatherCache>;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCityWeather: (cityId: string, lat: number, lon: number) => Promise<void>;
  getCityWeather: (cityId: string) => WeatherData | null;
  isStale: (cityId: string) => boolean;
}

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const useWeatherStore = create<WeatherState>()((set, get) => ({
  cache: {},
  loading: false,
  error: null,

  fetchCityWeather: async (cityId, lat, lon) => {
    const state = get();
    // Skip if fresh data exists
    if (!state.isStale(cityId) && state.cache[cityId]) return;

    set({ loading: true, error: null });
    try {
      const data = await fetchWeather(lat, lon);
      set((s) => ({
        cache: {
          ...s.cache,
          [cityId]: { data, timestamp: Date.now() },
        },
        loading: false,
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  getCityWeather: (cityId) => {
    return get().cache[cityId]?.data || null;
  },

  isStale: (cityId) => {
    const cached = get().cache[cityId];
    if (!cached) return true;
    return Date.now() - cached.timestamp > CACHE_TTL;
  },
}));
