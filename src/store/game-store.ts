import { create } from 'zustand';
import { BanterEngine } from '../lib/banter-engine';
import { GameEngine } from '../lib/game-engine';
import { haptics } from '../lib/haptics';
import { ResultEngine } from '../lib/result-engine';
import { SessionMomentsManager } from '../lib/session-moments';
import { soundManager } from '../lib/sound-manager';
import { storage } from '../lib/storage';
import type { BanterConditionContext, BanterEvent, BanterLine } from '../types/banter';
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
import type { PlayerId, PlayersState } from '../types/players';

interface GameState {
  language: Language;
  soundEnabled: boolean;
  screen: Screen;
  mode: GameMode;
  sessionLength: SessionLength;
  turnMode: TurnMode;
  currentTurnPlayer: Player;

  // Players
  players: PlayersState | null;

  // Banter Engine State
  activeBanter: BanterLine | null;
  cardsSinceLastBanter: number;

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
  setPlayers: (nameA: string, nameB: string) => void;
  startSession: (length?: SessionLength, turnMode?: TurnMode) => void;
  exitSession: () => void;
  resetSession: (samePlayers: boolean) => void;

  // Banter actions
  clearBanter: () => void;
  triggerBanter: (event: BanterEvent, extra?: BanterConditionContext) => void;

  // Card Interactions
  answerQuickChoice: (player: Player, optionIdx: number) => void;
  clearQuickChoice: () => void;
  likeCard: () => void;
  toggleFollowUp: () => void;
  setGuessSecret: (optionIdx: number) => void;
  readyToPassPhone: () => void;
  submitGuess: (optionIdx: number) => void;
  recordMoreLikelyResult: (chosenPlayer: PlayerId, isAgreed: boolean, cardId: string) => void;
  recordPointAtResult: (cardId: string) => void;
  nextCard: () => void;
  skipCard: () => void;
  plotTwistDone: () => void;
}

const initialStats: SessionStats = {
  totalQuestions: 0,
  matches: 0,
  differences: 0,
  matchStreak: 0,
  differenceStreak: 0,
  skips: 0,
  skipStreak: 0,
  liked: 0,
  guessCorrect: 0,
  guessTotal: 0,
  guessCorrectByPlayer: { playerA: 0, playerB: 0 },
  guessAttemptsByPlayer: { playerA: 0, playerB: 0 },
  guessStreak: 0,
  moreLikelyAgreements: 0,
  moreLikelyDisagreements: 0,
  moreLikelySelections: { playerA: 0, playerB: 0 },
  pointAtCardsCompleted: 0,
  plotTwists: 0,
  levelReached: 1,
  tagsEngaged: {},
  banterShown: [],
  sessionMoments: [],
};

export const useGameStore = create<GameState>((set, get) => ({
  language: storage.getLanguage(),
  soundEnabled: storage.getSound(),
  screen: 'splash',
  mode: storage.getLastMode(),
  sessionLength: 20,
  turnMode: 'free',
  currentTurnPlayer: 1,

  players: null,
  activeBanter: null,
  cardsSinceLastBanter: 0,

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

  setPlayers: (nameA: string, nameB: string) => {
    set({
      players: {
        playerA: { id: 'playerA', name: nameA.trim() },
        playerB: { id: 'playerB', name: nameB.trim() },
      },
    });
  },

  startSession: (length = 20, turnMode = 'free') => {
    const { mode, players } = get();
    const newDeck = GameEngine.generateSessionDeck(mode, length);

    soundManager.play('tap');
    haptics.choice();
    storage.incrementSessions();

    const freshStats: SessionStats = {
      ...initialStats,
      totalQuestions: length,
      guessCorrectByPlayer: { playerA: 0, playerB: 0 },
      guessAttemptsByPlayer: { playerA: 0, playerB: 0 },
      moreLikelySelections: { playerA: 0, playerB: 0 },
      tagsEngaged: {},
      banterShown: [],
      sessionMoments: [],
    };

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
      stats: freshStats,
      sessionResult: null,
      activeBanter: null,
      cardsSinceLastBanter: 0,
      screen: 'game',
    });

    // Check if initial banter should fire
    if (players) {
      setTimeout(() => {
        get().triggerBanter('SESSION_START');
      }, 800);
    }
  },

  exitSession: () => {
    soundManager.play('tap');
    set({ screen: 'home', activeBanter: null });
  },

  resetSession: (samePlayers: boolean) => {
    const { sessionLength, turnMode } = get();
    if (samePlayers) {
      get().startSession(sessionLength, turnMode);
    } else {
      set({ players: null, screen: 'players', activeBanter: null });
    }
  },

  clearBanter: () => {
    set({ activeBanter: null });
  },

  triggerBanter: (event: BanterEvent, extra?: BanterConditionContext) => {
    const { stats, cardsSinceLastBanter, players } = get();
    if (!players) return;

    const evaluated = BanterEngine.evaluateEvent(event, stats, cardsSinceLastBanter, players, extra);
    if (evaluated) {
      const newBanterShown = [...stats.banterShown, evaluated.line.id];
      set({
        activeBanter: {
          ...evaluated.line,
          ar: evaluated.interpolatedAr,
          en: evaluated.interpolatedEn,
        },
        cardsSinceLastBanter: 0,
        stats: { ...stats, banterShown: newBanterShown },
      });
    }
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
      // Both have chosen!
      const isMatch = newP1 === newP2;
      const currentQ = state.deck[state.currentIndex];

      if (isMatch) {
        soundManager.play('match');
        haptics.choice();
      } else {
        soundManager.play('different');
        haptics.choice();
      }

      // Record stats and streaks
      const newStats: SessionStats = {
        ...state.stats,
        matches: state.stats.matches + (isMatch ? 1 : 0),
        differences: state.stats.differences + (!isMatch ? 1 : 0),
        matchStreak: isMatch ? state.stats.matchStreak + 1 : 0,
        differenceStreak: !isMatch ? state.stats.differenceStreak + 1 : 0,
        skipStreak: 0,
      };

      if (currentQ) {
        currentQ.tags.forEach((tag) => {
          newStats.tagsEngaged[tag] = (newStats.tagsEngaged[tag] || 0) + 1;
        });
      }

      // Record moment if interesting
      if (currentQ) {
        const topic = currentQ.tags[0] || currentQ.id;
        if (!isMatch) {
          SessionMomentsManager.recordMoment(
            newStats.sessionMoments,
            'choice_disagreement',
            currentQ.id,
            state.currentIndex,
            undefined,
            { topic }
          );
        } else {
          SessionMomentsManager.recordMoment(
            newStats.sessionMoments,
            'choice_match',
            currentQ.id,
            state.currentIndex,
            undefined,
            { topic }
          );
        }
      }

      set({
        p1Choice: newP1,
        p2Choice: newP2,
        choiceResolution: isMatch ? 'matched' : 'differed',
        stats: newStats,
      });

      // Trigger contextual banter
      if (isMatch) {
        if (newStats.matches === 1) {
          get().triggerBanter('FIRST_MATCH');
        } else if (newStats.matchStreak >= 3) {
          get().triggerBanter('MATCH_STREAK');
        } else {
          get().triggerBanter('MATCH');
        }
      } else {
        if (newStats.differences === 1) {
          get().triggerBanter('FIRST_DIFFERENCE');
        } else if (newStats.differenceStreak >= 3) {
          get().triggerBanter('DIFFERENCE_STREAK');
        } else {
          get().triggerBanter('DIFFERENCE');
        }
      }
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
    if (isCardLiked) return;

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

    get().triggerBanter('GOOD_QUESTION');
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
    const { secretChoiceIndex, stats, currentTurnPlayer, deck, currentIndex } = get();
    const isCorrect = optionIdx === secretChoiceIndex;

    if (isCorrect) {
      soundManager.play('guessCorrect');
      haptics.guessCorrect();
    } else {
      soundManager.play('guessWrong');
      haptics.guessWrong();
    }

    // Identify who was guessing
    const guesser: PlayerId = currentTurnPlayer === 1 ? 'playerB' : 'playerA';

    const newAttempts = {
      ...stats.guessAttemptsByPlayer,
      [guesser]: (stats.guessAttemptsByPlayer[guesser] || 0) + 1,
    };
    const newCorrect = {
      ...stats.guessCorrectByPlayer,
      [guesser]: (stats.guessCorrectByPlayer[guesser] || 0) + (isCorrect ? 1 : 0),
    };

    const newStats: SessionStats = {
      ...stats,
      guessTotal: stats.guessTotal + 1,
      guessCorrect: stats.guessCorrect + (isCorrect ? 1 : 0),
      guessAttemptsByPlayer: newAttempts,
      guessCorrectByPlayer: newCorrect,
      guessStreak: isCorrect ? stats.guessStreak + 1 : 0,
      skipStreak: 0,
    };

    const currentQ = deck[currentIndex];
    if (currentQ) {
      SessionMomentsManager.recordMoment(
        newStats.sessionMoments,
        isCorrect ? 'guess_correct_streak' : 'guess_wrong_streak',
        currentQ.id,
        currentIndex,
        guesser,
        { isCorrect, currentStreak: newStats.guessStreak }
      );
    }

    set({
      guessedChoiceIndex: optionIdx,
      guessIsCorrect: isCorrect,
      guessStep: 'revealed',
      stats: newStats,
    });

    if (isCorrect) {
      if (newStats.guessCorrect === 1) {
        get().triggerBanter('FIRST_GUESS_CORRECT');
      } else if (newStats.guessStreak >= 3) {
        get().triggerBanter('GUESS_STREAK');
      } else {
        get().triggerBanter('GUESS_CORRECT');
      }
    } else {
      if (newStats.guessTotal >= 3 && newStats.guessCorrect === 0) {
        get().triggerBanter('ZERO_GUESS_STREAK');
      } else {
        get().triggerBanter('GUESS_WRONG');
      }
    }
  },

  recordMoreLikelyResult: (chosenPlayer: PlayerId, isAgreed: boolean, cardId: string) => {
    const { stats, currentIndex } = get();

    const newSelections = {
      ...stats.moreLikelySelections,
      [chosenPlayer]: (stats.moreLikelySelections[chosenPlayer] || 0) + 1,
    };

    const newStats: SessionStats = {
      ...stats,
      moreLikelyAgreements: stats.moreLikelyAgreements + (isAgreed ? 1 : 0),
      moreLikelyDisagreements: stats.moreLikelyDisagreements + (!isAgreed ? 1 : 0),
      moreLikelySelections: newSelections,
      skipStreak: 0,
    };

    SessionMomentsManager.recordMoment(
      newStats.sessionMoments,
      'more_likely_vote',
      cardId,
      currentIndex,
      chosenPlayer,
      { isAgreed }
    );

    set({ stats: newStats });

    get().triggerBanter(isAgreed ? 'MORE_LIKELY_AGREEMENT' : 'MORE_LIKELY_DISAGREEMENT');
  },

  recordPointAtResult: (cardId: string) => {
    const { stats, currentIndex } = get();

    const newStats: SessionStats = {
      ...stats,
      pointAtCardsCompleted: stats.pointAtCardsCompleted + 1,
      skipStreak: 0,
    };

    SessionMomentsManager.recordMoment(
      newStats.sessionMoments,
      'plot_twist_reaction',
      cardId,
      currentIndex
    );

    set({ stats: newStats });

    get().triggerBanter('POINT_AT_SAME_PERSON');
  },

  plotTwistDone: () => {
    soundManager.play('goodQuestion');
    haptics.plotTwist();
    const { stats } = get();
    const newStats = {
      ...stats,
      plotTwists: stats.plotTwists + 1,
      skipStreak: 0,
    };

    set({ stats: newStats });

    get().triggerBanter('PLOT_TWIST_COMPLETE');
    get().nextCard();
  },

  nextCard: () => {
    const {
      deck,
      currentIndex,
      sessionLength,
      stats,
      turnMode,
      currentTurnPlayer,
      players,
      cardsSinceLastBanter,
      mode,
    } = get();

    soundManager.play('cardSwipe');
    haptics.cardSwipe();

    const currentQ = deck[currentIndex];
    const newStats = { ...stats };
    if (currentQ) {
      newStats.levelReached = Math.max(newStats.levelReached, currentQ.level);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= deck.length || nextIndex >= sessionLength) {
      // Session Completed! Calculate result with players
      const calculated = ResultEngine.calculateResult(newStats, players);
      soundManager.play('resultReveal');
      soundManager.play('finalWords');
      set({
        stats: newStats,
        sessionResult: calculated,
        screen: 'result',
      });
      return;
    }

    const newCardsSinceLastBanter = cardsSinceLastBanter + 1;

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
      cardsSinceLastBanter: newCardsSinceLastBanter,
    });

    // Check for callback candidates if banter interval is met
    if (players && newCardsSinceLastBanter >= 3) {
      const callbackCandidate = SessionMomentsManager.getCallbackCandidate(
        newStats.sessionMoments,
        nextIndex
      );

      if (callbackCandidate) {
        SessionMomentsManager.markReferenced(newStats.sessionMoments, callbackCandidate.moment.id);
        const lineAr = callbackCandidate.template.ar.replace(/\{\{playerA\}\}/g, players.playerA.name).replace(/\{\{playerB\}\}/g, players.playerB.name);
        const lineEn = callbackCandidate.template.en.replace(/\{\{playerA\}\}/g, players.playerA.name).replace(/\{\{playerB\}\}/g, players.playerB.name);

        set({
          activeBanter: {
            id: `callback_${callbackCandidate.moment.id}`,
            event: 'CALLBACK',
            ar: lineAr,
            en: lineEn,
            tone: 'playful',
          },
          cardsSinceLastBanter: 0,
        });
        soundManager.play('callback');
        return;
      }
    }

    // Check milestone pacing events
    if (nextIndex === Math.floor(sessionLength / 2)) {
      get().triggerBanter('HALFWAY');
    } else if (nextIndex === sessionLength - 2) {
      get().triggerBanter('NEAR_END');
    } else if (mode === 'chemistry' && deck[nextIndex]?.level === 3) {
      get().triggerBanter('CHEMISTRY_ENTER');
    } else if (mode === 'deep-talk' && deck[nextIndex]?.level === 4) {
      get().triggerBanter('DEEP_TALK_ENTER');
    }
  },

  skipCard: () => {
    const {
      deck,
      currentIndex,
      sessionLength,
      stats,
      turnMode,
      currentTurnPlayer,
      players,
      cardsSinceLastBanter,
    } = get();

    soundManager.play('tap');
    haptics.choice();

    const newStats = {
      ...stats,
      skips: stats.skips + 1,
      skipStreak: stats.skipStreak + 1,
      matchStreak: 0,
      differenceStreak: 0,
    };

    const nextIndex = currentIndex + 1;

    if (nextIndex >= deck.length || nextIndex >= sessionLength) {
      const calculated = ResultEngine.calculateResult(newStats, players);
      soundManager.play('resultReveal');
      soundManager.play('finalWords');
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
      cardsSinceLastBanter: cardsSinceLastBanter + 1,
    });

    if (newStats.skips === 1) {
      get().triggerBanter('FIRST_SKIP');
    } else if (newStats.skipStreak >= 2) {
      get().triggerBanter('SKIP_STREAK');
    } else {
      get().triggerBanter('SKIP');
    }
  },
}));
