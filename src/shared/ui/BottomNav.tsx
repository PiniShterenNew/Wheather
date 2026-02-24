'use client';

import { motion } from 'framer-motion';
import { CloudSun, MapPin, Settings } from 'lucide-react';
import { useUIStore } from '../stores/ui-store';
import type { Screen } from '../types';

const navItems: { id: Screen; label: string; Icon: typeof CloudSun }[] = [
  { id: 'weather', label: 'מזג אוויר', Icon: CloudSun },
  { id: 'cities', label: 'ערים', Icon: MapPin },
  { id: 'settings', label: 'הגדרות', Icon: Settings },
];

export function BottomNav() {
  const { activeScreen, setActiveScreen } = useUIStore();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-lg">
        <div className="mx-3 mb-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 overflow-hidden">
          <div className="flex items-center justify-around py-2">
            {navItems.map(({ id, label, Icon }) => {
              const isActive = activeScreen === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveScreen(id)}
                  className="relative flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/15 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-white' : 'text-white/50'
                    }`}
                  />
                  <span
                    className={`relative z-10 text-[10px] font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
