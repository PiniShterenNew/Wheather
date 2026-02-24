'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { geocodeCities } from '@/shared/api/weather-api';
import type { GeocodingResult } from '@/shared/types';

export function useCitySearch() {
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const search = useCallback((q: string) => {
    setQuery(q);
    setError(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (q.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await geocodeCities(q);
        setResults(data);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
        setError('שגיאה בחיפוש. נסה שוב.');
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setSearched(false);
    setError(null);
  }, []);

  return { query, results, loading, searched, error, search, clear };
}
