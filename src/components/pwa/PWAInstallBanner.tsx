import { AnimatePresence, motion } from 'framer-motion';
import { Download, Sparkles, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { pwaManager, useCanPromptInstall, useIsStandalone } from '../../lib/pwa-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

interface PWAInstallBannerProps {
  onOpenModal: () => void;
}

const STORAGE_DISMISSED_KEY = 'vibey_pwa_banner_dismissed';

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenModal }) => {
  const language = useGameStore((s) => s.language);
  const t = TRANSLATIONS[language];
  const isStandalone = useIsStandalone();
  const canPrompt = useCanPromptInstall();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If running in standalone mode (already installed app), don't show the banner
    if (isStandalone) {
      return;
    }

    // Check if dismissed recently (e.g. within 2 days)
    const dismissedTime = localStorage.getItem(STORAGE_DISMISSED_KEY);
    if (dismissedTime) {
      const diff = Date.now() - parseInt(dismissedTime, 10);
      if (diff < 2 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Slight delay so the screen settles before animating in the prompt
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isStandalone]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    localStorage.setItem(STORAGE_DISMISSED_KEY, Date.now().toString());
  };

  const handleTriggerInstall = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (canPrompt) {
      await pwaManager.promptInstall();
    } else {
      onOpenModal();
    }
  };

  if (isStandalone) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={() => handleTriggerInstall()}
          className="w-full mb-3 p-3 rounded-2xl bg-gradient-to-r from-purple-950/80 via-zinc-900/90 to-pink-950/70 border border-purple-500/30 shadow-lg shadow-purple-950/40 flex items-center justify-between gap-3 cursor-pointer group hover:border-purple-500/50 transition-all"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
              <Download className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight truncate">
                  {t.installTitle}
                </span>
                <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
              </div>
              <p className="text-[11px] text-zinc-400 truncate leading-tight mt-0.5">
                {t.installSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => handleTriggerInstall(e)}
              className="text-xs font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-lg group-hover:bg-purple-500/30 transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'تثبيت' : 'Install'}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
