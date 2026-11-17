/**
 * EgiteknolojiLab SCORM 1.2 + postMessage İlerleme Köprüsü
 * LMS ortamı yoksa sessizce Standalone Web + postMessage modunda çalışır.
 */
class ScormBridge {
  constructor() {
    this.api = this._findApi(window);
    this.initialized = false;
    this.startTime = Date.now();
  }

  _findApi(win) {
    let attempts = 0;
    let current = win;
    while (current && attempts < 10) {
      if (current.API) return current.API;
      if (current.parent === current) break;
      current = current.parent;
      attempts++;
    }
    if (win.opener && !win.opener.closed && win.opener.API) {
      return win.opener.API;
    }
    return null;
  }

  init() {
    if (!this.api || this.initialized) return false;
    const ok = this.api.LMSInitialize('') === 'true';
    if (ok) {
      this.initialized = true;
      const status = this.api.LMSGetValue('cmi.core.lesson_status');
      if (!status || status === 'not attempted') {
        this.api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
        this.api.LMSCommit('');
      }
    }
    return ok;
  }

  report({ score = 0, maxScore = 100, passed = false, completed = false } = {}) {
    const normalized = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const durationSec = Math.round((Date.now() - this.startTime) / 1000);

    // 1. egiteknolojilab.com / iframe postMessage bildirimi
    try {
      window.parent.postMessage(
        {
          source: 'egiteknolojilab',
          event: completed ? 'GAME_COMPLETED' : 'GAME_PROGRESS',
          score: normalized,
          rawScore: score,
          maxScore,
          passed,
          completed,
          durationSec,
        },
        '*'
      );
    } catch (_) {}

    // 2. SCORM 1.2 LMS bildirimi
    if (!this.initialized && this.api) this.init();
    if (this.initialized && this.api) {
      this.api.LMSSetValue('cmi.core.score.min', '0');
      this.api.LMSSetValue('cmi.core.score.max', '100');
      this.api.LMSSetValue('cmi.core.score.raw', String(normalized));
      if (completed) {
        this.api.LMSSetValue('cmi.core.lesson_status', passed ? 'passed' : 'completed');
      }
      this.api.LMSCommit('');
    }
  }

  finish() {
    if (this.initialized && this.api) {
      this.api.LMSFinish('');
      this.initialized = false;
    }
  }
}

export const scorm = new ScormBridge();
window.addEventListener('beforeunload', () => scorm.finish());
