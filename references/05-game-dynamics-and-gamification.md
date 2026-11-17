# Oyun Dinamikleri, "Juice" ve Pedagojik Oyunlaştırma

## 1. Çekirdek Oyun Döngüsü ve State Machine

Her 2D HTML5 oyunu `templates/core/engine.js` yapısına uygun olarak şu 4 net durumdan oluşur:
- `MENU`: Oyun adı, kısa 1-2 cümlelik net yönerge, "Başla" butonu (gereksiz ayar karmaşası yok).
- `PLAYING`: Aktif oyun döngüsü, kompakt HUD (%10–15 alan).
- `PAUSED`: Oyunu dondurur, devam et / yeniden başlat / ses aç-kapa sunar.
- `GAME_OVER` / `COMPLETED`: Toplam skor, başarı yıldızı/özeti, yapıcı öğrenme özeti ve tek tıkla "Tekrar Oyna".

### Güvenli Delta-Time (`dt`) Kuralı:
60Hz, 120Hz ve 144Hz ekranlarda oyunun aynı hızda çalışması ve başka sekmeye geçip dönünce cisimlerin ışınlanmaması için:
```js
const dt = Math.min((now - lastTime) / 1000, 0.05);
```

---

## 2. "Game Feel" (Juice) Kontrol Listesi

Eğitsel oyunların sıkıcı testler gibi hissettirmemesi için `templates/core/vfx.js` ile şu mikro tepkiler eklenir:
1. **Dokunsal Buton Tepkisi:** Tıklamada hafif ölçeklenme (`scale(0.95)`) + `sfx.click()`.
2. **Parçacık Patlaması (`vfx.burst`):** Doğru cevapta veya hedef yakalandığında 8–16 adet hafif daire/yıldız parçacığı.
3. **Yüzen Puan Metni (`vfx.floatText`):** Olay noktasında yukarı süzülüp kaybolan `+10`, `Harika!` veya `x3` metni.
4. **Adil Çarpışma Kutuları (Forgiving Hitboxes):**
   - Zararlı engeller/düşmanlar görsel boyutun **%80–85**'i kadar hitbox'a sahip olur.
   - Toplanacak ödüller/doğru cevaplar görsel boyutun **%110**'u kadar hitbox'a sahip olur.
5. **Erişilebilir Hareket Koruması:** `window.matchMedia('(prefers-reduced-motion: reduce)').matches` doğruysa ekran sarsıntısı (screen shake) otomatik devre dışı bırakılır.

---

## 3. Pedagojik Oyunlaştırma (Sade ve Odaklı)

> **Dikkat Dağıtıcı Öge Yasağı:** Ekrana sürekli açılan pop-up rozetler, yanıp sönen bildirimler veya oyuncuyu strese sokan agresif kırmızı uyarılar **konulmaz**.

- **Yapıcı Hata Geri Bildirimi:** Öğrenci yanlış yaptığında yalnızca puan kırmak yerine, 1–2 saniyelik sakin bir görsel ipucu gösterilir (ör. *"3/4, 1/2'den büyüktür"* veya doğru cevabı yumuşakça vurgulama).
- **Combo & Çarpan Sistemi:** Ardışık doğru hamlelerde `x2`, `x3` çarpanı ve yükselen ses perdesi (*pitch escalation*) ile akış (flow) korunur.
- **Renk + Şekil Kodlaması:** Başarı/hata durumlarında renk körlüğü dostu olması için yeşil/kırmızı renkle birlikte mutlaka ikon (`check_circle` / `cancel` veya şekil) kullanılır.
- **Kalıcılık (`localStorage`):** En yüksek skor ve tamamlanan seviye bilgisi yerel olarak saklanır (SCORM aktifse LMS'e de gönderilir).
