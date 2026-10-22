#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mofumofu Web · 站点生成器
从 build/content_*.py 的结构化数据生成 15 个静态页面。

用法：
    cd E:/redstore-noob.github.io/build
    python -c "import build, content_a, content_b, content_c, content_d, content_e"

所有事实均来自对 E:/Mofumofu 仓库源码的实测，非编造。
"""
import os, html

ROOT = os.path.dirname(os.path.abspath(__file__))
# 生成的 HTML 输出到仓库根目录（GitHub Pages 的站点根）
OUT = os.path.abspath(os.path.join(ROOT, ".."))

# ============================================================
# 导航结构
# ============================================================
NAV = [
    ("总览", [
        ("index.html",   "首页",         "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"),
        ("architecture.html", "技术架构", "M12,2L2,7V17L12,22L22,17V7L12,2M12,4.15L19.5,8L12,11.85L4.5,8L12,4.15M4,9.8L11,13.3V19.8L4,16.3V9.8M13,19.8V13.3L20,9.8V16.3L13,19.8Z"),
    ]),
    ("功能页面", [
        ("download.html",   "下载大厅",  "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"),
        ("instances.html",  "实例管理",  "M4,4H20V20H4V4M4,9H20M9,9V20"),
        ("account.html",    "账户与皮肤","M12,4C10,4 8,5 8,7V9H16V7C16,5 14,4 12,4M8,11H16V20H8V11Z"),
        ("servers.html",    "服务器",    "M4,4H20V16H4V4M8,20H16M12,16V20M7,8H10M14,8H17M7,12H10M14,12H17"),
        ("online.html",     "联机",      "M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C8.1,4 4.9,6.6 4.3,10H8V14H4.3C4.9,17.4 8.1,20 12,20C13.9,20 15.7,19.3 17,18.1V15H14V11H17.9C17.6,8.1 15.2,5.3 12.2,4.2Z"),
        ("music.html",      "音乐",      "M12,3V13.55C11.41,13.21 10.73,13 10,13A3,3 0 0,0 7,16A3,3 0 0,0 10,19A3,3 0 0,0 13,16V7H17V3H12Z"),
        ("creator.html",    "创作中心",  "M12,2L2,7V17L12,22L22,17V7L12,2M12,4.15L19.5,8L12,11.85L4.5,8L12,4.15"),
        ("plugins.html",    "插件",      "M9,2V4H15V2H9M7,4H17A2,2 0 0,1 19,6V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V6A2,2 0 0,1 7,4M10,9H14V13H10V9Z"),
        ("widgets.html",    "桌面小组件","M3,3H10V10H3V3M14,3H21V10H14V3M3,14H10V21H3V14M14,14H21V21H14V14"),
    ]),
    ("配置与生态", [
        ("settings.html",   "设置",      "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,9.05 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,14.95 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 19.05,19.05L16.56,18.05C16.04,18.44 15.5,18.78 14.87,19.03L14.5,21.68C14.46,21.92 14.25,22.1 14,22.1H10C9.75,22.1 9.54,21.92 9.5,21.68L9.13,19.03C8.5,18.78 7.96,18.44 7.44,18.05L4.95,19.05C4.73,19.04 4.46,18.95 4.34,18.73L2.34,15.27C2.21,14.95 2.27,14.78 2.46,14.63L4.57,12.97Z"),
        ("ui-library.html", "UI 库选型", "M12,2L2,7V17L12,22L22,17V7L12,2M12,18.5A6.5,6.5 0 0,1 5.5,12A6.5,6.5 0 0,1 12,5.5A6.5,6.5 0 0,1 18.5,12A6.5,6.5 0 0,1 12,18.5M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5"),
        ("roadmap.html",    "现状与缺口", "M3,3H21V21H3V3M7,9H17M7,13H17M7,17H13"),
    ]),
]

ACCENTS = [
    ("teal", "青绿", "#3FC6C1"), ("blue", "蔚蓝", "#5AA9E6"), ("green", "新绿", "#4CC38A"),
    ("orange", "暖橙", "#F2AE49"), ("pink", "樱粉", "#E5698F"), ("purple", "紫藤", "#A78BFA"),
]

# ============================================================
# 模板
# ============================================================
def icon(path, cls=""):
    return f'<svg viewBox="0 0 24 24" class="{cls}"><path d="{path}"/></svg>'

def render_nav(cur):
    out = ['<nav class="sb-nav">']
    for group, items in NAV:
        out.append('<div class="sb-group">')
        out.append(f'<div class="sb-group-label">{group}</div>')
        for href, label, ipath in items:
            act = " active" if href == cur else ""
            out.append(f'<a class="sb-link{act}" href="{href}">{icon(ipath)}{label}</a>')
        out.append('</div>')
    out.append('</nav>')
    return "\n".join(out)

def render_picker():
    dots = []
    for key, name, hexv in ACCENTS:
        dots.append(f'<button class="accent-dot" data-accent="{key}" title="{name}" '
                    f'aria-label="强调色 {name}" style="background:{hexv};color:{hexv}"></button>')
    return '<div class="accent-picker">' + "".join(dots) + '</div>'

def page(cur, title, eyebrow, lead, body, tags=None, prev=None, next_=None):
    tags_html = ""
    if tags:
        tags_html = '<div class="head-tags">' + "".join(
            f'<span class="tag {t[1] if len(t)>1 else ""}">{t[0]}</span>' for t in tags) + '</div>'

    pager = ""
    if prev or next_:
        parts = ['<div class="pager">']
        if prev:
            parts.append(f'<a href="{prev[0]}"><div class="p-dir">← 上一页</div><div class="p-name">{prev[1]}</div></a>')
        if next_:
            parts.append(f'<a href="{next_[0]}"><div class="p-dir">下一页 →</div><div class="p-name">{next_[1]}</div></a>')
        parts.append('</div>')
        pager = "\n".join(parts)

    return f"""<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · Mofumofu Launcher</title>
<meta name="description" content="{lead[:120]}">
<link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
<div class="shell">
  <aside class="sidebar" id="sidebar">
    <div class="sb-head">
      <div class="sb-logo"><svg viewBox="0 0 24 24"><path d="M12,2L2,7V17L12,22L22,17V7L12,2M12,4.15L19.5,8L12,11.85L4.5,8L12,4.15M4,9.8L11,13.3V19.8L4,16.3V9.8M13,19.8V13.3L20,9.8V16.3L13,19.8Z"/></svg></div>
      <div>
        <div class="sb-title">Mofumofu</div>
        <div class="sb-sub">Avalonia 12 · SukiUI 7</div>
      </div>
    </div>
    {render_nav(cur)}
    <div class="sb-foot">
      <div class="small dim">数据取自源码实测</div>
      <div class="small dim">v1.0.0 · .NET 10</div>
    </div>
  </aside>

  <div class="main">
    <header class="topbar">
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="菜单">
        <svg viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16"/></svg>
      </button>
      <div class="crumb">Mofumofu <span>/</span> <b>{title}</b></div>
      <div class="topbar-tools">
        {render_picker()}
        <button class="icon-btn" id="themeBtn" aria-label="切换主题">
          <svg viewBox="0 0 24 24"><path d="M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L14.5,5.5L18.5,4.5L18,8.5L21,10.5L18,12.5L18,16.5L14.5,15.5L12,19L9.5,15.5L6,16.5L6,12.5L3,10.5L6,8.5L5.5,4.5L9.5,5.5L12,2Z"/></svg>
        </button>
      </div>
    </header>

    <main class="content">
      <div class="page-head">
        <div class="page-eyebrow">{eyebrow}</div>
        <h1 class="page-title">{title}</h1>
        <p class="page-lead">{lead}</p>
        {tags_html}
      </div>
      {body}
      {pager}
    </main>

    <footer class="foot">
      <div>Mofumofu Launcher · 基于 Avalonia 12.1.4 + SukiUI 7.0.2-nightly 构建</div>
      <div>第三方辅助工具，与 Mojang / Microsoft 无隶属关系</div>
    </footer>
  </div>
</div>
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
    ic = f'<span class="dot"></span>' if not iconp else icon(iconp)
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
    ic = {
        "info": "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z",
        "warn": "M12,2L1,21H23L12,2M13,18H11V16H13V18M13,14H11V10H13V14Z",
        "err":  "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15,13H13V17H11V13H9V11H15V13M15,9H13V7H11V9H15V9Z",
        "ok":   "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.4,10.6L10,14.2L17.6,6.6L19,8L10,17Z",
    }[kind]
    return f'<div class="notice {kind}"><svg class="n-ico" viewBox="0 0 24 24"><path d="{ic}"/></svg><div>{text}</div></div>'

def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("  ✓", name)
