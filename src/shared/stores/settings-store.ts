// ===== Source of Truth: App Settings =====
// Single source of truth for all user preferences.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemperatureUnit } from '../types';

interface SettingsState {
  temperatureUnit: TemperatureUnit;
  showFeelsLike: boolean;
  autoLocation: boolean;

  // Actions
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  toggleFeelsLike: () => void;
  toggleAutoLocation: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      temperatureUnit: 'celsius',
      showFeelsLike: true,
      autoLocation: false,

      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
      toggleFeelsLike: () => set((s) => ({ showFeelsLike: !s.showFeelsLike })),
      toggleAutoLocation: () => set((s) => ({ autoLocation: !s.autoLocation })),
    }),
    {
      name: 'weather-settings-v2',
    }
  )
);
