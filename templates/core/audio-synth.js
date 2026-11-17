/**
 * Sıfır Bağımlılıklı Web Audio API Prosedürel Ses Sentezleyici
 */
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('egilab_muted') === '1';
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('egilab_muted', this.muted ? '1' : '0');
    return this.muted;
  }

  _tone({ freq = 440, endFreq = null, duration = 0.12, type = 'sine', gain = 0.18, delay = 0 }) {
    if (this.muted) return;
    this.unlock();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const amp = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    amp.gain.setValueAtTime(0.001, now);
    amp.gain.linearRampToValueAtTime(gain, now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(amp);
    amp.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  click() {
    this._tone({ freq: 520, endFreq: 320, duration: 0.06, type: 'triangle', gain: 0.12 });
  }

  jump() {
    this._tone({ freq: 260, endFreq: 620, duration: 0.16, type: 'sine', gain: 0.16 });
  }

  correct(combo = 1) {
    const base = 523.25 * Math.min(1.5, 1 + (combo - 1) * 0.06);
    this._tone({ freq: base, duration: 0.1, type: 'sine', gain: 0.16 });
    this._tone({ freq: base * 1.25, duration: 0.16, type: 'sine', gain: 0.16, delay: 0.07 });
  }

  wrong() {
    this._tone({ freq: 240, endFreq: 140, duration: 0.22, type: 'triangle', gain: 0.16 });
  }

  win() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this._tone({ freq: f, duration: 0.18, type: 'triangle', gain: 0.16, delay: i * 0.09 });
    });
  }
}

export const sfx = new AudioSynth();
