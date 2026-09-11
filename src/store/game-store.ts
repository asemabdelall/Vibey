import { create } from 'zustand';
import { GameEngine } from '../lib/game-engine';
import { haptics } from '../lib/haptics';
import { ResultEngine } from '../lib/result-engine';
import { soundManager } from '../lib/sound-manager';
import { storage } from '../lib/storage';
import type {
  GameMode,
  Language,
  Player,
  QuestionItem,
  Screen,
  SessionLength,
  SessionResult,
  SessionStats,
  TurnMode,
} from '../types/game';

interface GameState {
  language: Language;
  soundEnabled: boolean;
  screen: Screen;
  mode: GameMode;
  sessionLength: SessionLength;
  turnMode: TurnMode;
  currentTurnPlayer: Player;

  // Deck & Current Card
  deck: QuestionItem[];
  currentIndex: number;

  // Quick Choice state
  p1Choice: number | null;
  p2Choice: number | null;
  choiceResolution: 'none' | 'matched' | 'differed';

  // Guess Me state
  guessStep: 'pick-secret' | 'ready-pass' | 'guesser-pick' | 'revealed';
  secretChoiceIndex: number | null;
  guessedChoiceIndex: number | null;
  guessIsCorrect: boolean | null;

  // Open Conversation state
  isCardLiked: boolean;
  showFollowUp: boolean;

  // Stats & Results
  stats: SessionStats;
  sessionResult: SessionResult | null;

  // Actions
  setLanguage: (lang: Language) => void;
  toggleSound: () => void;
  setScreen: (screen: Screen) => void;
  selectMode: (mode: GameMode) => void;
  startSession: (length?: SessionLength, turnMode?: TurnMode) => void;
  exitSession: () => void;

  // Card Interactions
  answerQuickChoice: (player: Player, optionIdx: number) => void;
  clearQuickChoice: () => void;
  likeCard: () => void;
  toggleFollowUp: () => void;
  setGuessSecret: (optionIdx: number) => void;
  readyToPassPhone: () => void;
  submitGuess: (optionIdx: number) => void;
  nextCard: () => void;
  skipCard: () => void;
  plotTwistDone: () => void;
}

const initialStats: SessionStats = {
  totalQuestions: 0,
  matches: 0,
  differences: 0,
  skips: 0,
  liked: 0,
  guessCorrect: 0,
  guessTotal: 0,
  plotTwists: 0,
  levelReached: 1,
  tagsEngaged: {},
};

export const useGameStore = create<GameState>((set, get) => ({
  language: storage.getLanguage(),
  soundEnabled: storage.getSound(),
  screen: 'splash',
  mode: storage.getLastMode(),
  sessionLength: 20,
  turnMode: 'free',
  currentTurnPlayer: 1,

  deck: [],
  currentIndex: 0,

  p1Choice: null,
  p2Choice: null,
  choiceResolution: 'none',

  guessStep: 'pick-secret',
  secretChoiceIndex: null,
  guessedChoiceIndex: null,
  guessIsCorrect: null,

  isCardLiked: false,
  showFollowUp: false,

  stats: { ...initialStats },
  sessionResult: null,

  setLanguage: (lang: Language) => {
    storage.setLanguage(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    soundManager.play('tap');
    haptics.choice();
    set({ language: lang });
  },

  toggleSound: () => {
    const nextState = soundManager.toggle();
    set({ soundEnabled: nextState });
  },

  setScreen: (screen: Screen) => {
    soundManager.play('tap');
    set({ screen });
  },

  selectMode: (mode: GameMode) => {
    storage.setLastMode(mode);
    soundManager.play('choiceSelect');
    haptics.choice();
    set({ mode, screen: 'setup' });
  },

  startSession: (length = 20, turnMode = 'free') => {
    const { mode } = get();
    const newDeck = GameEngine.generateSessionDeck(mode, length);

    soundManager.play('tap');
    haptics.choice();
    storage.incrementSessions();

    set({
      sessionLength: length,
      turnMode,
      deck: newDeck,
      currentIndex: 0,
      currentTurnPlayer: 1,
      p1Choice: null,
      p2Choice: null,
      choiceResolution: 'none',
      guessStep: 'pick-secret',
      secretChoiceIndex: null,
      guessedChoiceIndex: null,
      guessIsCorrect: null,
      isCardLiked: false,
      showFollowUp: false,
      stats: { ...initialStats, totalQuestions: length },
      sessionResult: null,
      screen: 'game',
    });
  },

  exitSession: () => {
    soundManager.play('tap');
    set({ screen: 'home' });
  },

  answerQuickChoice: (player: Player, optionIdx: number) => {
    const state = get();
    soundManager.play('choiceSelect');
    haptics.choice();

    let newP1 = state.p1Choice;
    let newP2 = state.p2Choice;

    if (player === 1) {
      newP1 = optionIdx;
    } else {
      newP2 = optionIdx;
    }

    if (newP1 !== null && newP2 !== null) {
      // Both have chosen! Evaluate match vs diff
      const isMatch = newP1 === newP2;
      const currentQ = state.deck[state.currentIndex];

      if (isMatch) {
        soundManager.play('match');
        haptics.choice();
      } else {
        soundManager.play('different');
        haptics.choice();
      }

      // Record stats
      const newStats = { ...state.stats };
      if (isMatch) {
        newStats.matches += 1;
      } else {
        newStats.differences += 1;
      }
      if (currentQ) {
        currentQ.tags.forEach((tag) => {
          newStats.tagsEngaged[tag] = (newStats.tagsEngaged[tag] || 0) + 1;
        });
      }

      set({
        p1Choice: newP1,
        p2Choice: newP2,
        choiceResolution: isMatch ? 'matched' : 'differed',
        stats: newStats,
      });
    } else {
      set({
        p1Choice: newP1,
        p2Choice: newP2,
      });
    }
  },

  clearQuickChoice: () => {
    set({
      p1Choice: null,
      p2Choice: null,
      choiceResolution: 'none',
    });
  },

  likeCard: () => {
    const { isCardLiked, stats, deck, currentIndex } = get();
    if (isCardLiked) return; // Prevent double like

    soundManager.play('goodQuestion');
    haptics.goodQuestion();

    const currentQ = deck[currentIndex];
    const newStats = { ...stats, liked: stats.liked + 1 };

    if (currentQ) {
      currentQ.tags.forEach((tag) => {
        storage.recordLikedTag(tag);
        newStats.tagsEngaged[tag] = (newStats.tagsEngaged[tag] || 0) + 1;
      });
    }

    set({
      isCardLiked: true,
      stats: newStats,
    });
  },

  toggleFollowUp: () => {
    soundManager.play('choiceSelect');
    haptics.choice();
    set((state) => ({ showFollowUp: !state.showFollowUp }));
  },

  setGuessSecret: (optionIdx: number) => {
    soundManager.play('choiceSelect');
    haptics.choice();
    set({
      secretChoiceIndex: optionIdx,
      guessStep: 'ready-pass',
    });
  },

  readyToPassPhone: () => {
    soundManager.play('tap');
    haptics.choice();
    set({
      guessStep: 'guesser-pick',
    });
  },

  submitGuess: (optionIdx: number) => {
    const { secretChoiceIndex, stats } = get();
    const isCorrect = optionIdx === secretChoiceIndex;

    if (isCorrect) {
      soundManager.play('guessCorrect');
      haptics.guessCorrect();
    } else {
      soundManager.play('guessWrong');
      haptics.guessWrong();
    }

    const newStats = {
      ...stats,
      guessTotal: stats.guessTotal + 1,
      guessCorrect: stats.guessCorrect + (isCorrect ? 1 : 0),
    };

    set({
      guessedChoiceIndex: optionIdx,
      guessIsCorrect: isCorrect,
      guessStep: 'revealed',
      stats: newStats,
    });
  },

  plotTwistDone: () => {
    soundManager.play('goodQuestion');
    haptics.plotTwist();
    const { stats } = get();
    set({
      stats: {
        ...stats,
        plotTwists: stats.plotTwists + 1,
      },
    });
    get().nextCard();
  },

  nextCard: () => {
    const { deck, currentIndex, sessionLength, stats, turnMode, currentTurnPlayer } = get();
    soundManager.play('cardSwipe');
    haptics.cardSwipe();

    const currentQ = deck[currentIndex];
    const newStats = { ...stats };
    if (currentQ) {
      newStats.levelReached = Math.max(newStats.levelReached, currentQ.level);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= deck.length || nextIndex >= sessionLength) {
      // Session Completed! Calculate holistic result
      const calculated = ResultEngine.calculateResult(newStats);
      soundManager.play('resultReveal');
      set({
        stats: newStats,
        sessionResult: calculated,
        screen: 'result',
      });
      return;
    }

    // Advance to next card
    set({
      currentIndex: nextIndex,
      currentTurnPlayer: turnMode === 'alternating' ? (currentTurnPlayer === 1 ? 2 : 1) : 1,
      p1Choice: null,
      p2Choice: null,
      choiceResolution: 'none',
      guessStep: 'pick-secret',
      secretChoiceIndex: null,
      guessedChoiceIndex: null,
      guessIsCorrect: null,
      isCardLiked: false,
      showFollowUp: false,
      stats: newStats,
    });
  },

  skipCard: () => {
    const { deck, currentIndex, sessionLength, stats, turnMode, currentTurnPlayer } = get();
    soundManager.play('tap');
    haptics.choice();

    const newStats = {
      ...stats,
      skips: stats.skips + 1,
    };

    const nextIndex = currentIndex + 1;

    if (nextIndex >= deck.length || nextIndex >= sessionLength) {
      const calculated = ResultEngine.calculateResult(newStats);
      soundManager.play('resultReveal');
      set({
        stats: newStats,
        sessionResult: calculated,
        screen: 'result',
      });
      return;
    }

    set({
      currentIndex: nextIndex,
      currentTurnPlayer: turnMode === 'alternating' ? (currentTurnPlayer === 1 ? 2 : 1) : 1,
      p1Choice: null,
      p2Choice: null,
      choiceResolution: 'none',
      guessStep: 'pick-secret',
      secretChoiceIndex: null,
      guessedChoiceIndex: null,
      guessIsCorrect: null,
      isCardLiked: false,
      showFollowUp: false,
      stats: newStats,
    });
  },
}));
