'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';

interface AdvancedProgressProps {
  value: number;
  max: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'bar' | 'radial';
  showAnimation?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showStats?: boolean;
}

export default function AdvancedProgress({
  value,
  max,
  label = 'Progress',
  size = 'md',
  variant = 'circle',
  showAnimation = true,
  color = 'primary',
  showStats = true
}: AdvancedProgressProps) {
  const percentage = (value / max) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const sizeClasses = {
    sm: variant === 'circle' ? 'w-32 h-32' : 'h-4',
    md: variant === 'circle' ? 'w-64 h-64' : 'h-6',
    lg: variant === 'circle' ? 'w-96 h-96' : 'h-8'
  };

  const colorClasses = {
    primary: {
      bg: 'bg-amber-500',
      gradient: 'from-amber-400 via-amber-500 to-amber-600',
      text: 'text-amber-400',
      light: 'bg-amber-500/20'
    },
    success: {
      bg: 'bg-emerald-500',
      gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
      text: 'text-emerald-400',
      light: 'bg-emerald-500/20'
    },
    warning: {
      bg: 'bg-amber-500',
      gradient: 'from-amber-400 via-amber-500 to-amber-600',
      text: 'text-amber-400',
      light: 'bg-amber-500/20'
    },
    danger: {
      bg: 'bg-rose-500',
      gradient: 'from-rose-400 via-rose-500 to-rose-600',
      text: 'text-rose-400',
      light: 'bg-rose-500/20'
    }
  };

  const currentColor = colorClasses[color];

  // For interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const CircleProgress = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${sizeClasses[size]} rounded-full`}
      onMouseMove={handleMouseMove}
    >
      {/* Background circle */}
      <div className="absolute inset-0 rounded-full bg-gray-900/50" />
      
      {/* Progress ring */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-800"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: clampedPercentage / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color === 'primary' ? '#f59e0b' : 
                                        color === 'success' ? '#10b981' : 
                                        color === 'warning' ? '#f59e0b' : '#f43f5e'} />
            <stop offset="100%" stopColor={color === 'primary' ? '#f97316' : 
                                          color === 'success' ? '#34d399' : 
                                          color === 'warning' ? '#f97316' : '#fb7185'} />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className={`text-4xl font-bold ${currentColor.text}`}>
            {Math.round(clampedPercentage)}%
          </div>
          <div className="text-sm text-gray-400 mt-1">{label}</div>
          {showStats && (
            <div className="text-xs text-gray-500 mt-2">
              {value} / {max}
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating particles */}
      {showAnimation && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${currentColor.bg}`}
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * 45) * Math.PI / 180) * 120],
                y: [0, Math.sin((i * 45) * Math.PI / 180) * 120],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  const BarProgress = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className={`text-sm font-bold ${currentColor.text}`}>
          {Math.round(clampedPercentage)}%
        </span>
      </div>
      
      <div className="relative">
        {/* Background bar */}
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${currentColor.gradient} relative`}
          >
            {/* Shimmer effect */}
            {showAnimation && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              />
            )}
          </motion.div>
        </div>

        {/* Milestone markers */}
        {showStats && (
          <div className="flex justify-between mt-1">
            {[0, 25, 50, 75, 100].map((milestone) => (
              <div
                key={milestone}
                className={`text-xs ${clampedPercentage >= milestone ? currentColor.text : 'text-gray-600'}`}
              >
                {milestone}%
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats row */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Target: {max}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Current: {value}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const RadialProgress = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${sizeClasses[size]} rounded-full`}
    >
      {/* Multiple concentric rings */}
      {[0.7, 0.8, 0.9, 1].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-gray-800/30"
          style={{ scale }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Main progress ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-900/50"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="url(#radialGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={1000 - (clampedPercentage / 100) * 1000}
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 1000 - (clampedPercentage / 100) * 1000 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <radialGradient id="radialGradient">
              <stop offset="0%" stopColor={currentColor.bg.replace('bg-', '#').split('/')[0]} />
              <stop offset="100%" stopColor={currentColor.bg.replace('bg-', '#').split('/')[0] + '80'} />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: clampedPercentage === 100 ? [1, 1.2, 1] : 1,
          }}
          transition={{
            scale: clampedPercentage === 100 
              ? { duration: 0.5, repeat: Infinity }
              : { duration: 0 }
          }}
        >
          {clampedPercentage === 100 ? (
            <CheckCircle2 className={`w-12 h-12 ${currentColor.text}`} />
          ) : (
            <Zap className={`w-12 h-12 ${currentColor.text}`} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative">
      {variant === 'circle' && <CircleProgress />}
      {variant === 'bar' && <BarProgress />}
      {variant === 'radial' && <RadialProgress />}
    </div>
  );
}