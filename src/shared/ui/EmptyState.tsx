'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cardVariants, cardTransition } from '../lib/motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={cardTransition}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      role="status"
    >
      <div className="w-16 h-16 rounded-full glass-surface-light flex items-center justify-center mb-4">
        <Icon size={28} className="text-white/40" aria-hidden="true" />
      </div>
      <h3 className="text-title text-white/80 mb-1">{title}</h3>
      <p className="text-body text-white/40 max-w-[240px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-5 py-2.5 rounded-card glass-surface text-body text-white font-medium transition-all active:scale-95 touch-target"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
