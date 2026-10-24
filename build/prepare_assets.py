#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把原始品牌素材处理成站点可用的资源。

输入（assets/img/src/）：
  appicon.jpg            白底应用图标
  default-wallpaper.jpg  默认壁纸

输出（assets/img/）：
  app-icon.png         512×512，裁到内容边、保留白底
  app-icon-192.png     192×192
  app-icon-tile.png    180×180（iOS 主屏图标）
  wallpaper.jpg        1600 宽优化壁纸
  favicon.ico          16/32/48/64 多尺寸

说明：图标本身用白描边分割立方体，抠成透明底会在深色主题下丢掉描边，
所以保留白底、以圆角方块呈现，视觉和真实应用图标一致。
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
SRC = IMG / "src"

WHITE_GATE = 16  # 与纯白差异小于该值视为背景


def crop_to_content(img: Image.Image, pad_ratio: float = 0.06) -> Image.Image:
    """按非白像素的包围盒裁切，再补白边成正方形。"""
    rgb = img.convert("RGB")
    white = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, white).convert("L").point(
        lambda v: 255 if v > WHITE_GATE else 0)
    box = diff.getbbox() or (0, 0, rgb.width, rgb.height)
    cut = rgb.crop(box)

    side = max(cut.size)
    canvas_side = round(side * (1 + pad_ratio * 2))
    canvas = Image.new("RGB", (canvas_side, canvas_side), (255, 255, 255))
    canvas.paste(cut, ((canvas_side - cut.width) // 2, (canvas_side - cut.height) // 2))
    return canvas


def main() -> int:
    icon_src = SRC / "appicon.jpg"
    wall_src = SRC / "default-wallpaper.jpg"
    for p in (icon_src, wall_src):
        if not p.exists():
            print(f"缺少 {p}", file=sys.stderr)
            return 1

    IMG.mkdir(parents=True, exist_ok=True)

    icon = crop_to_content(Image.open(icon_src))
    icon.resize((512, 512), Image.LANCZOS).save(IMG / "app-icon.png", optimize=True)
    icon.resize((192, 192), Image.LANCZOS).save(IMG / "app-icon-192.png", optimize=True)
    icon.resize((180, 180), Image.LANCZOS).save(IMG / "app-icon-tile.png", optimize=True)

    icon.resize((256, 256), Image.LANCZOS).save(
        ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )

    wall = Image.open(wall_src).convert("RGB")
    if wall.width > 1600:
        wall = wall.resize((1600, round(wall.height * 1600 / wall.width)), Image.LANCZOS)
    wall.save(IMG / "wallpaper.jpg", quality=84, optimize=True, progressive=True)

    for name in ("app-icon.png", "app-icon-192.png", "app-icon-tile.png",
                 "wallpaper.jpg"):
        f = IMG / name
        print(f"{name:20} {f.stat().st_size / 1024:7.1f} KB")
    print(f"{'favicon.ico':20} {(ROOT / 'favicon.ico').stat().st_size / 1024:7.1f} KB")
    print(f"{'wallpaper':20} {wall.width}×{wall.height}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
