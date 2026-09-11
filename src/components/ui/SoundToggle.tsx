import { Volume2, VolumeX } from 'lucide-react';
import React from 'react';
import { useGameStore } from '../../store/game-store';

export const SoundToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const toggleSound = useGameStore((s) => s.toggleSound);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`inline-flex items-center justify-center p-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm min-h-[36px] min-w-[36px] ${className}`}
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-purple-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-zinc-500" />
      )}
    </button>
  );
};
