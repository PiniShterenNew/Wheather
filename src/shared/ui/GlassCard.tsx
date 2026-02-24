'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  intensity?: 'light' | 'medium' | 'strong';
}

const surfaceClass = {
  light: 'glass-surface-light',
  medium: 'glass-surface',
  strong: 'glass-surface-strong',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = 'medium', className = '', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`rounded-card-lg ${surfaceClass[intensity]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
