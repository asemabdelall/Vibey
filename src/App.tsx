import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { VibeyWaves } from './components/brand/VibeyWaves';
import { GameScreen } from './components/game/GameScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { IntroSplash } from './components/home/IntroSplash';
import { SessionSetupModal } from './components/home/SessionSetupModal';
import { ResultScreen } from './components/results/ResultScreen';
import { PWAUpdateToast } from './components/pwa/PWAUpdateToast';
import { useGameStore } from './store/game-store';

export const App: React.FC = () => {
  const screen = useGameStore((s) => s.screen);
  const language = useGameStore((s) => s.language);

  // Sync html lang and dir attribute on startup or language toggle
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'splash':
        return <IntroSplash key="splash" />;
      case 'home':
        return <HomeScreen key="home" />;
      case 'setup':
        return <SessionSetupModal key="setup" />;
      case 'game':
        return <GameScreen key="game" />;
      case 'result':
        return <ResultScreen key="result" />;
      default:
        return <IntroSplash key="splash" />;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#09090b] text-[#fafafa] flex flex-col items-center justify-start overflow-hidden select-none">
      {/* Nightlife ambient subtle wave lighting */}
      <VibeyWaves />

      {/* PWA Background Update Toast */}
      <PWAUpdateToast />

      {/* Screen Viewport with smooth spring transition */}
      <div className="w-full min-h-[100dvh] flex flex-col items-center justify-start overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex-1 flex flex-col items-center"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
