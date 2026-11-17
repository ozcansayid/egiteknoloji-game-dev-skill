# İkonlar, Web Audio SFX ve Hafif Medya Oynatıcı

## 1. İkon Sistemi: Google Material Rounded (Filled) + Telifsiz SVG

Oyun ve arayüz ikonları için birincil standart **Google Material Symbols Rounded (Filled)** stilidir (Apache 2.0 lisansı ile ücretsiz ve ticari kullanıma tamamen açıktır). Alternatif olarak tasarım diline göre (ör. *Doodle* veya *Minimalist*) **Lucide** / **Tabler** veya elle çizilmiş hissi veren `stroke-linecap="round"` telifsiz SVG ikonlar kullanılabilir.

### Çevrimdışı ve Küçük Boyut Kuralı:
- Büyük ikon fontu paketlerini CDN'den yüklemek **SCORM 1.2** ve kapalı okul ağlarında risklidir ve boyutu artırır.
- Bunun yerine **yalnızca oyunda kullanılan ikonlar inline `<svg>`** olarak gömülür.
- Tüm inline SVG ikonlarda tutarlılık için `viewBox="0 0 24 24"`, `fill="currentColor"` ve `aria-hidden="true"` kullanılır.

### Hazır Material Rounded Filled SVG Örnekleri:
- **Play:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 19V5l11 7-11 7Z"/></svg>`
- **Pause:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z"/></svg>`
- **Replay:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"/></svg>`
- **Volume Up:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 20.725v-2.05q2.25-.65 3.625-2.5t1.375-4.2q0-2.35-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.137T21 11.975q0 3.175-1.95 5.613T14 20.725ZM3 15V9h4l5-5v16l-5-5H3Zm11 1.35v-8.7q1.15.55 1.825 1.638t.675 2.712q0 1.625-.675 2.7T14 16.35Z"/></svg>`
- **Volume Off:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m19.8 22.6-3.025-3.025q-.625.4-1.325.688t-1.45.462v-2.05q.35-.125.688-.25t.637-.3L12 14.8V20l-5-5H3V9h3.2L1.4 4.2l1.4-1.4 18.4 18.4-1.4 1.4Zm-.2-5.8-1.45-1.45q.425-.775.638-1.625t.212-1.75q0-2.35-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.137T21 11.975q0 1.325-.363 2.55T19.6 16.8Zm-3.35-3.35L14 11.2V7.65q1.15.55 1.825 1.638t.675 2.712q0 .375-.063.738t-.187.712Z"/></svg>`
- **Check Circle:** `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m10.6 16.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4 4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>`

---

## 2. Özel Ses Kütüphanesi (`assets/sounds/`) ve Web Audio SFX

### A. Mevcut Ses Kataloğu (`assets/sounds/`)
Skill içindeki hazır ses dosyaları şunlardır; yeni bir oyun üretilirken **yalnızca o oyunda kullanılacak sesler** yeni oyunun `assets/sounds/` klasörüne kopyalanır:

- **UI (`ui/`):** `click.mp3`, `hover.mp3`, `pop.mp3`, `card-flip.mp3`, `page-flip.mp3`
- **Geri Bildirim (`feedback/`):** `correct.mp3`, `incorrect.mp3`, `collect.mp3`, `bonus.mp3`, `level-up.mp3`, `game-complete.mp3`, `game-complete-1.mp3`
- **Oyun Mekaniği (`sfx/`):** `jump.mp3`, `hit.mp3`, `spin.mp3`, `swoosh.mp3`
- **Arka Plan Müziği (`bgm/`):**
  - `kids-music.mp3` → Okul Öncesi / İlkokul (3–10 yaş), *ClassDojo*, *Duolingo*, *Soft Toymorphism*
  - `soft-guitar.mp3` → Rahatlatıcı / Bulmaca / Eşleştirme, *Claymorphism*, *Cozy Puzzle*, *Minimalist*
  - `retro.mp3` → Arcade / Platformer / Aksiyon, *Dark Casual*, *Retro*
  - `funk.mp3` → Hızlı Quiz / Yarışma, *Kahoot Flat*, *Fresh Hex-Grid*

### B. Zorunlu Ses Aç/Kapat (Mute) Butonu & BGM Kuralları
- **Zorunlu Mute Butonu:** İster sadece SFX ister BGM kullanılsın, **her oyunun HUD üst barında** tek tıkla erişilebilir **Ses Aç/Kapat (`volume_up` / `volume_off`)** butonu **mutlaka** yer almalıdır.
- **Arka Plan Müziği (BGM):** Oyun temasına uygun `bgm/*.mp3` dosyası `sfx.playBgm('assets/sounds/bgm/retro.mp3', { volume: 0.25 })` ile düşük ses seviyesinde eklenebilir (ilk kullanıcı tıklamasında `sfx.unlock()` ile başlar).
- **Hibrit Fallback (`templates/core/audio-synth.js`):** `sfx.loadBank(...)` ile gerçek dosyalar bağlanır; dosyası olmayan efektlerde otomatik Web Audio sentezine düşülür. `correct(combo)` çağrısında ardışık doğrularda ton hafifçe tizleşir (*pitch escalation*).
- **Durum Kalıcılığı:** Mute tercihi `localStorage` (`egilab_muted`) içinde saklanır.

---

## 3. Hafif Ses ve Video Oynatıcı (`templates/core/media-player.js`)

Etkileşimli içerikte sesli yönerge (narration), telaffuz dinleme veya kısa konu anlatım videosu gerektiğinde harici ağır oynatıcılar (Video.js vb.) yerine **hafif, sıfır bağımlılıklı `media-player.js`** kullanılır.

### Özellikler:
- **Minimal Arayüz:** Oynat/Duraklat, ilerleme çubuğu (scrubbing), süre (`tabular-nums`), hız seçimi (`1x` / `1.25x` / `1.5x`) ve opsiyonel altyazı/metin gösterimi.
- **Ses Çakışmasını Önleme:** Medya oynatıcı başladığında oyun içi arka plan/SFX sesi otomatik kısılır (veya duraklatılır), medya bitince geri açılır.
- **Tasarım Uyumluluğu:** CSS değişkenlerini (`--color-primary`, `--radius-card`) doğrudan oyunun tasarım dilinden miras alır.
