/**
 * Hafif, Sıfır Bağımlılıklı Ses ve Video Oynatıcı (Narration / Kısa Konu Videosu)
 */
export function createMediaPlayer(container, { type = 'audio', src, onPlayStateChange } = {}) {
  const media = document.createElement(type === 'video' ? 'video' : 'audio');
  media.src = src;
  media.preload = 'metadata';
  if (type === 'video') {
    media.playsInline = true;
    media.style.cssText = 'width:100%;border-radius:12px;display:block;margin-bottom:8px;';
  }

  const bar = document.createElement('div');
  bar.style.cssText =
    'display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:9999px;' +
    'background:rgba(255,255,255,0.94);box-shadow:0 4px 12px rgba(0,0,0,0.08);';

  const playBtn = document.createElement('button');
  playBtn.type = 'button';
  playBtn.className = 'icon-btn';
  playBtn.setAttribute('aria-label', 'Oynat / Duraklat');
  const iconPlay = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 19V5l11 7-11 7Z"/></svg>';
  const iconPause = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z"/></svg>';
  playBtn.innerHTML = iconPlay;

  const range = document.createElement('input');
  range.type = 'range';
  range.min = '0';
  range.max = '100';
  range.value = '0';
  range.style.cssText = 'flex:1;accent-color:var(--color-primary, #3b72ff);cursor:pointer;';

  const timeLabel = document.createElement('span');
  timeLabel.className = 'hud-counter';
  timeLabel.style.cssText = 'font-size:0.85rem;font-weight:700;min-width:44px;text-align:right;';
  timeLabel.textContent = '0:00';

  const speedBtn = document.createElement('button');
  speedBtn.type = 'button';
  speedBtn.className = 'hud-pill';
  speedBtn.style.cssText = 'border:none;cursor:pointer;padding:4px 10px;font-size:0.8rem;';
  speedBtn.textContent = '1x';

  const speeds = [1, 1.25, 1.5];
  let speedIdx = 0;

  const fmt = (s) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  playBtn.addEventListener('click', () => {
    if (media.paused) {
      media.play().catch(() => {});
    } else {
      media.pause();
    }
  });

  speedBtn.addEventListener('click', () => {
    speedIdx = (speedIdx + 1) % speeds.length;
    media.playbackRate = speeds[speedIdx];
    speedBtn.textContent = `${speeds[speedIdx]}x`;
  });

  range.addEventListener('input', () => {
    if (media.duration) {
      media.currentTime = (Number(range.value) / 100) * media.duration;
    }
  });

  media.addEventListener('play', () => {
    playBtn.innerHTML = iconPause;
    onPlayStateChange?.(true);
  });

  media.addEventListener('pause', () => {
    playBtn.innerHTML = iconPlay;
    onPlayStateChange?.(false);
  });

  media.addEventListener('ended', () => {
    playBtn.innerHTML = iconPlay;
    onPlayStateChange?.(false);
  });

  media.addEventListener('timeupdate', () => {
    if (media.duration) {
      range.value = String((media.currentTime / media.duration) * 100);
    }
    timeLabel.textContent = fmt(media.currentTime);
  });

  if (type === 'video') container.appendChild(media);
  bar.append(playBtn, range, timeLabel, speedBtn);
  container.appendChild(bar);

  return {
    media,
    play: () => media.play(),
    pause: () => media.pause(),
  };
}
