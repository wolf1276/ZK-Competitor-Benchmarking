import { type ReactNode, type CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className = '', style, animate = true, delay = 0 }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${animate ? 'animate-fade-in-up' : ''} ${className}`}
      style={{
        ...style,
        ...(delay > 0 ? { animationDelay: `${delay}s`, opacity: 0 } : {}),
      }}
    >
      {children}
    </div>
  );
}
