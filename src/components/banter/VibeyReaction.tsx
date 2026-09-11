import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { soundManager } from '../../lib/sound-manager';
import { useGameStore } from '../../store/game-store';

export const VibeyReaction: React.FC = () => {
  const activeBanter = useGameStore((s) => s.activeBanter);
  const clearBanter = useGameStore((s) => s.clearBanter);
  const language = useGameStore((s) => s.language);

  const text = activeBanter ? (language === 'ar' ? activeBanter.ar : activeBanter.en) : null;

  useEffect(() => {
    if (activeBanter) {
      soundManager.play('banterAppear');

      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        clearBanter();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [activeBanter, clearBanter]);

  return (
    <AnimatePresence>
      {activeBanter && text && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 24,
          }}
          onClick={clearBanter}
          className="fixed top-16 z-40 left-1/2 -translate-x-1/2 w-[92%] max-w-sm cursor-pointer select-none"
        >
          <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-950/90 border border-purple-500/40 shadow-[0_10px_35px_-5px_rgba(168,85,247,0.35)] backdrop-blur-xl group hover:border-purple-400/60 transition-all">
            {/* Vibey Avatar with tilt/bounce animation */}
            <motion.div
              animate={{
                rotate: [0, -8, 8, -4, 4, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
              className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0 p-1.5 shadow-sm"
            >
              <img
                src="/apple-touch-icon.png"
                alt="Vibey"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Reaction Text (Max 2 lines) */}
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-wider text-purple-400 mb-0.5">
                Vibey 👀
              </span>
              <p className="text-xs sm:text-[13px] font-bold text-zinc-100 leading-snug line-clamp-2">
                {text}
              </p>
            </div>

            {/* Subtle dismiss button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearBanter();
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors shrink-0"
              aria-label="Close reaction"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
