'use client';

import { motion } from 'framer-motion';
import { CloudSun, MapPin, Settings } from 'lucide-react';
import { useUIStore } from '../stores/ui-store';
import { springSnappy } from '../lib/motion';
import type { Screen } from '../types';

const navItems: { id: Screen; label: string; ariaLabel: string; Icon: typeof CloudSun }[] = [
  { id: 'weather', label: 'מזג אוויר', ariaLabel: 'מסך מזג אוויר', Icon: CloudSun },
  { id: 'cities', label: 'ערים', ariaLabel: 'מסך ערים', Icon: MapPin },
  { id: 'settings', label: 'הגדרות', ariaLabel: 'מסך הגדרות', Icon: Settings },
];

export function BottomNav() {
  const { activeScreen, setActiveScreen } = useUIStore();

  return (
    <nav
      role="navigation"
      aria-label="ניווט ראשי"
      className="fixed bottom-0 inset-x-0 z-nav pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto max-w-lg">
        <div className="mx-3 mb-3 rounded-card-lg glass-surface-strong overflow-hidden">
          <div className="flex items-center justify-around py-1.5">
            {navItems.map(({ id, label, ariaLabel, Icon }) => {
              const isActive = activeScreen === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveScreen(id)}
                  aria-label={ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative flex flex-col items-center gap-0.5 px-6 py-2.5 rounded-xl transition-colors touch-target"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/15 rounded-xl"
                      transition={springSnappy}
                    />
                  )}
                  <Icon
                    size={22}
                    aria-hidden="true"
                    className={`relative z-10 transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-white/50'
                    }`}
                  />
                  <span
                    className={`relative z-10 text-micro transition-colors duration-150 ${
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
