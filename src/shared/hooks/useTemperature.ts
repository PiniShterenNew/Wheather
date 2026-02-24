'use client';

import { useCallback } from 'react';
import { useSettingsStore } from '../stores/settings-store';

export function useTemperature() {
  const unit = useSettingsStore((s) => s.temperatureUnit);

  const format = useCallback(
    (celsius: number): string => {
      if (unit === 'fahrenheit') {
        return `${Math.round(celsius * 9 / 5 + 32)}°F`;
      }
      return `${Math.round(celsius)}°`;
    },
    [unit]
  );

  return { format, unit };
}
