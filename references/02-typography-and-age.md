# Eğitsel Oyunlar İçin Tipografi ve Yaş Grubu Rehberi

Tipografi, yalnızca metni okunaklı kılmakla kalmaz; **bilişsel yükü yönetir**, hedef yaş grubunun okuma hızını korur ve arayüz hiyerarşisini kurar.

---

## 1. Temel Tipografi Kuralları

1. **Okunabilirlik ve Karakter Ayrımı (Legibility):**
   - `i`, `l`, `1` ve `o`, `0` karakterlerinin birbirine karışmadığı açık formlu fontlar seçilmelidir.
2. **Disleksi ve Görme Dostu Tasarım:**
   - Açıklıkları (aperture) geniş, ayna harfleri (`b`, `d`, `p`, `q`) net ayrışan, aşırı süslü veya gotik olmayan sade fontlar tercih edilmelidir.
3. **Bilişsel Yük Yönetimi:**
   - Gövde ve yönerge metinleri her zaman sade olmalı; dekoratif/display fontlar yalnızca ana başlıkta kullanılmalıdır.
4. **Kalınlık & İtalik Dengesi:**
   - **Bold:** Sadece buton etiketleri, kısa ipuçları ve başlıklar için. Uzun paragraflarda Bold kullanılmaz.
   - **Light / Thin:** Gövde metinlerinde **kesinlikle kullanılmaz** (dijital ekranlarda ve akıllı tahtalarda kontrastı düşürür).
   - **Italic:** Yalnızca karakter iç sesi veya kısa alıntılarda; uzun yönergelerde kullanılmaz.
5. **Rakam Titremesini Önleme (`tabular-nums`):**
   - Skor, geri sayım, combo ve puan tablolarında rakamların genişliği değiştikçe arayüzün zıplamasını önlemek için **mutlaka** şu CSS uygulanır:
     ```css
     .hud-counter {
       font-variant-numeric: tabular-nums;
       font-feature-settings: "tnum";
     }
     ```
6. **Telif ve Lisans Güvenliği (OFL):**
   - MEB, EBA, SCORM paketleri ve ticari EdTech projelerinde hukuki risk almamak için yalnızca **SIL Open Font License (OFL)** kapsamındaki açık kaynaklı **Google Fonts** fontları kullanılır.

---

## 2. Dört Seviyeli Tipografik Hiyerarşi

| Seviye | Rol | Özellik | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| **Seviye 1 (H1)** | Ana Başlıklar | Dikkat çekici, temaya uygun, Bold / ExtraBold | Açılış ekranı, oyun adı, bölüm başlıkları |
| **Seviye 2 (H2)** | Yönerge Başlıkları | H1'den küçük, SemiBold | Görev kartı başlıkları, "Sıra Sende", tebrik başlığı |
| **Seviye 3 (Body)** | Gövde Metinleri | Maksimum okunabilirlik, Regular/Medium, `line-height: 1.5` | Kural açıklamaları, soru metinleri, diyaloglar |
| **Seviye 4 (UI/HUD)** | Etkileşim & Sayaçlar | Kompakt, `tabular-nums`, yüksek kontrast | Skor, süre, can, buton etiketleri |

---

## 3. Yaş Gruplarına Göre Font ve Punto Matrisi

Responsive ölçekleme için `clamp(min, tercih, max)` kullanılır; böylece mobilden akıllı tahtaya kadar okunabilirlik korunur.

### A. Erken Çocukluk (3–6 Yaş / Okul Öncesi)
- **Harf Yapısı:** Geometrik, yumuşak köşeli, **tek katlı** `a` ve `g` harflerine sahip (okul tarzı).
- **Önerilen Fontlar:** `Fredoka` (başlık & buton), `Delius` (hikaye/diyalog).
- **Boyutlar:**
  - H1: `clamp(1.75rem, 4vw, 2.75rem)`
  - Gövde / Seçenek: `clamp(1.2rem, 2.8vw, 1.5rem)` *(minimum 19px–20px hissi, çok az metin + bol ikon)*
  - Buton: `min-height: 52px`, `font-size: clamp(1.1rem, 2.5vw, 1.35rem)`

### B. İlkokul Dönemi (7–10 Yaş)
- **Harf Yapısı:** Okumanın pekiştiği dönem; eğlenceli ama harf sınırları keskin ve net.
- **Önerilen Fontlar:** `Quicksand` (hem başlık hem gövde için çok yönlü), `Comic Neue` (samimi yönergeler), `Nunito`.
- **Boyutlar:**
  - H1: `clamp(1.6rem, 3.8vw, 2.5rem)`
  - Gövde / Soru: `clamp(1.05rem, 2.2vw, 1.3rem)` *(17px–21px bandı)*
  - HUD Sayaç: `clamp(1rem, 2vw, 1.25rem)`

### C. Ortaokul ve Gençlik (11–15 Yaş)
- **Harf Yapısı:** Çocuksu tasarımların reddedildiği; arcade, strateji, bilim ve modern mobil estetiği.
- **Önerilen Fontlar:** `Poetsen One` (aksiyon/yarışma başlıkları), `Nunito`, `Comfortaa` (bilim/kodlama/lab temaları), `Montserrat`.
- **Boyutlar:**
  - H1: `clamp(1.5rem, 3.5vw, 2.25rem)`
  - Gövde / Soru: `clamp(0.95rem, 1.8vw, 1.15rem)` *(15px–18px bandı)*
  - HUD Sayaç: `clamp(0.95rem, 1.8vw, 1.15rem)`

### D. Lise, Üniversite ve Yetişkin (16+ Yaş)
- **Harf Yapısı:** Yüksek bilgi yoğunluğuna uygun, yormayan modern neo-grotesk veya geometrik sans-serif.
- **Önerilen Fontlar:** `Inter`, `Plus Jakarta Sans`, `Poppins` (başlıklar).
- **Boyutlar:**
  - H1: `clamp(1.4rem, 3vw, 2.1rem)`
  - Gövde / Soru: `clamp(0.9375rem, 1.5vw, 1.0625rem)` *(15px–17px bandı)*
  - HUD Sayaç: `clamp(0.875rem, 1.5vw, 1.1rem)`

---

## 4. Çevrimdışı / SCORM Font Fallback Zinciri
SCORM paketlerinde internet erişimi kapalıysa Google Fonts yüklenemeyebilir. Bu yüzden `font-family` tanımında her zaman güvenli sistem fallback'i bırakılır:
```css
font-family: 'Fredoka', 'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif;
```
*(Tam çevrimdışı garantisi istenen küçük projelerde ise yalnızca seçilen 1 fontun `latin-ext` destekli `.woff2` alt kümesi projeye gömülebilir.)*
