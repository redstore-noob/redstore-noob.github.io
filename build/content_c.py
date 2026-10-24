#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 C 组（下载 / 实例 / 账户 / 服务器）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 4. 下载大厅
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "七个标签页", "从装游戏本体到管下载任务，一条链路", f"""
<div class="grid g-auto">
  {card("Minecraft", "正式版列表 + 磁盘缓存 + 搜索 + CheckBox 组筛选器 + 翻页。加载时显示旋转渐变圈。", "独立安装页", "accent")}
  {card("Mod", "Modrinth 搜索，防抖 + 离线降级。真实安装，支持中文资源名匹配。")}
  {card("整合包", ".mrpack 安装，并发下载（默认 16）+ 重试 2 次 + 自动装加载器。")}
  {card("光影", "shader 资源搜索与安装。")}
  {card("资源包", "resourcepack 资源搜索与安装。")}
  {card("Java", "Mojang 运行时清单、本机探测、设为全局、删除。")}
  {card("任务", "真实暂停 / 继续 / 取消 / 清除已完成。")}
</div>
{notice("info", "<b>资源详情改用独立页面</b>：游戏版本 / 加载器 / 安装目标 / 版本列表 四段联动，每段变化都会重新拉取下一段。")}""")}

{sec("02", "Minecraft 本体安装", "切换加载器 → 拉取加载器版本 → 选目标实例 → 安装", f"""
<div class="flow">
  <div class="flow-step"><div class="flow-num">STEP 01</div><div class="flow-title">选择原版</div><div class="flow-desc">正式版列表</div></div>
  <div class="flow-step"><div class="flow-num">STEP 02</div><div class="flow-title">选择加载器</div><div class="flow-desc">5 选 1</div></div>
  <div class="flow-step"><div class="flow-num">STEP 03</div><div class="flow-title">选择版本</div><div class="flow-desc">拉取加载器版本列表</div></div>
  <div class="flow-step"><div class="flow-num">STEP 04</div><div class="flow-title">选择实例</div><div class="flow-desc">安装目标</div></div>
  <div class="flow-step"><div class="flow-num">STEP 05</div><div class="flow-title">安装</div><div class="flow-desc">解析库依赖</div></div>
</div>

<div class="section-head" style="margin-top:26px;margin-bottom:12px">
  <span class="section-num">02.1</span><h2 class="section-title">5 个加载器，各自独立实现</h2>
</div>
{table(
    ["加载器", "说明"],
    [
        ["<b>Fabric</b>", "标准流程，镜像可用"],
        ["<b>Quilt</b>", "<span class=\"tag warn\">无镜像</span> 直连官方"],
        ["<b>Forge</b>", "官网源非 Maven 结构，做了专门适配"],
        ["<b>NeoForge</b>", "标准流程，镜像可用"],
        ["<b>OptiFine</b>", "独立安装器，走官方 jar"],
    ])}
{notice("warn", "<b>.mrpack 整合包仅支持 Fabric / Quilt</b> —— 其他加载器的整合包请用 .zip 形式导入。")}""")}

{sec("03", "下载源", "官方 / 镜像 / 自定义，含回落与测速", f"""
{table(
    ["源", "地址", "说明"],
    [
        ["<b>official</b>", "<code>piston-meta.mojang.com</code>", "Mojang 官方"],
        ["<b>bmcl</b>", "<code>bmclapi2.bangbang93.com</code>", "默认源，带 <code>/maven</code> + <code>/assets</code>"],
        ["<b>custom</b>", "自定义名称 + URL", "URL 重写覆盖 piston-meta / piston-data / launchermeta 三类域名"],
    ])}
<div class="grid g3" style="margin-top:16px">
  {card("回落源", "独立配置的 <code>DownloadFallbackSource</code>：none / bmcl / official / custom。主源挂了自动切。", "独立配置")}
  {card("测速选最快", "逐源测量延迟，可一键自动选最快。", "一键切换")}
  {card("并行下载数", "可配置，默认 32 线程，按内核上限自动夹取。", "默认 32")}
</div>""")}

{sec("04", "合规与限制", "地区合规与内容源限制，都写在明面上", f"""
{notice("warn", """下载大厅有一条<b>中国大陆地区合规警告条</b>，仅在中文界面显示 ——
提示用户确认所下载内容的来源与合法性。""")}
<div class="grid g2" style="margin-top:16px">
  <div class="card">
    <div class="card-title">CurseForge 未适配</div>
    {ul([
      "官方说明：由于 CurseForge 的部分政策原因，暂不适配其内容源",
      "当前版本不提供 CurseForge 搜索与下载",
      "Modrinth 已可覆盖 mod / 整合包 / 光影 / 材质包四类资源",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">版本清单缓存</div>
    {ul([
      "版本清单落盘缓存，二次打开无需重新拉取",
      "搜索 + CheckBox 组筛选 + 翻页",
      "Minecraft 默认只显示正式版",
    ], tight=True)}
  </div>
</div>""")}
"""

write("download.html", page(
    "download.html", "下载大厅", "Download Hall",
    "7 个标签页覆盖从游戏本体到第三方资源的全部下载路径。"
    "5 大加载器各自独立实现，Modrinth 四类资源支持真实搜索与安装。",
    body,
    tags=[("5 加载器", "accent"), ("Modrinth", ""), ("多镜像源", ""), ("任务面板", "")],
    prev=("architecture.html", "技术架构"),
    next_=("instances.html", "实例管理"),
))

# ══════════════════════════════════════════════════════════
# 5. 实例管理
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "六个详情标签", "覆盖一个实例从创建到删掉的完整生命周期", f"""
<div class="grid g3">
  {card("概览", "扫描真实 <code>versions/</code> 目录，合并版本继承链，自动识别加载器与版本类型。", "扫描真实目录", "accent")}
  {card("启动", "直接进指定存档、时光回溯入口、启动参数预览。")}
  {card("Java", "每实例独立选 Java，加载本机已探测的运行时列表。", "每实例独立")}
  {card("内容", "扫 mods / resourcepacks / shaderpacks / saves，图标自动缓存，二次加载离线可用。")}
  {card("游戏", "<code>options.txt</code> 读写：滑块改游戏设置 + 恢复默认 + 保存。", "真实读写")}
  {card("管理", "重命名 / 复制 / 导出整合包 / 删除 / 导入其他启动器。")}
</div>""")}

{sec("02", "内存与 JVM", "每实例独立分配", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">分配策略</div>
    {ul([
      "默认 <code>MinimumMemoryMb=512</code> / <code>MaximumMemoryMb=4096</code>",
      "<b>仅在用户未手写时才注入</b> <code>-Xms</code> / <code>-Xmx</code>，不覆盖你的自定义参数",
      "每实例独立记忆，不跟全局设置互相覆盖",
    ])}
  </div>
  <div class="card">
    <div class="card-title">G1GC 调优</div>
    {ul([
      "<code>+UseG1GC</code> + <code>MaxGCPauseMillis=50</code> + <code>DisableExplicitGC</code>",
      "<b>按机器分档</b>：低配关 <code>StringDeduplication</code> / <code>AlwaysPreTouch</code>，高配开 <code>G1NewSizePercent=30</code>",
      "崩溃诊断能识别 <code>GC overhead limit exceeded</code> 等典型问题",
    ])}
  </div>
</div>""")}

{sec("03", "内容扫描", "mods / 资源包 / 光影，图标自动缓存", f"""
<p class="muted" style="margin-top:-4px">
  资源图标走「磁盘缓存 + 内存 LRU + 同键请求去重」，首次加载后完全离线可用。
</p>
<div class="grid g3" style="margin-top:16px">
  {card("mods", "模组目录扫描 + 图标。")}
  {card("resourcepacks", "资源包目录。")}
  {card("shaderpacks", "光影目录。")}
</div>""")}

{sec("04", "导入与导出", "接管别的启动器，也能打包分享", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">导入其他启动器</div>
    <p class="card-text">支持把其他启动器的实例目录原样接管进来，接管后同样享有内容扫描、图标、内存分配等全部能力。</p>
  </div>
  <div class="card">
    <div class="card-title">导出整合包</div>
    <p class="card-text">一键导出为 <code>.mrpack</code> 整合包，产出的包可以直接再装回来，也方便分享给朋友。</p>
  </div>
</div>""")}
"""

write("instances.html", page(
    "instances.html", "实例管理", "Instances",
    "真实扫描 versions/ 目录，合并版本继承链并推断加载器。"
    "六个详情标签覆盖从内容扫描到内存分配的完整实例生命周期。",
    body,
    tags=[("真实扫描", "ok"), ("继承链合并", "accent"), ("options.txt 读写", "")],
    prev=("download.html", "下载大厅"),
    next_=("account.html", "账户与皮肤"),
))

# ══════════════════════════════════════════════════════════
# 6. 账户与皮肤
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "三种登录方式", "正版、皮肤站、离线，各取所需", f"""
<div class="grid g3">
  {card("Microsoft 正版", "设备码 + 内置浏览器 PKCE 登录，全程不接触你的密码。", "设备码 + PKCE", "accent")}
  {card("Authlib 皮肤站", "标准 Yggdrasil 流程，兼容主流第三方皮肤站。", "Yggdrasil")}
  {card("离线账号", "本机昵称即身份，完全不需要联网。", "无需网络")}
</div>""")}

{sec("02", "Microsoft 登录链路", "六步，每步都有独立进度反馈", f"""
<div class="flow">
  <div class="flow-step"><div class="flow-num">01</div><div class="flow-title">授权</div><div class="flow-desc">设备码 / PKCE</div></div>
  <div class="flow-step"><div class="flow-num">02</div><div class="flow-title">Microsoft 令牌</div><div class="flow-desc">OAuth 换取</div></div>
  <div class="flow-step"><div class="flow-num">03</div><div class="flow-title">Xbox Live</div><div class="flow-desc">XBL 认证</div></div>
  <div class="flow-step"><div class="flow-num">04</div><div class="flow-title">XSTS</div><div class="flow-desc">安全令牌</div></div>
  <div class="flow-step"><div class="flow-num">05</div><div class="flow-title">Minecraft</div><div class="flow-desc">游戏所有权</div></div>
  <div class="flow-step"><div class="flow-num">06</div><div class="flow-title">档案</div><div class="flow-desc">角色 UUID</div></div>
</div>
{notice("info", """登录链路的每一环都有独立进度：授权 → Microsoft 令牌 → Xbox Live → XSTS → 游戏所有权 → 档案。
卡在哪一步，界面上会直接告诉你，不用猜。""")}""")}

{sec("03", "凭据安全", "三系统原生加密", f"""
<div class="grid g3">
  {card("Windows", "DPAPI（Data Protection API），绑定当前用户。", "DPAPI", "accent")}
  {card("macOS", "Keychain 钥匙串。")}
  {card("Linux", "libsecret（GNOME Keyring / KWallet）。")}
</div>
{notice("info", "令牌加密后落盘，按 UUID 去重，跨重启持久。<b>不在设备上存储游戏账号密码</b> —— 登录全部走官方认证流程。")}
<div class="card" style="margin-top:16px">
  <div class="card-title">皮肤头像合成</div>
  <p class="card-text">
    账号下拉框里显示的是<b>玩家皮肤大头</b>：从皮肤档案里裁出 8×8 的头部与帽子层合成头像，切号即改当前启动目标并持久化。
  </p>
</div>""")}

{sec("04", "皮肤展示与编辑", "3D 预览加涂色，改完立刻看效果", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">3D 皮肤展示</div>
    {ul([
      "内嵌 skinview3d 渲染，可自由旋转缩放",
      "支持模型切换（Steve / Alex 等）",
      "披风独立开关",
      "皮肤调色板一键套用",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">3D 皮肤编辑器</div>
    {ul([
      "独立编辑窗口，不打断其他操作",
      "<b>64×64 展开图涂色</b>：画笔 / 橡皮 / 取色 / 撤销重做",
      "3D 模型<b>实时更新</b>",
      "支持导入导出皮肤图",
    ], tight=True)}
  </div>
</div>
<div class="grid g3" style="margin-top:16px">
  {card("刷新皮肤", "从服务端拉取最新档案。")}
  {card("上传正版皮肤", "走 Mojang 官方接口正式上传。")}
  {card("皮肤图库", "本地皮肤库，随手切换与收藏。")}
</div>""")}
"""

write("account.html", page(
    "account.html", "账户与皮肤", "Account & Skin",
    "Microsoft 正版 / Authlib 皮肤站 / 离线账号三条路径，凭据经系统原生加密落盘。"
    "内含 3D 皮肤展示与实时编辑的完整工作流。",
    body,
    tags=[("3 种登录", "accent"), ("DPAPI / Keychain / libsecret", "ok"), ("skinview3d", "")],
    prev=("instances.html", "实例管理"),
    next_=("servers.html", "服务器"),
))

# ══════════════════════════════════════════════════════════
# 7. 服务器
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "四种服务端核心", "选一个核心，剩下的启动器管", f"""
<div class="grid g4">
  {card("paper", "最主流的 Paper 系服务端。", "推荐", "accent")}
  {card("vanilla", "原版服务端。")}
  {card("fabric", "Fabric 模组服务端。")}
  {card("neoforge", "NeoForge 模组服务端。")}
</div>""")}

{sec("02", "运维能力", "从进程控制到热备份的完整闭环", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">进程控制</div>
    {ul([
      "状态机 <code>starting → running</code>（检测日志中的 <code>Done (</code>）",
      "<b>软停止</b>：先发 stop 指令，宽限期后强杀",
      "立即结束整个进程树",
      "崩溃自动重启开关",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">RCON 协议</div>
    {ul([
      "完整实现 Source RCON 协议，与主流服务端全兼容",
      "指令与响应双向流式收发",
      "鉴权失败有明确的错误提示",
      "断线自动重连，不用手动干预",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">控制台</div>
    {ul([
      "环形缓冲，长时间挂机也不会撑爆内存",
      "cursor 增量轮询",
      "游戏内可直接输入指令",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">备份</div>
    {ul([
      "<b>热备份</b>：<code>save-off</code> / <code>save-all</code> 刷盘，运行中也能备",
      "冷备份",
      "定时巡检（默认间隔 6h）",
      "保留策略：默认保留 5 份，最小间隔 1h",
    ], tight=True)}
  </div>
</div>""")}

{sec("03", "玩家与权限", "结构化读写，不是文本正则", f"""
{table(
    ["项目", "运行中", "停机时"],
    [
        ["白名单", "走 RCON", "结构化读写 <code>whitelist.json</code>"],
        ["OP 列表", "走 RCON", "结构化读写 <code>ops.json</code>"],
        ["封禁名单", "走 RCON", "结构化读写 <code>banned-players.json</code>"],
    ])}
{notice("info", """离线玩家的 UUID 按 Minecraft 官方算法生成 ——
与服务端自己算出的结果完全一致，所以白名单与 OP 权限不会错位。""")}""")}

{sec("04", "配置编辑", "改完不丢注释，也不打乱顺序", f"""
<div class="card">
  <div class="card-title">server.properties 编辑器</div>
  <p class="card-text">
    <b>保持行序与注释</b>，只替换或追加指定键值 —— 不是简单地重新序列化整个文件。
    这样你手写的注释和排列顺序都不会丢。
  </p>
</div>""")}
"""

write("servers.html", page(
    "servers.html", "服务器", "Servers",
    "从建服到日常运维的完整闭环：4 种核心、完整 RCON 协议、热备份、"
    "结构化玩家权限管理，全部接真实后端。",
    body,
    tags=[("4 种核心", "accent"), ("完整 RCON", "ok"), ("热备份", ""), ("结构化权限", "")],
    prev=("account.html", "账户与皮肤"),
    next_=("online.html", "联机"),
))
