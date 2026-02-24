'use client';

import { motion } from 'framer-motion';
import { Thermometer, Eye, MapPin, Info, Database } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { useSettingsStore } from '@/shared/stores/settings-store';
import { useCitiesStore } from '@/shared/stores/cities-store';
import type { TemperatureUnit } from '@/shared/types';

function SettingsToggle({
  label,
  description,
  icon: Icon,
  value,
  onChange,
}: {
  label: string;
  description: string;
  icon: typeof Eye;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon size={18} className="text-white/60" />
        </div>
        <div>
          <p className="text-sm text-white font-medium">{label}</p>
          <p className="text-xs text-white/40">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          value ? 'bg-blue-500' : 'bg-white/20'
        }`}
      >
        <motion.div
          className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
          animate={{ left: value ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

function UnitSelector({
  value,
  onChange,
}: {
  value: TemperatureUnit;
  onChange: (u: TemperatureUnit) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <Thermometer size={18} className="text-white/60" />
        </div>
        <div>
          <p className="text-sm text-white font-medium">יחידת טמפרטורה</p>
          <p className="text-xs text-white/40">צלזיוס או פרנהייט</p>
        </div>
      </div>
      <div className="flex rounded-xl overflow-hidden border border-white/15">
        <button
          onClick={() => onChange('celsius')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            value === 'celsius'
              ? 'bg-white/20 text-white'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => onChange('fahrenheit')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            value === 'fahrenheit'
              ? 'bg-white/20 text-white'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export function SettingsScreen() {
  const {
    temperatureUnit,
    showFeelsLike,
    autoLocation,
    setTemperatureUnit,
    toggleFeelsLike,
    toggleAutoLocation,
  } = useSettingsStore();

  const citiesCount = useCitiesStore((s) => s.cities.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 pb-4"
    >
      <h1 className="text-xl font-bold text-white">הגדרות</h1>

      {/* Preferences */}
      <GlassCard intensity="medium" className="p-4">
        <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
          העדפות
        </h2>
        <div className="divide-y divide-white/10">
          <UnitSelector value={temperatureUnit} onChange={setTemperatureUnit} />
          <SettingsToggle
            label="הצג מרגיש כמו"
            description="הצגת טמפרטורה מורגשת"
            icon={Eye}
            value={showFeelsLike}
            onChange={toggleFeelsLike}
          />
          <SettingsToggle
            label="מיקום אוטומטי"
            description="שימוש במיקום הנוכחי בהפעלה"
            icon={MapPin}
            value={autoLocation}
            onChange={toggleAutoLocation}
          />
        </div>
      </GlassCard>

      {/* Storage Info */}
      <GlassCard intensity="medium" className="p-4">
        <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
          אחסון
        </h2>
        <div className="flex items-center gap-3 py-2">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Database size={18} className="text-white/60" />
          </div>
          <div>
            <p className="text-sm text-white">אחסון מקומי</p>
            <p className="text-xs text-white/40">{citiesCount} ערים שמורות</p>
          </div>
        </div>
      </GlassCard>

      {/* About */}
      <GlassCard intensity="light" className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Info size={18} className="text-white/60" />
          </div>
          <div>
            <p className="text-sm text-white">Weather App</p>
            <p className="text-xs text-white/40">
              גרסה 2.0 • Next.js • נתוני מזג אוויר מ-Open-Meteo
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
