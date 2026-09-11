import { motion } from 'framer-motion';
import { Check, Dices } from 'lucide-react';
import React from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface PlotTwistCardProps {
  question: QuestionItem;
}

export const PlotTwistCard: React.FC<PlotTwistCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const plotTwistDone = useGameStore((s) => s.plotTwistDone);
  const t = TRANSLATIONS[language];
  const qData = question[language] || question.ar;

  return (
    <div className="w-full flex flex-col items-center select-none py-2">
      {/* Dramatic Badge */}
      <motion.div
        initial={{ scale: 0.6, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)] mb-4"
      >
        <Dices className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <span>{t.plotTwistBadge}</span>
      </motion.div>

      {/* Subtitle instructions */}
      <p className="text-xs text-zinc-400 mb-6 text-center max-w-xs">
        {t.plotTwistSub}
      </p>

      {/* Challenge Card Hero */}
      <motion.div
        initial={{ scale: 0.9, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-sm p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/30 shadow-[0_0_35px_-8px_rgba(245,158,11,0.2)] text-center mb-8 relative overflow-hidden"
      >
        {/* Ambient warm amber backlight */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <h2 className="relative text-xl sm:text-2xl font-black text-white leading-relaxed tracking-tight">
          {qData.question}
        </h2>

        {qData.hint && (
          <p className="relative text-xs font-medium text-amber-300/90 mt-4 bg-amber-950/40 border border-amber-500/20 py-2 px-3 rounded-xl">
            💡 {qData.hint}
          </p>
        )}
      </motion.div>

      {/* Done Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <button
          type="button"
          onClick={plotTwistDone}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>{t.plotTwistDone}</span>
        </button>
      </motion.div>
    </div>
  );
};
