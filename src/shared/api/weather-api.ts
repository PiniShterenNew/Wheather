// ===== Source of Truth: Weather API =====
// Single point of contact for all Open-Meteo API calls.
// No other file should call the weather API directly.

import type { WeatherData, GeocodingResult } from '../types';

const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    hourly: 'temperature_2m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_hours: '24',
    forecast_days: '7',
  });

  const res = await fetch(`${WEATHER_BASE}?${params}`);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = await res.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
    },
    hourly: data.hourly.time.map((time: string, i: number) => ({
      time,
      temperature: data.hourly.temperature_2m[i],
      weatherCode: data.hourly.weather_code[i],
    })),
    daily: data.daily.time.map((date: string, i: number) => ({
      date,
      weatherCode: data.daily.weather_code[i],
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
    })),
  };
}

export async function geocodeCities(query: string): Promise<GeocodingResult[]> {
  // Try Hebrew first, then fall back to default
  for (const lang of ['he', 'en']) {
    const params = new URLSearchParams({
      name: query,
      count: '6',
      language: lang,
      format: 'json',
    });

    const res = await fetch(`${GEOCODING_BASE}?${params}`);
    if (!res.ok) continue;
    const data = await res.json();

    if (data.results?.length) {
      return data.results.map((r: Record<string, unknown>) => ({
        id: r.id as number,
        name: r.name as string,
        country: r.country as string,
        latitude: r.latitude as number,
        longitude: r.longitude as number,
        admin1: r.admin1 as string | undefined,
      }));
    }
  }
  return [];
}

