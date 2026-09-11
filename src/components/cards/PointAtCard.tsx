import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, Hand, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { interpolatePlayers } from '../../lib/player-utils';
import { soundManager } from '../../lib/sound-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface PointAtCardProps {
  question: QuestionItem;
}

const BUSTED_REACTIONS = [
  { ar: 'أنا مش هسأل مين اتفضح 😭', en: "I won't even ask who got exposed 😭" },
  { ar: 'السكوت أبلغ من الكلام 💀', en: 'Silence spoke volumes 💀' },
  { ar: 'نظرة العيون قالت كل حاجة 👀', en: 'The eye contact said everything 👀' },
  { ar: 'واضح إن الجريمة ثابتة 🤝', en: 'The verdict was instantaneous 🤝' },
  { ar: 'أصابع الاتهام موجهة بدقة 🎯', en: 'Finger pointed with zero hesitation 🎯' },
];

export const PointAtCard: React.FC<PointAtCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const players = useGameStore((s) => s.players);
  const nextCard = useGameStore((s) => s.nextCard);
  const recordPointAtResult = useGameStore((s) => s.recordPointAtResult);
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const [countStep, setCountStep] = useState<3 | 2 | 1 | 0>(3); // 3 -> 2 -> 1 -> 0 ('point')
  const [isBusted, setIsBusted] = useState(false);
  const [reactionIndex] = useState(() => Math.floor(Math.random() * BUSTED_REACTIONS.length));

  const rawQuestionText = language === 'ar' ? question.ar.question : question.en.question;
  const questionText = interpolatePlayers(rawQuestionText, { players: players! });

  const handleStepAdvance = () => {
    if (countStep > 1) {
      soundManager.play('tap');
      setCountStep((prev) => (prev - 1) as 2 | 1);
    } else if (countStep === 1) {
      soundManager.play('choiceSelect');
      setCountStep(0);
    }
  };

  const handleBusted = () => {
    soundManager.play('pointAtReveal');
    setIsBusted(true);
    recordPointAtResult(question.id);
  };

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden bg-zinc-900/70 border border-amber-500/30 shadow-[0_10px_35px_-5px_rgba(245,158,11,0.25)] select-none">
      {/* Ambient Accent Glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
          <Hand className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.pointAtBadge}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-700/50">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{t.pointAtIntro}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="my-auto py-6 flex flex-col items-center text-center z-10">
        <motion.p
          key={questionText}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 leading-snug tracking-tight max-w-lg mb-6"
        >
          {questionText}
        </motion.p>

        {/* Playful Countdown or Busted Reaction */}
        <AnimatePresence mode="wait">
          {!isBusted ? (
            <motion.div
              key="countdown-flow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              {/* Countdown Steps Badge Bar */}
              <div className="flex items-center justify-center gap-3">
                {[3, 2, 1].map((num) => {
                  const isActive = countStep === num;
                  const isPassed = countStep < num;
                  return (
                    <motion.button
                      key={num}
                      type="button"
                      onClick={() => {
                        soundManager.play('tap');
                        setCountStep(num as 3 | 2 | 1);
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-11 h-11 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 border ${
                        isActive
                          ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110'
                          : isPassed
                          ? 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60'
                          : 'bg-zinc-900/60 text-zinc-600 border-zinc-800'
                      }`}
                    >
                      {num}
                    </motion.button>
                  );
                })}

                {/* Point Final Target */}
                <motion.div
                  animate={{
                    scale: countStep === 0 ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ repeat: countStep === 0 ? Infinity : 0, duration: 1.2 }}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-1.5 border transition-all duration-300 ${
                    countStep === 0
                      ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.8)] scale-105'
                      : 'bg-zinc-900/60 text-zinc-600 border-zinc-800'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{t.pointAtReady}</span>
                </motion.div>
              </div>

              {/* Tap to advance step if not yet at point */}
              {countStep > 0 && (
                <button
                  type="button"
                  onClick={handleStepAdvance}
                  className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors underline underline-offset-4 mt-1"
                >
                  {language === 'ar' ? 'اضغط للعد ⏱️' : 'Tap to count down ⏱️'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="busted-reaction"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="w-full max-w-sm rounded-2xl bg-amber-500/10 border border-amber-500/40 p-4 shadow-[0_4px_20px_rgba(245,158,11,0.2)] flex flex-col items-center gap-2"
            >
              <span className="text-3xl">👉👀</span>
              <p className="text-sm font-semibold text-amber-200 text-center">
                {language === 'ar'
                  ? BUSTED_REACTIONS[reactionIndex].ar
                  : BUSTED_REACTIONS[reactionIndex].en}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="z-10 pt-4 flex items-center justify-center">
        {!isBusted ? (
          <motion.button
            type="button"
            onClick={handleBusted}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-[0_4px_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.pointAtCta}</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={() => nextCard()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-600/50 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.next}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </motion.button>
        )}
      </div>
    </div>
  );
};
