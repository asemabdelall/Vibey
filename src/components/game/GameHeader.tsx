import { motion } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import React, { useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

export const GameHeader: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const mode = useGameStore((s) => s.mode);
  const currentIndex = useGameStore((s) => s.currentIndex);
  const sessionLength = useGameStore((s) => s.sessionLength);
  const exitSession = useGameStore((s) => s.exitSession);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const turnMode = useGameStore((s) => s.turnMode);
  const currentTurnPlayer = useGameStore((s) => s.currentTurnPlayer);

  const t = TRANSLATIONS[language];
  const [showConfirm, setShowConfirm] = useState(false);

  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / sessionLength) * 100));
  const modeTitle = t.modes[mode]?.title || 'Vibey';

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-safe pb-2 px-4 select-none">
        <div className="flex items-center justify-between">
          {/* Exit (X) Button */}
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-150 active:scale-90"
            aria-label="Exit Game"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Mode & Turn Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-zinc-300 tracking-wide">
              {modeTitle}
            </span>
            {turnMode === 'alternating' && (
              <span className="text-[10px] font-semibold text-purple-400 px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-800/30 mt-0.5">
                {t.playerTurn(currentTurnPlayer)}
              </span>
            )}
          </div>

          {/* Sound & Counter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="w-8 h-8 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-150 active:scale-90"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              )}
            </button>

            <span className="text-xs font-mono font-medium text-zinc-400 min-w-[40px] text-end">
              {currentIndex + 1} / {sessionLength}
            </span>
          </div>
        </div>

        {/* Animated Thin Progress Bar */}
        <div className="w-full h-1 rounded-full bg-zinc-900 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* Exit Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">{t.exitConfirmTitle}</h3>
            <p className="text-xs text-zinc-400 mb-5 leading-relaxed">{t.exitConfirmDesc}</p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
              >
                {t.resume}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  exitSession();
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm transition-all"
              >
                {t.exit}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
