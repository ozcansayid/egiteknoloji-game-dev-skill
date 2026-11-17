/**
 * EgiteknolojiLab 2D Canvas Engine
 * HiDPI ölçekleme, güvenli delta-time, State Machine ve birleşik girdi (Klavye + Pointer)
 */
export class GameEngine {
  constructor(canvas, { virtualWidth = 1280, virtualHeight = 720, onUpdate, onRender } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.virtualWidth = virtualWidth;
    this.virtualHeight = virtualHeight;
    this.onUpdate = onUpdate || (() => {});
    this.onRender = onRender || (() => {});

    this.state = 'MENU'; // MENU | PLAYING | PAUSED | GAME_OVER
    this.keys = new Set();
    this.pointer = { x: 0, y: 0, down: false, justPressed: false };

    this._rafId = null;
    this._lastTime = 0;
    this._scaleX = 1;
    this._scaleY = 1;

    this._bindEvents();
    this.resize();
  }

  _bindEvents() {
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);

    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    const toVirtual = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * this.virtualWidth,
        y: ((clientY - rect.top) / rect.height) * this.virtualHeight,
      };
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      const pos = toVirtual(e.clientX, e.clientY);
      this.pointer.x = pos.x;
      this.pointer.y = pos.y;
      this.pointer.down = true;
      this.pointer.justPressed = true;
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.pointer.down) return;
      const pos = toVirtual(e.clientX, e.clientY);
      this.pointer.x = pos.x;
      this.pointer.y = pos.y;
    });

    window.addEventListener('pointerup', () => {
      this.pointer.down = false;
    });
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    this._scaleX = w / this.virtualWidth;
    this._scaleY = h / this.virtualHeight;
  }

  setState(nextState) {
    this.state = nextState;
  }

  start() {
    if (this._rafId) return;
    this._lastTime = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - this._lastTime) / 1000, 0.05);
      this._lastTime = now;

      if (this.state === 'PLAYING') {
        this.onUpdate(dt, this);
      }

      this.ctx.setTransform(this._scaleX, 0, 0, this._scaleY, 0, 0);
      this.ctx.clearRect(0, 0, this.virtualWidth, this.virtualHeight);
      this.onRender(this.ctx, this);

      this.pointer.justPressed = false;
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this._onResize);
  }
}
