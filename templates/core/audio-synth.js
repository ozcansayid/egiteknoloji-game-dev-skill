/**
 * Hibrit Ses Yöneticisi: Özel Ses Dosyaları (assets/sounds/) + Web Audio Fallback
 */
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('egilab_muted') === '1';
    this.bank = new Map(); // key -> AudioBuffer
    this.bgmSource = null;
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
    if (this.muted && this.bgmSource) {
      try { this.bgmSource.stop(); } catch (_) {}
      this.bgmSource = null;
    }
    return this.muted;
  }

  /**
   * Özel ses dosyalarını yükler: sfx.loadBank({ click: 'assets/sounds/ui/click.mp3' })
   */
  async loadBank(manifest = {}) {
    this.unlock();
    if (!this.ctx) return;
    await Promise.all(
      Object.entries(manifest).map(async ([key, url]) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return;
          const buf = await res.arrayBuffer();
          const decoded = await this.ctx.decodeAudioData(buf);
          this.bank.set(key, decoded);
        } catch (_) {}
      })
    );
  }

  playBuffer(key, { volume = 0.7, rate = 1, loop = false } = {}) {
    if (this.muted || !this.bank.has(key)) return false;
    this.unlock();
    if (!this.ctx) return false;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = this.bank.get(key);
    src.playbackRate.value = rate;
    src.loop = loop;
    gain.gain.value = volume;
    src.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(0);
    if (loop) this.bgmSource = src;
    return true;
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
    if (this.playBuffer('click')) return;
    this._tone({ freq: 520, endFreq: 320, duration: 0.06, type: 'triangle', gain: 0.12 });
  }

  jump() {
    if (this.playBuffer('jump')) return;
    this._tone({ freq: 260, endFreq: 620, duration: 0.16, type: 'sine', gain: 0.16 });
  }

  correct(combo = 1) {
    const rate = Math.min(1.35, 1 + (combo - 1) * 0.05);
    if (this.playBuffer('correct', { rate })) return;
    const base = 523.25 * Math.min(1.5, 1 + (combo - 1) * 0.06);
    this._tone({ freq: base, duration: 0.1, type: 'sine', gain: 0.16 });
    this._tone({ freq: base * 1.25, duration: 0.16, type: 'sine', gain: 0.16, delay: 0.07 });
  }

  wrong() {
    if (this.playBuffer('wrong')) return;
    this._tone({ freq: 240, endFreq: 140, duration: 0.22, type: 'triangle', gain: 0.16 });
  }

  win() {
    if (this.playBuffer('win')) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this._tone({ freq: f, duration: 0.18, type: 'triangle', gain: 0.16, delay: i * 0.09 });
    });
  }
}

export const sfx = new AudioSynth();
