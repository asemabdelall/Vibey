import { ALL_BANTER_LINES } from '../data/banter';
import type { BanterConditionContext, BanterEvent, BanterLine } from '../types/banter';
import type { SessionStats } from '../types/game';
import type { PlayersState } from '../types/players';
import { interpolatePlayers } from './player-utils';

export class BanterEngine {
  /**
   * High-priority events that bypass the normal 3-5 card interval.
   */
  private static readonly BYPASS_EVENTS: Set<BanterEvent> = new Set([
    'FIRST_MATCH',
    'MATCH_STREAK',
    'FIRST_DIFFERENCE',
    'DIFFERENCE_STREAK',
    'FIRST_GUESS_CORRECT',
    'GUESS_STREAK',
    'ZERO_GUESS_STREAK',
    'PLOT_TWIST_COMPLETE',
    'CHEMISTRY_ENTER',
    'DEEP_TALK_ENTER',
    'MORE_LIKELY_AGREEMENT',
    'MORE_LIKELY_DISAGREEMENT',
    'SKIP_STREAK',
  ]);

  /**
   * Determines if a banter line is eligible to be shown right now.
   */
  public static shouldShowBanter(
    event: BanterEvent,
    cardsSinceLastBanter: number,
    _stats: SessionStats
  ): boolean {
    // If it's a high-priority landmark event, bypass card pacing
    if (this.BYPASS_EVENTS.has(event)) {
      return true;
    }

    // Normal pacing: require at least 3 cards since last banter
    if (cardsSinceLastBanter < 3) {
      return false;
    }

    // Moderate randomness to keep it feeling unscripted (around 70% chance when interval met)
    return Math.random() < 0.75;
  }

  /**
   * Evaluates an event and selects the best contextual banter line.
   */
  public static evaluateEvent(
    event: BanterEvent,
    stats: SessionStats,
    cardsSinceLastBanter: number,
    players: PlayersState,
    contextExtra?: BanterConditionContext
  ): { line: BanterLine; interpolatedAr: string; interpolatedEn: string } | null {
    if (!this.shouldShowBanter(event, cardsSinceLastBanter, stats)) {
      return null;
    }

    const alreadyShown = new Set(stats.banterShown);

    // Filter matching lines for this event
    const candidates = ALL_BANTER_LINES.filter((line) => {
      // Must match event
      if (line.event !== event) return false;

      // Must not have been shown already in this session
      if (alreadyShown.has(line.id)) return false;

      // Check minOccurrences if defined (e.g. streaks)
      if (line.minOccurrences) {
        if (event === 'MATCH_STREAK' && stats.matchStreak < line.minOccurrences) return false;
        if (event === 'DIFFERENCE_STREAK' && stats.differenceStreak < line.minOccurrences) return false;
        if (event === 'GUESS_STREAK' && stats.guessStreak < line.minOccurrences) return false;
        if (event === 'SKIP_STREAK' && stats.skipStreak < line.minOccurrences) return false;
      }

      // Check custom requires predicate if provided
      if (line.requires && contextExtra) {
        if (!line.requires(contextExtra)) return false;
      }

      return true;
    });

    if (candidates.length === 0) {
      return null;
    }

    // Weighted random selection
    const totalWeight = candidates.reduce((sum, c) => sum + (c.weight || 1), 0);
    let randomVal = Math.random() * totalWeight;
    let selected = candidates[0];

    for (const c of candidates) {
      randomVal -= c.weight || 1;
      if (randomVal <= 0) {
        selected = c;
        break;
      }
    }

    const interpContext = { players };

    return {
      line: selected,
      interpolatedAr: interpolatePlayers(selected.ar, interpContext),
      interpolatedEn: interpolatePlayers(selected.en, interpContext),
    };
  }
}
