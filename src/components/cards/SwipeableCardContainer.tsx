import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import React, { useState } from 'react';
import { TRANSLATIONS } from '../../lib/translations';
import { useGameStore } from '../../store/game-store';

interface SwipeableCardContainerProps {
  children: React.ReactNode;
  canSwipe?: boolean;
}

export const SwipeableCardContainer: React.FC<SwipeableCardContainerProps> = ({
  children,
  canSwipe = true,
}) => {
  const language = useGameStore((s) => s.language);
  const nextCard = useGameStore((s) => s.nextCard);
  const skipCard = useGameStore((s) => s.skipCard);
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const [exitX, setExitX] = useState<number | null>(null);

  // Background action indicators opacity
  // In RTL: dragging right is back/skip or next?
  // User spec says:
  // "Swipe left: عدّي (Skip)
  //  Swipe right: التالي (Next)"
  const nextOpacity = useTransform(x, [40, 120], [0, 1]);
  const skipOpacity = useTransform(x, [-120, -40], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!canSwipe) return;

    const threshold = 95;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 400) {
      // Swiped Right -> Next (التالي)
      setExitX(350);
      setTimeout(() => {
        nextCard();
        setExitX(null);
      }, 180);
    } else if (info.offset.x < -threshold || velocity < -400) {
      // Swiped Left -> Skip (عدّي)
      setExitX(-350);
      setTimeout(() => {
        skipCard();
        setExitX(null);
      }, 180);
    }
  };

  return (
    <div className="relative w-full max-w-sm flex items-center justify-center my-auto px-2 select-none touch-none">
      {/* Swipe Indicators behind the card */}
      {canSwipe && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-0">
          {/* Left indicator: Skip */}
          <motion.div
            style={{ opacity: skipOpacity }}
            className="flex items-center gap-1 text-xs font-black text-rose-400 bg-rose-950/60 border border-rose-500/40 px-3 py-1.5 rounded-full"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>{t.skip}</span>
          </motion.div>

          {/* Right indicator: Next */}
          <motion.div
            style={{ opacity: nextOpacity }}
            className="flex items-center gap-1 text-xs font-black text-purple-300 bg-purple-950/60 border border-purple-500/40 px-3 py-1.5 rounded-full"
          >
            <span>{t.next}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </motion.div>
        </div>
      )}

      {/* Main Draggable Card Wrapper */}
      <motion.div
        drag={canSwipe ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.65}
        onDragEnd={handleDragEnd}
        animate={exitX !== null ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
        style={{ x, rotate }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="w-full relative z-10 p-6 sm:p-7 rounded-[28px] bg-[#121018]/95 border border-zinc-800/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_-5px_rgba(139,92,246,0.12)] min-h-[300px] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing backdrop-blur-md"
      >
        {children}
      </motion.div>
    </div>
  );
};
