// Haptics engine with graceful fallback

export const haptics = {
  vibrate(pattern: number | number[]) {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignored on unsupported browsers or blocked policy
      }
    }
  },

  choice() {
    this.vibrate(10);
  },

  goodQuestion() {
    this.vibrate(15);
  },

  guessCorrect() {
    this.vibrate(20);
  },

  guessWrong() {
    this.vibrate([10, 30, 10]);
  },

  plotTwist() {
    this.vibrate([15, 30, 15]);
  },

  cardSwipe() {
    this.vibrate(8);
  },
};
