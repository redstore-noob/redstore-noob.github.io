#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mofumofu Web · 站点生成器
从内容模块生成主站页面：首页 / 技术架构 / 404。
插件文档站（docs/）由同目录的 docs_build.py 单独产出。

用法：
    cd E:/redstore-noob.github.io/build
    python -c "import build, content_a, content_b"
    python docs_build.py

所有事实均来自对 E:/Mofumofu 仓库源码的实测，非编造。
"""
import os, html
from iconpark import ICONPARK

ROOT = os.path.dirname(os.path.abspath(__file__))
# 生成的 HTML 输出到仓库根目录（GitHub Pages 的站点根）
OUT = os.path.abspath(os.path.join(ROOT, ".."))

# ============================================================
# 导航结构（图标 key 取自 IconPark，与主项目 Controls/IconParkGlyphs.cs 同源）
# ============================================================
NAV = [
    ("总览", [
        ("index.html",   "首页",         "IconHome"),
        ("architecture.html", "技术架构", "IconCube"),
    ]),
    ("开发者", [
        ("docs/index.html", "插件文档", "IconFluentCode"),
    ]),
]

ACCENTS = [
    ("teal", "青绿", "#3FC6C1"), ("blue", "蔚蓝", "#5AA9E6"), ("green", "新绿", "#4CC38A"),
    ("orange", "暖橙", "#F2AE49"), ("pink", "樱粉", "#E5698F"), ("purple", "紫藤", "#A78BFA"),
]

# ============================================================
# 模板
# ============================================================
# IconPark 未收录、但站点需要的少数图标（同样遵循 48 盒 / 4px 圆头描边规范）
LOCAL_ICONS = {
    "IconMenu": [("M9 15H39", "None", True, "Accent"),
                 ("M9 24H39", "None", True, "Accent"),
                 ("M9 33H39", "None", True, "Accent")],
}


def icon(key, cls=""):
    """渲染 IconPark 图标：48px 视图盒、4px 圆头描边，与主项目 IconParkIcon 同源。
    颜色走 currentColor，AccentSoft 层以 fill-opacity 表达（浅色底）。"""
    shapes = ICONPARK.get(key) or LOCAL_ICONS[key]
    parts = []
    for d, fill, stroked, stroke in shapes:
        if stroked:
            extra = ' fill="currentColor" fill-opacity=".14"' if fill == "AccentSoft" else ' fill="none"'
            parts.append(f'<path d="{d}"{extra}/>')
        else:
            parts.append(f'<path d="{d}" fill="currentColor" stroke="none"/>')
    return ('<svg viewBox="0 0 48 48" class="' + cls + '" fill="none" stroke="currentColor" '
            'stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
            + "".join(parts) + "</svg>")

PAGE_ORDER = [href for _, items in NAV for href, _, _ in items]


def render_nav(cur):
    out = ['<nav class="sb-nav" aria-label="全站导航">']
    page_no = 0
    for group, items in NAV:
        out.append('<div class="sb-group">')
        out.append(f'<div class="sb-group-label">{group}</div>')
        for href, label, ipath in items:
            page_no += 1
            act = " active" if href == cur else ""
            current = ' aria-current="page"' if href == cur else ""
            out.append(
                f'<a class="sb-link{act}" href="{href}" title="{label}"{current}>'
                f'<span class="nav-num">{page_no:02d}</span>{icon(ipath)}'
                f'<span class="sb-label">{label}</span></a>')
        out.append('</div>')
    out.append('</nav>')
    return "\n".join(out)

def render_picker():
    dots = []
    for key, name, hexv in ACCENTS:
        dots.append(f'<button class="accent-dot" data-accent="{key}" title="{name}" '
                    f'aria-label="强调色 {name}" style="background:{hexv};color:{hexv}"></button>')
    return '<div class="accent-picker">' + "".join(dots) + '</div>'

def page(cur, title, eyebrow, lead, body, tags=None, prev=None, next_=None, headless=False):
    page_no = PAGE_ORDER.index(cur) + 1 if cur in PAGE_ORDER else 0
    tags_html = ""
    if tags:
        tags_html = '<div class="head-tags">' + "".join(
            f'<span class="tag {t[1] if len(t)>1 else ""}">{t[0]}</span>' for t in tags) + '</div>'

    # headless=True：页面自带 hero，不再渲染一份重复的页头
    head = "" if headless else f"""<div class="page-head" data-page="{page_no:02d}">
        <div class="page-eyebrow"><span>FIELD NOTES / {page_no:02d}</span>{eyebrow}</div>
        <h1 class="page-title">{title}</h1>
        <p class="page-lead">{lead}</p>
        {tags_html}
      </div>"""

    pager = ""
    if prev or next_:
        parts = ['<div class="pager">']
        if prev:
            parts.append(f'<a href="{prev[0]}"><div class="p-dir">{icon("IconArrowLeft")}<span>上一页</span></div><div class="p-name">{prev[1]}</div></a>')
        if next_:
            parts.append(f'<a href="{next_[0]}"><div class="p-dir"><span>下一页</span>{icon("IconArrowRight")}</div><div class="p-name">{next_[1]}</div></a>')
        parts.append('</div>')
        pager = "\n".join(parts)

    return f"""<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title if title == "Mofumofu Launcher" else title + " · Mofumofu Launcher"}</title>
<meta name="description" content="{lead[:120]}">
<meta name="theme-color" content="#080b10">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mofumofu Launcher">
<meta property="og:title" content="{title if title == "Mofumofu Launcher" else title + " · Mofumofu Launcher"}">
<meta property="og:description" content="{lead[:120]}">
<meta property="og:image" content="https://redstore-noob.github.io/assets/img/wallpaper.jpg">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="900">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="512x512" href="assets/img/app-icon.png">
<link rel="apple-touch-icon" href="assets/img/app-icon-tile.png">
<link rel="stylesheet" href="assets/css/main.css">
</head>
<body data-page="{cur}" data-page-no="{page_no:02d}">
<a class="skip-link" href="#mainContent">跳到正文</a>
<div class="ambient" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="scroll-progress" aria-hidden="true"><i id="scrollProgress"></i></div>
<div class="shell">
  <aside class="sidebar" id="sidebar" aria-label="主导航">
    <a class="sb-head" href="index.html" aria-label="Mofumofu 首页">
      <div class="sb-logo"><img src="assets/img/app-icon.png" alt="" width="44" height="44" decoding="async"></div>
      <div class="sb-brand">
        <div class="sb-title">Mofumofu</div>
        <div class="sb-sub">LAUNCHER / FIELD NOTES</div>
      </div>
    </a>
    {render_nav(cur)}
    <div class="sb-foot">
      <span class="sb-status" aria-hidden="true"></span>
      <div class="sb-foot-copy"><div>SOURCE VERIFIED</div><div>v1.0.0 · .NET 10</div></div>
    </div>
  </aside>

  <div class="main">
    <header class="topbar">
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="打开导航" aria-expanded="false" aria-controls="sidebar">
        {icon("IconMenu")}
      </button>
      <div class="page-code">MF/<span>{page_no:02d}</span></div>
      <div class="crumb"><span>Mofumofu</span><i>/</i><b>{"首页" if headless else title}</b></div>
      <div class="chapter-current" id="chapterCurrent">OVERVIEW</div>
      <div class="topbar-tools">
        <button class="command-trigger" id="commandBtn" aria-label="快速跳转，Ctrl K">
          <span>快速跳转</span><kbd>Ctrl K</kbd>
        </button>
        {render_picker()}
        <button class="icon-btn" id="themeBtn" aria-label="切换主题">
          {icon("IconFluentSun")}
        </button>
      </div>
    </header>

    <main class="content" id="mainContent" tabindex="-1">
      {head}
      {body}
      {pager}
    </main>

    <footer class="foot">
      <div class="foot-brand"><img src="assets/img/app-icon-192.png" alt="" width="18" height="18" loading="lazy"> <span>Mofumofu Launcher · 基于 Avalonia 12.1.4 + SukiUI 7.0.2-nightly 构建</span></div>
      <div>第三方辅助工具，与 Mojang / Microsoft 无隶属关系</div>
    </footer>
  </div>
</div>
<nav class="chapter-nav" id="chapterNav" aria-label="本页章节"></nav>
<button class="nav-scrim" id="navScrim" aria-label="关闭导航" tabindex="-1"></button>
<dialog class="command" id="commandPalette" aria-labelledby="commandTitle">
  <div class="command-head">
    <span class="command-mark">MF</span>
    <input id="commandInput" type="search" autocomplete="off" placeholder="输入页面名称，马上出发…" aria-label="搜索页面">
    <kbd>ESC</kbd>
  </div>
  <div class="command-meta"><span id="commandTitle">NAVIGATION / 全站直达</span><span>↑↓ 选择 · Enter 前往</span></div>
  <div class="command-results" id="commandResults"></div>
</dialog>
<script src="assets/js/main.js"></script>
</body>
</html>
"""

# ============================================================
# 内容辅助函数
# ============================================================
def sec(num, title, desc="", inner=""):
    d = f'<p class="section-desc">{desc}</p>' if desc else ""
    return f"""<section class="section">
  <div class="section-head"><span class="section-num">{num}</span><h2 class="section-title">{title}</h2>{d}</div>
  {inner}
</section>"""

def card(title, text, tag=None, tagcls="", iconp=None):
    ic = f'{icon(iconp, "card-ico")}' if iconp else ""
    t = f'<span class="tag {tagcls}" style="margin-left:auto">{tag}</span>' if tag else ""
    return f"""<div class="card hoverable">
  <div class="card-title">{ic}{title}{t}</div>
  <p class="card-text">{text}</p>
</div>"""

def ul(items, tight=False):
    lis = "".join(f"<li>{i}</li>" for i in items)
    cls = "feature tight" if tight else "feature"
    return f'<ul class="{cls}">{lis}</ul>'

def table(headers, rows):
    th = "".join(f"<th>{h}</th>" for h in headers)
    tr = ""
    for r in rows:
        tds = "".join(f"<td>{c}</td>" for c in r)
        tr += f"<tr>{tds}</tr>"
    return f'<div class="table-wrap"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'

def code(text):
    return f'<pre class="code">{html.escape(text)}</pre>'

def notice(kind, text):
    key = {
        "info": "IconFluentInfo",
        "warn": "IconWarning",
        "err":  "IconClose",
        "ok":   "IconCheck",
    }[kind]
    return f'<div class="notice {kind}">{icon(key, "n-ico")}<div>{text}</div></div>'

def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("  ✓", name)
