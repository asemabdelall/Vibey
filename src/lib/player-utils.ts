import type { Language, Player } from '../types/game';
import type { PlayerId, PlayersState, PlayerValidationResult } from '../types/players';

export function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    // Normalize Arabic alef, teh marbuta, etc.
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ');
}

export function validatePlayerNames(
  nameA: string,
  nameB: string,
  _language: Language = 'ar'
): PlayerValidationResult {
  const trimmedA = nameA.trim();
  const trimmedB = nameB.trim();

  if (!trimmedA || !trimmedB) {
    return {
      valid: false,
      errorKey: 'required',
      messageAr: 'اكتبوا الاسمين عشان نبدأ 👀',
      messageEn: 'Please enter both names to start 👀',
    };
  }

  if (trimmedA.length < 1 || trimmedB.length < 1) {
    return {
      valid: false,
      errorKey: 'tooShort',
      messageAr: 'الاسم لازم يكون حرف على الأقل',
      messageEn: 'Names must be at least 1 character',
    };
  }

  if (trimmedA.length > 20 || trimmedB.length > 20) {
    return {
      valid: false,
      errorKey: 'tooLong',
      messageAr: 'الاسم طويل شوية (أقصى حاجة ٢٠ حرف)',
      messageEn: 'Name is a bit too long (max 20 characters)',
    };
  }

  if (normalizeName(trimmedA) === normalizeName(trimmedB)) {
    return {
      valid: false,
      errorKey: 'identical',
      messageAr: 'الاسمين شبه بعض بالظبط.. اختاروا ألقاب مختلفة عشان منتلخبطش 😭',
      messageEn: 'Names cannot be identical, use nicknames so we can tell you apart 😭',
    };
  }

  return {
    valid: true,
  };
}

export interface InterpolationContext {
  players: PlayersState;
  currentTurnPlayer?: Player; // 1 | 2
  currentPlayer?: string;
  otherPlayer?: string;
}

export function interpolatePlayers(
  template: string,
  context: InterpolationContext
): string {
  if (!template || !context?.players) return template || '';

  const { playerA, playerB } = context.players;
  const current = context.currentPlayer
    ? { name: context.currentPlayer }
    : context.currentTurnPlayer === 2
    ? playerB
    : playerA;
  const other = context.otherPlayer
    ? { name: context.otherPlayer }
    : context.currentTurnPlayer === 2
    ? playerA
    : playerB;

  return template
    .replace(/\{\{playerA\}\}/g, playerA.name)
    .replace(/\{\{playerB\}\}/g, playerB.name)
    .replace(/\{\{currentPlayer\}\}/g, current.name)
    .replace(/\{\{otherPlayer\}\}/g, other.name)
    .replace(/\{\{randomPlayer\}\}/g, () =>
      Math.random() > 0.5 ? playerA.name : playerB.name
    );
}

export function getPlayerName(
  id: PlayerId,
  players?: PlayersState | null
): string {
  if (!players) {
    return id === 'playerA' ? 'الشخص الأول' : 'الشخص التاني';
  }
  return players[id]?.name || (id === 'playerA' ? 'الشخص الأول' : 'الشخص التاني');
}

export function getCurrentPlayer(
  turnPlayer: Player,
  players?: PlayersState | null
): { id: PlayerId; name: string } {
  const id: PlayerId = turnPlayer === 2 ? 'playerB' : 'playerA';
  return {
    id,
    name: getPlayerName(id, players),
  };
}

export function getOtherPlayer(
  turnPlayer: Player,
  players?: PlayersState | null
): { id: PlayerId; name: string } {
  const id: PlayerId = turnPlayer === 2 ? 'playerA' : 'playerB';
  return {
    id,
    name: getPlayerName(id, players),
  };
}
