'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showPadding?: boolean;
}

export default function MobileLayout({ 
  children, 
  className = '', 
  showPadding = true 
}: MobileLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        min-h-screen 
        ${showPadding ? 'pt-14 sm:pt-16 safe-area-top' : ''} 
        ${className}
      `}
    >
      <div className="container-mobile">
        {children}
      </div>
    </motion.div>
  );
}

// Mobile-first section wrapper
export function MobileSection({ 
  children, 
  className = '',
  background = false 
}: { 
  children: ReactNode; 
  className?: string;
  background?: boolean;
}) {
  return (
    <section className={`
      section-mobile 
      ${background ? 'bg-white/[0.02]' : ''} 
      ${className}
    `}>
      {children}
    </section>
  );
}

// Mobile-optimized grid component
export function MobileGrid({ 
  children, 
  cols = 1,
  className = '' 
}: { 
  children: ReactNode; 
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const gridClass = {
    1: 'grid-mobile-1',
    2: 'grid-mobile-2', 
    3: 'grid-mobile-3',
    4: 'mobile-grid-4'
  }[cols];

  return (
    <div className={`${gridClass} mobile-gap ${className}`}>
      {children}
    </div>
  );
}

// Mobile-optimized card component
export function MobileCard({ 
  children, 
  className = '',
  hover = true 
}: { 
  children: ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      className={`card-mobile ${className}`}
    >
      {children}
    </motion.div>
  );
}