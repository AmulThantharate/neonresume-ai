import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/**
 * Cyberpunk Toast Notification
 */
export function Toast({
  message,
  type = 'info', // 'success', 'warning', 'error', 'info'
  isVisible,
  onClose,
  duration = 4000
}) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-cyber-neon" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <XCircle className="w-5 h-5 text-cyber-red" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  const borderStyles = {
    success: 'border-cyber-accent shadow-[0_0_15px_rgba(0,212,170,0.2)]',
    warning: 'border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    error: 'border-cyber-red/40 shadow-[0_0_15px_rgba(255,62,62,0.15)]',
    info: 'border-sky-500/40 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-md border bg-cyber-bg/90 backdrop-blur-md font-mono ${borderStyles[type]}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">{icons[type]}</div>
              <p className="text-xs font-semibold tracking-wider text-slate-100 uppercase select-none">
                {message}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-full text-slate-400 hover:text-white transition-colors duration-150 border border-transparent hover:border-cyber-border/40"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
