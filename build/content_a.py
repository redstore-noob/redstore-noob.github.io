#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 A 组（首页 / 404）

首页只回答三件事：这是什么 / 能干什么 / 想深入看哪里。
十项常规功能合并为一条优势，不单独成页；想动手的只留架构与插件文档两个入口。
"""
from build import page, sec, card, ul, table, write, icon

# 主下载入口：GitHub Releases
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

# 十项能力合并成主页的一条优势：只留最有说服力的事实，细节不再展开
ADVANTAGES = [
    ("下载大厅", "IconDownload", "<b>5 大加载器</b> · Modrinth 四类资源 · 多镜像测速回落"),
    ("实例管理", "IconGrid", "<b>6 个详情标签</b> · 每实例独立内存 · 一键导入导出"),
    ("账户与皮肤", "IconAccount", "<b>3 种登录</b> · 三系统原生加密 · 3D 皮肤涂色"),
    ("服务器", "IconServer", "<b>4 种服务端核心</b> · 完整 RCON · 运行中热备份"),
    ("联机", "IconGlobe", "<b>陶瓦客户端</b> · 五态状态机 · 房间码一键入房"),
    ("音乐", "IconMusic", "<b>本地 + 网易云双源</b> · 队列与歌词逐句跟随"),
    ("创作中心", "IconCreator", "<b>8 个创作工具</b> · 立方体 3D 文字 · 资源包与命令生成"),
    ("插件", "IconPlugin", "<b>.NET 类库热装卸</b> · 8 个权限区 · 可在线更新"),
    ("桌面小组件", "IconMonitor", "<b>22 个组件</b> · 格子板自由摆放 · 接真实数据源"),
    ("设置", "IconSettings", "<b>5 大分区</b> · 6 套强调色 · 三语言即时切换"),
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
    ("插件文档", "docs/index.html", "Extension Guide · 八章",
     "从跑通第一个插件到 UI 扩展、下载域与启动钩子，全部接口都在这里。"),
]

stats_html = "".join(
    f'<div class="stat-item"><b>{n}</b><span>{l}</span></div>' for n, l in STATS)

adv_html = "".join(f"""
  <div class="adv-item">
    <span class="adv-ico">{icon(k)}</span>
    <div class="adv-body">
      <div class="adv-t">{t}</div>
      <p class="adv-d">{d}</p>
    </div>
  </div>""" for t, k, d in ADVANTAGES)

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
</div>

{sec("01", "一个启动器，十项全能", "别人装五个软件才凑齐的活，这里一个窗口干完", f"""
<div class="adv">{adv_html}
</div>""")}

{sec("02", "模块构成", "五个模块，职责边界清晰", table(
    ["模块", "职责"],
    MODULES,
))}

{sec("03", "想深入看哪里", "常规功能都在上一节，这两个入口留给想动手的人", f"""
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
  <a class="btn" href="docs/index.html">{icon("IconFluentCode")} 看插件文档</a>
</div>

{sec("01", "也许你想找这些", "", f"""
<div class="grid g-auto">
  <a class="card hoverable" href="index.html" style="text-decoration:none;color:inherit">
    <div class="card-title">{icon("IconHome", "card-ico")}功能一览</div>
    <p class="card-text">十项能力、模块构成，一页看完全貌</p>
  </a>
  <a class="card hoverable" href="architecture.html" style="text-decoration:none;color:inherit">
    <div class="card-title">{icon("IconCube", "card-ico")}技术架构</div>
    <p class="card-text">五模块分层 · 内核能力域</p>
  </a>
  <a class="card hoverable" href="docs/index.html" style="text-decoration:none;color:inherit">
    <div class="card-title">{icon("IconFluentCode", "card-ico")}插件文档</div>
    <p class="card-text">Extension Guide · 八章完整开发指南</p>
  </a>
</div>""")}
"""

write("404.html", page(
    "404.html", "页面走丢了", "404 · Not Found",
    "你要找的页面不存在，或者已经被移走了。回首页看看，或者从左边挑一个方向？",
    body404,
))
