// ===== Source of Truth: UI Navigation State =====
// Controls which screen is active. Ephemeral state (not persisted).

import { create } from 'zustand';
import type { Screen } from '../types';

interface UIState {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  activeScreen: 'weather',
  setActiveScreen: (screen) => set({ activeScreen: screen }),
}));
