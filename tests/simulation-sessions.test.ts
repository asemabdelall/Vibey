import { describe, expect, it } from 'vitest';
import { BanterEngine } from '../src/lib/banter-engine';
import { FinalWordsEngine } from '../src/lib/final-words-engine';
import { GameEngine } from '../src/lib/game-engine';
import { ResultEngine } from '../src/lib/result-engine';
import type { SessionStats } from '../src/types/game';
import type { PlayersState } from '../src/types/players';

describe('Simulated Gameplay Sessions (A through G)', () => {
  const players: PlayersState = {
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

  // Session A: Frequent Agreement (High Matches)
  it('Session A: Two players who agree frequently feel harmonious & telepathic', () => {
    const stats = createStats({
      totalQuestions: 20,
      matches: 14,
      differences: 2,
      matchStreak: 5,
      guessTotal: 3,
      guessCorrect: 3,
      guessStreak: 3,
      guessCorrectByPlayer: { playerA: 1, playerB: 2 },
      guessAttemptsByPlayer: { playerA: 1, playerB: 2 },
      moreLikelyAgreements: 3,
    });

    const result = ResultEngine.calculateResult(stats, players);
    expect(result.id).toBe('same-braincell');
    expect(result.finalWordsAr).toContain('عاصم');
    expect(result.finalWordsAr).toContain('سارة');

    // Test match streak banter evaluation
    const banter = BanterEngine.evaluateEvent('MATCH_STREAK', stats, 0, players);
    expect(banter).not.toBeNull();
  });

  // Session B: Frequent Disagreement
  it('Session B: Two players who disagree frequently get teasing disagreement banter', () => {
    const stats = createStats({
      totalQuestions: 20,
      matches: 2,
      differences: 13,
      differenceStreak: 4,
      liked: 3,
      moreLikelyDisagreements: 3,
    });

    const result = ResultEngine.calculateResult(stats, players);
    expect(result.id).toBe('opposites-working');

    const finalWords = FinalWordsEngine.generate(stats, result.id, players);
    expect(finalWords.finalWordsAr).toBeDefined();

    const diffBanter = BanterEngine.evaluateEvent('DIFFERENCE_STREAK', stats, 0, players);
    expect(diffBanter).not.toBeNull();
  });

  // Session C: High Guess Me Accuracy
  it('Session C: High Guess Me accuracy highlights mind-reading', () => {
    const stats = createStats({
      totalQuestions: 20,
      guessTotal: 5,
      guessCorrect: 5,
      guessStreak: 5,
      guessCorrectByPlayer: { playerA: 2, playerB: 3 },
      guessAttemptsByPlayer: { playerA: 2, playerB: 3 },
    });

    const banter = BanterEngine.evaluateEvent('GUESS_STREAK', stats, 0, players);
    expect(banter).not.toBeNull();
    expect(banter?.line.event).toBe('GUESS_STREAK');
  });

  // Session D: Terrible Guess Me Accuracy
  it('Session D: Zero correct guesses triggers funny zero-guess banter', () => {
    const stats = createStats({
      totalQuestions: 20,
      guessTotal: 4,
      guessCorrect: 0,
      guessStreak: 0,
      guessAttemptsByPlayer: { playerA: 2, playerB: 2 },
      guessCorrectByPlayer: { playerA: 0, playerB: 0 },
    });

    const banter = BanterEngine.evaluateEvent('ZERO_GUESS_STREAK', stats, 0, players);
    expect(banter).not.toBeNull();
    expect(banter?.line.event).toBe('ZERO_GUESS_STREAK');
    expect(banter?.interpolatedAr.length).toBeGreaterThan(5);
  });

  // Session E: Many Skips (Safe, no shaming)
  it('Session E: Multiple skips keeps tone harmless and never shaming', () => {
    const stats = createStats({
      totalQuestions: 20,
      skips: 5,
      skipStreak: 3,
    });

    const banter = BanterEngine.evaluateEvent('SKIP_STREAK', stats, 0, players);
    expect(banter).not.toBeNull();
    // Verify harmless tone
    expect(banter?.interpolatedAr).not.toContain('طب جاوبوا');
    expect(banter?.interpolatedEn).not.toContain('shy');
  });

  // Session F: High Engagement with Chemistry
  it('Session F: Chemistry mode triggers smooth flirty-yet-playful transitions', () => {
    const stats = createStats({
      totalQuestions: 20,
      tagsEngaged: { chemistry: 4, spark: 2, attraction: 2 },
      levelReached: 4,
    });

    const result = ResultEngine.calculateResult(stats, players);
    expect(result.id).toBe('chill-chemistry');

    const chemBanter = BanterEngine.evaluateEvent('CHEMISTRY_ENTER', stats, 0, players);
    expect(chemBanter).not.toBeNull();
    expect(chemBanter?.line.event).toBe('CHEMISTRY_ENTER');
  });

  // Session G: Mixed Normal Session with Deck Generator
  it('Session G: Normal 20-card session contains healthy balance of all card types', () => {
    const deck = GameEngine.generateSessionDeck('get-to-know-me', 20);
    expect(deck.length).toBe(20);

    const types = deck.map((c) => c.type);
    const moreLikelyCount = types.filter((t) => t === 'more-likely').length;
    const pointAtCount = types.filter((t) => t === 'point-at').length;
    const plotTwistCount = types.filter((t) => t === 'plot-twist').length;

    // Verify special card frequency fits target specifications
    expect(moreLikelyCount).toBeGreaterThanOrEqual(1);
    expect(pointAtCount).toBeGreaterThanOrEqual(1);
    expect(plotTwistCount).toBeGreaterThanOrEqual(1);

    // Verify no two special cards are back-to-back
    for (let i = 0; i < deck.length - 1; i++) {
      const isSpec1 = ['more-likely', 'point-at', 'plot-twist'].includes(deck[i].type);
      const isSpec2 = ['more-likely', 'point-at', 'plot-twist'].includes(deck[i + 1].type);
      expect(isSpec1 && isSpec2).toBe(false);
    }
  });
});
