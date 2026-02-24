'use client';

import { motion } from 'framer-motion';
import {
  Thermometer, Eye, MapPin, Info, Database,
  type LucideIcon,
} from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { useSettingsStore } from '@/shared/stores/settings-store';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useToast } from '@/shared/ui/Toast';
import { screenVariants, screenTransition, springBouncy } from '@/shared/lib/motion';
import type { TemperatureUnit } from '@/shared/types';

// ===== Reusable Settings Primitives =====

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassCard intensity="medium" className="p-4">
      <h2 className="text-caption font-semibold text-white/40 uppercase tracking-wider mb-2">
        {title}
      </h2>
      <div className="divide-y divide-white/[0.08]">{children}</div>
    </GlassCard>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon: LucideIcon;
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-card bg-white/10 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-white/50" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-body text-white font-medium truncate">{label}</p>
          {description && (
            <p className="text-caption text-white/35 truncate">{description}</p>
          )}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={onChange}
      className={`relative w-12 h-7 rounded-pill transition-colors touch-target ${
        value ? 'bg-blue-500' : 'bg-white/20'
      }`}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
        animate={{ left: value ? 22 : 2 }}
        transition={springBouncy}
      />
    </button>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex rounded-card overflow-hidden border border-white/[0.12]"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3.5 py-2 text-caption font-medium transition-colors touch-target ${
            value === opt.value
              ? 'bg-white/20 text-white'
              : 'text-white/35 hover:text-white/55'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ===== Settings Screen =====

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
  const toast = useToast((s) => s.show);

  const handleUnitChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    toast(unit === 'celsius' ? 'יחידה: צלזיוס' : 'יחידה: פרנהייט');
  };

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={screenTransition}
      className="flex flex-col gap-4 pb-4"
    >
      <h1 className="text-title-lg text-white">הגדרות</h1>

      {/* Units */}
      <SettingsSection title="יחידות">
        <SettingsRow icon={Thermometer} label="יחידת טמפרטורה" description="צלזיוס או פרנהייט">
          <SegmentedControl
            options={[
              { value: 'celsius' as TemperatureUnit, label: '°C' },
              { value: 'fahrenheit' as TemperatureUnit, label: '°F' },
            ]}
            value={temperatureUnit}
            onChange={handleUnitChange}
            ariaLabel="בחירת יחידת טמפרטורה"
          />
        </SettingsRow>
      </SettingsSection>

      {/* Display */}
      <SettingsSection title="תצוגה">
        <SettingsRow icon={Eye} label="הצג מרגיש כמו" description="טמפרטורה מורגשת במסך הראשי">
          <Toggle value={showFeelsLike} onChange={toggleFeelsLike} label="הצג מרגיש כמו" />
        </SettingsRow>
      </SettingsSection>

      {/* Location */}
      <SettingsSection title="מיקום">
        <SettingsRow icon={MapPin} label="מיקום אוטומטי" description="שימוש במיקום בהפעלה">
          <Toggle value={autoLocation} onChange={toggleAutoLocation} label="מיקום אוטומטי" />
        </SettingsRow>
      </SettingsSection>

      {/* Storage */}
      <SettingsSection title="אחסון">
        <SettingsRow icon={Database} label="אחסון מקומי" description={`${citiesCount} ערים שמורות`}>
          <span className="text-caption text-white/25">localStorage</span>
        </SettingsRow>
      </SettingsSection>

      {/* About */}
      <GlassCard intensity="light" className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-card bg-white/10 flex items-center justify-center shrink-0">
            <Info size={18} className="text-white/50" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-body text-white font-medium">Weather App</p>
            <p className="text-caption text-white/35">
              גרסה 2.0 &middot; Next.js &middot; Open-Meteo API
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
