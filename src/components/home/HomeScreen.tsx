import { motion } from 'framer-motion';
import { Compass, Flame, Moon, Target, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { GameMode } from '../../types/game';
import { Wordmark } from '../brand/Wordmark';
import { PWAInstallBanner } from '../pwa/PWAInstallBanner';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { PWAInstallModal } from '../pwa/PWAInstallModal';
import { LanguageToggle } from '../ui/LanguageToggle';
import { SoundToggle } from '../ui/SoundToggle';

export const HomeScreen: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const selectMode = useGameStore((s) => s.selectMode);
  const t = TRANSLATIONS[language];

  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Check URL query params on mount for PWA app shortcuts (e.g. ?mode=chemistry)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode') as GameMode | null;
      const validModes: GameMode[] = ['quick-vibes', 'get-to-know-me', 'guess-me', 'chemistry', 'deep-talk'];
      if (modeParam && validModes.includes(modeParam)) {
        window.history.replaceState({}, '', window.location.pathname);
        selectMode(modeParam);
      }
    }
  }, [selectMode]);

  const modes: {
    id: GameMode;
    icon: React.ElementType;
    accentColor: string;
    borderActive: string;
    gradientBg: string;
  }[] = [
    {
      id: 'quick-vibes',
      icon: Zap,
      accentColor: 'text-amber-400',
      borderActive: 'border-amber-500/50',
      gradientBg: 'from-amber-500/10 via-amber-500/5 to-transparent',
    },
    {
      id: 'get-to-know-me',
      icon: Compass,
      accentColor: 'text-cyan-400',
      borderActive: 'border-cyan-500/50',
      gradientBg: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    },
    {
      id: 'guess-me',
      icon: Target,
      accentColor: 'text-emerald-400',
      borderActive: 'border-emerald-500/50',
      gradientBg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    },
    {
      id: 'chemistry',
      icon: Flame,
      accentColor: 'text-pink-400',
      borderActive: 'border-pink-500/50',
      gradientBg: 'from-pink-500/10 via-pink-500/5 to-transparent',
    },
    {
      id: 'deep-talk',
      icon: Moon,
      accentColor: 'text-purple-400',
      borderActive: 'border-purple-500/50',
      gradientBg: 'from-purple-500/10 via-purple-500/5 to-transparent',
    },
  ];

  const handleSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    // Tactile delay to show ambient accent glow expanding before transition
    setTimeout(() => {
      selectMode(mode);
    }, 180);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-6 sm:py-8 max-w-md mx-auto select-none">
      {/* Top Bar */}
      <header className="w-full flex items-center justify-between pt-safe pb-4 gap-2">
        <Wordmark size="sm" />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <PWAInstallButton onOpenModal={() => setShowInstallModal(true)} />
          <SoundToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Mode Selection Area */}
      <main className="w-full flex-1 flex flex-col justify-center my-auto py-2">
        {/* Sleek, non-intrusive in-app install banner if not in standalone */}
        <PWAInstallBanner onOpenModal={() => setShowInstallModal(true)} />

        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            {t.modesTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-zinc-400 mt-1"
          >
            {t.modesSubtitle}
          </motion.p>
        </div>

        {/* Mode Cards Stack */}
        <div className="flex flex-col gap-3 w-full">
          {modes.map((mode, idx) => {
            const modeData = t.modes[mode.id];
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;

            return (
              <motion.button
                key={mode.id}
                type="button"
                onClick={() => handleSelect(mode.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * idx, ease: 'easeOut' }}
                whileTap={{ scale: 0.98 }}
                className={`relative group w-full text-start p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 transition-all duration-200 overflow-hidden cursor-pointer shadow-lg active:bg-zinc-800/70 ${
                  isSelected
                    ? `${mode.borderActive} shadow-[0_0_25px_-5px_rgba(168,85,247,0.35)] scale-[0.99]`
                    : 'hover:border-zinc-700/80'
                }`}
              >
                {/* Expanding Ambient Accent Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${mode.gradientBg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                {isSelected && (
                  <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 bg-purple-500/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-zinc-800/90 border border-zinc-700/50 flex items-center justify-center shrink-0 shadow-sm ${mode.accentColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h3 className="text-base font-bold text-zinc-100 tracking-tight truncate">
                        {modeData.title}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/40 text-zinc-400 shrink-0">
                        {modeData.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                      {modeData.desc}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      {/* Footer Tagline */}
      <footer className="w-full text-center pb-safe pt-2">
        <p className="text-[11px] text-zinc-600 tracking-wider">
          {t.subTagline}
        </p>
      </footer>

      {/* Installation Instruction Modal */}
      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </div>
  );
};
