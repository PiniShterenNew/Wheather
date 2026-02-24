// ===== Source of Truth: Weather Data State =====
// Per-city loading state. Weather data keyed by city ID with TTL cache.

import { create } from 'zustand';
import type { WeatherData } from '../types';
import { fetchWeather } from '../api/weather-api';

interface WeatherCache {
  data: WeatherData;
  timestamp: number;
}

interface WeatherState {
  cache: Record<string, WeatherCache>;
  loadingCities: Record<string, boolean>;
  error: string | null;

  fetchCityWeather: (cityId: string, lat: number, lon: number, force?: boolean) => Promise<void>;
  getCityWeather: (cityId: string) => WeatherData | null;
  getLastUpdated: (cityId: string) => number | null;
  isLoading: (cityId: string) => boolean;
  isStale: (cityId: string) => boolean;
}

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const useWeatherStore = create<WeatherState>()((set, get) => ({
  cache: {},
  loadingCities: {},
  error: null,

  fetchCityWeather: async (cityId, lat, lon, force = false) => {
    const state = get();
    if (!force && !state.isStale(cityId) && state.cache[cityId]) return;
    if (state.loadingCities[cityId]) return;

    set((s) => ({
      loadingCities: { ...s.loadingCities, [cityId]: true },
      error: null,
    }));

    try {
      const data = await fetchWeather(lat, lon);
      set((s) => ({
        cache: { ...s.cache, [cityId]: { data, timestamp: Date.now() } },
        loadingCities: { ...s.loadingCities, [cityId]: false },
      }));
    } catch (err) {
      set((s) => ({
        error: (err as Error).message,
        loadingCities: { ...s.loadingCities, [cityId]: false },
      }));
    }
  },

  getCityWeather: (cityId) => get().cache[cityId]?.data || null,
  getLastUpdated: (cityId) => get().cache[cityId]?.timestamp || null,
  isLoading: (cityId) => !!get().loadingCities[cityId],
  isStale: (cityId) => {
    const cached = get().cache[cityId];
    if (!cached) return true;
    return Date.now() - cached.timestamp > CACHE_TTL;
  },
}));
