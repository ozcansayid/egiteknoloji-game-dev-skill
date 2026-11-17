# Özel Oyun Sesleri Klasörü (`assets/sounds/`)

Bu klasöre kendi telifsiz/uyumlu ses dosyalarını (`.mp3`, `.ogg` veya `.wav` — küçük boyut için `.mp3` önerilir) ekleyebilirsin. Yapay zeka yeni bir oyun üretirken önce bu klasörü tarar; sadece o oyunda kullanılacak sesleri oyunun kendi `assets/` klasörüne kopyalar ve `audio-synth.js` üzerinden oynatır. Eksik kalan sesler otomatik olarak Web Audio ile sentezlenir.

## Önerilen Alt Klasörler ve Dosya İsimleri

- `ui/` — Arayüz etkileşimleri
  - `click.mp3`, `hover.mp3`, `flip.mp3`, `pop.mp3`, `pickup.mp3`, `drop.mp3`
- `feedback/` — Pedagojik geri bildirim ve ödüller
  - `correct.mp3`, `wrong.mp3`, `combo.mp3`, `level_up.mp3`, `win.mp3`
- `sfx/` — Oyun mekaniği ve fizik
  - `jump.mp3`, `collect.mp3`, `hit.mp3`, `tick.mp3`, `explosion.mp3`
- `bgm/` — Arka plan müzikleri (döngüye uygun)
  - `cozy_loop.mp3`, `arcade_loop.mp3`, `lab_ambient.mp3`

> **İsimlendirme İpucu:** Dosya adlarında Türkçe karakter ve boşluk yerine küçük harf + alt çizgi kullan (örn. `buton_tik.mp3` veya `click_soft.mp3`). Farklı stillere ait birden fazla ses koyarsan sonuna stil adını ekleyebilirsin (örn. `click_wooden.mp3`, `click_arcade.mp3`).
