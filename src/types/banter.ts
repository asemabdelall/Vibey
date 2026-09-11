import type { PlayerId } from './players';

export type BanterEvent =
  | 'SESSION_START'
  | 'FIRST_MATCH'
  | 'MATCH'
  | 'MATCH_STREAK'
  | 'FIRST_DIFFERENCE'
  | 'DIFFERENCE'
  | 'DIFFERENCE_STREAK'
  | 'FIRST_SKIP'
  | 'SKIP'
  | 'SKIP_STREAK'
  | 'GOOD_QUESTION'
  | 'FIRST_GUESS_CORRECT'
  | 'GUESS_CORRECT'
  | 'GUESS_WRONG'
  | 'GUESS_STREAK'
  | 'ZERO_GUESS_STREAK'
  | 'PLOT_TWIST_COMPLETE'
  | 'CHEMISTRY_ENTER'
  | 'DEEP_TALK_ENTER'
  | 'HALFWAY'
  | 'NEAR_END'
  | 'SESSION_END'
  | 'MORE_LIKELY_AGREEMENT'
  | 'MORE_LIKELY_DISAGREEMENT'
  | 'POINT_AT_SAME_PERSON'
  | 'POINT_AT_DIFFERENT_PEOPLE'
  | 'CALLBACK'
  | 'RARE_EVENT';

export type BanterTone = 'playful' | 'teasing' | 'reaction' | 'dramatic' | 'wholesome';

export interface BanterConditionContext {
  matchStreak?: number;
  differenceStreak?: number;
  guessStreak?: number;
  skipsCount?: number;
  currentIndex?: number;
  totalCards?: number;
  [key: string]: unknown;
}

export interface BanterLine {
  id: string;
  event: BanterEvent;
  ar: string;
  en: string;
  minOccurrences?: number;
  maxOccurrences?: number;
  cooldown?: number;
  weight?: number;
  tone: BanterTone;
  requires?: (context: BanterConditionContext) => boolean;
}

export type MomentType =
  | 'choice_disagreement'
  | 'choice_match'
  | 'category_focus'
  | 'guess_streak'
  | 'guess_correct_streak'
  | 'guess_wrong_streak'
  | 'more_likely_targeted'
  | 'more_likely_vote'
  | 'skips_cluster'
  | 'plot_twist'
  | 'plot_twist_reaction'
  | 'favorite_topic';

export interface SessionMoment {
  id: string;
  type: MomentType;
  cardId: string;
  playerId?: PlayerId;
  metadata?: Record<string, string | number | boolean>;
  createdAtCard: number;
  referenced: boolean;
}
