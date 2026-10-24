#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 A 组（首页）

首页只回答三件事：这是什么 / 能干什么 / 想深入看哪里。
细节一律外链到各专页，不在首页重复堆砌。
"""
from build import page, sec, card, ul, table, write, icon

# 主下载入口：GitHub Releases（站内 download.html 只讲下载大厅的能力，不放安装包）
RELEASES_URL = "https://github.com/redstore-noob/Mofumofu/releases"

# ══════════════════════════════════════════════════════════
# 首页
# ══════════════════════════════════════════════════════════

STATS = [
    ("5", "大加载器"),
    ("8", "创作工具"),
    ("22", "桌面小组件"),
    ("4", "种服务端核心"),
    ("3", "种登录方式"),
]

PAGES = [
    ("download.html", "下载大厅"),
    ("instances.html", "实例管理"),
    ("account.html", "账户与皮肤"),
    ("servers.html", "服务器"),
    ("online.html", "联机"),
    ("music.html", "音乐"),
    ("creator.html", "创作中心"),
    ("plugins.html", "插件"),
    ("widgets.html", "桌面小组件"),
    ("settings.html", "设置"),
]

CAPABILITIES = [
    ("下载与安装", "download.html", "下载大厅", "IconDownload", [
        "<b>5 大加载器</b>：Fabric / Quilt / Forge / NeoForge / OptiFine，各自独立实现类",
        "<b>Modrinth</b>：mod / 整合包 / 光影 / 材质包四类资源搜索与安装",
        "<b>多镜像源</b>：官方 / 镜像 / 自定义，含回落源与测速选最快",
    ]),
    ("账户与启动", "account.html", "账户与皮肤", "IconAccount", [
        "<b>三种登录</b>：Microsoft 正版（PKCE + 设备码）、Authlib 皮肤站、离线账号",
        "<b>凭据加密</b>：DPAPI / Keychain / libsecret 三系统原生实现",
        "<b>启动装配</b>：仅在用户未手写时注入参数，G1GC 按机器分档",
    ]),
    ("服务器与联机", "servers.html", "服务器", "IconServer", [
        "<b>4 种服务端核心</b>：paper / vanilla / fabric / neoforge",
        "<b>完整 RCON</b>：Source RCON 协议实现，热备份运行中也能刷盘",
        "<b>陶瓦联机</b>：Terracotta 客户端适配，5 态状态机",
    ]),
    ("创作与桌面", "creator.html", "创作中心", "IconCreator", [
        "<b>8 个创作工具</b>：资源包 / 命令 / 渐变文字 / 立方体 3D / 皮肤 / 整合包 …",
        "<b>3D 皮肤编辑器</b>：64×64 展开图涂色，模型实时更新",
        "<b>22 个桌面小组件</b>：格子板自由摆放，真实数据源",
    ]),
]

MODULES = [
    ["<b>MofuCore</b>", "Minecraft 逻辑内核：版本、加载器、账户、启动、服务器、联机。零 UI 引用。"],
    ["<b>Mofumofu.Launcher</b>", "Avalonia 前端主体：全部视图、控件、服务与主题系统。"],
    ["<b>Mofumofu.Classic</b>", "同一内核的另一套宿主（Photino.NET）。"],
    ["<b>NekoSolo</b>", "独立的单文件整合包安装器：校验、解压、建快捷方式。"],
    ["<b>Mofumofu.Backend</b>", "启动器自身后端：设置持久化、日志、外部链接唤起。"],
]

ENTRIES = [
    ("技术架构", "architecture.html", "分层 · 内核 · 模块边界",
     "五个模块怎么切、依赖往哪个方向走、UI 与业务如何彻底解耦。"),
    ("下载大厅", "download.html", "版本 · 加载器 · 资源",
     "从装游戏本体到找 mod 与整合包，一条链路走完。"),
    ("插件系统", "plugins.html", "plugin.yaml · 安装器",
     "插件包怎么描述、权限怎么声明、安装器怎么校验。"),
    ("服务器与联机", "servers.html", "建服 · RCON · 热备份",
     "四种服务端核心、完整 RCON、运行中也能备份。"),
]

stats_html = "".join(
    f'<div class="stat-item"><b>{n}</b><span>{l}</span></div>' for n, l in STATS)

pages_html = '<span class="pi-label">功能页面</span>' + "".join(
    f'<a href="{h}">{t}</a>' for h, t in PAGES)

caps_html = "".join(f"""
  <div class="card hoverable">
    <div class="card-title">{icon(k, "card-ico")}{t}</div>
    {ul(items)}
    <a class="card-more" href="{h}">{link} {icon("IconArrowRight")}</a>
  </div>""" for t, h, link, k, items in CAPABILITIES)

entries_html = "".join(f"""
  <a class="card hoverable entry" href="{h}">
    <div class="entry-k">{k}</div>
    <div class="entry-t">{t}</div>
    <p class="entry-d">{d}</p>
    <div class="entry-go">进入 {icon("IconArrowRight")}</div>
  </a>""" for t, h, k, d in ENTRIES)

body = f"""
<div class="hero">
  <div class="hero-badge">{icon("IconFluentSparkle")} 开源 · 免费 · 跨平台</div>
  <h1>一只毛茸茸的<br><span class="grad">Minecraft 启动器</span></h1>
  <div class="hero-visual">
    <img class="hero-art" src="assets/img/wallpaper.jpg" alt="Mofumofu 默认壁纸：云海之上的方块世界" width="1600" height="900" fetchpriority="high" decoding="async">
    <span class="hero-visual-top">MOFU / 001</span>
    <span class="hero-visual-bottom">PLAY BEYOND<br>THE GRID</span>
    <img class="hero-icon" src="assets/img/app-icon-192.png" alt="" width="86" height="86" decoding="async">
  </div>
  <p class="lead">
    基于 <b>Avalonia 12 + SukiUI 7</b> 的跨平台桌面启动器。下载、账户、启动、服务器与联机的
    全部逻辑，由自研内核 <b>MofuCore</b> 用 C# 从零实现，不套壳任何第三方启动核心。
  </p>
  <div class="btn-row">
    <a class="btn primary" href="{RELEASES_URL}" target="_blank" rel="noopener noreferrer" title="前往 GitHub Releases 下载安装包">{icon("IconDownload")} 去 GitHub 下载 <span class="btn-ext" aria-hidden="true">↗</span></a>
    <a class="btn" href="architecture.html">{icon("IconCube")} 看看技术架构</a>
  </div>
  <div class="stat-strip">{stats_html}</div>
  <div class="page-index">{pages_html}</div>
</div>

{sec("01", "核心能力", "每一项都接真实后端，不是演示占位", f"""
<div class="grid g2">{caps_html}
</div>""")}

{sec("02", "模块构成", "五个模块，职责边界清晰", table(
    ["模块", "职责"],
    MODULES,
))}

{sec("03", "想深入看哪里", "首页只给轮廓，细节在各专页", f"""
<div class="grid g2">{entries_html}
</div>""")}
"""

write("index.html", page(
    "index.html", "Mofumofu Launcher", "跨平台 · Avalonia 12 · SukiUI 7",
    "一只毛茸茸的 Minecraft 启动器。基于 Avalonia 12 与 SukiUI 7 构建，"
    "后端用 C# 从零实现全部 Minecraft 逻辑，前端以令牌化设计系统驱动。",
    body,
    tags=[("开源免费", "ok"), ("跨平台", "accent"), (".NET 10", ""), ("v1.0.0", "")],
    headless=True,
))

# ══════════════════════════════════════════════════════════
# 404（GitHub Pages 自定义错误页）
# ══════════════════════════════════════════════════════════
body404 = f"""
<div class="lost-mark"><img src="assets/img/app-icon-192.png" alt="" width="72" height="72" loading="lazy"></div>
<div class="btn-row" style="margin-bottom:8px">
  <a class="btn primary" href="index.html">{icon("IconHome")} 回到首页</a>
  <a class="btn" href="download.html">{icon("IconDownload")} 看下载大厅</a>
</div>

{sec("01", "也许你想找这些", "", f"""
<div class="grid g-auto">
  {card("下载大厅", "7 个标签页 · 5 大加载器 · Modrinth 资源搜索", iconp="IconDownload")}
  {card("技术架构", "五模块分层 · 内核能力域", iconp="IconCube")}
  {card("插件系统", "plugin.yaml · .nekoex · 安装器校验", iconp="IconPlugin")}
</div>""")}
"""

write("404.html", page(
    "404.html", "页面走丢了", "404 · Not Found",
    "你要找的页面不存在，或者已经被移走了。回首页看看，或者从左边挑一个功能？",
    body404,
))
