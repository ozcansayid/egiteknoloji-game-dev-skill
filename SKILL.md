---
name: egiteknolojilab-game-dev
description: >-
  2D HTML5, Canvas ve Vanilla JavaScript tabanlı etkileşimli eğitsel oyunlar,
  simülasyonlar, quiz/eşleştirme etkinlikleri ve SCORM 1.2 uyumlu web içerikleri
  geliştirme rehberi. egiteknolojilab.com proje mantığına göre tasarım dilleri,
  yaşa uygun tipografi, EdTech renk paletleri, 16:9 kilitli / adaptif mobil
  responsive düzen, Web Audio SFX, hafif ses/video oynatıcı ve küçük boyutlu
  ZIP / SCORM 1.2 paketleme kurallarını içerir.
---

# EgiteknolojiLab 2D HTML5 Oyun ve Etkileşimli İçerik Geliştirme Skill'i

Bu skill, **egiteknolojilab.com** standartlarında hızlı, küçük boyutlu, pedagojik değeri yüksek, erişilebilir ve her cihazda sorunsuz çalışan **2D HTML5 + Vanilla JavaScript** oyunlar ve etkileşimli etkinlikler üretmek için tasarlanmıştır.

---

## 1. Akıllı Hibrit Çalışma Akışı (Workflow)

Kullanıcı yeni bir oyun veya etkileşimli etkinlik istediğinde şu sırayı izle:

### Adım 1: Bağlam Kontrolü (Eksik Bilgi Var mı?)
Kullanıcının isteminde aşağıdaki **4 temel karar** net değilse, kod yazmadan önce **tek mesajda en fazla 4 kısa soru** sor:
1. **Konu ve Yaş Grubu:** Kazanım/konu nedir ve hedef yaş grubu hangisi? (`3–6 Okul Öncesi`, `7–10 İlkokul`, `11–15 Ortaokul`, `16+ Lise/Yetişkin`)
2. **Etkinlik/Oyun Türü & Yerleşim Modu:**
   - *Simülasyon / Platform / Arcade* → **Mod A (16:9 Kilitli Sahne)**
   - *Test / Quiz / Eşleştirme / Sürükle-Bırak* → **Mod B (Tam Adaptif Mobil Düzen)**
3. **Tasarım Dili:** Yaş grubuna uygun bir stil seç (ör. *ClassDojo Cartoon*, *Duolingo Tactile*, *Doodle*, *Claymorphism*, *Toymorphism*, *Kahoot Flat*, *Minimalist Scandinavian*).
4. **Çıktı Formatı:** Tek dosya (`index.html`), modüler web klasörü/ZIP veya **SCORM 1.2** paketi?

*(Kullanıcı bunları zaten belirttiyse veya "sen seç, hızlıca üret" dediyse soru sormadan Adım 2'ye geç.)*

### Adım 2: 5 Satırlık Mini Tasarım Özeti (GDD-Lite)
Kodlamaya geçmeden önce kısaca şunları özetle ve hemen üretime başla:
- **Tür & Hedef:** (Örn. 4. Sınıf Kesir Yakalama — 16:9 Kilitli)
- **Tasarım Dili & Tipografi:** (Örn. Soft Casual Toymorphism + Quicksand + tabular-nums)
- **Mekanik & Oyunlaştırma:** (Core loop, combo, yapıcı hata geri bildirimi)
- **Ses & Medya:** (Web Audio SFX + varsa hafif ses/video yönerge oynatıcısı)
- **Çıktı & Entegrasyon:** (Offline-first SVG ikonlar + `postMessage` / SCORM 1.2)

### Adım 3: İlgili Referansları Oku ve Şablonları Kullan
İhtiyacına göre `references/` altındaki ilgili dosyaları oku ve `templates/` klasöründeki hazır çekirdek modülleri (`engine.js`, `audio-synth.js`, `vfx.js`, `media-player.js`, `game-shell.css`, `scorm-api.js`) doğrudan projeye kopyalayıp üzerine oyunu kur.

---

## 2. Referans Modülleri (Progressive Disclosure)

| Konu | Dosya | Ne Zaman Okunmalı? |
| :--- | :--- | :--- |
| **Tasarım Dilleri & Paletler** | [01-design-languages.md](references/01-design-languages.md) | Görsel stil, hex renk paleti ve CSS gölge/yüzey kuralları için |
| **Tipografi & Yaş Matrisi** | [02-typography-and-age.md](references/02-typography-and-age.md) | Font seçimi, yaşa göre punto boyutu, disleksi/okunabilirlik kuralları için |
| **Responsive & 16:9 / Adaptif** | [03-layout-and-responsive.md](references/03-layout-and-responsive.md) | 16:9 kilitli sahne vs. mobil adaptif yerleşim ve dokunmatik kontroller için |
| **İkonlar, Ses & Video Player** | [04-icons-media-and-audio.md](references/04-icons-media-and-audio.md) | Material Rounded Filled SVG ikonlar, Web Audio SFX ve hafif player için |
| **Oyun Dinamikleri & EdTech** | [05-game-dynamics-and-gamification.md](references/05-game-dynamics-and-gamification.md) | Delta-time döngü, state machine, juice, combo ve pedagojik geri bildirim için |
| **SCORM 1.2 & ZIP Paketleme** | [06-scorm-and-export.md](references/06-scorm-and-export.md) | Küçük boyutlu web çıktısı, `postMessage` ve SCORM 1.2 paketleme için |

---

## 3. Değişmez Temel Kurallar (Her Projede Zorunlu)

1. **Hibrit Canvas 2D + DOM HUD Mimarisi:**
   - Oyun dünyası, fizik ve parçacıklar `<canvas>` üzerinde; menüler, skor/süre sayaçları, yönerge kartları ve butonlar HTML/CSS HUD katmanında (`pointer-events: none` kapsayıcı, butonlarda `pointer-events: auto`) tutulur.
2. **Dikkat Dağıtıcı Ögelerden Kaçınma (Clean EdTech):**
   - Karmaşık, yanıp sönen, dikkat dağıtan fazla rozet (badge), gereksiz bildirim baloncukları ve agresif uyarılar **kullanılmaz**. Arayüz öğrenme hedefine odaklanır; HUD ekranın en fazla **%10–15**'ini kaplar.
3. **Sıfır Ağır Bağımlılık & Offline Güvenlik:**
   - Ağır oyun motorları (Phaser vb.) yerine Vanilla JS kullanılır.
   - İkonlar için Google Material Rounded Filled tarzında **inline SVG** tercih edilir; böylece SCORM/okul ağlarında internet olmasa bile ikonlar kırılmaz.
4. **Erişilebilirlik (a11y):**
   - Doğru/yanlış geri bildirimleri **sadece renkle değil**, ikon/şekil ile de verilir.
   - `prefers-reduced-motion: reduce` aktifse ekran sarsıntısı ve yoğun parçacıklar kapatılır.
   - Sayısal sayaçlarda (skor, süre) mutlaka `font-variant-numeric: tabular-nums` kullanılır.
