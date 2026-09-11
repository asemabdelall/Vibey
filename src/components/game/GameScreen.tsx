import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useGameStore } from '../../store/game-store';
import { GuessMeCard } from '../cards/GuessMeCard';
import { MultipleChoiceCard } from '../cards/MultipleChoiceCard';
import { OpenConversationCard } from '../cards/OpenConversationCard';
import { PlotTwistCard } from '../cards/PlotTwistCard';
import { QuickChoiceCard } from '../cards/QuickChoiceCard';
import { SwipeableCardContainer } from '../cards/SwipeableCardContainer';
import { CardControls } from './CardControls';
import { GameHeader } from './GameHeader';

export const GameScreen: React.FC = () => {
  const deck = useGameStore((s) => s.deck);
  const currentIndex = useGameStore((s) => s.currentIndex);
  const currentQuestion = deck[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  // Cards where dragging is enabled (mainly open-conversation and multiple-choice)
  const isInteractiveCard =
    currentQuestion.type === 'open-conversation' || currentQuestion.type === 'multiple-choice';

  const renderCardContent = () => {
    switch (currentQuestion.type) {
      case 'quick-choice':
        return <QuickChoiceCard question={currentQuestion} />;
      case 'multiple-choice':
        return <MultipleChoiceCard question={currentQuestion} />;
      case 'guess-me':
        return <GuessMeCard question={currentQuestion} />;
      case 'plot-twist':
        return <PlotTwistCard question={currentQuestion} />;
      case 'open-conversation':
      default:
        return <OpenConversationCard question={currentQuestion} />;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-4 sm:py-6 max-w-md mx-auto select-none overflow-hidden">
      {/* Top Game Header */}
      <GameHeader />

      {/* Center Animated Question Card Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex justify-center"
          >
            <SwipeableCardContainer canSwipe={isInteractiveCard}>
              {renderCardContent()}
            </SwipeableCardContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Context-Sensitive Controls */}
      <footer className="w-full flex justify-center pt-2">
        {isInteractiveCard ? (
          <CardControls />
        ) : (
          <div className="h-6" /> // Maintain bottom layout balance
        )}
      </footer>
    </div>
  );
};
