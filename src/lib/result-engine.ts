import { FinalWordsEngine } from './final-words-engine';
import { TRANSLATIONS } from './translations';
import type { ResultArchetypeId, SessionResult, SessionStats } from '../types/game';
import type { PlayersState } from '../types/players';

export class ResultEngine {
  public static calculateResult(stats: SessionStats, players?: PlayersState | null): SessionResult {
    const {
      totalQuestions,
      matches,
      differences,
      skips,
      liked,
      guessCorrect,
      guessTotal,
      plotTwists,
      levelReached,
      tagsEngaged,
    } = stats;

    const totalChoices = matches + differences;
    const matchRatio = totalChoices > 0 ? matches / totalChoices : 0;
    const diffRatio = totalChoices > 0 ? differences / totalChoices : 0;
    const guessAccuracy = guessTotal > 0 ? guessCorrect / guessTotal : 0;
    const skipRatio = totalQuestions > 0 ? skips / totalQuestions : 0;
    const deepEngagement = (tagsEngaged['deep-talk'] || 0) + (tagsEngaged['perspective'] || 0) + (tagsEngaged['vulnerability'] || 0);
    const chemistryEngagement = (tagsEngaged['chemistry'] || 0) + (tagsEngaged['attraction'] || 0) + (tagsEngaged['spark'] || 0);

    // Scoring dictionary for the 6 archetypes
    const scores: Record<ResultArchetypeId, number> = {
      'same-braincell': 0,
      'certified-yappers': 0,
      'chill-chemistry': 0,
      'unexpectedly-deep': 0,
      'opposites-working': 0,
      'chaotic-energy': 0,
    };

    // 1. Same Braincell
    if (matchRatio >= 0.55) scores['same-braincell'] += 35;
    if (guessAccuracy >= 0.6) scores['same-braincell'] += 30;
    if (matches >= 4) scores['same-braincell'] += 20;

    // 2. Opposites, Somehow Working
    if (diffRatio >= 0.55 && skipRatio < 0.25) scores['opposites-working'] += 45;
    if (differences >= 4 && liked >= 2) scores['opposites-working'] += 30;
    if (diffRatio >= 0.65) scores['opposites-working'] += 25;

    // 3. Certified Yappers
    if (skipRatio <= 0.15 && liked >= 3) scores['certified-yappers'] += 40;
    if (totalQuestions >= 15 && skips <= 2) scores['certified-yappers'] += 30;

    // 4. Unexpectedly Deep
    if (levelReached >= 4 && deepEngagement >= 3) scores['unexpectedly-deep'] += 45;
    if (tagsEngaged['deep-talk'] && tagsEngaged['deep-talk'] >= 4) scores['unexpectedly-deep'] += 35;

    // 5. Chaotic Energy
    if (plotTwists >= 2) scores['chaotic-energy'] += 35;
    if (tagsEngaged['fun'] || tagsEngaged['memes'] || tagsEngaged['spontaneity']) {
      scores['chaotic-energy'] += 25;
    }

    // 6. Chill Chemistry
    if (chemistryEngagement >= 3) scores['chill-chemistry'] += 35;
    if (skipRatio <= 0.2 && totalChoices >= 2) scores['chill-chemistry'] += 25;

    // Default baseline points to ensure healthy distribution
    scores['chill-chemistry'] += 15;
    scores['certified-yappers'] += 10;
    scores['same-braincell'] += 5;

    // Pick highest scoring archetype
    let highestId: ResultArchetypeId = 'chill-chemistry';
    let highestScore = -1;

    for (const [id, score] of Object.entries(scores) as [ResultArchetypeId, number][]) {
      if (score > highestScore) {
        highestScore = score;
        highestId = id;
      }
    }

    const arMeta = TRANSLATIONS.ar.archetypes[highestId];
    const enMeta = TRANSLATIONS.en.archetypes[highestId];

    const accentMap: Record<ResultArchetypeId, string> = {
      'same-braincell': '#a855f7', // purple
      'certified-yappers': '#ec4899', // pink
      'chill-chemistry': '#8b5cf6', // violet
      'unexpectedly-deep': '#6366f1', // indigo
      'opposites-working': '#f59e0b', // amber
      'chaotic-energy': '#10b981', // emerald
    };

    const emojiMap: Record<ResultArchetypeId, string> = {
      'same-braincell': '🧠',
      'certified-yappers': '🗣️',
      'chill-chemistry': '😌',
      'unexpectedly-deep': '🌙',
      'opposites-working': '⚡',
      'chaotic-energy': '🎲',
    };

    // Generate Final Words & Callbacks if players state is present
    let finalWordsOutput = {
      finalWordsAr: undefined as string | undefined,
      finalWordsEn: undefined as string | undefined,
      callbackAr: undefined as string | undefined,
      callbackEn: undefined as string | undefined,
    };

    if (players) {
      const generated = FinalWordsEngine.generate(stats, highestId, players);
      finalWordsOutput = {
        finalWordsAr: generated.finalWordsAr,
        finalWordsEn: generated.finalWordsEn,
        callbackAr: generated.callbackAr,
        callbackEn: generated.callbackEn,
      };
    }

    return {
      id: highestId,
      emoji: emojiMap[highestId],
      titleAr: arMeta.title,
      titleEn: enMeta.title,
      subtitleAr: arMeta.subtitle,
      subtitleEn: enMeta.subtitle,
      descriptionAr: arMeta.desc,
      descriptionEn: enMeta.desc,
      observationAr: arMeta.observation,
      observationEn: enMeta.observation,
      accentColor: accentMap[highestId],
      stats,
      ...finalWordsOutput,
    };
  }
}
