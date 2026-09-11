import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useGameStore } from '../../store/game-store';
import type { QuestionItem } from '../../types/game';

interface MultipleChoiceCardProps {
  question: QuestionItem;
}

export const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({ question }) => {
  const language = useGameStore((s) => s.language);
  const qData = question[language] || question.ar;
  const options = qData.options || [];

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight leading-snug mb-6">
        {qData.question}
      </h2>

      <div className="w-full flex flex-col gap-2.5 max-w-sm">
        {options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;

          return (
            <motion.button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              whileTap={{ scale: 0.97 }}
              className={`w-full p-4 rounded-2xl border text-center font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-purple-900/40 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 text-zinc-300 active:bg-zinc-800'
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
