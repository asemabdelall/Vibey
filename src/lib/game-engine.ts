import {
  ALL_QUESTIONS,
  MORE_LIKELY_QUESTIONS,
  PLOT_TWISTS,
  POINT_AT_QUESTIONS,
  QUESTIONS_BY_MODE,
} from '../data/questions';
import type { GameMode, ProgressionLevel, QuestionItem, SessionLength } from '../types/game';
import { storage } from './storage';

export class GameEngine {
  /**
   * Calculates current target level based on card index and total session cards.
   * Progression curve: Casual (L1) -> Personality (L2) -> Stories/Opinions (L3) -> Chemistry (L4) -> Deep (L5)
   */
  public static getLevelForProgress(index: number, total: SessionLength): ProgressionLevel {
    const fraction = index / total;

    if (fraction < 0.2) {
      return 1;
    } else if (fraction < 0.4) {
      return 2;
    } else if (fraction < 0.65) {
      return 3;
    } else if (fraction < 0.85) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Generates a complete curated deck for a game session with balanced special card pacing.
   */
  public static generateSessionDeck(
    mode: GameMode,
    sessionLength: SessionLength
  ): QuestionItem[] {
    const deck: QuestionItem[] = [];
    const usedIds = new Set<string>();
    const seenIds = new Set<string>(storage.getSeenQuestions());
    const likedTags = storage.getLikedTags();

    // Pool for base questions
    const modeQuestions = QUESTIONS_BY_MODE[mode] || ALL_QUESTIONS;
    const candidatePool = [...modeQuestions];

    // Shuffled special card pools
    const shuffledTwists = this.shuffle([...PLOT_TWISTS]);
    const shuffledMoreLikely = this.shuffle([...MORE_LIKELY_QUESTIONS]);
    const shuffledPointAt = this.shuffle([...POINT_AT_QUESTIONS]);

    let twistIdx = 0;
    let moreLikelyIdx = 0;
    let pointAtIdx = 0;

    let lastSpecialCardIndex = -99;

    // Determine target counts of special cards based on session length
    const maxTwists = sessionLength === 10 ? 1 : sessionLength === 20 ? 2 : 3;
    const maxMoreLikely = sessionLength === 10 ? 1 : sessionLength === 20 ? 3 : 4;
    const maxPointAt = sessionLength === 10 ? 1 : sessionLength === 20 ? 2 : 3;

    let twistsPlaced = 0;
    let moreLikelyPlaced = 0;
    let pointAtPlaced = 0;

    for (let i = 0; i < sessionLength; i++) {
      const isNotFirstOrLast = i >= 2 && i < sessionLength - 1;
      const spacingOk = i - lastSpecialCardIndex >= 3; // Ensure at least 2 standard cards between specials

      // Check for More Likely slot
      if (
        isNotFirstOrLast &&
        spacingOk &&
        moreLikelyPlaced < maxMoreLikely &&
        (i % 5 === 2 || (i > 3 && Math.random() < 0.4)) &&
        moreLikelyIdx < shuffledMoreLikely.length
      ) {
        const card = shuffledMoreLikely[moreLikelyIdx++];
        deck.push(card);
        usedIds.add(card.id);
        moreLikelyPlaced++;
        lastSpecialCardIndex = i;
        continue;
      }

      // Check for Plot Twist slot
      if (
        isNotFirstOrLast &&
        spacingOk &&
        twistsPlaced < maxTwists &&
        (i % 7 === 4 || i - lastSpecialCardIndex >= 6) &&
        twistIdx < shuffledTwists.length
      ) {
        const twist = shuffledTwists[twistIdx++];
        deck.push(twist);
        usedIds.add(twist.id);
        twistsPlaced++;
        lastSpecialCardIndex = i;
        continue;
      }

      // Check for Point At Them slot
      if (
        isNotFirstOrLast &&
        spacingOk &&
        pointAtPlaced < maxPointAt &&
        (i % 6 === 3 || Math.random() < 0.3) &&
        pointAtIdx < shuffledPointAt.length
      ) {
        const card = shuffledPointAt[pointAtIdx++];
        deck.push(card);
        usedIds.add(card.id);
        pointAtPlaced++;
        lastSpecialCardIndex = i;
        continue;
      }

      // Standard question slot
      const targetLevel = this.getLevelForProgress(i, sessionLength);

      // Find candidates matching mode & level
      let candidates = candidatePool.filter(
        (q) =>
          !usedIds.has(q.id) &&
          q.type !== 'plot-twist' &&
          q.type !== 'more-likely' &&
          q.type !== 'point-at' &&
          Math.abs(q.level - targetLevel) <= (mode === 'deep-talk' || mode === 'quick-vibes' ? 1 : 0)
      );

      if (candidates.length === 0) {
        candidates = candidatePool.filter(
          (q) =>
            !usedIds.has(q.id) &&
            q.type !== 'plot-twist' &&
            q.type !== 'more-likely' &&
            q.type !== 'point-at' &&
            Math.abs(q.level - targetLevel) <= 1
        );
      }

      if (candidates.length === 0) {
        candidates = candidatePool.filter(
          (q) =>
            !usedIds.has(q.id) &&
            q.type !== 'plot-twist' &&
            q.type !== 'more-likely' &&
            q.type !== 'point-at'
        );
      }

      if (candidates.length === 0) {
        candidates = ALL_QUESTIONS.filter(
          (q) =>
            !usedIds.has(q.id) &&
            q.type !== 'plot-twist' &&
            q.type !== 'more-likely' &&
            q.type !== 'point-at'
        );
      }

      const unseenCandidates = candidates.filter((q) => !seenIds.has(q.id));
      const activePool = unseenCandidates.length > 0 ? unseenCandidates : candidates;

      const selected = this.pickWeighted(activePool, likedTags);
      deck.push(selected);
      usedIds.add(selected.id);
      storage.markQuestionSeen(selected.id);
    }

    return deck;
  }

  private static pickWeighted(pool: QuestionItem[], likedTags: Record<string, number>): QuestionItem {
    if (pool.length === 0) {
      return ALL_QUESTIONS[0];
    }

    const weights = pool.map((item) => {
      let weight = 1.0;
      for (const tag of item.tags) {
        if (likedTags[tag]) {
          weight += Math.min(likedTags[tag] * 0.4, 2.0);
        }
      }
      return weight;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < pool.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        return pool[i];
      }
    }

    return pool[pool.length - 1];
  }

  private static shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
