import { ArrowLeft, ArrowRight, Flame, SkipForward } from 'lucide-react';
import React, { useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import { FireParticles } from '../ui/FireParticles';

export const CardControls: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const skipCard = useGameStore((s) => s.skipCard);
  const nextCard = useGameStore((s) => s.nextCard);
  const likeCard = useGameStore((s) => s.likeCard);
  const isCardLiked = useGameStore((s) => s.isCardLiked);

  const [fireActive, setFireActive] = useState(false);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const handleLike = () => {
    if (!isCardLiked) {
      likeCard();
      setFireActive(true);
      setTimeout(() => setFireActive(false), 900);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 max-w-sm px-2 pb-safe select-none">
      {/* Skip Button (عدّي) */}
      <button
        type="button"
        onClick={skipCard}
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-xs sm:text-sm font-bold transition-all duration-150 active:scale-95 cursor-pointer"
      >
        <SkipForward className="w-4 h-4" />
        <span>{t.skip}</span>
      </button>

      {/* Good Question Button (🔥 جامد) with particle burst */}
      <div className="relative flex-1">
        <FireParticles active={fireActive} />
        <button
          type="button"
          onClick={handleLike}
          disabled={isCardLiked}
          className={`w-full flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl border text-xs sm:text-sm font-black transition-all duration-200 active:scale-95 cursor-pointer ${
            isCardLiked
              ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'bg-zinc-900/90 border-zinc-800 text-amber-400 hover:border-amber-500/40 hover:bg-zinc-800'
          }`}
        >
          <Flame className={`w-4 h-4 ${isCardLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>{t.goodQuestion}</span>
        </button>
      </div>

      {/* Next Button (التالي) */}
      <button
        type="button"
        onClick={nextCard}
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-extrabold shadow-lg transition-all duration-150 active:scale-95 cursor-pointer"
      >
        <span>{t.next}</span>
        {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
};
