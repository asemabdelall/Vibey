import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import React from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface QuickChoiceCardProps {
  question: QuestionItem;
}

export const QuickChoiceCard: React.FC<QuickChoiceCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const p1Choice = useGameStore((s) => s.p1Choice);
  const p2Choice = useGameStore((s) => s.p2Choice);
  const choiceResolution = useGameStore((s) => s.choiceResolution);
  const answerQuickChoice = useGameStore((s) => s.answerQuickChoice);
  const nextCard = useGameStore((s) => s.nextCard);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const qData = question[language] || question.ar;
  const options = qData.options || [];

  // Determine current active picker (Player 1 first, then Player 2)
  const isP1Turn = p1Choice === null;
  const isP2Turn = p1Choice !== null && p2Choice === null;
  const isResolved = choiceResolution !== 'none';

  const handleOptionClick = (idx: number) => {
    if (isP1Turn) {
      answerQuickChoice(1, idx);
    } else if (isP2Turn) {
      answerQuickChoice(2, idx);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Question Hero Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight leading-snug mb-6">
        {qData.question}
      </h2>

      {/* Sub-prompt depending on player state */}
      <div className="text-center mb-6">
        {!isResolved ? (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-zinc-800/90 text-purple-300 border border-purple-800/40">
            {isP1Turn ? (isRtl ? 'دور: الشخص الأول 👤' : "Player 1's Pick 👤") : (isRtl ? 'دور: الشخص التاني 👥' : "Player 2's Pick 👥")}
          </span>
        ) : choiceResolution === 'matched' ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black bg-purple-950/80 text-purple-200 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
            <span>{t.sameVibe}</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-amber-950/60 text-amber-200 border border-amber-500/40"
          >
            <span>{t.defendVibe}</span>
          </motion.div>
        )}
      </div>

      {/* Options Stack */}
      <div className="w-full flex flex-col gap-3.5 max-w-sm">
        {options.map((opt, idx) => {
          const isP1Selected = p1Choice === idx;
          const isP2Selected = p2Choice === idx;
          const isMatchedHere = isResolved && choiceResolution === 'matched' && isP1Selected;

          return (
            <motion.button
              key={idx}
              type="button"
              disabled={isResolved}
              onClick={() => handleOptionClick(idx)}
              whileTap={!isResolved ? { scale: 0.96 } : {}}
              animate={
                isMatchedHere
                  ? { scale: [1, 1.03, 1], y: [0, -3, 0] }
                  : isResolved && choiceResolution === 'differed' && (isP1Selected || isP2Selected)
                  ? { x: isP1Selected ? -4 : 4 }
                  : {}
              }
              transition={{ duration: 0.3 }}
              className={`relative w-full p-4 rounded-2xl border text-center font-bold text-base sm:text-lg transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center min-h-[58px] ${
                isMatchedHere
                  ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] text-white'
                  : isResolved && (isP1Selected || isP2Selected)
                  ? 'bg-zinc-800/90 border-purple-500/70 text-white'
                  : 'bg-zinc-900/80 border-zinc-800/90 hover:border-zinc-700 text-zinc-200 active:bg-zinc-800'
              }`}
            >
              <span>{opt}</span>

              {/* Tag for who chose this once revealed */}
              {isResolved && (
                <div className="absolute end-3 flex items-center gap-1.5 text-[10px] font-bold">
                  {isP1Selected && isP2Selected ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {isRtl ? 'الاتنين' : 'Both'}
                    </span>
                  ) : isP1Selected ? (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-200">
                      {isRtl ? 'الأول' : 'P1'}
                    </span>
                  ) : isP2Selected ? (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-200">
                      {isRtl ? 'التاني' : 'P2'}
                    </span>
                  ) : null}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Continue Action after resolution */}
      {isResolved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full max-w-sm"
        >
          <button
            type="button"
            onClick={nextCard}
            className="w-full py-3.5 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <span>{t.continueNext}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </motion.div>
      )}
    </div>
  );
};
