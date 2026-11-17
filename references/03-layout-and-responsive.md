# Responsive Tasarım: 16:9 Kilitli Mod ve Adaptif Mobil Mod

Eğitsel oyunlar ve etkileşimli içerikler hem **akıllı tahta / masaüstü**, hem **iframe içi**, hem de **mobil telefonlarda** sorunsuz çalışmalıdır. Etkinliğin doğasına göre aşağıdaki iki yerleşim modundan biri seçilir (`templates/layouts/game-shell.css` içinde ikisi de hazırdır).

---

## Mod A: 16:9 Kilitli Ölçekleme (Simülasyon, Platformer, Arcade)

Mobilde dikey görünüme sığması zor olan veya fizik/koordinat hassasiyeti gerektiren oyunlarda (lab deneyleri, yatay koşu, uzay/yakalama oyunları, geniş harita simülasyonları) sahne **16:9 oranına kilitlenir** ve mevcut pencereye (veya iframe'e) orantılı olarak sığdırılır.

### Teknik Kurallar:
1. **Sanal Çözünürlük (Virtual Resolution):**
   - Oyun mantığı her zaman sabit mantıksal koordinatlarda çalışır: `1280 x 720` (veya `960 x 540`).
   - Fizik, hız ve çarpışma hesapları ekran boyutundan bağımsız kalır.
2. **HiDPI (Retina) Keskinliği:**
   - Canvas fiziksel piksel boyutu `containerWidth * devicePixelRatio` ile çarpılır, çizim bağlamı (`ctx.setTransform`) mantıksal `1280 x 720` koordinatına ölçeklenir. Böylece hiçbir ekranda bulanıklık olmaz.
3. **Kapsayıcı CSS:**
   - Dış kapsayıcı `width: 100%; height: 100dvh;` (iframe içindeyse `100%`), arka planı oyunun temasının koyu/nötr tonuyla doldurur; içindeki `.stage-16-9` kutusu `aspect-ratio: 16 / 9; max-width: 100%; max-height: 100%;` ile merkeze oturur.
4. **Mobilde Dikey Tutuş Desteği:**
   - Telefon dikey tutulsa bile `16:9` sahne taşmadan küçülerek ortalanır; üst ve altta kalan boşluğa dokunmatik kontrol butonları (sanal joystick / yön tuşları) veya sade bir "Daha iyi deneyim için yan çevirebilirsin" ipucu yerleştirilebilir.

---

## Mod B: Tam Adaptif Mobil Düzen (Test, Quiz, Eşleştirme, Kart Oyunları)

Test, çoktan seçmeli yarışma, sürükle-bırak eşleştirme, kelime bulmaca ve hafıza kartı gibi etkinliklerde bileşenlerin konumu cihaz boyutuna göre akışkan olarak yeniden düzenlenir.

### Teknik Kurallar:
1. **Yataydan Dikeye Akış (Reflow):**
   - Masaüstü/Tablette (`min-width: 768px`): Soru/maskot solda, kartlar veya seçenekler sağda (2 sütunlu `grid`).
   - Mobilde (`< 768px`): Üstte kompakt soru/skor alanı, altta tek veya 2 sütunlu dokunmaya uygun seçenekler/kartlar.
2. **Dokunma Hedefleri (Touch Targets):**
   - Tüm tıklanabilir kartlar ve seçenek butonları en az `48x48px` (okul öncesi için `56x56px+`) boyutunda olmalı; butonlar arası boşluk en az `8px–12px` bırakılmalıdır.
3. **Tek Ekran Sığdırma Hedefi:**
   - Mümkün olduğunca sayfa içi dikey kaydırmaya (`scroll`) gerek kalmadan tüm etkileşim `100dvh` içine sığdırılır; uzun soru metinleri varsa sadece soru kartı kendi içinde kaydırılır, aksiyon butonları sabit kalır.

---

## Her İki Mod İçin Ortak Mobil ve Iframe Kuralları

- **Dinamik Viewport:** `100vh` yerine `100dvh` kullan (mobil tarayıcı adres çubuğu sıçramasını önler).
- **Dokunmatik Kilidi:** Oyun alanında `touch-action: none; user-select: none; -webkit-user-select: none; overscroll-behavior: none;` uygula ki oyuncu parmağını sürüklerken sayfa kaymasın veya metin seçilmesin.
- **Çentik Güvenliği:** `padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);` ile modern telefonların çentik/alt çubuk alanları korunur.
- **Hibrit Girdi (Unified Input):** `engine.js` içindeki girdi yöneticisi klavye (`WASD`/Oklar), fare ve `PointerEvent` (`pointerdown`/`pointermove`/`pointerup`) olaylarını tek yerden yönetir. Dokunmatik cihazda (`(pointer: coarse)`) sanal kontroller otomatik görünür.
