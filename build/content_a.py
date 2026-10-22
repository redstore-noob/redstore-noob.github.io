#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 A 组（首页 / 架构 / UI 选型）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 1. 首页
# ══════════════════════════════════════════════════════════
body = f"""
<div class="hero">
  <div class="hero-badge">{icon("M12,2L2,7V17L12,22L22,17V7L12,2M12,4.15L19.5,8L12,11.85L4.5,8L12,4.15")} 开源 · 免费 · 跨平台</div>
  <h1>一只毛茸茸的<br><span class="grad">Minecraft 启动器</span></h1>
  <p class="lead">
    Mofumofu 是一款基于 <b>Avalonia 12 + SukiUI 7</b> 的跨平台桌面启动器。
    后端 <b>MofuCore</b> 用 C# 从零实现 Minecraft 的下载、账户、启动、服务器与联机逻辑，
    前端以 SukiUI 为主题骨架、以令牌化设计系统驱动全部界面。
  </p>
  <div class="btn-row">
    <a class="btn primary" href="architecture.html">{icon("M12,2L2,7V17L12,22L22,17V7L12,2M12,4.15L19.5,8L12,11.85L4.5,8L12,4.15")} 看看技术架构</a>
    <a class="btn" href="ui-library.html">{icon("M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z")} SukiUI 适配选型</a>
  </div>

  <div class="hero-stats">
    <div class="card stat"><div class="stat-num">71K</div><div class="stat-label">行 C# / XAML</div></div>
    <div class="card stat"><div class="stat-num">5</div><div class="stat-label">大模块</div></div>
    <div class="card stat"><div class="stat-num">1853</div><div class="stat-label">本地化键</div></div>
    <div class="card stat"><div class="stat-num">22</div><div class="stat-label">桌面小组件</div></div>
    <div class="card stat"><div class="stat-num">5</div><div class="stat-label">加载器支持</div></div>
  </div>
</div>

{sec("01", "项目一览", "五个模块，职责边界清晰；UI 与 Minecraft 逻辑彻底解耦", f"""
<div class="grid g-auto">
  {card("MofuCore", "Minecraft 逻辑核心库，25,873 行 / 31 文件。不含任何 UI 引用，纯粹的业务内核。", "25,873 行", "accent")}
  {card("Mofumofu.Backend", "启动器自身的后端：本地设置持久化、日志写入、外部链接唤起。仅 467 行，极薄。", "467 行")}
  {card("Mofumofu.Launcher", "Avalonia 前端主体，35,912 行 / 77 文件。所有视图、控件、服务、主题系统。", "35,912 行", "accent")}
  {card("Mofumofu.Classic", "同内核的另一套宿主（Photino.NET），7,073 行 / 24 文件，16 个反射注册的 API 模块。", "7,073 行")}
  {card("NekoSolo", "独立的单文件整合包安装器（WPF），1,965 行。负责 CRC 校验、解压、建快捷方式。", "1,965 行")}
</div>""")}

{sec("02", "核心能力", "每一项都接真实后端，不是演示占位", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>下载与安装</div>
    {ul([
      "<b>Minecraft 本体</b>正式版下载，带磁盘缓存与 CheckBox 组筛选器",
      "<b>5 大加载器</b>：Fabric / Quilt / Forge / NeoForge / OptiFine，各自独立实现类",
      "<b>Modrinth</b> 搜索与安装：mod / 整合包 / 光影 / 材质包四类资源",
      "<b>Java 环境</b>探测与 Mojang 官方运行时下载",
      "<b>多镜像源</b>：官方 / 镜像 / 自定义，含回落源与测速选最快",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>账户与启动</div>
    {ul([
      "<b>三种登录</b>：Microsoft 正版（PKCE + 设备码）、Authlib 皮肤站、离线账号",
      "<b>凭据加密</b>：DPAPI / Keychain / libsecret 三系统原生实现",
      "<b>启动参数装配</b>：仅在用户未手写时才注入 -Xms / -Xmx",
      "<b>G1GC 调优</b>：按机器分档，低配关高配开",
      "<b>类终端控制台</b>：阶段时间线 + 等宽输出 + 命令行输入",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>服务器与联机</div>
    {ul([
      "<b>4 种服务端核心</b>：paper / vanilla / fabric / neoforge",
      "<b>完整 RCON</b>：Source RCON 协议实现，含鉴权与指令通道",
      "<b>热备份</b>：save-off / save-all 刷盘，运行中也能备份",
      "<b>玩家管理</b>：白名单 / OP / 封禁名单结构化读写",
      "<b>陶瓦联机</b>：Terracotta 客户端适配，5 态状态机",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>创作与桌面</div>
    {ul([
      "<b>8 个创作工具</b>：资源包 / 命令 / 渐变文字 / 立方体 3D / 皮肤 / 整合包 / NekoSolo / 插件",
      "<b>3D 皮肤编辑器</b>：64×64 展开图涂色，模型实时更新",
      "<b>22 个桌面小组件</b>：格子板自由摆放，真实数据源",
      "<b>Rewind 时光回溯</b>：内容寻址快照，回滚前自动备份",
      "<b>壁纸系统</b>：libVLC 视频壁纸 + 本地图片轮播",
    ])}
  </div>
</div>""")}

{sec("03", "界面一览", "九大功能页面 + 桌面，所有页面均接真实后端", f"""
<div class="grid g-auto">
  {card("下载大厅", "7 个标签页：Minecraft / Mod / 整合包 / 光影 / 资源包 / Java / 任务。", "下载大厅")}
  {card("实例管理", "6 个详情标签：概览 / 启动 / Java / 内容 / 游戏 / 管理。", "实例")}
  {card("账户与皮肤", "Microsoft / Authlib / 离线三种方式，含 3D 皮肤编辑。", "账户")}
  {card("服务器", "建服、控制台、备份、玩家权限全流程。", "服务器")}
  {card("联机", "Terracotta 建房 / 加入 / 退房，服务自动安装。", "联机")}
  {card("音乐", "本地曲库 + 网易云，真实播放与歌词。", "音乐")}
  {card("创作中心", "8 个工具，含 WebGL 立方体 3D 文字。", "创作")}
  {card("插件", "扫描 plugin.yaml 与 .nekoex 包。", "插件")}
  {card("设置", "5 大分区：游戏 / 通用 / 外观 / 网络 / 关于。", "设置")}
</div>""")}

{sec("04", "设计系统", "没有一处硬编码颜色 —— 全部走令牌", f"""
<p class="muted" style="margin-top:-4px">
  整个界面共用 <b>41 个颜色令牌</b>，命名规则为 <code>Neko&#123;语义&#125;&#123;状态&#125;Brush</code>。
  深浅两套色值与 6 套强调色由 <code>ThemeManager</code> 统一计算，切换即时生效（含 code-behind 自绘元素）。
</p>
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>6 套强调色</div>
    <div class="table-wrap" style="margin-top:10px">
      <table>
        <thead><tr><th>名称</th><th>主色</th><th>Hover</th><th>Pressed</th></tr></thead>
        <tbody>
          <tr><td>青绿 <span class="tag accent">默认</span></td><td><code>#3FC6C1</code></td><td><code>#57D8D3</code></td><td><code>#33BDB8</code></td></tr>
          <tr><td>蔚蓝</td><td><code>#5AA9E6</code></td><td><code>#7CBEED</code></td><td><code>#4590CE</code></td></tr>
          <tr><td>新绿</td><td><code>#4CC38A</code></td><td><code>#6BD3A3</code></td><td><code>#3AA876</code></td></tr>
          <tr><td>暖橙</td><td><code>#F2AE49</code></td><td><code>#F7C470</code></td><td><code>#D8962F</code></td></tr>
          <tr><td>樱粉</td><td><code>#E5698F</code></td><td><code>#EE8AA9</code></td><td><code>#CC5379</code></td></tr>
          <tr><td>紫藤</td><td><code>#A78BFA</code></td><td><code>#BCA5FF</code></td><td><code>#8F6EF0</code></td></tr>
        </tbody>
      </table>
    </div>
    <p class="card-text small" style="margin-top:12px">
      试试右上角的圆点 —— 整站会立即跟着变色。强调色相关的所有 Soft 底色都由
      <code>Soft(ratio) = Blend(强调色, surfaceBase, ratio)</code> 动态算出。
    </p>
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>深 / 浅两套表面色</div>
    <div class="table-wrap" style="margin-top:10px">
      <table>
        <thead><tr><th>令牌</th><th>浅色</th><th>深色</th></tr></thead>
        <tbody>
          <tr><td><code>NekoText</code></td><td><code>#1B2430</code></td><td><code>#E9EEF6</code></td></tr>
          <tr><td><code>NekoMuted</code></td><td><code>#5C6B7E</code></td><td><code>#93A0B4</code></td></tr>
          <tr><td><code>NekoSurface</code></td><td><code>#F2F5F8</code></td><td><code>#0A0E15</code></td></tr>
          <tr><td><code>NekoCard</code></td><td><code>#F7FFFFFF</code></td><td><code>#D9121822</code></td></tr>
          <tr><td><code>NekoField</code></td><td><code>#E7EEF5</code></td><td><code>#16202B</code></td></tr>
          <tr><td><code>NekoTerminal</code></td><td><code>#F4F8FB</code></td><td><code>#05090C</code></td></tr>
          <tr><td><code>NekoTerminalText</code></td><td><code>#1D6B57</code></td><td><code>#9FE8D5</code></td></tr>
          <tr><td><code>NekoBorder</code></td><td><code>#D5DEE8</code></td><td><code>#26303D</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>""")}

{sec("05", "已知缺口", "如实记录，不粉饰", f"""
{notice("warn", "<b>README 中的 Wallpaper Engine 章节已完全过时。</b> 代码里 <code>webwallgl</code> / <code>scene.pkg</code> 零命中，实际改用 <b>libVLC</b> 渲染视频壁纸（<code>WallpaperVideoHost.cs:13</code> 明确注释「不使用 WebView2」）。")}
<div class="grid g2" style="margin-top:14px">
  <div class="card">
    <div class="card-title"><span class="dot"></span>功能缺口</div>
    {ul([
      "CurseForge 完全未适配，<code>Download/Curseforge/</code> 只有一个 info.md，API Key 仅保存不消费",
      "插件运行时未实现 —— 只扫描目录，不加载插件代码；权限体系只有文案没有逻辑",
      "8 个桌面组件被硬过滤掉（playtime / quickjoin / rss / music / download / network / goal / screenshots）",
      "联机只接了 1 个服务商，索引 1 及以上直接返回 null",
      "Rewind 仅覆盖本地，无云同步",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>细节问题</div>
    {ul([
      "网易云部分歌曲需 VIP，接口只返回试听片段或空地址",
      "本地音乐未读取 ID3 标签，标题直接用文件名",
      "NekoSolo 导出的仍是 .zip 载荷，未追加 exe 尾标，需自行与 stub 合并",
      "README 称本地化 1826 键，实测 zh-CN / en-US 各 1853 键",
      "<code>ParallelDownloads</code> 注释写 1-16，实际默认值是 32",
    ])}
  </div>
</div>""")}

<div class="btn-row" style="margin-top:30px">
  <a class="btn primary" href="architecture.html">继续：技术架构 →</a>
  <a class="btn" href="roadmap.html">查看完整缺口清单</a>
</div>
"""

write("index.html", page(
    "index.html", "Mofumofu Launcher", "跨平台 · Avalonia 12 · SukiUI 7",
    "一只毛茸茸的 Minecraft 启动器。基于 Avalonia 12 与 SukiUI 7 构建，"
    "后端用 C# 从零实现全部 Minecraft 逻辑，前端以令牌化设计系统驱动。",
    body,
    tags=[("开源免费", "ok"), ("跨平台", "accent"), (".NET 10", ""), ("v1.0.0", "")],
    next_=("architecture.html", "技术架构"),
))
