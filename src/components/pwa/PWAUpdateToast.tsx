import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { pwaManager, useHasUpdate } from '../../lib/pwa-manager';
import { useGameStore } from '../../store/game-store';

export const PWAUpdateToast: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const hasUpdate = useHasUpdate();
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    await pwaManager.applyUpdate();
  };

  return (
    <AnimatePresence>
      {hasUpdate && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-3 z-50 left-1/2 -translate-x-1/2 w-auto max-w-[92vw] px-4 py-2.5 rounded-full bg-zinc-900/95 border border-purple-500/50 shadow-2xl backdrop-blur-lg flex items-center gap-3 text-xs"
        >
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-zinc-200 font-medium">
            {language === 'ar' ? 'يتوفر إصدار جديد من Vibey' : 'A new update is available'}
          </span>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${updating ? 'animate-spin' : ''}`} />
            <span>{language === 'ar' ? 'تحديث' : 'Update'}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
