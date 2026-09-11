import { AnimatePresence, motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Check, Download, RefreshCw, Share2, Sparkles, UserCheck, Users, X, Zap } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { soundManager } from '../../lib/sound-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import { ResultCardShare } from './ResultCardShare';

export const ResultScreen: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const sessionResult = useGameStore((s) => s.sessionResult);
  const players = useGameStore((s) => s.players);
  const resetSession = useGameStore((s) => s.resetSession);
  const setScreen = useGameStore((s) => s.setScreen);
  const t = TRANSLATIONS[language];

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showPlayAgainModal, setShowPlayAgainModal] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!sessionResult) return null;

  const title = language === 'ar' ? sessionResult.titleAr : sessionResult.titleEn;
  const description = language === 'ar' ? sessionResult.descriptionAr : sessionResult.descriptionEn;
  const finalWords = language === 'ar' ? sessionResult.finalWordsAr : sessionResult.finalWordsEn;
  const callback = language === 'ar' ? sessionResult.callbackAr : sessionResult.callbackEn;

  const handleShare = async () => {
    soundManager.play('tap');
    const shareData = {
      title: 'Vibey — ' + title,
      text: `${t.shareTextPrefix} ${title}! ${sessionResult.emoji}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareData.text} \n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      soundManager.play('tap');
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });
      const link = document.createElement('a');
      link.download = `vibey-result-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Ignore capture failure
    } finally {
      setDownloading(false);
    }
  };

  const handlePlayAgainClick = () => {
    soundManager.play('tap');
    setShowPlayAgainModal(true);
  };

  const handleSelectSamePlayers = () => {
    setShowPlayAgainModal(false);
    resetSession(true);
  };

  const handleSelectNewPlayers = () => {
    setShowPlayAgainModal(false);
    resetSession(false);
  };

  // Staggered reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-6 sm:py-8 max-w-md mx-auto select-none">
      {/* Top Heading with Player Names */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center pt-safe pb-3"
      >
        {players && (
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900/80 border border-purple-500/30 mb-2">
            <span className="text-sm font-black text-purple-300">{players.playerA.name}</span>
            <span className="text-xs text-purple-400 font-bold">×</span>
            <span className="text-sm font-black text-pink-300">{players.playerB.name}</span>
          </div>
        )}
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            {t.resultHeading}
          </span>
        </div>
      </motion.div>

      {/* Main Sequential Card Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex-1 flex flex-col items-center justify-center my-auto"
      >
        {/* Step 1: Result Card Share */}
        <motion.div variants={itemVariants} className="w-full flex justify-center mb-4">
          <ResultCardShare result={sessionResult} cardRef={cardRef} />
        </motion.div>

        {/* Step 2: VIBEY'S FINAL WORDS */}
        {finalWords && (
          <motion.div
            variants={itemVariants}
            className="w-full max-w-sm px-5 py-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-zinc-900/70 to-zinc-900/90 border border-purple-500/30 text-center shadow-[0_4px_25px_rgba(168,85,247,0.15)] mb-3"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-black text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.finalWordsHeading}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-zinc-100 leading-relaxed">
              "{finalWords}"
            </p>
            {callback && (
              <p className="text-xs font-semibold text-purple-300/90 italic pt-2 mt-2 border-t border-purple-500/20">
                {callback}
              </p>
            )}
          </motion.div>
        )}

        {/* Step 3: Narrative Description */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-sm px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 text-center leading-relaxed mb-5"
        >
          {description}
        </motion.div>

        {/* Step 4: Action Controls */}
        <motion.div variants={itemVariants} className="w-full max-w-sm flex flex-col gap-2.5">
          {/* Primary Share / Download */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t.copiedLink : t.shareResult}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm border border-zinc-700/60 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? '...' : 'Save Card'}</span>
            </button>
          </div>

          {/* Secondary Gameplay Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePlayAgainClick}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>

            <button
              type="button"
              onClick={() => setScreen('home')}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-purple-300 font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{t.changeVibe}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="w-full text-center pb-safe pt-4">
        <span className="text-[11px] text-zinc-600 font-medium">
          Less awkward. More Vibey.
        </span>
      </div>

      {/* Play Again Choice Modal (Same Players vs Change Players) */}
      <AnimatePresence>
        {showPlayAgainModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-xs bg-zinc-900 border border-zinc-800 rounded-3xl p-5 text-center shadow-2xl relative"
            >
              {/* Close X */}
              <button
                type="button"
                onClick={() => setShowPlayAgainModal(false)}
                className="absolute top-4 end-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-800/80 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-3 text-purple-400">
                <RefreshCw className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {t.playAgainChoiceTitle}
              </h3>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                {t.playAgainChoiceDesc}
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleSelectSamePlayers}
                  className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t.playAgainSame}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSelectNewPlayers}
                  className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm border border-zinc-700/60 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.playAgainNew}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
