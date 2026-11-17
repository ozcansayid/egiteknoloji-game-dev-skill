# Küçük Boyutlu Web Çıktısı, `postMessage` ve SCORM 1.2

**egiteknolojilab.com** içerikleri hem doğrudan web sitesinde (`iframe` veya tam sayfa) hem de LMS platformlarında (Moodle, EBA, Canvas vb.) **SCORM 1.2** paketi olarak sorunsuz çalışmalıdır.

---

## 1. Küçük Boyutlu Çıktı Kuralları (Ultra-Lightweight)

- **Hedef Paket Boyutu:** Harici video/ses dosyası yoksa tüm oyun klasörü sıkıştırılmış `.zip` olarak **< 100 KB** (çoğunlukla **15–40 KB**) olmalıdır.
- **Yasak:** `node_modules`, ağır CSS/JS kütüphaneleri, gereksiz büyük PNG sprite sheet'ler veya ikon font dosyaları pakete dahil edilmez.
- **Tercih:** Vektörel Canvas çizimleri, inline SVG ikonlar, CSS animasyonları ve Web Audio API prosedürel sesler kullanılır.

---

## 2. `egiteknolojilab.com` `postMessage` Köprüsü

Oyun SCORM olmayan bir web sayfası veya `iframe` içinde açıldığında, ana sayfaya ilerleme ve skor bilgisi göndermek için `templates/scorm12/scorm-api.js` içindeki `reportProgress()` fonksiyonu otomatik olarak şu mesajı yayınlar:

```js
window.parent.postMessage({
  source: 'egiteknolojilab',
  event: 'GAME_PROGRESS', // veya 'GAME_COMPLETED'
  score: 85,
  maxScore: 100,
  passed: true,
  durationSec: 42
}, '*');
```

---

## 3. SCORM 1.2 Entegrasyonu (`templates/scorm12/`)

SCORM 1.2 uyumluluğu için iki dosya yeterlidir:
1. **`scorm-api.js`:**
   - Sayfa açılışında `window.API` (veya parent pencerelerde `API`) nesnesini arar.
   - Bulamazsa sessizce **Standalone Web Moduna** düşer (tarayıcıda tek başına açıldığında asla hata fırlatmaz).
   - Bulursa `LMSInitialize("")`, `cmi.core.score.min`, `cmi.core.score.max`, `cmi.core.score.raw`, `cmi.core.lesson_status` (`completed` / `passed` / `incomplete`), `LMSCommit("")` ve kapanışta `LMSFinish("")` çağrılarını yönetir.
2. **`imsmanifest.xml`:**
   - SCORM 1.2 şemasına (`ADL SCORM 1.2`) uygun minimal manifest dosyasıdır; `index.html` dosyasını başlangıç kaynağı (`sco`) olarak tanımlar.

---

## 4. Otomatik Paketleme (`scripts/package_build.py`)

Oyun tamamlandığında aşağıdaki komutla hem temiz **Web ZIP** hem de **SCORM 1.2 ZIP** paketi oluşturulabilir:

```bash
# Standart küçük boyutlu Web ZIP çıktısı
python scripts/package_build.py --src ./my-game --out ./dist/my-game-web.zip --mode web

# SCORM 1.2 uyumlu LMS ZIP çıktısı (imsmanifest.xml otomatik eklenir/doğrulanır)
python scripts/package_build.py --src ./my-game --out ./dist/my-game-scorm12.zip --mode scorm12
```
