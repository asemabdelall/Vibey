import React from 'react';
import logoImg from '../../assets/logo.png';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  className?: string;
  stacked?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  stacked = false,
}) => {
  const sizeClasses = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl tracking-tight',
    lg: 'text-4xl tracking-tighter',
    hero: 'text-4xl sm:text-5xl tracking-tighter font-black',
  };

  const imageSizes = {
    sm: 'w-7 h-auto',
    md: 'w-9 h-auto',
    lg: 'w-14 h-auto',
    hero: 'w-20 sm:w-24 h-auto',
  };

  const isHeroStacked = stacked || size === 'hero';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div
        className={`flex items-center justify-center ${
          isHeroStacked ? 'flex-col gap-3' : 'flex-row gap-2.5'
        }`}
      >
        {/* 3D Glossy Wave Logo Image */}
        <div className="relative flex items-center justify-center shrink-0">
          {/* Subtle Ambient Backglow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-xl pointer-events-none" />

          <img
            src={logoImg}
            alt="Vibey"
            className={`${imageSizes[size]} object-contain drop-shadow-[0_4px_16px_rgba(168,85,247,0.4)] relative z-10 transition-transform duration-200 hover:scale-105`}
            draggable={false}
          />
        </div>

        {/* Wordmark Typography */}
        <span
          className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 font-['Plus_Jakarta_Sans',sans-serif] leading-none ${sizeClasses[size]}`}
        >
          Vibey
        </span>
      </div>

      {showTagline && (
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-400 mt-2 font-medium">
          Find your vibe
        </span>
      )}
    </div>
  );
};
