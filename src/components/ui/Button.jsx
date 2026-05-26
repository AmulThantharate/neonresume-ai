import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cyberpunk Glassmorphic Glowing Button
 */
export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon
}) {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded',
    md: 'px-5 py-2.5 text-sm rounded-md shadow-[0_0_10px_rgba(0,212,170,0.1)]',
    lg: 'px-8 py-3.5 text-base rounded-lg shadow-[0_0_20px_rgba(0,212,170,0.15)]',
  };

  const variantStyles = {
    primary: 'bg-cyber-accent/10 border-cyber-accent text-cyber-neon hover:bg-cyber-accent/25 focus:ring-1 focus:ring-cyber-neon/50 neon-border-glow-hover',
    secondary: 'bg-slate-900/50 border-slate-700/80 text-cyber-text hover:bg-slate-800/80 hover:text-white focus:ring-1 focus:ring-slate-500',
    danger: 'bg-red-500/10 border-red-500/30 text-cyber-red hover:bg-red-500/25 focus:ring-1 focus:ring-red-500/50',
    ghost: 'bg-transparent border-transparent text-cyber-accent hover:bg-cyber-accent/10 hover:text-cyber-neon',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, translateY: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className={`w-4 h-4 mr-2 ${variant === 'primary' ? 'text-cyber-neon' : ''}`} />}
      {children}
    </motion.button>
  );
}
