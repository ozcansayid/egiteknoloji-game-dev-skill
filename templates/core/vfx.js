/**
 * Hafif Parçacık, Yüzen Metin ve Erişilebilir Ekran Sarsıntısı (VFX)
 */
export class VfxManager {
  constructor() {
    this.particles = [];
    this.texts = [];
    this.shakeTime = 0;
    this.shakeIntensity = 0;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  shake(intensity = 6, duration = 0.18) {
    if (this.reducedMotion) return;
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    this.shakeTime = Math.max(this.shakeTime, duration);
  }

  burst(x, y, color = '#FF8C3B', count = 12) {
    const total = this.reducedMotion ? Math.min(4, count) : count;
    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 * i) / total + Math.random() * 0.4;
      const speed = 80 + Math.random() * 180;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 4 + Math.random() * 4,
        color,
        life: 0.45 + Math.random() * 0.2,
        maxLife: 0.65,
      });
    }
  }

  floatText(x, y, text, color = '#1E2A4A') {
    this.texts.push({ x, y, text, color, life: 0.8, maxLife: 0.8 });
  }

  update(dt) {
    if (this.shakeTime > 0) {
      this.shakeTime = Math.max(0, this.shakeTime - dt);
      if (this.shakeTime === 0) this.shakeIntensity = 0;
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 260 * dt;
    }

    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt;
      t.y -= 42 * dt;
      if (t.life <= 0) this.texts.splice(i, 1);
    }
  }

  applyShake(ctx) {
    if (this.shakeTime <= 0) return;
    const dx = (Math.random() * 2 - 1) * this.shakeIntensity;
    const dy = (Math.random() * 2 - 1) * this.shakeIntensity;
    ctx.translate(dx, dy);
  }

  render(ctx) {
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.font = '700 24px system-ui, sans-serif';
    for (const t of this.texts) {
      ctx.globalAlpha = Math.max(0, t.life / t.maxLife);
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
    }
    ctx.globalAlpha = 1;
  }
}
