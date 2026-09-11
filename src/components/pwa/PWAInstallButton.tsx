import { Download, Sparkles } from 'lucide-react';
import React from 'react';
import { pwaManager, useCanPromptInstall, useIsStandalone } from '../../lib/pwa-manager';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenModal, className = '' }) => {
  const language = useGameStore((s) => s.language);
  const t = TRANSLATIONS[language];
  const isStandalone = useIsStandalone();
  const canPrompt = useCanPromptInstall();

  if (isStandalone) {
    return (
      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[11px] font-medium text-purple-300 select-none ${className}`}>
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span className="hidden sm:inline">{t.pwaStandaloneBadge}</span>
      </div>
    );
  }

  const handleClick = async () => {
    if (canPrompt) {
      await pwaManager.promptInstall();
    } else {
      onOpenModal();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 hover:border-purple-500 text-xs font-semibold text-purple-200 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${className}`}
      title={t.installTitle}
    >
      <Download className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
      <span className="truncate">{t.installApp}</span>
    </button>
  );
};
