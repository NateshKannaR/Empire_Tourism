'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
  fade?: boolean;
  scale?: boolean;
  blur?: boolean;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0,
  fade = true,
  scale = true,
  blur = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const [isInView, setIsInView] = useState(false);

  // Parallax movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [offset + 100 * speed, offset - 100 * speed]
      : direction === 'down'
        ? [offset - 100 * speed, offset + 100 * speed]
        : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left'
      ? [offset + 100 * speed, offset - 100 * speed]
      : direction === 'right'
        ? [offset - 100 * speed, offset + 100 * speed]
        : [0, 0]
  );

  // Scale effect
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale ? [0.8, 1, 0.8] : [1, 1, 1]
  );

  // Opacity effect
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fade ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  // Blur effect
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    blur ? ['blur(20px)', 'blur(0px)', 'blur(20px)'] : ['blur(0px)', 'blur(0px)', 'blur(0px)']
  );

  // Rotation effect (subtle)
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-0.5, 0.5]
  );

  // Intersection observer for in-view detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Create transform values for depth layers
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50 * speed]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.3]);
  
  const middleY = useTransform(scrollYProgress, [0, 1], [0, 30 * speed]);
  const middleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.05, 0.2]);
  
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 10 * speed]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <motion.div
      ref={ref}
      style={{
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0,
        scale: scaleValue,
        opacity,
        filter: blurValue,
        rotate
      }}
      className={`relative ${className}`}
    >
      {/* Depth layers for 3D effect */}
      {/* Background layer */}
      <motion.div
        style={{
          y: bgY,
          opacity: bgOpacity
        }}
        className="absolute inset-0 -z-20 rounded-3xl bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 blur-3xl"
      />

      {/* Middle layer */}
      <motion.div
        style={{
          y: middleY,
          opacity: middleOpacity
        }}
        className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-primary-500/3 via-transparent to-cyan-500/3 blur-2xl"
      />

      {/* Foreground glow */}
      <motion.div
        style={{
          y: fgY,
          opacity: fgOpacity
        }}
        className="absolute inset-0 -z-5 rounded-3xl bg-gradient-to-t from-white/5 via-transparent to-transparent"
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive hover effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-white/5"
        whileHover={{ borderColor: 'rgba(255,255,255,0.1)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Multi-layer parallax component for complex scenes
interface MultiLayerParallaxProps {
  layers: {
    content: ReactNode;
    speed: number;
    className?: string;
    blur?: number;
  }[];
  className?: string;
  height?: string;
}

export function MultiLayerParallax({ layers, className = '', height = '200vh' }: MultiLayerParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Create transform values for each layer
  const layerTransforms = layers.map((layer, index) => {
    const y = useTransform(
      scrollYProgress,
      [0, 1],
      [0, -100 * layer.speed]
    );

    const opacity = useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [0, 1, 1, 0]
    );

    const blur = useTransform(
      scrollYProgress,
      [0, 1],
      [`blur(${layer.blur || 0}px)`, `blur(${(layer.blur || 0) * 2}px)`]
    );

    return { y, opacity, blur };
  });

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          style={{
            y: layerTransforms[index].y,
            opacity: layerTransforms[index].opacity,
            filter: layerTransforms[index].blur
          }}
          className={`absolute inset-0 ${layer.className || ''}`}
        >
          {layer.content}
        </motion.div>
      ))}
    </div>
  );
}

// Sticky parallax section
interface StickyParallaxProps {
  children: ReactNode;
  startOffset?: string;
  endOffset?: string;
  className?: string;
}

export function StickyParallax({ children, startOffset = "0%", endOffset = "0%", className = '' }: StickyParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`sticky top-0 h-screen ${className}`}>
      <motion.div
        style={{ scale, opacity }}
        className="h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}