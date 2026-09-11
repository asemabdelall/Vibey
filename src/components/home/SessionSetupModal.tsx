import { ArrowLeft, ArrowRight, Check, Clock, MessageSquare, Play, RotateCcw } from 'lucide-react';
import React, { useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';
import type { SessionLength, TurnMode } from '../../types/game';

export const SessionSetupModal: React.FC = () => {
  const language = useGameStore((s) => s.language);
  const mode = useGameStore((s) => s.mode);
  const setScreen = useGameStore((s) => s.setScreen);
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const [length, setLength] = useState<SessionLength>(20);
  const [turnMode, setTurnMode] = useState<TurnMode>('free');

  const modeMeta = t.modes[mode];

  const handleStart = () => {
    useGameStore.setState({ sessionLength: length, turnMode });
    setScreen('players');
  };

  const lengths: SessionLength[] = [10, 20, 35];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-6 sm:py-8 max-w-md mx-auto select-none">
      {/* Top Bar with Back Button */}
      <div className="w-full flex items-center justify-between pt-safe pb-2">
        <button
          type="button"
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.back}</span>
        </button>

        <span className="text-xs font-bold text-purple-400 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40">
          {modeMeta.title}
        </span>
      </div>

      {/* Main Content Settings */}
      <div className="w-full flex-1 flex flex-col justify-center my-auto py-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.setupTitle}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{modeMeta.desc}</p>
        </div>

        {/* Section 1: Session Length */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-zinc-300 font-semibold text-sm">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{t.setupTimeQuestion}</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {lengths.map((len) => {
              const info = t.sessionLengths[len];
              const isSelected = length === len;

              return (
                <button
                  key={len}
                  type="button"
                  onClick={() => setLength(len)}
                  className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_20px_-3px_rgba(168,85,247,0.4)] scale-[1.02]'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span
                    className={`text-sm font-bold mb-0.5 ${
                      isSelected ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {info.label}
                  </span>
                  <span className="text-xs font-semibold text-purple-300/90">{info.count}</span>
                  <span className="text-[10px] text-zinc-500 mt-1">{info.time}</span>

                  {isSelected && (
                    <div className="absolute top-1.5 end-1.5 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Turn Mode */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-zinc-300 font-semibold text-sm">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>{t.setupTurnQuestion}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Free flow option */}
            <button
              type="button"
              onClick={() => setTurnMode('free')}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all duration-200 cursor-pointer ${
                turnMode === 'free'
                  ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_-4px_rgba(168,85,247,0.3)]'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  turnMode === 'free'
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold ${
                      turnMode === 'free' ? 'text-white' : 'text-zinc-200'
                    }`}
                  >
                    {t.turnModes.free.title}
                  </h4>
                  {turnMode === 'free' && (
                    <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {t.turnModes.free.desc}
                </p>
              </div>
            </button>

            {/* Alternating turns option */}
            <button
              type="button"
              onClick={() => setTurnMode('alternating')}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all duration-200 cursor-pointer ${
                turnMode === 'alternating'
                  ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_-4px_rgba(168,85,247,0.3)]'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  turnMode === 'alternating'
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold ${
                      turnMode === 'alternating' ? 'text-white' : 'text-zinc-200'
                    }`}
                  >
                    {t.turnModes.alternating.title}
                  </h4>
                  {turnMode === 'alternating' && (
                    <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {t.turnModes.alternating.desc}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Next: Enter Player Names Button */}
      <div className="w-full pb-safe pt-2">
        <button
          type="button"
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-lg shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_-2px_rgba(168,85,247,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white text-white" />
          <span>{isRtl ? 'مين هيلعب؟ 👀' : 'Choose Players 👀'}</span>
        </button>
      </div>
    </div>
  );
};
