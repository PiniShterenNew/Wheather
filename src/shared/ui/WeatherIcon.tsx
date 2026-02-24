'use client';

import * as LucideIcons from 'lucide-react';
import { getWeatherInfo } from '../lib/weather-codes';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function WeatherIcon({ code, isDay = true, ...props }: WeatherIconProps) {
  const info = getWeatherInfo(code, isDay);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[info.icon] as React.ComponentType<any> | undefined;

  if (!IconComponent) {
    return <LucideIcons.Cloud {...props} />;
  }

  return <IconComponent {...props} />;
}
