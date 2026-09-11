import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, EyeOff, HelpCircle, Smartphone, X as XIcon } from 'lucide-react';
import React from 'react';
import { interpolatePlayers } from '../../lib/player-utils';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface GuessMeCardProps {
  question: QuestionItem;
}

export const GuessMeCard: React.FC<GuessMeCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const players = useGameStore((s) => s.players);
  const currentTurnPlayer = useGameStore((s) => s.currentTurnPlayer);
  const guessStep = useGameStore((s) => s.guessStep);
  const secretChoiceIndex = useGameStore((s) => s.secretChoiceIndex);
  const guessedChoiceIndex = useGameStore((s) => s.guessedChoiceIndex);
  const guessIsCorrect = useGameStore((s) => s.guessIsCorrect);
  const setGuessSecret = useGameStore((s) => s.setGuessSecret);
  const readyToPassPhone = useGameStore((s) => s.readyToPassPhone);
  const submitGuess = useGameStore((s) => s.submitGuess);
  const nextCard = useGameStore((s) => s.nextCard);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const qData = question[language] || question.ar;
  const options = qData.options || [];

  const nameA = players?.playerA.name || (isRtl ? 'الأول' : 'Player 1');
  const nameB = players?.playerB.name || (isRtl ? 'التاني' : 'Player 2');

  // If currentTurnPlayer is 1, A is picker, B is guesser. If 2, B is picker, A is guesser.
  const pickerName = currentTurnPlayer === 1 ? nameA : nameB;
  const guesserName = currentTurnPlayer === 1 ? nameB : nameA;

  const questionText = players
    ? interpolatePlayers(qData.question, {
        players,
        currentPlayer: pickerName,
        otherPlayer: guesserName,
      })
    : qData.question;

  return (
    <div className="w-full flex flex-col items-center select-none perspective-1000">
      {/* 3D Flippable Card Frame */}
      <motion.div
        animate={{
          rotateY: guessStep === 'guesser-pick' || guessStep === 'revealed' ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative preserve-3d"
      >
        {/* ================= FRONT SIDE: PERSON A (PICKER) ================= */}
        <div
          className={`w-full flex flex-col items-center backface-hidden ${
            guessStep === 'guesser-pick' || guessStep === 'revealed' ? 'pointer-events-none' : ''
          }`}
        >
          {/* Question Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight leading-snug mb-4">
            {questionText}
          </h2>

          {/* Sub-instruction with personalized names */}
          <div className="text-center mb-5 flex flex-col items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-zinc-800/90 text-amber-300 border border-amber-500/30">
              <EyeOff className="w-3.5 h-3.5" />
              <span>
                {isRtl
                  ? `${pickerName}، اختار إجابتك السرية 🤫`
                  : `${pickerName}, pick your secret choice 🤫`}
              </span>
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              {isRtl
                ? `${guesserName}… ممنوع تبص 👀`
                : `${guesserName}… no peeking 👀`}
            </span>
          </div>

          {/* Options for Picker */}
          <div className="w-full flex flex-col gap-2.5 max-w-sm mb-4">
            {options.map((opt, idx) => {
              const isSelected = secretChoiceIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setGuessSecret(idx)}
                  className={`w-full p-4 rounded-2xl border text-center font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-purple-900/50 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Ready to pass phone button */}
          {guessStep === 'ready-pass' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm mt-2"
            >
              <button
                type="button"
                onClick={readyToPassPhone}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>
                  {isRtl
                    ? `إدي الموبايل لـ ${guesserName} عشان يخمن 📱`
                    : `Pass the phone to ${guesserName} to guess 📱`}
                </span>
              </button>
            </motion.div>
          )}
        </div>

        {/* ================= BACK SIDE: PERSON B (GUESSER) ================= */}
        <div
          className={`w-full flex flex-col items-center backface-hidden rotate-y-180 absolute inset-0 ${
            guessStep !== 'guesser-pick' && guessStep !== 'revealed' ? 'pointer-events-none' : ''
          }`}
        >
          {/* Question Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight leading-snug mb-4">
            {questionText}
          </h2>

          {/* Guesser Prompt or Result Banner */}
          <div className="text-center mb-5">
            {guessStep === 'guesser-pick' ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-zinc-800/90 text-purple-300 border border-purple-500/30">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>
                  {isRtl
                    ? `يلا يا ${guesserName}، خمن ${pickerName} اختار إيه؟`
                    : `Hey ${guesserName}, what did ${pickerName} choose?`}
                </span>
              </span>
            ) : guessIsCorrect ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-black bg-emerald-950/80 text-emerald-200 border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                <Check className="w-4 h-4 text-emerald-300" strokeWidth={3} />
                <span>
                  {isRtl
                    ? `${guesserName} عارف ${pickerName} زيادة عن اللزوم 👀🔥`
                    : `${guesserName} read ${pickerName} like an open book 😎`}
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [-8, 8, -6, 6, 0] }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-rose-950/80 text-rose-200 border border-rose-500/40"
              >
                <XIcon className="w-4 h-4 text-rose-300" />
                <span>
                  {isRtl
                    ? `ولا قريب حتى يا ${guesserName} 😭`
                    : `Not even close, ${guesserName} 😭`}
                </span>
              </motion.div>
            )}
          </div>

          {/* Options for Guesser */}
          <div className="w-full flex flex-col gap-2.5 max-w-sm mb-4">
            {options.map((opt, idx) => {
              const isGuessed = guessedChoiceIndex === idx;
              const isActualSecret = secretChoiceIndex === idx;
              const isRevealed = guessStep === 'revealed';

              let btnStyle = 'bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700 text-zinc-300';
              if (isRevealed) {
                if (isActualSecret) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(168,85,247,0.35)]';
                } else if (isGuessed && !guessIsCorrect) {
                  btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-zinc-900 text-zinc-600';
                }
              } else if (isGuessed) {
                btnStyle = 'bg-purple-900/50 border-purple-500 text-white';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => submitGuess(idx)}
                  className={`w-full p-4 rounded-2xl border text-center font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-sm relative ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isRevealed && isActualSecret && (
                    <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      {isRtl ? `اختيار ${pickerName}` : `${pickerName}'s Pick`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Card after Guess Reveal */}
          {guessStep === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm mt-2"
            >
              <button
                type="button"
                onClick={nextCard}
                className="w-full py-3.5 rounded-2xl bg-white text-zinc-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueNext}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
