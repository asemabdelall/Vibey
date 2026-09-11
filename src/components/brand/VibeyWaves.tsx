import React from 'react';

export const VibeyWaves: React.FC<{ opacity?: number }> = ({ opacity = 0.5 }) => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden select-none -z-10"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Top subtle ambient glow spot */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-b from-purple-600/15 via-pink-600/10 to-transparent blur-[80px]" />

      {/* Center atmospheric frequency glow */}
      <div className="absolute top-[40%] -left-[20%] w-[320px] h-[320px] rounded-full bg-violet-600/8 blur-[100px]" />
      <div className="absolute top-[50%] -right-[20%] w-[320px] h-[320px] rounded-full bg-fuchsia-600/8 blur-[100px]" />

      {/* Subtle fine noise overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
    </div>
  );
};
