import { AnimatePresence, motion } from 'framer-motion';
import { Download, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { pwaManager, useCanPromptInstall } from '../../lib/pwa-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const language = useGameStore((s) => s.language);
  const t = TRANSLATIONS[language];
  const canPrompt = useCanPromptInstall();
  const [loading, setLoading] = useState(false);

  const handleInstallClick = async () => {
    setLoading(true);
    try {
      if (canPrompt) {
        await pwaManager.promptInstall();
        onClose();
        return;
      }

      // If on iOS or browsers supporting native Web Share sheet (which contains "Add to Home Screen")
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Vibey',
          text: 'Vibey — لعبة الصراحة والـ Vibe',
          url: window.location.origin,
        });
        onClose();
        return;
      }

      // Fallback: try promptInstall directly
      await pwaManager.promptInstall();
      onClose();
    } catch {
      // Handled or dismissed
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-md bg-zinc-950/95 border border-zinc-800/90 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 pb-safe"
          >
            {/* Header / Close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {language === 'ar' ? 'تثبيت التطبيق' : 'Install App'}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* App Identity Card */}
            <div className="flex items-center gap-4 mb-5 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/60">
              <img
                src="/apple-touch-icon.png"
                alt="Vibey"
                className="w-14 h-14 rounded-2xl shadow-lg border border-zinc-700/40 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-white">Vibey</h3>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {t.installSubtitle}
                </p>
              </div>
            </div>

            {/* Direct Install Button */}
            <div className="flex flex-col gap-3 mb-2">
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={loading}
                className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-extrabold text-base shadow-xl shadow-purple-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>{t.installAction}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {t.installNotNow}
              </button>
            </div>

            {/* Offline ready pill */}
            <div className="pt-2 text-center border-t border-zinc-900">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t.offlineReady}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
