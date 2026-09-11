import { CALLBACK_TEMPLATES } from '../data/callbacks';
import { FINAL_WORDS_TEMPLATES } from '../data/final-words';
import type { ResultArchetypeId, SessionStats } from '../types/game';
import type { PlayersState } from '../types/players';
import { interpolatePlayers } from './player-utils';

export interface FinalWordsOutput {
  finalWordsAr: string;
  finalWordsEn: string;
  callbackAr?: string;
  callbackEn?: string;
}

export class FinalWordsEngine {
  public static generate(
    stats: SessionStats,
    archetypeId: ResultArchetypeId,
    players: PlayersState
  ): FinalWordsOutput {
    // 1. Find best matching final word template
    const candidates = FINAL_WORDS_TEMPLATES.filter((tpl) => {
      if (tpl.archetype && tpl.archetype !== archetypeId) {
        return false;
      }
      if (tpl.condition && !tpl.condition(stats)) {
        return false;
      }
      return true;
    });

    candidates.sort((a, b) => b.priority - a.priority);
    const chosenTemplate = candidates[0] || FINAL_WORDS_TEMPLATES[FINAL_WORDS_TEMPLATES.length - 1];

    // Context for interpolation
    const interpContext = {
      players,
    };

    let finalWordsAr = interpolatePlayers(chosenTemplate.ar, interpContext);
    let finalWordsEn = interpolatePlayers(chosenTemplate.en, interpContext);

    // Dynamic replacement for bestGuesser if guess data exists
    const pBAttempts = stats.guessAttemptsByPlayer?.playerB || 0;
    const pACorrect = stats.guessCorrectByPlayer?.playerA || 0;
    const pBCorrect = stats.guessCorrectByPlayer?.playerB || 0;

    let bestGuesser = players.playerA.name;
    let otherPlayer = players.playerB.name;
    if (pBCorrect > pACorrect || (pBCorrect === pACorrect && pBAttempts > 0)) {
      bestGuesser = players.playerB.name;
      otherPlayer = players.playerA.name;
    }

    finalWordsAr = finalWordsAr
      .replace(/\{\{bestGuesser\}\}/g, bestGuesser)
      .replace(/\{\{otherPlayer\}\}/g, otherPlayer);
    finalWordsEn = finalWordsEn
      .replace(/\{\{bestGuesser\}\}/g, bestGuesser)
      .replace(/\{\{otherPlayer\}\}/g, otherPlayer);

    // 2. Check if a callback can be attached from unreferenced session moments
    let callbackAr: string | undefined;
    let callbackEn: string | undefined;

    const eligibleMoments = stats.sessionMoments?.filter((m) => !m.referenced);
    if (eligibleMoments && eligibleMoments.length > 0) {
      const moment = eligibleMoments[0];
      const cbTemplate = CALLBACK_TEMPLATES.find((cb) => cb.type === moment.type) || CALLBACK_TEMPLATES[0];
      if (cbTemplate) {
        callbackAr = interpolatePlayers(cbTemplate.ar, interpContext);
        callbackEn = interpolatePlayers(cbTemplate.en, interpContext);
      }
    }

    return {
      finalWordsAr,
      finalWordsEn,
      callbackAr,
      callbackEn,
    };
  }
}
