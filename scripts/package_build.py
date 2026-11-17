#!/usr/bin/env python3
"""
EgiteknolojiLab Web & SCORM 1.2 Paketleyici
Kullanım:
  python package_build.py --src ./oyun-klasoru --out ./dist/oyun.zip --mode scorm12 --title "Kesir Avcısı"
"""
import argparse
import os
import zipfile
from pathlib import Path

EXCLUDED_DIRS = {".git", "node_modules", "__pycache__", ".vscode", "dist"}
EXCLUDED_EXTS = {".pyc", ".DS_Store", ".map"}


def build_package(src_dir: Path, out_zip: Path, mode: str, title: str):
    if not (src_dir / "index.html").exists():
        raise FileNotFoundError(f"index.html bulunamadı: {src_dir}")

    out_zip.parent.mkdir(parents=True, exist_ok=True)
    template_manifest = Path(__file__).resolve().parent.parent / "templates" / "scorm12" / "imsmanifest.xml"

    file_count = 0
    with zipfile.ZipFile(out_zip, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for root, dirs, files in os.walk(src_dir):
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            for fname in files:
                fpath = Path(root) / fname
                if fpath.suffix in EXCLUDED_EXTS or fpath.name in EXCLUDED_EXTS:
                    continue
                rel = fpath.relative_to(src_dir).as_posix()
                if mode == "web" and rel == "imsmanifest.xml":
                    continue
                zf.write(fpath, rel)
                file_count += 1

        if mode == "scorm12" and not (src_dir / "imsmanifest.xml").exists():
            if template_manifest.exists():
                manifest_text = template_manifest.read_text(encoding="utf-8").replace("{{GAME_TITLE}}", title)
                zf.writestr("imsmanifest.xml", manifest_text)
                file_count += 1

    size_kb = out_zip.stat().st_size / 1024
    print(f"Paket oluşturuldu ({mode}): {out_zip} | {file_count} dosya | {size_kb:.1f} KB")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="EgiteknolojiLab Web / SCORM 1.2 Paketleyici")
    parser.add_argument("--src", required=True, help="Oyun kaynak klasörü")
    parser.add_argument("--out", required=True, help="Çıktı .zip dosya yolu")
    parser.add_argument("--mode", choices=["web", "scorm12"], default="web", help="Paketleme modu")
    parser.add_argument("--title", default="EgiteknolojiLab Etkinliği", help="SCORM manifest başlığı")
    args = parser.parse_args()
    build_package(Path(args.src), Path(args.out), args.mode, args.title)
