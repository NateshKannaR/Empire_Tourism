'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Interactive3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  glow?: boolean;
  shadow?: boolean;
}

export default function Interactive3DCard({
  children,
  className = '',
  intensity = 20,
  perspective = 1000,
  glow = true,
  shadow = true
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(smoothY, [-300, 300], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [-300, 300], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          animate={{
            opacity: isHovered ? 0.4 : 0.1,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent blur-xl -z-10"
        />
      )}

      {/* Shadow effect */}
      {shadow && (
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
            y: isHovered ? 20 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent -z-20"
        />
      )}

      {/* Card content with 3D transform */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Reflective shine */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
        />

        {/* Edge glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl border border-white/10"
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Depth indicator */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-md -z-10"
        />
      </motion.div>

      {/* Interactive cursor effect */}
      {isHovered && (
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/5 blur-2xl pointer-events-none"
          style={{
            x: useTransform(smoothX, [-300, 300], [-50, 50]),
            y: useTransform(smoothY, [-300, 300], [-50, 50]),
          }}
        />
      )}
    </motion.div>
  );
}