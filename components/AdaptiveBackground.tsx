'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WeatherType, ActivityType } from '@/lib/types';

interface AdaptiveBackgroundProps {
  weather: WeatherType;
  activities?: ActivityType[];
  duration?: number;
}

export default function AdaptiveBackground({ weather, activities = [], duration = 7 }: AdaptiveBackgroundProps) {
  const [windowWidth, setWindowWidth] = useState(1200); // Default for SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const weatherThemes = {
    sunny: {
      gradient: 'from-amber-950/40 via-gray-900 to-gray-950',
      glow1: 'bg-amber-500/15',
      glow2: 'bg-yellow-500/10',
      overlay: 'bg-gradient-to-br from-amber-900/5 via-transparent to-transparent',
    },
    rainy: {
      gradient: 'from-blue-950/40 via-gray-900 to-gray-950',
      glow1: 'bg-blue-500/12',
      glow2: 'bg-cyan-500/8',
      overlay: 'bg-gradient-to-b from-blue-900/8 via-transparent to-transparent',
    },
    cold: {
      gradient: 'from-indigo-950/40 via-gray-900 to-gray-950',
      glow1: 'bg-blue-400/12',
      glow2: 'bg-cyan-400/10',
      overlay: 'bg-gradient-to-br from-blue-800/6 via-transparent to-transparent',
    },
    hot: {
      gradient: 'from-orange-950/40 via-gray-900 to-gray-950',
      glow1: 'bg-orange-500/15',
      glow2: 'bg-red-500/12',
      overlay: 'bg-gradient-to-br from-orange-900/8 via-transparent to-transparent',
    },
  };

  const activityAccents = {
    beach: 'bg-teal-500/8',
    trekking: 'bg-green-500/8',
    business: 'bg-slate-500/8',
    urban: 'bg-purple-500/8',
    adventure: 'bg-emerald-500/8',
  };

  const theme = weatherThemes[weather];
  const primaryActivity = activities[0];
  const activityAccent = primaryActivity ? activityAccents[primaryActivity] : '';
  
  const intensityScale = duration > 10 ? 1.2 : duration < 3 ? 0.7 : 1;
  const baseGlowSize = 400 * intensityScale;
  const isMobile = windowWidth < 768;
  const glowSize = isMobile ? Math.min(baseGlowSize, windowWidth * 0.6) : baseGlowSize;
  const rainDropCount = isMobile ? 10 : 20;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base animated gradient */}
      <motion.div
        key={`base-${weather}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} animate-gradient`}
      />

      {/* Weather overlay */}
      <motion.div
        key={`overlay-${weather}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className={`absolute inset-0 ${theme.overlay}`}
      />

      {/* Primary glow orb */}
      <motion.div
        key={`glow1-${weather}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
        className={`absolute top-1/4 left-1/4 rounded-full blur-2xl sm:blur-3xl animate-pulse-glow ${theme.glow1}`}
        style={{ 
          width: glowSize, 
          height: glowSize 
        }}
      />

      {/* Secondary glow orb */}
      <motion.div
        key={`glow2-${weather}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`absolute bottom-1/4 right-1/4 rounded-full blur-2xl sm:blur-3xl animate-pulse-glow ${theme.glow2}`}
        style={{ 
          width: glowSize * 0.8, 
          height: glowSize * 0.8, 
          animationDelay: '2s' 
        }}
      />

      {/* Activity accent layer */}
      <AnimatePresence>
        {activityAccent && (
          <motion.div
            key={`activity-${primaryActivity}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 ${activityAccent}`}
          />
        )}
      </AnimatePresence>

      {/* Rain effect for rainy weather */}
      {weather === 'rainy' && isMounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 opacity-20"
        >
          {[...Array(rainDropCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
              style={{
                left: `${(i * 10) % 100}%`,
                height: isMobile ? '60px' : '100px',
              }}
              animate={{
                y: ['0vh', '100vh'],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Heat shimmer for hot weather */}
      {weather === 'hot' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}

      {/* Frosted effect for cold weather */}
      {weather === 'cold' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400/3 via-transparent to-cyan-400/3"
        />
      )}
    </div>
  );
}
