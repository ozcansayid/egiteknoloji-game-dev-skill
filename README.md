# egiteknolojilab-game-dev

**2D HTML5, Canvas ve Vanilla JavaScript** tabanlı etkileşimli eğitsel oyunlar, simülasyonlar, quiz/eşleştirme etkinlikleri ve **SCORM 1.2** uyumlu web içerikleri geliştirmek için hazırlanmış **Agent Skill** paketi.

> **Canlı Örnek / Vitrin Sayfası:** Repo içindeki [`examples/showcase.html`](examples/showcase.html) dosyasını doğrudan tarayıcınızda açarak 8 farklı tasarım dilini, yaş grubu tipografilerini, Mod A (16:9 Canvas) & Mod B (Adaptif Quiz) etkinlik türlerini, Web Audio SFX sentezini ve SCORM 1.2 / `postMessage` çıktılarını canlı olarak test edebilirsiniz.

---

## Özellikler

- **Akıllı Hibrit İş Akışı (`SKILL.md`):** Konu/yaş grubu, yerleşim modu, tasarım dili ve çıktı formatını netleştirir; ardından 5 satırlık mini tasarım özeti (GDD-Lite) çıkarıp doğrudan üretime geçer.
- **12 Tasarım Dili & EdTech Renk Paleti:** *Duolingo Tactile*, *Soft Casual Toymorphism*, *Playful Vector (ClassDojo)*, *Geometric Flat (Kahoot)*, *Hand-Drawn Doodle*, *Dark Casual Toymorphism*, *Claymorphism Cozy*, *Minimalist Scandinavian* ve daha fazlası.
- **Yaş Grubuna Göre Tipografi Matrisi:** `3–6` (Okul Öncesi), `7–10` (İlkokul), `11–15` (Ortaokul) ve `16+` (Lise/Yetişkin) için SIL OFL lisanslı fontlar, `clamp()` ölçekleme, disleksi dostu kurallar ve `tabular-nums` sayaçlar.
- **İki Yerleşim Modu (`game-shell.css`):**
  - **Mod A (16:9 Kilitli Sahne):** Simülasyon, platformer ve arcade oyunlar için `1280×720` sanal çözünürlük ve HiDPI Canvas ölçekleme.
  - **Mod B (Tam Adaptif Mobil Düzen):** Quiz, eşleştirme ve sürükle-bırak etkinlikler için `100dvh` içinde akışkan grid ve `48px+` dokunma hedefleri.
- **Sıfır Bağımlılıklı Çekirdek Modüller (`templates/`):**
  - `engine.js` — HiDPI Canvas, güvenli delta-time (`dt`), State Machine ve birleşik girdi (Klavye + Pointer).
  - `audio-synth.js` — Harici ses dosyası gerektirmeyen Web Audio API prosedürel SFX + combo *pitch escalation* + mute/localStorage.
  - `vfx.js` — Parçacık patlaması, yüzen puan metni ve `prefers-reduced-motion` uyumlu ekran sarsıntısı.
  - `media-player.js` — Sesli yönerge ve kısa konu videoları için hafif oynatıcı.
  - `scorm-api.js` & `imsmanifest.xml` — Moodle/EBA/Canvas için SCORM 1.2 ve `egiteknolojilab` `postMessage` köprüsü.
- **Ultra Hafif Paketleme (`scripts/package_build.py`):** Harici medya olmadan `< 100 KB` (genellikle 15–40 KB) Web ZIP veya SCORM 1.2 ZIP çıktısı üretir.

---

## Klasör Yapısı

```text
egiteknolojilab-game-dev/
├── SKILL.md                          # Ana skill yönergeleri ve çalışma akışı
├── README.md                         # Kurulum, kullanım ve dokümantasyon
├── examples/
│   └── showcase.html                 # Tüm tarz, tipografi, mod ve SFX'lerin canlı vitrini
├── references/
│   ├── 01-design-languages.md        # 12 tasarım dili ve hex renk paletleri
│   ├── 02-typography-and-age.md      # Yaş grubu tipografi matrisi ve kurallar
│   ├── 03-layout-and-responsive.md   # Mod A (16:9) vs Mod B (Adaptif) kuralları
│   ├── 04-icons-media-and-audio.md   # Inline Material Rounded SVG, SFX ve player
│   ├── 05-game-dynamics-and-gamification.md # Oyun döngüsü, juice ve pedagojik geri bildirim
│   └── 06-scorm-and-export.md        # Küçük boyutlu paketleme, postMessage ve SCORM 1.2
├── templates/
│   ├── core/
│   │   ├── engine.js                 # 2D Canvas motoru
│   │   ├── audio-synth.js            # Web Audio SFX sentezleyici
│   │   ├── vfx.js                    # Parçacık & yüzen metin yöneticisi
│   │   └── media-player.js           # Hafif ses/video oynatıcı
│   ├── layouts/
│   │   └── game-shell.css            # Mod A & Mod B hazır responsive kabuk
│   └── scorm12/
│       ├── imsmanifest.xml           # SCORM 1.2 manifest şablonu
│       └── scorm-api.js              # LMS + iframe postMessage köprüsü
└── scripts/
    └── package_build.py              # Web / SCORM 1.2 ZIP paketleyici
```

---

## Kurulum ve Kullanım

### 1. Skill'i Ortamınıza Ekleyin
Bu repoyu agent aracınızın skill dizinine klonlayın:

- **Antigravity (Global):**
  ```bash
  git clone https://github.com/ozcansayid/egiteknoloji-game-dev-skill.git ~/.gemini/config/skills/egiteknolojilab-game-dev
  ```
- **Proje Bazlı (`.gemini/skills/` veya `.claude/skills/`):**
  ```bash
  git clone https://github.com/ozcansayid/egiteknoloji-game-dev-skill.git .gemini/skills/egiteknolojilab-game-dev
  ```

### 2. Örnek İstemi (Prompt) Kullanın
Agent'a şu şekilde komut verebilirsiniz:
- `"egiteknolojilab-game-dev skillini kullanarak 4. sınıflar için kesirleri eşleştirme oyunu yap"`
- `"egiteknolojilab-game-dev ile 2. sınıflar için Duolingo Tactile tarzında çarpım tablosu yakalama oyunu oluştur, Mod A 16:9 olsun"`
- `"egiteknolojilab-game-dev skillini kullanarak 6. sınıflar için Minimalist Scandinavian tarzında bir SCORM 1.2 quiz paketi hazırla"`

---

## Örnek Sayfayı (`examples/showcase.html`) İnceleme

`examples/showcase.html` tek bir HTML dosyasıdır; herhangi bir sunucu kurmadan doğrudan çift tıklayıp tarayıcınızda açabilirsiniz:

1. **Tasarım Dili Değiştirici:** Üstteki butonlarla sayfayı 8 farklı tasarım diline (*Duolingo Tactile*, *Soft Toymorphism*, *ClassDojo Vector*, *Kahoot Flat*, *Hand-Drawn Doodle*, *Dark Toymorphism*, *Claymorphism Cozy*, *Minimalist Scandinavian*) anında geçirin ve renk paleti noktalarını inceleyin.
2. **Tipografi & `tabular-nums` Testi:** 4 yaş grubunun font örneklerini ve rakamların zıplamadan arttığı canlı sayacı test edin.
3. **Mod A (16:9 Canvas) & Mod B (Adaptif Quiz):** Sol tarafta hareketli hedefe tıklamalı mini 16:9 Canvas oyununu, sağ tarafta yapıcı ipucu veren adaptif çoktan seçmeli kartı deneyin.
4. **Web Audio SFX & İkonlar:** `Click`, `Jump`, ardışık tıklamada sesi incelen `Correct (Combo)`, `Wrong` ve `Win Fanfare` seslerini dinleyin.
5. **SCORM 1.2 / `postMessage` Simülatörü:** İlerleme ve tamamlama JSON çıktısını canlı görüntüleyin.

---

## Web ZIP ve SCORM 1.2 Paketleme

Geliştirdiğiniz oyun klasörünü yayınlamaya hazır hale getirmek için `scripts/package_build.py` betiğini kullanabilirsiniz:

```bash
# Standart küçük boyutlu Web ZIP çıktısı
python scripts/package_build.py --src ./oyun-klasoru --out ./dist/oyun-web.zip --mode web

# SCORM 1.2 uyumlu LMS ZIP çıktısı (imsmanifest.xml otomatik eklenir)
python scripts/package_build.py --src ./oyun-klasoru --out ./dist/oyun-scorm12.zip --mode scorm12 --title "4. Sınıf Kesir Eşleştirme"
```

Paketleyici `.git`, `node_modules`, `dist`, `.map` gibi gereksiz dosyaları otomatik olarak hariç tutar ve sıkıştırılmış `.zip` çıktısının boyutunu raporlar.
