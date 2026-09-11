import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, EyeOff, Smartphone, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { interpolatePlayers } from '../../lib/player-utils';
import { soundManager } from '../../lib/sound-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';
import type { PlayerId } from '../../types/players';

interface MoreLikelyCardProps {
  question: QuestionItem;
}

type VoteStep = 'pA_pick' | 'pass_phone' | 'pB_pick' | 'revealed';

export const MoreLikelyCard: React.FC<MoreLikelyCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const players = useGameStore((s) => s.players);
  const nextCard = useGameStore((s) => s.nextCard);
  const recordMoreLikelyResult = useGameStore((s) => s.recordMoreLikelyResult);
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const nameA = players?.playerA.name || (language === 'ar' ? 'الأول' : 'Player 1');
  const nameB = players?.playerB.name || (language === 'ar' ? 'التاني' : 'Player 2');

  const [step, setStep] = useState<VoteStep>('pA_pick');
  const [voteA, setVoteA] = useState<PlayerId | null>(null);
  const [voteB, setVoteB] = useState<PlayerId | null>(null);

  const rawQuestionText = language === 'ar' ? question.ar.question : question.en.question;
  const questionText = interpolatePlayers(rawQuestionText, { players: players! });

  const handleVoteA = (choice: PlayerId) => {
    soundManager.play('choiceSelect');
    setVoteA(choice);
    setStep('pass_phone');
  };

  const handlePassReady = () => {
    soundManager.play('tap');
    setStep('pB_pick');
  };

  const handleVoteB = (choice: PlayerId) => {
    setVoteB(choice);
    const isAgreement = voteA === choice;
    soundManager.play('moreLikelyReveal');

    recordMoreLikelyResult(choice, isAgreement, question.id);
    setStep('revealed');
  };

  const isAgreed = voteA !== null && voteB !== null && voteA === voteB;
  const agreedName = isAgreed ? (voteA === 'playerA' ? nameA : nameB) : null;

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden bg-zinc-900/70 border border-purple-500/30 shadow-[0_10px_35px_-5px_rgba(168,85,247,0.25)] select-none">
      {/* Ambient Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

      {/* Top Card Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{t.moreLikelyBadge}</span>
        </span>
      </div>

      {/* Center Question & Multi-Step Voting Area */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
        {/* Question Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight max-w-xs sm:max-w-sm mb-6">
          {questionText}
        </h3>

        {/* STEP 1: Player A Votes */}
        {step === 'pA_pick' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
              <EyeOff className="w-4 h-4" />
              <span>{nameA}… {language === 'ar' ? 'اختار في سرك' : 'pick secretly'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              <button
                type="button"
                onClick={() => handleVoteA('playerA')}
                className="py-3 px-3 rounded-2xl bg-zinc-800/90 hover:bg-purple-600/30 border border-zinc-700/80 hover:border-purple-500 text-sm font-bold text-zinc-100 active:scale-95 transition-all cursor-pointer truncate"
              >
                {nameA}
              </button>
              <button
                type="button"
                onClick={() => handleVoteA('playerB')}
                className="py-3 px-3 rounded-2xl bg-zinc-800/90 hover:bg-purple-600/30 border border-zinc-700/80 hover:border-purple-500 text-sm font-bold text-zinc-100 active:scale-95 transition-all cursor-pointer truncate"
              >
                {nameB}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Pass Phone Screen */}
        {step === 'pass_phone' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xs flex flex-col items-center gap-4 py-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Smartphone className="w-7 h-7 animate-pulse" />
            </div>

            <p className="text-sm font-bold text-zinc-200">
              {t.moreLikelyPassPrompt(nameB)}
            </p>

            <button
              type="button"
              onClick={handlePassReady}
              className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 active:scale-95 transition-all cursor-pointer"
            >
              {language === 'ar' ? 'استلمت الموبايل 👍' : 'Got the phone 👍'}
            </button>
          </motion.div>
        )}

        {/* STEP 3: Player B Votes */}
        {step === 'pB_pick' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
              <EyeOff className="w-4 h-4" />
              <span>{nameB}… {language === 'ar' ? 'اختار في سرك' : 'pick secretly'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              <button
                type="button"
                onClick={() => handleVoteB('playerA')}
                className="py-3 px-3 rounded-2xl bg-zinc-800/90 hover:bg-purple-600/30 border border-zinc-700/80 hover:border-purple-500 text-sm font-bold text-zinc-100 active:scale-95 transition-all cursor-pointer truncate"
              >
                {nameA}
              </button>
              <button
                type="button"
                onClick={() => handleVoteB('playerB')}
                className="py-3 px-3 rounded-2xl bg-zinc-800/90 hover:bg-purple-600/30 border border-zinc-700/80 hover:border-purple-500 text-sm font-bold text-zinc-100 active:scale-95 transition-all cursor-pointer truncate"
              >
                {nameB}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Simultaneous Reveal */}
        {step === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm flex flex-col items-center gap-4 py-2"
          >
            {isAgreed ? (
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.4 }}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg shadow-xl shadow-purple-900/50"
                >
                  {agreedName}
                </motion.div>
                <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">
                  {t.moreLikelyAgreed(agreedName!)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold">
                    {nameA}: {voteA === 'playerA' ? nameA : nameB}
                  </span>
                  <span className="text-xs font-bold text-zinc-600">vs</span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold">
                    {nameB}: {voteB === 'playerA' ? nameA : nameB}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-400 mt-1">
                  {t.moreLikelySplit}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Footer / Next Action */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-semibold text-zinc-500">
          {nameA} × {nameB}
        </span>

        {step === 'revealed' ? (
          <button
            type="button"
            onClick={nextCard}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span>{t.next}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="text-[11px] font-medium text-zinc-500">
            {t.moreLikelySecretPrompt}
          </span>
        )}
      </div>
    </div>
  );
};
