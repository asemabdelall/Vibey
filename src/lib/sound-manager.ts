// SoundManager using Web Audio API synthesis
// 100% offline, zero latency, zero external asset dependencies

type SoundType =
  | 'tap'
  | 'cardSwipe'
  | 'choiceSelect'
  | 'match'
  | 'different'
  | 'goodQuestion'
  | 'plotTwist'
  | 'guessCorrect'
  | 'guessWrong'
  | 'resultReveal';

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vibey_sound');
      this.enabled = stored !== null ? stored === 'true' : true;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vibey_sound', enabled ? 'true' : 'false');
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.play('tap');
    }
    return this.enabled;
  }

  public play(type: SoundType) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      switch (type) {
        case 'tap': {
          // Subtle, ultra-soft tick
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.035);
          break;
        }

        case 'cardSwipe': {
          // Soft airy whoosh
          const bufferSize = ctx.sampleRate * 0.08;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800, now);
          filter.frequency.exponentialRampToValueAtTime(300, now + 0.08);
          filter.Q.value = 1.8;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.035, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
          noise.stop(now + 0.085);
          break;
        }

        case 'choiceSelect': {
          // Crisp satisfying bubble pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.045);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.055);
          break;
        }

        case 'match': {
          // Harmonious uplifting 3-tone chime (E5, G#5, B5)
          const notes = [659.25, 830.61, 987.77];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = now + idx * 0.045;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.065, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.36);
          });
          break;
        }

        case 'different': {
          // Playful two-tone descending boop ("Defend your answer!")
          const tones = [520, 390];
          tones.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = now + idx * 0.08;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.06, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.13);
          });
          break;
        }

        case 'goodQuestion': {
          // Warm crackle & ascending spark
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(587.33, now); // D5
          osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(739.99, now); // F#5
          osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15); // D6

          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.21);
          osc2.stop(now + 0.21);
          break;
        }

        case 'plotTwist': {
          // Deep impact + shimmer
          const sub = ctx.createOscillator();
          const subGain = ctx.createGain();
          sub.type = 'sine';
          sub.frequency.setValueAtTime(110, now);
          sub.frequency.exponentialRampToValueAtTime(45, now + 0.3);
          subGain.gain.setValueAtTime(0.12, now);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          sub.connect(subGain);
          subGain.connect(ctx.destination);
          sub.start(now);
          sub.stop(now + 0.36);

          // Chime sweep
          const chime = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chime.type = 'triangle';
          chime.frequency.setValueAtTime(440, now + 0.05);
          chime.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);
          chimeGain.gain.setValueAtTime(0.05, now + 0.05);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          chime.connect(chimeGain);
          chimeGain.connect(ctx.destination);
          chime.start(now + 0.05);
          chime.stop(now + 0.42);
          break;
        }

        case 'guessCorrect': {
          // Cheerful triumphant sparkle arpeggio
          const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = now + idx * 0.05;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.06, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.26);
          });
          break;
        }

        case 'guessWrong': {
          // Soft comical wobble
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(260, now);
          osc.frequency.linearRampToValueAtTime(220, now + 0.06);
          osc.frequency.linearRampToValueAtTime(240, now + 0.12);
          osc.frequency.linearRampToValueAtTime(190, now + 0.22);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.26);
          break;
        }

        case 'resultReveal': {
          // Celestial ambient chord (Ab, C, Eb, G) with gentle shimmer
          const chord = [415.3, 523.25, 622.25, 783.99];
          chord.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = now + idx * 0.08;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.05, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.75);
          });
          break;
        }
      }
    } catch {
      // AudioContext failure recovery or muted safely
    }
  }
}

export const soundManager = new SoundManager();
