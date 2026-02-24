'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useUIStore } from '@/shared/stores/ui-store';
import { useGeolocation } from '@/shared/hooks/useGeolocation';
import { useCitySearch } from '../hooks/useCitySearch';
import type { City } from '@/shared/types';

export function CitySearchBar() {
  const { query, results, loading, search, clear } = useCitySearch();
  const addCity = useCitiesStore((s) => s.addCity);
  const setActiveScreen = useUIStore((s) => s.setActiveScreen);
  const { loading: geoLoading, getCurrentPosition } = useGeolocation();

  const handleSelect = (result: { id: number; name: string; country: string; latitude: number; longitude: number }) => {
    const city: City = {
      id: `city-${result.id}`,
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    };
    addCity(city);
    clear();
    setActiveScreen('weather');
  };

  const handleLocation = async () => {
    try {
      const { lat, lon } = await getCurrentPosition();
      const { geocodeCities } = await import('@/shared/api/weather-api');
      // Search for nearest city using reverse-like approach
      const res = await geocodeCities(`${lat.toFixed(2)},${lon.toFixed(2)}`);
      if (res.length > 0) {
        handleSelect(res[0]);
      } else {
        // Fallback: add with coordinates as name
        addCity({
          id: `loc-${Date.now()}`,
          name: 'המיקום שלי',
          country: '',
          latitude: lat,
          longitude: lon,
        });
        setActiveScreen('weather');
      }
    } catch {
      // Error handled in useGeolocation
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <GlassCard intensity="medium" className="flex-1 flex items-center gap-2 px-4 py-3">
          <Search size={18} className="text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="חיפוש עיר..."
            className="bg-transparent text-white placeholder-white/30 outline-none w-full text-sm"
            dir="rtl"
          />
          {loading && (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader2 size={16} className="text-white/40" />
            </motion.div>
          )}
        </GlassCard>

        <button
          onClick={handleLocation}
          disabled={geoLoading}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/15 transition-all active:scale-95"
        >
          {geoLoading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              <Loader2 size={20} className="text-white/60" />
            </motion.div>
          ) : (
            <MapPin size={20} className="text-white/70" />
          )}
        </button>
      </div>

      {/* Autocomplete Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-full mt-2 z-20"
          >
            <GlassCard intensity="strong" className="overflow-hidden divide-y divide-white/10">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-white/10 transition-colors"
                >
                  <MapPin size={16} className="text-white/40 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">{result.name}</p>
                    <p className="text-xs text-white/40 truncate">
                      {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
                    </p>
                  </div>
                </button>
              ))}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
