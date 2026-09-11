import React from 'react';
import { useGameStore } from '../../store/game-store';
import type { SessionResult } from '../../types/game';
import { Wordmark } from '../brand/Wordmark';

interface ResultCardShareProps {
  result: SessionResult;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export const ResultCardShare: React.FC<ResultCardShareProps> = ({ result, cardRef }) => {
  const language = useGameStore((s) => s.language);
  const players = useGameStore((s) => s.players);

  const title = language === 'ar' ? result.titleAr : result.titleEn;
  const subtitle = language === 'ar' ? result.subtitleAr : result.subtitleEn;
  const quoteText =
    (language === 'ar' ? result.finalWordsAr : result.finalWordsEn) ||
    (language === 'ar' ? result.observationAr : result.observationEn);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-sm rounded-[32px] bg-[#0c0a12] border border-zinc-800 p-6 sm:p-7 text-center shadow-2xl relative overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: result.accentColor }}
      />

      {/* Brand Header */}
      <div className="flex justify-center mb-4">
        <Wordmark size="sm" showTagline={false} />
      </div>

      {/* Player Names Header */}
      {players && (
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 mb-3">
          <span className="text-xs font-black text-purple-300">{players.playerA.name}</span>
          <span className="text-[10px] text-zinc-500 font-bold">×</span>
          <span className="text-xs font-black text-pink-300">{players.playerB.name}</span>
        </div>
      )}

      {/* Emoji & Archetype */}
      <div className="text-5xl mb-2 drop-shadow-md">{result.emoji}</div>
      <h2
        className="text-2xl font-black text-white tracking-tight mb-1"
        style={{ color: result.accentColor }}
      >
        {title}
      </h2>
      <p className="text-xs text-zinc-300 font-semibold mb-5 max-w-xs mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Compact 4-Stat Grid: Matches, Diff, Plot Twists, Skips */}
      <div className="grid grid-cols-4 gap-1.5 mb-5 bg-zinc-900/60 p-2.5 rounded-2xl border border-zinc-800/80">
        <div className="flex flex-col items-center">
          <span className="text-base font-black text-purple-400">{result.stats.matches}</span>
          <span className="text-[9px] text-zinc-400 font-medium">
            {language === 'ar' ? 'Same Vibe' : 'Matches'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base font-black text-amber-400">{result.stats.differences}</span>
          <span className="text-[9px] text-zinc-400 font-medium">
            {language === 'ar' ? 'مختلفين' : 'Different'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base font-black text-pink-400">{result.stats.plotTwists}</span>
          <span className="text-[9px] text-zinc-400 font-medium">
            {language === 'ar' ? 'Twists' : 'Twists'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base font-black text-zinc-400">{result.stats.skips}</span>
          <span className="text-[9px] text-zinc-400 font-medium">
            {language === 'ar' ? 'Skip' : 'Skips'}
          </span>
        </div>
      </div>

      {/* Conversational Final Quote */}
      <div className="text-xs text-zinc-300 font-medium italic mb-5 leading-relaxed px-2">
        "{quoteText}"
      </div>

      {/* Watermark Tagline */}
      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">
        Find your vibe • Vibey
      </div>
    </div>
  );
};
