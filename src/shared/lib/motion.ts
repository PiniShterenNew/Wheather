// ===== Shared Animation Variants =====
// Single source of truth for animation configs used across the app.

import type { Variants, Transition } from 'framer-motion';

// Spring configs
export const springSnappy: Transition = { type: 'spring', stiffness: 400, damping: 28 };
export const springGentle: Transition = { type: 'spring', stiffness: 300, damping: 25 };
export const springBouncy: Transition = { type: 'spring', stiffness: 500, damping: 30 };

// Screen transition
export const screenVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};
export const screenTransition: Transition = { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] };

// Card entrance
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};
export const cardTransition: Transition = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] };

// List item stagger
export const listItemVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80, height: 0 },
};
export function listItemTransition(index: number): Transition {
  return { ...springGentle, delay: index * 0.04 };
}

// Fade
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
