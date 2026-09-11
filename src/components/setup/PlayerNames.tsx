import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, User, Users } from 'lucide-react';
import React, { useState } from 'react';
import { validatePlayerNames } from '../../lib/player-utils';
import { soundManager } from '../../lib/sound-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

export const PlayerNames: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const setScreen = useGameStore((s) => s.setScreen);
  const players = useGameStore((s) => s.players);
  const setPlayers = useGameStore((s) => s.setPlayers);
  const startSession = useGameStore((s) => s.startSession);
  const sessionLength = useGameStore((s) => s.sessionLength);
  const turnMode = useGameStore((s) => s.turnMode);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const [nameA, setNameA] = useState(players?.playerA.name || '');
  const [nameB, setNameB] = useState(players?.playerB.name || '');
  const [touched, setTouched] = useState(false);

  // Rotating random microcopy on mount
  const [microcopyIndex] = useState(() =>
    Math.floor(Math.random() * t.namesRandomMicrocopy.length)
  );
  const microcopy = t.namesRandomMicrocopy[microcopyIndex] || t.namesRandomMicrocopy[0];

  const validation = validatePlayerNames(nameA, nameB, language);
  const isValid = validation.valid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isValid) return;

    soundManager.play('nameConfirmed');
    setPlayers(nameA.trim(), nameB.trim());
    startSession(sessionLength, turnMode);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-6 sm:py-8 max-w-md mx-auto select-none">
      {/* Top Header with Back Button */}
      <div className="w-full flex items-center justify-between pt-safe pb-2">
        <button
          type="button"
          onClick={() => setScreen('setup')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-purple-400" />
          <span>{language === 'ar' ? 'شخصين' : '2 Players'}</span>
        </div>
      </div>

      {/* Main Content Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex-1 flex flex-col justify-center items-center my-auto py-4"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/30 text-purple-400 mb-3 shadow-lg shadow-purple-950/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.namesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            {microcopy}
          </p>
        </motion.div>

        {/* Inputs Layout: Sliding in from opposite sides */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* Player 1 Input - Slides in from Left / Right */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 px-1">
              {t.playerOneLabel}
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                placeholder={t.playerOnePlaceholder}
                maxLength={20}
                autoComplete="off"
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-base font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              <div className="absolute end-3.5 text-zinc-500 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Glowing × separator */}
          <motion.div
            animate={
              isValid
                ? {
                    scale: [1, 1.2, 1],
                    color: '#c084fc',
                    filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.8))',
                  }
                : { scale: 1, color: '#71717a' }
            }
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-sm font-black transition-colors"
          >
            ×
          </motion.div>

          {/* Player 2 Input - Slides in from opposite side */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 px-1">
              {t.playerTwoLabel}
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                placeholder={t.playerTwoPlaceholder}
                maxLength={20}
                autoComplete="off"
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-base font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              <div className="absolute end-3.5 text-zinc-500 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Validation Error Message */}
        {touched && !isValid && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-rose-400 font-semibold mt-4 text-center"
          >
            {language === 'ar' ? validation.messageAr : validation.messageEn}
          </motion.p>
        )}

        {/* CTA Button with Micro-Animation */}
        <div className="w-full mt-8">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            animate={
              isValid
                ? {
                    scale: [1, 1.015, 1],
                    boxShadow: '0 0 25px -4px rgba(168,85,247,0.4)',
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
            className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isValid
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-xl shadow-purple-900/40 hover:brightness-110 active:scale-[0.98]'
                : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
            }`}
          >
            <span>{t.namesCta}</span>
          </motion.button>
        </div>
      </form>

      {/* Footer Tagline */}
      <div className="w-full text-center pb-safe pt-2">
        <span className="text-[11px] text-zinc-600 font-medium tracking-wider">
          {t.secondaryTagline}
        </span>
      </div>
    </div>
  );
};
