import React from 'react';
import { useGameStore } from '../../store/game-store';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const language = useGameStore((s) => s.language);
  const setLanguage = useGameStore((s) => s.setLanguage);

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm min-h-[36px] min-w-[54px] justify-center ${className}`}
      aria-label="Toggle language"
    >
      <span className={language === 'ar' ? 'text-purple-400 font-bold' : 'text-zinc-500'}>
        AR
      </span>
      <span className="text-zinc-600">/</span>
      <span className={language === 'en' ? 'text-purple-400 font-bold' : 'text-zinc-500'}>
        EN
      </span>
    </button>
  );
};
