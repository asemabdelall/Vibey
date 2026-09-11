import { AnimatePresence, motion } from 'framer-motion';
import { Eye, HelpCircle } from 'lucide-react';
import React from 'react';
import { interpolatePlayers } from '../../lib/player-utils';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface OpenConversationCardProps {
  question: QuestionItem;
}

export const OpenConversationCard: React.FC<OpenConversationCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const players = useGameStore((s) => s.players);
  const showFollowUp = useGameStore((s) => s.showFollowUp);
  const toggleFollowUp = useGameStore((s) => s.toggleFollowUp);

  const t = TRANSLATIONS[language];
  const qData = question[language] || question.ar;
  const hasFollowUp = Boolean(qData.followUp);

  const questionText = players
    ? interpolatePlayers(qData.question, { players })
    : qData.question;

  const followUpText = qData.followUp && players
    ? interpolatePlayers(qData.followUp, { players })
    : qData.followUp;

  return (
    <div className="w-full flex flex-col items-center select-none py-2">
      {/* Hero Question Typography */}
      <motion.h2
        layout
        className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight leading-snug max-w-sm mb-6"
      >
        {questionText}
      </motion.h2>

      {/* Spontaneous Follow-up Expander */}
      {hasFollowUp && (
        <div className="w-full flex flex-col items-center mt-2 max-w-sm">
          {!showFollowUp ? (
            <motion.button
              type="button"
              onClick={toggleFollowUp}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-800/50 text-purple-300 text-xs font-bold hover:bg-purple-900/50 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.followUpBtn}</span>
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-4 rounded-2xl bg-zinc-900/90 border border-purple-500/40 text-center shadow-[0_0_25px_-5px_rgba(168,85,247,0.3)] mt-2"
              >
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-400 mb-1.5 uppercase tracking-wider">
                  <HelpCircle className="w-3 h-3" />
                  <span>{t.followUpLabel}</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {followUpText}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};
