import { CALLBACK_TEMPLATES, type CallbackTemplate } from '../data/callbacks';
import type { MomentType, SessionMoment } from '../types/banter';
import type { PlayerId } from '../types/players';

export class SessionMomentsManager {
  public static createInitialState(): SessionMoment[] {
    return [];
  }

  /**
   * Creates a new session moment entry
   */
  public static createMoment(
    type: MomentType,
    cardId: string,
    currentCardIndex: number,
    metadata?: Record<string, string | number | boolean>,
    playerId?: PlayerId
  ): SessionMoment {
    return {
      id: `moment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      cardId,
      playerId,
      metadata,
      createdAtCard: currentCardIndex,
      referenced: false,
    };
  }

  /**
   * Helper that creates and appends a moment to the session moments list
   */
  public static recordMoment(
    moments: SessionMoment[],
    type: MomentType,
    cardId: string,
    currentCardIndex: number,
    playerId?: PlayerId,
    metadata?: Record<string, string | number | boolean>
  ): SessionMoment {
    const moment = this.createMoment(type, cardId, currentCardIndex, metadata, playerId);
    moments.push(moment);
    return moment;
  }

  /**
   * Checks if an eligible callback exists in session history.
   * Requirement 21:
   * - at least 4 cards have passed
   * - not already referenced
   * - max 1-3 callbacks per normal session
   */
  public static getCallbackCandidate(
    moments: SessionMoment[],
    currentCardIndex: number,
    callbacksAlreadyShown: number = 0
  ): { moment: SessionMoment; template: CallbackTemplate } | null {
    if (callbacksAlreadyShown >= 3) {
      return null;
    }

    const eligible = moments.filter(
      (m) => !m.referenced && currentCardIndex - m.createdAtCard >= 4
    );

    if (eligible.length === 0) {
      return null;
    }

    // Prioritize prominent moments like choice_disagreement or more_likely_vote
    eligible.sort((a, b) => {
      const priority = (type: MomentType) => {
        if (type === 'choice_disagreement') return 3;
        if (type === 'more_likely_vote') return 2;
        if (type === 'guess_correct_streak') return 2;
        return 1;
      };
      return priority(b.type) - priority(a.type);
    });

    for (const moment of eligible) {
      // Find matching callback template by topic or type
      const topic = moment.metadata?.topic as string | undefined;
      let matchedTemplate = CALLBACK_TEMPLATES.find((t) => {
        if (topic && topic.includes('بحر') && t.id === 'cb_beach_city') return true;
        if (topic && topic.includes('beach') && t.id === 'cb_beach_city') return true;
        if (topic && topic.includes('قهوة') && t.id === 'cb_coffee_tea') return true;
        if (topic && topic.includes('coffee') && t.id === 'cb_coffee_tea') return true;
        return t.type === moment.type;
      });

      if (!matchedTemplate) {
        matchedTemplate = CALLBACK_TEMPLATES.find((t) => t.type === moment.type) || CALLBACK_TEMPLATES[0];
      }

      if (matchedTemplate) {
        return {
          moment,
          template: matchedTemplate,
        };
      }
    }

    return null;
  }

  /**
   * Marks a moment as referenced so it never repeats.
   */
  public static markReferenced(
    moments: SessionMoment[],
    momentId: string
  ): SessionMoment[] {
    const target = moments.find((m) => m.id === momentId);
    if (target) {
      target.referenced = true;
    }
    return moments;
  }
}
