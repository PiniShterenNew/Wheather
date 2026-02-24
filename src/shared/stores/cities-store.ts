// ===== Source of Truth: Cities State =====
// Single source of truth for saved cities and active city selection.
// All city operations MUST go through this store.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { City } from '../types';

const DEFAULT_CITY: City = {
  id: 'tel-aviv-default',
  name: 'תל אביב-יפו',
  country: 'ישראל',
  latitude: 32.0853,
  longitude: 34.7818,
};

interface CitiesState {
  cities: City[];
  activeCityIndex: number;

  // Actions
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
  setActiveCityIndex: (index: number) => void;
  navigateNext: () => void;
  navigatePrev: () => void;
  getActiveCity: () => City;
}

export const useCitiesStore = create<CitiesState>()(
  persist(
    (set, get) => ({
      cities: [DEFAULT_CITY],
      activeCityIndex: 0,

      addCity: (city) => {
        const { cities } = get();
        if (cities.some((c) => c.id === city.id)) return;
        set({ cities: [...cities, city], activeCityIndex: cities.length });
      },

      removeCity: (id) => {
        const { cities, activeCityIndex } = get();
        if (cities.length <= 1) return;
        const newCities = cities.filter((c) => c.id !== id);
        const newIndex = Math.min(activeCityIndex, newCities.length - 1);
        set({ cities: newCities, activeCityIndex: newIndex });
      },

      setActiveCityIndex: (index) => {
        const { cities } = get();
        if (index >= 0 && index < cities.length) {
          set({ activeCityIndex: index });
        }
      },

      navigateNext: () => {
        const { cities, activeCityIndex } = get();
        if (activeCityIndex < cities.length - 1) {
          set({ activeCityIndex: activeCityIndex + 1 });
        }
      },

      navigatePrev: () => {
        const { activeCityIndex } = get();
        if (activeCityIndex > 0) {
          set({ activeCityIndex: activeCityIndex - 1 });
        }
      },

      getActiveCity: () => {
        const { cities, activeCityIndex } = get();
        return cities[activeCityIndex] || DEFAULT_CITY;
      },
    }),
    {
      name: 'weather-cities-v2',
    }
  )
);
