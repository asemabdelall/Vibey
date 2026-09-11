import type { GameMode, Language } from '../types/game';

const KEYS = {
  LANGUAGE: 'vibey_language',
  SOUND: 'vibey_sound',
  SEEN_QUESTIONS: 'vibey_seen_questions',
  LIKED_TAGS: 'vibey_liked_tags',
  SESSIONS_COUNT: 'vibey_sessions',
  LAST_MODE: 'vibey_last_mode',
} as const;

export const storage = {
  getLanguage(): Language {
    if (typeof window === 'undefined') return 'ar';
    const lang = localStorage.getItem(KEYS.LANGUAGE);
    return lang === 'en' ? 'en' : 'ar';
  },

  setLanguage(lang: Language) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.LANGUAGE, lang);
  },

  getSound(): boolean {
    if (typeof window === 'undefined') return true;
    const sound = localStorage.getItem(KEYS.SOUND);
    return sound !== null ? sound === 'true' : true;
  },

  setSound(enabled: boolean) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.SOUND, enabled ? 'true' : 'false');
  },

  getSeenQuestions(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(KEYS.SEEN_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  markQuestionSeen(id: string) {
    if (typeof window === 'undefined') return;
    const seen = this.getSeenQuestions();
    if (!seen.includes(id)) {
      seen.push(id);
      // Keep last 400 questions to prevent infinite unbounded growth while avoiding repetitions
      const trimmed = seen.slice(-400);
      localStorage.setItem(KEYS.SEEN_QUESTIONS, JSON.stringify(trimmed));
    }
  },

  clearSeenQuestions() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.SEEN_QUESTIONS);
  },

  getLikedTags(): Record<string, number> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(KEYS.LIKED_TAGS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  recordLikedTag(tag: string) {
    if (typeof window === 'undefined') return;
    const tags = this.getLikedTags();
    tags[tag] = (tags[tag] || 0) + 1;
    localStorage.setItem(KEYS.LIKED_TAGS, JSON.stringify(tags));
  },

  getSessionsCount(): number {
    if (typeof window === 'undefined') return 0;
    const count = localStorage.getItem(KEYS.SESSIONS_COUNT);
    return count ? parseInt(count, 10) || 0 : 0;
  },

  incrementSessions() {
    if (typeof window === 'undefined') return;
    const current = this.getSessionsCount();
    localStorage.setItem(KEYS.SESSIONS_COUNT, String(current + 1));
  },

  getLastMode(): GameMode {
    if (typeof window === 'undefined') return 'quick-vibes';
    const mode = localStorage.getItem(KEYS.LAST_MODE) as GameMode;
    const validModes: GameMode[] = [
      'quick-vibes',
      'get-to-know-me',
      'guess-me',
      'chemistry',
      'deep-talk',
    ];
    return validModes.includes(mode) ? mode : 'quick-vibes';
  },

  setLastMode(mode: GameMode) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.LAST_MODE, mode);
  },
};
