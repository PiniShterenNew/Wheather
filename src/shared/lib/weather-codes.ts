// ===== Source of Truth: Weather Code Mapping =====
// WMO weather codes to Hebrew descriptions and icon names

export interface WeatherCodeInfo {
  description: string;
  icon: string;
  nightIcon?: string;
}

export const weatherCodes: Record<number, WeatherCodeInfo> = {
  0:  { description: 'בהיר', icon: 'Sun', nightIcon: 'Moon' },
  1:  { description: 'בהיר בעיקר', icon: 'Sun', nightIcon: 'Moon' },
  2:  { description: 'מעונן חלקית', icon: 'CloudSun', nightIcon: 'CloudMoon' },
  3:  { description: 'מעונן', icon: 'Cloud' },
  45: { description: 'ערפל', icon: 'CloudFog' },
  48: { description: 'ערפל קפוא', icon: 'CloudFog' },
  51: { description: 'טפטוף קל', icon: 'CloudDrizzle' },
  53: { description: 'טפטוף', icon: 'CloudDrizzle' },
  55: { description: 'טפטוף חזק', icon: 'CloudDrizzle' },
  56: { description: 'טפטוף קפוא', icon: 'CloudDrizzle' },
  57: { description: 'טפטוף קפוא חזק', icon: 'CloudDrizzle' },
  61: { description: 'גשם קל', icon: 'CloudRain' },
  63: { description: 'גשם', icon: 'CloudRain' },
  65: { description: 'גשם חזק', icon: 'CloudRain' },
  66: { description: 'גשם קפוא', icon: 'CloudRainWind' },
  67: { description: 'גשם קפוא חזק', icon: 'CloudRainWind' },
  71: { description: 'שלג קל', icon: 'CloudSnow' },
  73: { description: 'שלג', icon: 'CloudSnow' },
  75: { description: 'שלג חזק', icon: 'CloudSnow' },
  77: { description: 'פתיתי שלג', icon: 'Snowflake' },
  80: { description: 'ממטר קל', icon: 'CloudRain' },
  81: { description: 'ממטר', icon: 'CloudRain' },
  82: { description: 'ממטר חזק', icon: 'CloudRain' },
  85: { description: 'ממטר שלג קל', icon: 'CloudSnow' },
  86: { description: 'ממטר שלג חזק', icon: 'CloudSnow' },
  95: { description: 'סופת רעמים', icon: 'CloudLightning' },
  96: { description: 'סופת רעמים עם ברד', icon: 'CloudLightning' },
  99: { description: 'סופת רעמים עם ברד כבד', icon: 'CloudLightning' },
};

export function getWeatherInfo(code: number, isDay: boolean = true): WeatherCodeInfo {
  const info = weatherCodes[code] || { description: 'לא ידוע', icon: 'Cloud' };
  if (!isDay && info.nightIcon) {
    return { ...info, icon: info.nightIcon };
  }
  return info;
}

export function getWeatherGradient(code: number, isDay: boolean): string {
  if (!isDay) return 'from-indigo-950 via-slate-900 to-blue-950';

  if (code === 0 || code === 1) return 'from-sky-400 via-blue-500 to-cyan-400';
  if (code === 2) return 'from-blue-400 via-sky-500 to-slate-400';
  if (code === 3) return 'from-slate-400 via-gray-500 to-slate-500';
  if (code >= 45 && code <= 48) return 'from-gray-400 via-slate-400 to-gray-500';
  if (code >= 51 && code <= 67) return 'from-slate-500 via-blue-600 to-gray-600';
  if (code >= 71 && code <= 77) return 'from-slate-300 via-blue-200 to-gray-300';
  if (code >= 80 && code <= 82) return 'from-slate-600 via-blue-700 to-gray-700';
  if (code >= 85 && code <= 86) return 'from-slate-400 via-blue-300 to-gray-400';
  if (code >= 95) return 'from-gray-800 via-slate-700 to-indigo-900';

  return 'from-sky-400 via-blue-500 to-cyan-400';
}
