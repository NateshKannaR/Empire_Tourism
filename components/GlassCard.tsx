import React, { ReactNode } from 'react';

interface GlassCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ title, children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass-card rounded-2xl p-6 backdrop-blur-xl ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-100">{title}</h3>
      )}
      {children}
    </div>
  );
}
