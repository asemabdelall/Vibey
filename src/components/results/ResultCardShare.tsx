import React from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { SessionResult } from '../../types/game';
import { Wordmark } from '../brand/Wordmark';

interface ResultCardShareProps {
  result: SessionResult;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export const ResultCardShare: React.FC<ResultCardShareProps> = ({ result, cardRef }) => {
  const language = useGameStore((s) => s.language);
  const t = TRANSLATIONS[language];

  const title = language === 'ar' ? result.titleAr : result.titleEn;
  const subtitle = language === 'ar' ? result.subtitleAr : result.subtitleEn;
  const observation = language === 'ar' ? result.observationAr : result.observationEn;

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
      <div className="flex justify-center mb-6">
        <Wordmark size="sm" showTagline={false} />
      </div>

      {/* Emoji & Archetype */}
      <div className="text-5xl mb-3 drop-shadow-md">{result.emoji}</div>
      <h2
        className="text-2xl font-black text-white tracking-tight mb-1"
        style={{ color: result.accentColor }}
      >
        {title}
      </h2>
      <p className="text-xs text-zinc-300 font-semibold mb-6 max-w-xs mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Compact 4-Stat Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80">
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-white">{result.stats.totalQuestions}</span>
          <span className="text-[10px] text-zinc-400 font-medium">{t.statQuestions}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-purple-400">{result.stats.matches}</span>
          <span className="text-[10px] text-zinc-400 font-medium">{t.statMatches}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-amber-400">{result.stats.plotTwists}</span>
          <span className="text-[10px] text-zinc-400 font-medium">{t.statPlotTwists}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-zinc-400">{result.stats.skips}</span>
          <span className="text-[10px] text-zinc-400 font-medium">{t.statSkips}</span>
        </div>
      </div>

      {/* Conversational Observation */}
      <div className="text-xs text-zinc-400 italic mb-6 leading-relaxed px-2">
        "{observation}"
      </div>

      {/* Watermark Tagline */}
      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">
        Find your vibe • Vibey
      </div>
    </div>
  );
};
