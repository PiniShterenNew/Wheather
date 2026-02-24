'use client';

import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog,
  CloudDrizzle, CloudRain, CloudRainWind, CloudSnow,
  Snowflake, CloudLightning,
  type LucideIcon,
} from 'lucide-react';
import { getWeatherInfo } from '../lib/weather-codes';

const iconMap: Record<string, LucideIcon> = {
  Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog,
  CloudDrizzle, CloudRain, CloudRainWind, CloudSnow,
  Snowflake, CloudLightning,
};

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function WeatherIcon({ code, isDay = true, ...props }: WeatherIconProps) {
  const info = getWeatherInfo(code, isDay);
  const IconComponent = iconMap[info.icon] || Cloud;
  return <IconComponent aria-hidden="true" {...props} />;
}
