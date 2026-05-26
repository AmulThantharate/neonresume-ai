import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cyberpunk Terminal Glassmorphism Card
 */
export function Card({
  children,
  title,
  headerActions,
  className = '',
  glow = false,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`glassmorphism rounded-lg overflow-hidden shadow-2xl relative ${
        glow ? 'neon-border-glow' : 'border-cyber-border'
      } ${className}`}
    >
      {/* Decorative top green scanner beam (subtle gradient line) */}
      <div className="h-[2px] w-full bg-gradient-to-right bg-gradient-to-r from-transparent via-cyber-accent to-transparent opacity-80" />

      {/* Card Header with developer terminal buttons */}
      {title && (
        <div className="px-5 py-3.5 border-b border-cyber-border flex items-center justify-between bg-cyber-bg/40 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            {/* Terminal control nodes */}
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/60 inline-block border border-cyber-red/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent/60 inline-block border border-cyber-accent/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-neon/60 inline-block border border-cyber-neon/80" />
            </div>
            
            <h3 className="text-xs uppercase font-semibold font-mono tracking-widest text-cyber-accent pl-1.5 border-l border-cyber-border/40 select-none">
              {title}
            </h3>
          </div>
          
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6 relative z-10 bg-cyber-bg/25 backdrop-blur-cyber">
        {children}
      </div>

      {/* Digital terminal static glitch decoration */}
      <div className="absolute top-1 right-2 text-[8px] text-cyber-accent/20 select-none pointer-events-none tracking-widest uppercase">
        SYS_STATUS: COMPLIANT
      </div>
    </motion.div>
  );
}
