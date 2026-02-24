'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2, X, SearchX } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { useCitiesStore } from '@/shared/stores/cities-store';
import { useUIStore } from '@/shared/stores/ui-store';
import { useGeolocation } from '@/shared/hooks/useGeolocation';
import { useToast } from '@/shared/ui/Toast';
import { geocodeCities } from '@/shared/api/weather-api';
import { useCitySearch } from '../hooks/useCitySearch';
import type { City } from '@/shared/types';

export function CitySearchBar() {
  const { query, results, loading, searched, error, search, clear } = useCitySearch();
  const addCity = useCitiesStore((s) => s.addCity);
  const cities = useCitiesStore((s) => s.cities);
  const setActiveScreen = useUIStore((s) => s.setActiveScreen);
  const { loading: geoLoading, getCurrentPosition } = useGeolocation();
  const toast = useToast((s) => s.show);

  const handleSelect = (result: { id: number; name: string; country: string; latitude: number; longitude: number }) => {
    const cityId = `city-${result.id}`;
    // Duplicate check
    if (cities.some((c) => c.id === cityId)) {
      toast(`${result.name} כבר נמצאת ברשימה`);
      clear();
      return;
    }
    const city: City = {
      id: cityId,
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    };
    addCity(city);
    clear();
    toast(`${result.name} נוספה`);
    setActiveScreen('weather');
  };

  const handleLocation = async () => {
    try {
      const { lat, lon } = await getCurrentPosition();
      const res = await geocodeCities(`${lat.toFixed(2)},${lon.toFixed(2)}`);
      if (res.length > 0) {
        handleSelect(res[0]);
      } else {
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
      // Error displayed in geolocation hook
    }
  };

  const noResults = searched && results.length === 0 && !loading && !error;

  return (
    <div className="relative">
      <div className="flex gap-2">
        {/* Search input */}
        <GlassCard intensity="medium" className="flex-1 flex items-center gap-2 px-4 py-3">
          <Search size={18} className="text-white/40 shrink-0" aria-hidden="true" />
          <label htmlFor="city-search" className="sr-only">חיפוש עיר</label>
          <input
            id="city-search"
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="חיפוש עיר..."
            className="bg-transparent text-white placeholder-white/30 outline-none w-full text-body focus:placeholder-white/40"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={clear}
              aria-label="נקה חיפוש"
              className="text-white/30 hover:text-white/60 transition-colors touch-target flex items-center justify-center"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              role="status"
              aria-label="מחפש..."
            >
              <Loader2 size={16} className="text-white/40" aria-hidden="true" />
            </motion.div>
          )}
        </GlassCard>

        {/* Location button */}
        <button
          onClick={handleLocation}
          disabled={geoLoading}
          aria-label="השתמש במיקום הנוכחי"
          className="flex items-center justify-center w-12 h-12 rounded-card-lg glass-surface transition-all active:scale-95 touch-target"
        >
          {geoLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              role="status"
              aria-label="מאתר מיקום..."
            >
              <Loader2 size={20} className="text-white/60" aria-hidden="true" />
            </motion.div>
          ) : (
            <MapPin size={20} className="text-white/70" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {(results.length > 0 || noResults || error) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute inset-x-0 top-full mt-2 z-dropdown"
          >
            <GlassCard intensity="strong" className="overflow-hidden">
              {error && (
                <div className="px-4 py-3 text-center">
                  <p className="text-caption text-amber-300/70">{error}</p>
                </div>
              )}

              {noResults && (
                <div className="flex flex-col items-center gap-2 px-4 py-6">
                  <SearchX size={24} className="text-white/30" aria-hidden="true" />
                  <p className="text-body text-white/40">לא נמצאו תוצאות</p>
                  <p className="text-caption text-white/25">נסה שם עיר אחר</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="divide-y divide-white/[0.08]" role="listbox" aria-label="תוצאות חיפוש">
                  {results.map((result) => {
                    const isDuplicate = cities.some((c) => c.id === `city-${result.id}`);
                    return (
                      <button
                        key={result.id}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleSelect(result)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-start hover:bg-white/[0.08] transition-colors touch-target"
                      >
                        <MapPin size={16} className="text-white/30 shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-body text-white font-medium truncate">{result.name}</p>
                          <p className="text-caption text-white/35 truncate">
                            {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
                          </p>
                        </div>
                        {isDuplicate && (
                          <span className="text-micro text-white/25 shrink-0">נוספה</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
