# Tasarım Dilleri ve Renk Paletleri (EdTech & 2D Oyun)

Bu rehber, **egiteknolojilab.com** içeriklerinde kullanılacak **12 tasarım dilini** (10 temel + 2 bonus stil) ve Octet/Figma EdTech renk prensiplerini tanımlar. Her oyunda hedef yaşa uygun **tek bir tasarım dili** seçilir ve tüm arayüz bu dilin tokenlarına sadık kalır.

> **Altın Kural (Dikkat Dağıtmayan Arayüz):** Hangi stil seçilirse seçilsin, ekranda gereksiz rozet yığınları, sürekli titreyen/yanıp sönen uyarılar ve göz yoran aşırı neon karmaşası bulunmamalıdır.

---

## Hızlı Stil Seçim Matrisi

| Yaş Grubu | Önerilen Tasarım Dilleri | Karakter |
| :--- | :--- | :--- |
| **3–10 Yaş (Okul Öncesi & İlkokul)** | `Playful Vector (ClassDojo)`, `Duolingo Tactile`, `Doodle Sketch`, `Soft Casual Toymorphism` | Büyük yuvarlak hatlar, sıcak renkler, dokunsal butonlar |
| **8–15 Yaş (İlkokul Sonu & Ortaokul)** | `Geometric Flat (Kahoot)`, `Dark Casual Toymorphism`, `Fresh Casual Hex-Grid`, `Casual Wooden` | Yüksek kontrast, net şekil kodlaması, enerjik |
| **16+ Yaş (Lise, Üniversite & Yetişkin)** | `Claymorphism Cozy`, `Minimalist Scandinavian`, `Modern Vibrant Flat`, `Tactile Cozy Puzzle` | Ferah negatif alan, modern tipografi, odak odaklı |

---

## 1. Soft Casual Game UI / Toymorphism (7–25 Yaş)
Yumuşak gölgeler, yüksek köşe yuvarlatmaları (`20px–32px`), hap (pill) butonlar ve oyuncak benzeri dokunsal yüzeyler.
- **Palet:** Zemin `#FFF5DE` | Ana Vurgu `#FF8C3B`–`#FFA756` | Aksiyon `#3B72FF` | Kart `#FFFFFF` | Metin `#1E2A4A` | Başarı/Rozet `#2DD4BF`
- **Font:** `Poppins`, `Nunito`, `Fredoka`
- **Detay:** `box-shadow: 0 10px 25px rgba(30, 42, 74, 0.12)` + hafif iç ışık yansıması.

## 2. Dark Casual Game UI / Toymorphism (12–45 Yaş)
Koyu gece mavisi zemin üzerinde parlak vurgular, çift katmanlı 3D basılma derinliğine sahip butonlar.
- **Palet:** Zemin `#0C1854`–`#10206B` | Ana Aksiyon `#2ECC40`–`#4CD964` | Vurgu `#F39C12`–`#F1C40F` | Bonus `#E91E63` | Bilgi/Çerçeve `#00A8FF` | Metin `#FFFFFF`
- **Font:** `Fredoka`, `Nunito`, `Baloo 2`
- **Detay:** `border-radius: 12px–20px`, odak noktalarında hafif radyal mavi ışıma (`glow`).

## 3. Casual Wooden / Skeuomorphic-Hybrid (10–55 Yaş)
Sıcak ahşap zemin, kemik beyazı taşlar/kartlar, parlak jel/3D kabartmalı butonlar.
- **Palet:** Ahşap Zemin `#5D2A12`–`#3C1708` | Aksiyon `#44D62C`–`#2BB415` | Altın/Yıldız `#FFD026`–`#FFA800` | Taş/Panel `#FFF6E5` | Yardımcı `#8C43F6`, `#2BB7F6`, `#FF5B5B`
- **Font:** `Fredoka`, `Nunito` (ExtraBold)
- **Detay:** Altıgen veya yuvarlatılmış taşlar, buton altlarında koyu 3D basılma kenarı.

## 4. Modern Vibrant Flat / Soft-Card UI (16–40 Yaş)
Temiz açık gri zemin üzerinde canlı degrade dolgulu kartlar, modern editoryal/kurumsal illüstrasyon hissi.
- **Palet:** Zemin `#F7F8FA` | Kart `#FFFFFF` | Metin `#1A1D20` | Cyan `#00C0FF`–`#0099FF` | Mercan `#FF4E78`–`#FF3366` | Amber `#FFA000` | Zümrüt `#1DD1A1`
- **Font:** `Inter`, `Poppins`
- **Detay:** `border-radius: 16px–24px`, `box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06)`.

## 5. Tactile Skeuomorphic / Cozy Puzzle UI (18–65 Yaş)
Deri ciltli defter, meşe ahşap ve kabartmalı seramik/plastik harf taşları hissi.
- **Palet:** Koyu Kahve `#4A2E1B`–`#331E12` | Meşe `#E2BE8A`–`#C99E66` | Fuşya `#D9366E` | Hardal `#E5A823` | Lavanta `#7D8BE6` | Krem Taş `#F7F4EB` | Metin `#2C2B3F`
- **Font:** `Titan One`, `Fredoka`
- **Detay:** İki parçalı butonlar (sol ikon kutusu + sağ metin kapsülü), belirgin alt pah (bevel) gölgeleri.

## 6. Minimalist Flat / Clean Scandinavian UI (18–45 Yaş)
Geniş negatif alan, gölgesiz mat ızgara hücreleri ve dikkati tamamen mekaniğe odaklayan ferah arayüz.
- **Palet:** Zemin `#F0F1F5` | Boş Hücre `#DDE1E6` | Metin `#1E232A` | Mercan `#E05344` | Cyan `#00B4D8` | Hardal `#E9B44C` | Ahududu `#E06D8C` | İndigo `#4B52C7`
- **Font:** `Inter`, `Plus Jakarta Sans`
- **Detay:** `border-radius: 12px–16px`, sıfır gölge, üstte sade çizgi ikonlu mikro kontroller.

## 7. Fresh Casual Hex-Grid / Soft Card UI (14–45 Yaş)
Buz mavisi/camgöbeği degrade, silik petek (hexagon) arka plan dokusu, yüksek yuvarlatmalı beyaz kartlar.
- **Palet:** Zemin `#70E1F5`–`#A2E8F8` | Metin `#154B5E` | Sarı Buton `#FFBA3B` | Fıstık Yeşili `#8DE328` | Kart `#FFFFFF` | Grafit `#2A3238`
- **Font:** `Montserrat` (Bold/Black), `Outfit`, `Poppins`
- **Detay:** `border-radius: 20px–28px`, `box-shadow: 0 8px 24px rgba(21, 75, 94, 0.08)`.

## 8. Playful Vector Illustration / ClassDojo Tarzı (4–11 Yaş)
Temiz vektör çizimler, parlak-doygun doğa renkleri, ince/çizgisiz düz katmanlı (flat cell-shading) sevimli karakterler.
- **Palet:** Gökyüzü `#C8EEFA` | Sonbahar Sarısı `#FDB833` | Turuncu `#F15A24` | Yeşil `#7AC143` | Mavi `#4DBCE9` | Mercan `#E73B3B` | Kahve `#8C532B`
- **Font:** `Fredoka`, `Quicksand`, `Nunito`
- **Detay:** Organik formlar, büyük gözlü maskot tepkileri, sade hap butonlar.

## 9. Geometric Flat / Kahoot Tarzı (8–35 Yaş)
Tamamen gölgesiz ve degradesiz saf düz (pure flat) renk blokları; renk + şekil eşleşmesi (erişilebilirlik için mükemmel).
- **Palet:** Zemin `#46A429`–`#26890C` | Kırmızı Üçgen `#E21B3C` | Mavi Baklava `#1368CE` | Sarı Daire `#FFA602` | Yeşil Kare `#26890C` | Beyaz `#FFFFFF` | Metin `#1E1E1E`
- **Font:** `Montserrat`, `Inter`
- **Detay:** Şekillerle renk körlüğü desteği otomatik sağlanır; tıklamada hızlı `scale(0.96)` tepkisi.

## 10. Claymorphism / Cozy 3D Pastel UI (16–35 Yaş)
Modelleme kili (play-dough) hissi veren mat, kabarık yüzeyler ve çift katmanlı iç/dış gölgeler.
- **Palet:** Zemin `#F6F2EC`–`#FAF7F2` | Lavanta `#9C8CEB`–`#8B7AD9` | Kart `#FFFFFF` | Bej `#E6CCA8` | Nane `#86C58D` | Mürdüm Metin `#3A334E`
- **Font:** `Plus Jakarta Sans`, `Poppins`, `Quicksand`
- **Detay:** `border-radius: 24px–36px`, `box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), 0 10px 25px rgba(58,51,78,0.1)`.

## 11. Duolingo Tactile Playful (5–25 Yaş) — *Bonus*
Alt kenarı kalın 3D basılma hissi veren (`border-bottom: 4px solid`), yüksek enerjili, net ilerleme çubuklu (progress bar) ve dostça mikro geri bildirimli stil.
- **Palet:** Zemin `#FFFFFF` / `#F7F7F7` | Ana Yeşil `#58CC02` (alt kenar `#46A302`) | Mavi `#1CB0F6` (alt kenar `#1899D6`) | Sarı `#FFC800` | Mercan `#FF4B4B` | Metin `#3C3C3C`
- **Font:** `Nunito` (ExtraBold/Bold), `Fredoka`
- **Detay:** Tıklanınca `translateY(2px)` ve `border-bottom-width: 2px` ile gerçek tuş basma hissi.

## 12. Hand-Drawn Doodle / Sketchbook (5–18 Yaş) — *Bonus*
Defter kağıdı veya kareli/noktalı kağıt zemini üzerinde elle çizilmiş gibi duran koyu mürekkep kenarlıklı, samimi karalama tarzı.
- **Palet:** Kağıt Zemin `#FFFDF7` | Mürekkep Çizgi `#1F2937` | Fosforlu Sarı `#FDE047` | Pastel Mavi `#93C5FD` | Pembe `#FDA4AF` | Yeşil `#86EFAC`
- **Font:** `Comic Neue`, `Delius`, `Patrick Hand`
- **Detay:** `border: 2.5px solid #1F2937`, ofset katı gölge (`box-shadow: 4px 4px 0 #1F2937`), hafif asimetrik köşe yuvarlatma (`border-radius: 14px 18px 15px 16px`).

---

## Octet Design & EdTech Renk Dengesi İlkeleri
- **Odak Destekleyici Zeminler:** Uzun süreli okuma ve bulmaca ekranlarında göz yormayan krem, kırık beyaz veya koyu lacivert zemin kullan; saf `#000000` veya kör edici neon zeminlerden kaçın.
- **Semantik Netlik:** Başarı (yeşil), uyarı/ipucu (amber/sarı), hata (yumuşak mercan/kırmızı), ana aksiyon (mavi/turuncu) rolleri tüm oyun boyunca tutarlı kalmalıdır.
- **Kontrast:** Tüm metin ve buton etiketleri WCAG AA (en az `4.5:1`) kontrast oranını karşılamalıdır.
