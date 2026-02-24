'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { create } from 'zustand';

interface ToastState {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
}

export const useToast = create<ToastState>()((set) => ({
  message: null,
  show: (message) => {
    set({ message });
    setTimeout(() => set({ message: null }), 2500);
  },
  hide: () => set({ message: null }),
}));

export function ToastContainer() {
  const { message, hide } = useToast();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-24 inset-x-0 z-toast flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-card glass-surface-strong shadow-lg max-w-sm">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
            <span className="text-body text-white flex-1">{message}</span>
            <button
              onClick={hide}
              aria-label="סגור הודעה"
              className="text-white/40 hover:text-white/70 transition-colors touch-target flex items-center justify-center"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
