import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import { Wordmark } from '../brand/Wordmark';
import { LanguageToggle } from '../ui/LanguageToggle';
import { SoundToggle } from '../ui/SoundToggle';

export const IntroSplash: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const setScreen = useGameStore((s) => s.setScreen);
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-6 sm:py-10 max-w-md mx-auto text-center select-none overflow-hidden">
      {/* Top utility row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full flex items-center justify-between pt-safe"
      >
        <div className="flex items-center gap-2">
          <SoundToggle />
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </motion.div>

      {/* Center animated hero section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto flex flex-col items-center max-w-xs"
      >
        {/* Step 1: Animated Wordmark */}
        <motion.div variants={itemVariants} className="mb-8">
          <Wordmark size="hero" />
        </motion.div>

        {/* Step 2: Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight leading-snug"
        >
          {t.tagline}
        </motion.h1>

        {/* Step 3: Supporting Text */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-8"
        >
          {t.subTagline}
        </motion.p>

        {/* Step 4: CTA Button */}
        <motion.div variants={itemVariants} className="w-full">
          <button
            type="button"
            onClick={() => setScreen('home')}
            className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-lg shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_-2px_rgba(168,85,247,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-purple-200 animate-pulse" />
            <span>{t.letsVibe}</span>
            {isRtl ? (
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom subtle microcopy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="pb-safe text-xs text-zinc-600 tracking-wider"
      >
        {t.secondaryTagline}
      </motion.div>
    </div>
  );
};
