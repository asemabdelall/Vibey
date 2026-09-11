import {
  ALL_QUESTIONS,
  PLOT_TWISTS,
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
   * Determines if a Plot Twist card should be placed.
   * Target: once every 6 to 9 cards, and not on the first 3 or last card.
   */
  public static isPlotTwistSlot(index: number, lastPlotTwistIndex: number, total: number): boolean {
    if (index < 4 || index >= total - 1) return false;
    const distance = index - lastPlotTwistIndex;
    if (distance >= 7) return true;
    return false;
  }

  /**
   * Generates a complete curated deck for a game session.
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
    // We also draw lightly from other modes to create dynamic variety if mode allows
    const candidatePool = [...modeQuestions];

    // Plot twist pool
    const plotTwistPool = [...PLOT_TWISTS];
    // Shuffle plot twists
    const shuffledTwists = this.shuffle([...plotTwistPool]);
    let twistIdx = 0;
    let lastTwistIdx = -99;

    for (let i = 0; i < sessionLength; i++) {
      // Check if this slot should be a Plot Twist
      if (this.isPlotTwistSlot(i, lastTwistIdx, sessionLength) && twistIdx < shuffledTwists.length) {
        const twist = shuffledTwists[twistIdx++];
        deck.push(twist);
        usedIds.add(twist.id);
        lastTwistIdx = i;
        continue;
      }

      const targetLevel = this.getLevelForProgress(i, sessionLength);

      // Find candidates matching mode & level (or level ± 1 if needed)
      let candidates = candidatePool.filter(
        (q) => !usedIds.has(q.id) && Math.abs(q.level - targetLevel) <= (mode === 'deep-talk' || mode === 'quick-vibes' ? 1 : 0)
      );

      if (candidates.length === 0) {
        // Broaden search to include adjacent levels
        candidates = candidatePool.filter((q) => !usedIds.has(q.id) && Math.abs(q.level - targetLevel) <= 1);
      }

      if (candidates.length === 0) {
        // Fallback to any unused question in mode
        candidates = candidatePool.filter((q) => !usedIds.has(q.id));
      }

      if (candidates.length === 0) {
        // Final fallback to any question from all categories
        candidates = ALL_QUESTIONS.filter((q) => !usedIds.has(q.id) && q.type !== 'plot-twist');
      }

      // Filter out previously seen questions if possible
      const unseenCandidates = candidates.filter((q) => !seenIds.has(q.id));
      const activePool = unseenCandidates.length > 0 ? unseenCandidates : candidates;

      // Pick with tag weighting
      const selected = this.pickWeighted(activePool, likedTags);
      deck.push(selected);
      usedIds.add(selected.id);
      storage.markQuestionSeen(selected.id);
    }

    return deck;
  }

  /**
   * Weighted random selection based on user-liked tags.
   */
  private static pickWeighted(pool: QuestionItem[], likedTags: Record<string, number>): QuestionItem {
    if (pool.length === 0) {
      return ALL_QUESTIONS[0];
    }

    const weights = pool.map((item) => {
      let weight = 1.0;
      for (const tag of item.tags) {
        if (likedTags[tag]) {
          weight += Math.min(likedTags[tag] * 0.4, 2.0); // Boost up to +2.0
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
