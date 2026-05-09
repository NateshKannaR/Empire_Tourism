'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MobileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function MobileButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  className = ''
}: MobileButtonProps) {
  const baseClasses = 'btn-mobile transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
    secondary: 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-sm sm:text-base min-h-[44px] sm:min-h-[48px]',
    lg: 'px-8 py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[52px]'
  };

  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`${iconSize[size]} ${children ? 'mr-2' : ''}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`${iconSize[size]} ${children ? 'ml-2' : ''}`} />
      )}
    </motion.button>
  );
}

// Floating Action Button for mobile
export function MobileFAB({
  icon: Icon,
  onClick,
  className = ''
}: {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-gradient-to-r from-violet-500 to-pink-500
        text-white shadow-2xl shadow-violet-500/30
        flex items-center justify-center
        safe-area-bottom
        ${className}
      `}
    >
      <Icon className="w-6 h-6" />
    </motion.button>
  );
}