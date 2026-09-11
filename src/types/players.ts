export type PlayerId = 'playerA' | 'playerB';

export interface Player {
  id: PlayerId;
  name: string;
}

export interface PlayersState {
  playerA: Player;
  playerB: Player;
}

export interface PlayerValidationResult {
  valid: boolean;
  errorKey?: 'required' | 'tooShort' | 'tooLong' | 'identical' | 'invalidChars';
  messageAr?: string;
  messageEn?: string;
}
