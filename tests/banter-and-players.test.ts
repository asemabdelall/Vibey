import { describe, expect, it } from 'vitest';
import { BanterEngine } from '../src/lib/banter-engine';
import { FinalWordsEngine } from '../src/lib/final-words-engine';
import { interpolatePlayers, validatePlayerNames } from '../src/lib/player-utils';
import { SessionMomentsManager } from '../src/lib/session-moments';
import { useGameStore } from '../src/store/game-store';
import type { SessionStats } from '../src/types/game';
import type { PlayersState } from '../src/types/players';

describe('Player Names Validation & Interpolation', () => {
  it('should accept valid Arabic player names', () => {
    const result = validatePlayerNames('عاصم', 'سارة', 'ar');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should accept valid English player names and preserve casing', () => {
    const result = validatePlayerNames('Alex', 'Jordan', 'en');
    expect(result.valid).toBe(true);
  });

  it('should trim whitespace around names', () => {
    const result = validatePlayerNames('  Asem  ', '  Sara  ', 'en');
    expect(result.valid).toBe(true);
  });

  it('should reject blank or whitespace-only names', () => {
    const result = validatePlayerNames('   ', 'Sara', 'en');
    expect(result.valid).toBe(false);
  });

  it('should reject identical names after normalization', () => {
    const resultAr = validatePlayerNames('عاصم', 'عاصم', 'ar');
    expect(resultAr.valid).toBe(false);

    const resultEn = validatePlayerNames('Asem', 'asem', 'en');
    expect(resultEn.valid).toBe(false);
  });

  it('should reject names longer than 20 characters', () => {
    const longName = 'ThisNameIsWayTooLongToBeValid';
    const result = validatePlayerNames(longName, 'Sara', 'en');
    expect(result.valid).toBe(false);
  });

  it('should correctly interpolate player placeholders', () => {
    const players: PlayersState = {
      playerA: { id: 'playerA', name: 'عاصم' },
      playerB: { id: 'playerB', name: 'سارة' },
    };

    const text = '{{playerA}}، دورك… {{playerB}} ممنوع تبص 👀';
    const interpolated = interpolatePlayers(text, { players });
    expect(interpolated).toBe('عاصم، دورك… سارة ممنوع تبص 👀');
  });

  it('should interpolate currentPlayer and otherPlayer', () => {
    const players: PlayersState = {
      playerA: { id: 'playerA', name: 'Asem' },
      playerB: { id: 'playerB', name: 'Sara' },
    };

    const text = '{{currentPlayer}} chose secretly, {{otherPlayer}} get ready!';
    const interpolated = interpolatePlayers(text, {
      players,
      currentPlayer: 'Asem',
      otherPlayer: 'Sara',
    });
    expect(interpolated).toBe('Asem chose secretly, Sara get ready!');
  });
});

describe('Banter Engine Pacing & Selection', () => {
  const mockPlayers: PlayersState = {
    playerA: { id: 'playerA', name: 'عاصم' },
    playerB: { id: 'playerB', name: 'سارة' },
  };

  const createStats = (overrides?: Partial<SessionStats>): SessionStats => ({
    totalQuestions: 20,
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
    ...overrides,
  });

  it('should bypass card interval for landmark events', () => {
    const stats = createStats();
    // Cards since last banter is 0, but FIRST_MATCH is landmark
    const shouldShow = BanterEngine.shouldShowBanter('FIRST_MATCH', 0, stats);
    expect(shouldShow).toBe(true);

    const shouldShowTwist = BanterEngine.shouldShowBanter('PLOT_TWIST_COMPLETE', 0, stats);
    expect(shouldShowTwist).toBe(true);
  });

  it('should respect cooldown interval (<3 cards) for normal banter events', () => {
    const stats = createStats();
    const shouldShow = BanterEngine.shouldShowBanter('MATCH', 1, stats);
    expect(shouldShow).toBe(false);
  });

  it('never shows the same banter line twice in one session', () => {
    const stats = createStats({ banterShown: ['first_match_01'] });
    const evaluated = BanterEngine.evaluateEvent('FIRST_MATCH', stats, 5, mockPlayers);

    if (evaluated) {
      expect(evaluated.line.id).not.toBe('first_match_01');
    }
  });

  it('evaluates match streaks and difference streaks', () => {
    const statsMatchStreak = createStats({ matchStreak: 3 });
    const matchStreakResult = BanterEngine.evaluateEvent(
      'MATCH_STREAK',
      statsMatchStreak,
      0,
      mockPlayers
    );
    expect(matchStreakResult).not.toBeNull();
    expect(matchStreakResult?.line.event).toBe('MATCH_STREAK');

    const statsDiffStreak = createStats({ differenceStreak: 3 });
    const diffStreakResult = BanterEngine.evaluateEvent(
      'DIFFERENCE_STREAK',
      statsDiffStreak,
      0,
      mockPlayers
    );
    expect(diffStreakResult).not.toBeNull();
    expect(diffStreakResult?.line.event).toBe('DIFFERENCE_STREAK');
  });
});

describe('Session Moments & Callback System', () => {
  it('records moments and respects callback eligibility rules', () => {
    const moments = SessionMomentsManager.createInitialState();

    // Record a moment at card index 2
    SessionMomentsManager.recordMoment(
      moments,
      'choice_disagreement',
      'beach_city',
      2,
      undefined,
      { topic: 'بحر' }
    );

    // At card index 4 (only 2 cards passed, need >= 4)
    const tooEarly = SessionMomentsManager.getCallbackCandidate(moments, 4);
    expect(tooEarly).toBeNull();

    // At card index 7 (5 cards passed, >= 4)
    const eligible = SessionMomentsManager.getCallbackCandidate(moments, 7);
    expect(eligible).not.toBeNull();
    expect(eligible?.moment.cardId).toBe('beach_city');

    // Mark as referenced
    SessionMomentsManager.markReferenced(moments, eligible!.moment.id);
    expect(moments[0].referenced).toBe(true);

    // Should no longer be returned as candidate
    const afterReferenced = SessionMomentsManager.getCallbackCandidate(moments, 8);
    expect(afterReferenced).toBeNull();
  });
});

describe('Final Words Engine', () => {
  const mockPlayers: PlayersState = {
    playerA: { id: 'playerA', name: 'عاصم' },
    playerB: { id: 'playerB', name: 'سارة' },
  };

  it('selects personalized final words based on high match stats', () => {
    const stats: SessionStats = {
      totalQuestions: 20,
      matches: 12,
      differences: 2,
      matchStreak: 4,
      differenceStreak: 0,
      skips: 0,
      skipStreak: 0,
      liked: 3,
      guessCorrect: 4,
      guessTotal: 4,
      guessCorrectByPlayer: { playerA: 2, playerB: 2 },
      guessAttemptsByPlayer: { playerA: 2, playerB: 2 },
      guessStreak: 4,
      moreLikelyAgreements: 3,
      moreLikelyDisagreements: 0,
      moreLikelySelections: { playerA: 2, playerB: 1 },
      pointAtCardsCompleted: 2,
      plotTwists: 2,
      levelReached: 4,
      tagsEngaged: {},
      banterShown: [],
      sessionMoments: [],
    };

    const output = FinalWordsEngine.generate(stats, 'same-braincell', mockPlayers);
    expect(output.finalWordsAr).toBeDefined();
    expect(output.finalWordsEn).toBeDefined();
    expect(output.finalWordsAr.length).toBeGreaterThan(5);
  });
});

describe('Game Store Session & Reset Flow', () => {
  it('updates player state properly and resets session', () => {
    const store = useGameStore.getState();

    // Set players
    store.setPlayers('عاصم', 'سارة');
    expect(useGameStore.getState().players?.playerA.name).toBe('عاصم');
    expect(useGameStore.getState().players?.playerB.name).toBe('سارة');

    // Record More Likely result
    store.recordMoreLikelyResult('playerA', true, 'q_test_1');
    const stats = useGameStore.getState().stats;
    expect(stats.moreLikelyAgreements).toBe(1);
    expect(stats.moreLikelySelections.playerA).toBe(1);

    // Record Point At result
    store.recordPointAtResult('q_point_1');
    expect(useGameStore.getState().stats.pointAtCardsCompleted).toBe(1);

    // Reset with same players
    store.resetSession(true);
    expect(useGameStore.getState().players?.playerA.name).toBe('عاصم');
    expect(useGameStore.getState().stats.matches).toBe(0);

    // Reset with new players
    store.resetSession(false);
    expect(useGameStore.getState().players).toBeNull();
    expect(useGameStore.getState().screen).toBe('players');
  });
});
