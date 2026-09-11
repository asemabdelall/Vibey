import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Check, Download, RefreshCw, Share2, Zap } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import { ResultCardShare } from './ResultCardShare';

export const ResultScreen: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const sessionResult = useGameStore((s) => s.sessionResult);
  const startSession = useGameStore((s) => s.startSession);
  const setScreen = useGameStore((s) => s.setScreen);
  const t = TRANSLATIONS[language];

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!sessionResult) return null;

  const title = language === 'ar' ? sessionResult.titleAr : sessionResult.titleEn;
  const description = language === 'ar' ? sessionResult.descriptionAr : sessionResult.descriptionEn;

  const handleShare = async () => {
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

  // Staggered reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
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
      {/* Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center pt-safe pb-4"
      >
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          {t.resultHeading}
        </span>
      </motion.div>

      {/* Main Sequential Card Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex-1 flex flex-col items-center justify-center my-auto"
      >
        {/* Step 1 & 2 & 3: Result Card Share */}
        <motion.div variants={itemVariants} className="w-full flex justify-center mb-4">
          <ResultCardShare result={sessionResult} cardRef={cardRef} />
        </motion.div>

        {/* Step 4: Narrative Description */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-sm px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 text-center leading-relaxed mb-6"
        >
          {description}
        </motion.div>

        {/* Step 5: Action Controls */}
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
              onClick={() => startSession()}
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
    </div>
  );
};
