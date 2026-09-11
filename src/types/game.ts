import type { SessionMoment } from './banter';
import type { PlayerId } from './players';

export type Language = 'ar' | 'en';

export type GameMode =
  | 'quick-vibes'
  | 'get-to-know-me'
  | 'guess-me'
  | 'chemistry'
  | 'deep-talk';

export type CardType =
  | 'quick-choice'
  | 'multiple-choice'
  | 'open-conversation'
  | 'guess-me'
  | 'plot-twist'
  | 'more-likely'
  | 'point-at';

export type ProgressionLevel = 1 | 2 | 3 | 4 | 5;

export type SessionLength = 10 | 20 | 35;

export type TurnMode = 'free' | 'alternating';

export type Player = 1 | 2;

export interface QuestionContent {
  question: string;
  options?: string[];
  followUp?: string;
  hint?: string;
}

export interface QuestionItem {
  id: string;
  mode: GameMode;
  type: CardType;
  level: ProgressionLevel;
  tags: string[];
  ar: QuestionContent;
  en: QuestionContent;
}

export interface SessionStats {
  totalQuestions: number;
  matches: number;
  differences: number;
  matchStreak: number;
  differenceStreak: number;
  skips: number;
  skipStreak: number;
  liked: number;
  guessCorrect: number;
  guessTotal: number;
  guessCorrectByPlayer: Record<PlayerId, number>;
  guessAttemptsByPlayer: Record<PlayerId, number>;
  guessStreak: number;
  moreLikelyAgreements: number;
  moreLikelyDisagreements: number;
  moreLikelySelections: Record<PlayerId, number>;
  pointAtCardsCompleted: number;
  plotTwists: number;
  levelReached: number;
  tagsEngaged: Record<string, number>;
  banterShown: string[];
  sessionMoments: SessionMoment[];
}

export type ResultArchetypeId =
  | 'same-braincell'
  | 'certified-yappers'
  | 'chill-chemistry'
  | 'unexpectedly-deep'
  | 'opposites-working'
  | 'chaotic-energy';

export interface SessionResult {
  id: ResultArchetypeId;
  emoji: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  observationAr: string;
  observationEn: string;
  accentColor: string;
  stats: SessionStats;
  finalWordsAr?: string;
  finalWordsEn?: string;
  callbackAr?: string;
  callbackEn?: string;
}

export type Screen = 'splash' | 'home' | 'setup' | 'players' | 'game' | 'result';
