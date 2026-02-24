'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  intensity?: 'light' | 'medium' | 'strong';
}

const intensityMap = {
  light: 'bg-white/10 backdrop-blur-md border-white/10',
  medium: 'bg-white/15 backdrop-blur-xl border-white/15',
  strong: 'bg-white/20 backdrop-blur-2xl border-white/20',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = 'medium', className = '', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`rounded-2xl border ${intensityMap[intensity]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
