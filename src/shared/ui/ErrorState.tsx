'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';
import { cardVariants, cardTransition } from '../lib/motion';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  type?: 'network' | 'generic';
}

export function ErrorState({ message, onRetry, type = 'generic' }: ErrorStateProps) {
  const Icon = type === 'network' ? WifiOff : AlertTriangle;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={cardTransition}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      role="alert"
    >
      <div className="w-16 h-16 rounded-full glass-surface-light flex items-center justify-center mb-4">
        <Icon size={28} className="text-amber-300/70" aria-hidden="true" />
      </div>
      <h3 className="text-title text-white/80 mb-1">
        {type === 'network' ? 'אין חיבור לאינטרנט' : 'משהו השתבש'}
      </h3>
      <p className="text-body text-white/40 max-w-[260px]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-card glass-surface text-body text-white font-medium transition-all active:scale-95 touch-target"
        >
          <RefreshCw size={16} aria-hidden="true" />
          נסה שוב
        </button>
      )}
    </motion.div>
  );
}
