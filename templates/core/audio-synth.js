/**
 * Hibrit Ses Yöneticisi: Özel Ses Dosyaları (assets/sounds/) + Web Audio Fallback + BGM
 */
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('egilab_muted') === '1';
    this.bank = new Map(); // key -> AudioBuffer (kısa SFX için)
    this.bgmAudio = null;
    this.bgmVolume = 0.25;
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.bgmAudio && !this.muted && this.bgmAudio.paused) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('egilab_muted', this.muted ? '1' : '0');
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.muted;
      if (!this.muted && this.bgmAudio.paused) {
        this.bgmAudio.play().catch(() => {});
      }
    }
    return this.muted;
  }

  /**
   * Kısa SFX dosyalarını önceden yükler:
   * sfx.loadBank({ click: 'assets/sounds/ui/click.mp3', correct: 'assets/sounds/feedback/correct.mp3' })
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

  /**
   * Arka plan müziği (BGM) başlatır (düşük sesle döngüye alır, mute durumuna uyar).
   */
  playBgm(url, { volume = 0.25 } = {}) {
    this.bgmVolume = volume;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = this.muted;
    this.bgmAudio = audio;
    if (!this.muted) {
      audio.play().catch(() => {});
    }
  }

  pauseBgm() {
    if (this.bgmAudio && !this.bgmAudio.paused) this.bgmAudio.pause();
  }

  resumeBgm() {
    if (this.bgmAudio && !this.muted && this.bgmAudio.paused) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }
  }

  playBuffer(key, { volume = 0.75, rate = 1 } = {}) {
    if (this.muted || !this.bank.has(key)) return false;
    this.unlock();
    if (!this.ctx) return false;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = this.bank.get(key);
    src.playbackRate.value = rate;
    gain.gain.value = volume;
    src.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(0);
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

  // --- UI Sesleri ---
  click() {
    if (this.playBuffer('click', { volume: 0.65 })) return;
    this._tone({ freq: 520, endFreq: 320, duration: 0.06, type: 'triangle', gain: 0.12 });
  }

  hover() {
    if (this.playBuffer('hover', { volume: 0.35 })) return;
  }

  pop() {
    if (this.playBuffer('pop', { volume: 0.6 })) return;
    this._tone({ freq: 400, endFreq: 680, duration: 0.08, type: 'sine', gain: 0.12 });
  }

  cardFlip() {
    if (this.playBuffer('cardFlip', { volume: 0.65 })) return;
    this.swoosh();
  }

  pageFlip() {
    if (this.playBuffer('pageFlip', { volume: 0.65 })) return;
    this.swoosh();
  }

  // --- Geri Bildirim & Ödül Sesleri ---
  correct(combo = 1) {
    const rate = Math.min(1.3, 1 + (combo - 1) * 0.05);
    if (this.playBuffer('correct', { rate })) return;
    const base = 523.25 * Math.min(1.5, 1 + (combo - 1) * 0.06);
    this._tone({ freq: base, duration: 0.1, type: 'sine', gain: 0.16 });
    this._tone({ freq: base * 1.25, duration: 0.16, type: 'sine', gain: 0.16, delay: 0.07 });
  }

  wrong() {
    if (this.playBuffer('wrong', { volume: 0.65 })) return;
    this._tone({ freq: 240, endFreq: 140, duration: 0.22, type: 'triangle', gain: 0.16 });
  }

  collect() {
    if (this.playBuffer('collect', { volume: 0.7 })) return;
    this.correct(1);
  }

  bonus() {
    if (this.playBuffer('bonus', { volume: 0.75 })) return;
    this.win();
  }

  levelUp() {
    if (this.playBuffer('levelUp', { volume: 0.75 })) return;
    this.win();
  }

  win() {
    if (this.playBuffer('win', { volume: 0.8 })) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this._tone({ freq: f, duration: 0.18, type: 'triangle', gain: 0.16, delay: i * 0.09 });
    });
  }

  // --- Oyun Mekaniği & Fizik Sesleri ---
  jump() {
    if (this.playBuffer('jump', { volume: 0.7 })) return;
    this._tone({ freq: 260, endFreq: 620, duration: 0.16, type: 'sine', gain: 0.16 });
  }

  hit() {
    if (this.playBuffer('hit', { volume: 0.7 })) return;
    this._tone({ freq: 150, endFreq: 60, duration: 0.14, type: 'sawtooth', gain: 0.14 });
  }

  spin() {
    if (this.playBuffer('spin', { volume: 0.65 })) return;
  }

  swoosh() {
    if (this.playBuffer('swoosh', { volume: 0.6 })) return;
    this._tone({ freq: 320, endFreq: 540, duration: 0.09, type: 'sine', gain: 0.08 });
  }
}

export const sfx = new AudioSynth();
