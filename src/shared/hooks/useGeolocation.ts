'use client';

import { useState, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
  });

  const getCurrentPosition = useCallback((): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'הדפדפן לא תומך במיקום';
        setState({ loading: false, error: err });
        reject(new Error(err));
        return;
      }

      setState({ loading: true, error: null });

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState({ loading: false, error: null });
          resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
          const msg = err.code === 1 ? 'הגישה למיקום נדחתה' : 'שגיאה בקבלת מיקום';
          setState({ loading: false, error: msg });
          reject(new Error(msg));
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    });
  }, []);

  return { ...state, getCurrentPosition };
}
