import type { GameMode, QuestionItem } from '../../types/game';
import { MORE_LIKELY_QUESTIONS } from '../more-likely';
import { POINT_AT_QUESTIONS } from '../point-at';
import { CHEMISTRY_QUESTIONS } from './chemistry';
import { DEEP_TALK_QUESTIONS } from './deep-talk';
import { GET_TO_KNOW_ME_QUESTIONS } from './get-to-know-me';
import { GUESS_ME_QUESTIONS } from './guess-me';
import { PLOT_TWISTS } from './plot-twists';
import { QUICK_VIBES_QUESTIONS } from './quick-vibes';

export const ALL_QUESTIONS: QuestionItem[] = [
  ...QUICK_VIBES_QUESTIONS,
  ...GET_TO_KNOW_ME_QUESTIONS,
  ...GUESS_ME_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...DEEP_TALK_QUESTIONS,
  ...PLOT_TWISTS,
  ...MORE_LIKELY_QUESTIONS,
  ...POINT_AT_QUESTIONS,
];

export const QUESTIONS_BY_MODE: Record<GameMode, QuestionItem[]> = {
  'quick-vibes': QUICK_VIBES_QUESTIONS,
  'get-to-know-me': GET_TO_KNOW_ME_QUESTIONS,
  'guess-me': GUESS_ME_QUESTIONS,
  'chemistry': CHEMISTRY_QUESTIONS,
  'deep-talk': DEEP_TALK_QUESTIONS,
};

export {
  CHEMISTRY_QUESTIONS,
  DEEP_TALK_QUESTIONS,
  GET_TO_KNOW_ME_QUESTIONS,
  GUESS_ME_QUESTIONS,
  MORE_LIKELY_QUESTIONS,
  PLOT_TWISTS,
  POINT_AT_QUESTIONS,
  QUICK_VIBES_QUESTIONS,
};

export const TOTAL_QUESTIONS_COUNT = ALL_QUESTIONS.length;
