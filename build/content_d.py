#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 D 组（联机 / 音乐 / 创作 / 插件）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 8. 联机
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "陶瓦联机", "Terracotta.cs —— 客户端适配", f"""
<p class="muted" style="margin-top:-4px">
  Mofumofu 接入的是 <b>Terracotta（陶瓦）</b> 联机方案，定位是<b>纯客户端</b>：
  启动器不自己做中转，而是拉起本机的 Terracotta 服务，由它负责与其他客户端组网。
</p>
{code('''<span class="c">// Terracotta.cs:14-15 —— 拉起本机服务</span>
<span class="c">// 仅客户端模式：terracotta --hmcl &lt;文件&gt;</span>

<span class="c">// 读取端口文件后，用 rocket 的 /state 接口驱动状态机</span>''')}
<div class="flow" style="margin-top:18px">
  <div class="flow-step"><div class="flow-num">01</div><div class="flow-title">安装服务</div><div class="flow-desc">官方源 / Gitee 镜像</div></div>
  <div class="flow-step"><div class="flow-num">02</div><div class="flow-title">启动服务</div><div class="flow-desc">拉起 terracotta</div></div>
  <div class="flow-step"><div class="flow-num">03</div><div class="flow-title">读端口</div><div class="flow-desc">从端口文件获取</div></div>
  <div class="flow-step"><div class="flow-num">04</div><div class="flow-title">建房 / 加入</div><div class="flow-desc">房间码交换</div></div>
  <div class="flow-step"><div class="flow-num">05</div><div class="flow-title">进服</div><div class="flow-desc">地址直连</div></div>
</div>""")}

{sec("02", "五态状态机", "Terracotta.cs:29-41", f"""
{table(
    ["状态", "含义", "可执行操作"],
    [
        ["<code>idle</code>", "服务未运行", "安装服务 / 指定 exe / 开始检测"],
        ["<code>starting</code>", "服务启动中", "等待（可重新检测）"],
        ["<code>hosting</code>", "已建房，正在托管", "显示房间码与地址 / 退房 / 停止服务"],
        ["<code>joined</code>", "已加入他人房间", "显示地址 / 退房"],
        ["<code>error</code>", "启动失败", "重新检测 / 手动指定 exe / 查看日志"],
    ])}""")}

{sec("03", "服务管理", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>自动安装</div>
    {ul([
      "官方源自动下载安装",
      "<b>Gitee 国内镜像</b>加速（国内网络友好）",
      "一键完成，无需手动配置",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>手动干预</div>
    {ul([
      "手动指定可执行文件路径",
      "重新检测服务状态",
      "停止正在运行的服务",
    ], tight=True)}
  </div>
</div>
{notice("warn", """<b>当前只接了 1 个服务商</b> —— <code>OnlineView.axaml.cs:12</code> 的
<code>ProviderAt(index)</code> 在 index 1 及以上直接返回 <code>null</code>。
架构留了扩展位，但目前只有陶瓦可用。""")}""")}

{sec("04", "房间信息", f"""
<div class="grid g3">
  {card("房间码", "形如 <code>U/----</code> 的短码，方便口头传递。", "短码")}
  {card("地址展示", "完整服务端地址，一键复制。")}
  {card("退房", "主动断开，不影响服务进程（可继续托管他人）。")}
</div>""")}
"""

write("online.html", page(
    "online.html", "联机", "Multiplayer",
    "接入 Terracotta（陶瓦）联机方案，定位纯客户端：启动器拉起本机服务，"
    "由它负责与其他客户端组网。五态状态机全程可视。",
    body,
    tags=[("Terracotta", "accent"), ("5 态状态机", ""), ("Gitee 镜像", "ok")],
    prev=("servers.html", "服务器"),
    next_=("music.html", "音乐"),
))

# ══════════════════════════════════════════════════════════
# 9. 音乐
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "双源曲库", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>本地音乐</div>
    {ul([
      "扫描本地文件夹",
      "支持 <b>mp3 / flac / ogg / wav / m4a / aac / opus / wma</b> 八种格式",
      "NAudio + Media Foundation 解码",
      "<span class=\"tag warn\">未读 ID3 标签</span> 标题直接用文件名",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>网易云音乐</div>
    {ul([
      "内置 <b>WebView2 登录页</b>：手机号 / 邮箱 / 扫码",
      "登录后<b>直接读取 HttpOnly Cookie</b>",
      "也支持手动粘贴 Cookie",
      "云端搜索 / 歌曲地址 / LRC 歌词",
    ])}
  </div>
</div>""")}

{sec("02", "播放控制", "全部走真实状态，不是假 UI", f"""
<div class="grid g4">
  {card("进度", "拖拽跳转。")}
  {card("音量", "独立音量控制。")}
  {card("循环", "循环模式切换。")}
  {card("收藏", "持久化到 <code>music.json</code>。")}
</div>
<div class="grid g4" style="margin-top:16px">
  {card("上一首 / 下一首", "曲库顺序切换。")}
  {card("后跳 10 秒", "快捷跳转。")}
  {card("前跳 10 秒", "快捷跳转。")}
  {card("HiRes 标识", "高解析度音源标记。")}
</div>""")}

{sec("03", "界面结构", f"""
<div class="grid g3">
  {card("左侧导航", "首页 / 曲库 / 喜欢 / 歌单 四个入口。")}
  {card("播放队列栏", "当前队列可视化。")}
  {card("歌词区", "LRC 歌词同步。")}
</div>
{notice("info", """<b>Cookie 与收藏持久化在 <code>music.json</code></b> —— 位置在数据根目录，不进 <code>settings.json</code>，
与主设置分离。""")}
{notice("warn", """<b>已知限制</b>：网易云部分歌曲需要 VIP，接口只返回试听片段或空地址。
这是接口侧的限制，客户端无法绕过。""")}""")}
"""

write("music.html", page(
    "music.html", "音乐", "Music",
    "本地曲库 + 网易云双源。内置 WebView2 登录页直接读 HttpOnly Cookie，"
    "播放控制、歌词、收藏全部接真实状态。",
    body,
    tags=[("8 种格式", "accent"), ("网易云", ""), ("NAudio 解码", ""), ("LRC 歌词", "")],
    prev=("online.html", "联机"),
    next_=("creator.html", "创作中心"),
))

# ══════════════════════════════════════════════════════════
# 10. 创作中心
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "八个工具", "CreatorToolCatalog.cs:11-18", f"""
{table(
    ["工具", "id", "图标色", "说明"],
    [
        ["<b>资源包编辑器</b>", "<code>resourcepack</code>", "<code>#3FC6C1</code>", "ResourcePackMake 草稿 / 导入 / 导出"],
        ["<b>命令生成器</b>", "<code>command</code>", "<code>#8B7CF6</code>", "可视化拼装 Minecraft 指令"],
        ["<b>渐变文字</b>", "<code>gradient</code>", "<code>#F2AE49</code>", "渐变 / 彩虹文字生成"],
        ["<b>立方体文字 3D</b>", "<code>cube3d</code>", "<code>#4CC38A</code>", "WebGL 渲染，可导出 PNG"],
        ["<b>皮肤编辑器</b>", "<code>skin</code>", "<code>#E5698F</code>", "64×64 涂色 + 3D 实时预览"],
        ["<b>整合包导出</b>", "<code>modpack</code>", "<code>#5A9CF8</code>", "ModrinthBundleMake 打包 .mrpack"],
        ["<b>NekoSolo 制作</b>", "<code>solo</code>", "<code>#3FC6C1</code>", "单文件安装器载荷打包"],
        ["<b>插件清单生成</b>", "<code>plugin</code>", "<code>#C084FC</code>", "生成 plugin.yaml 与权限声明"],
    ])}""")}

{sec("02", "立方体 3D 文字", "WebView2 内嵌，不再单独开窗口", f"""
<p class="muted" style="margin-top:-4px">
  这是创作中心最重的一块。通过 <code>WebRegionHost</code> 把 <b>three.js</b> 页面嵌在创作中心页面内部
  （<code>CreatorView.axaml:171-271</code>），不额外弹窗。
</p>
<div class="grid g4">
  {card("字体 / 加粗", "基础排版参数。")}
  {card("自动旋转", "开关式自转。")}
  {card("透明背景", "导出时可选。")}
  {card("字号 / 分辨率", "输出尺寸控制。")}
</div>
<div class="grid g4" style="margin-top:16px">
  {card("深度 / 间距", "立体厚度与字距。")}
  {card("双色 / 渐变 / 彩虹", "三种填充模式。")}
  {card("纹理 / 描边", "表面材质与轮廓。")}
  {card("重置相机 / 导出 PNG", "视角复位与出图。")}
</div>""")}

{sec("03", "工具分发机制", f"""
{code('''<span class="c">// CreatorView.axaml.cs:538-568 —— switch 分发</span>
<span class="k">private</span> Control <span class="p">BuildToolPage</span>(<span class="k">string</span> toolId) =&gt;
    toolId <span class="k">switch</span>
    {{
        <span class="s">"resourcepack"</span> =&gt; BuildResourcePackPage(),
        <span class="s">"command"</span>      =&gt; BuildCommandPage(),
        <span class="s">"gradient"</span>     =&gt; BuildGradientPage(),
        <span class="s">"cube3d"</span>       =&gt; BuildCube3DPage(),
        <span class="s">"skin"</span>         =&gt; BuildSkinPage(),
        <span class="s">"modpack"</span>      =&gt; BuildModpackPage(),
        <span class="s">"solo"</span>         =&gt; BuildSoloPage(),
        <span class="s">"plugin"</span>      =&gt; BuildPluginPage(),
        _ =&gt; <span class="k">new</span> TextBlock {{ Text = <span class="s">"未知工具"</span> }}
    }};''')}
<div class="card" style="margin-top:16px">
  <div class="card-title"><span class="dot"></span>日志导出与分享</div>
  <p class="card-text">
    创作中心提供<b>日志导出</b>与<b>日志分享</b>两个动作，分别走本地写入与 <code>LogShareAPI</code> 上传
    （<code>CreatorView.axaml.cs:104-105</code>）。LogShare 本就是 Minecraft 官方就有的功能，移植过来成本很低。
  </p>
</div>""")}
"""

write("creator.html", page(
    "creator.html", "创作中心", "Creator",
    "8 个创作工具：资源包、命令生成、渐变文字、立方体 3D、皮肤编辑、"
    "整合包导出、NekoSolo 制作与插件清单生成。",
    body,
    tags=[("8 个工具", "accent"), ("three.js", ""), ("WebGL", "")],
    prev=("music.html", "音乐"),
    next_=("plugins.html", "插件"),
))

# ══════════════════════════════════════════════════════════
# 11. 插件
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "扫描机制", "PluginsView.axaml.cs:49-53, 93-94", f"""
<p class="muted" style="margin-top:-4px">
  插件页只扫描 <code>%APPDATA%\\Mofumofu.Launcher\\plugins</code> 下<b>真实存在</b>的文件：
  <code>plugin.yaml</code> / <code>plugin.yml</code> / <code>.nekoex</code> 包。
  早期版本内置的示例插件与权限占位已全部移除。
</p>
{code('''<span class="c">// PluginsView.axaml.cs:120-122 —— 实际只解析 3 个字段</span>
name    = yaml[<span class="s">"name"</span>]
version = yaml[<span class="s">"version"</span>]
author  = yaml[<span class="s">"author"</span>]''')}
<div class="grid g3" style="margin-top:16px">
  {card("搜索过滤", "按 name / id / author 过滤。")}
  {card("打开插件目录", "一键跳到本地 plugins 目录。")}
  {card("重新加载", "手动刷新扫描结果。")}
</div>""")}

{sec("02", "权限体系", "文案已备，运行时未实现", f"""
{notice("warn", """<code>Pages.Plugins.json</code> 里预置了 <b>8 种权限</b>的文案与 <code>ApiVersion</code> 声明
（<code>Perm.ServerStatus</code> / <code>Notify</code> / <code>Widget</code> / <code>NetworkReadonly</code> /
<code>Storage</code> / <code>Network</code> / <code>Unknown</code> / <code>Readonly</code>），
还定义了启用/禁用按钮与不兼容提示。但 <code>PluginsView.axaml.cs</code> 只读 3 个字段，<b>没有任何启停逻辑</b>。""")}
{table(
    ["权限键", "语义"],
    [
        ["<code>Perm.ServerStatus</code>", "读取服务器状态"],
        ["<code>Perm.Notify</code>", "发送通知"],
        ["<code>Perm.Widget</code>", "注册桌面小组件"],
        ["<code>Perm.NetworkReadonly</code>", "只读网络访问"],
        ["<code>Perm.Storage</code>", "存储读写"],
        ["<code>Perm.Network</code>", "完整网络访问"],
        ["<code>Perm.Readonly</code>", "只读权限"],
        ["<code>Perm.Unknown</code>", "未知权限（兜底）"],
    ])}""")}

{sec("03", "插件包格式", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>.nekoex</div>
    <p class="card-text">
      插件包（zip）格式。启动器把它当目录项直接列出（<code>PluginsView.axaml.cs:65-71</code>），
      <b>当前不解析内部内容</b>。
    </p>
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>plugin.yaml</div>
    <p class="card-text">
      清单格式，同时兼容 <code>plugin.yml</code>。创作中心的「插件清单生成」工具定位就是生成这份清单与权限声明。
    </p>
  </div>
</div>
<div class="card" style="margin-top:16px">
  <div class="card-title"><span class="dot"></span>NekoSolo 载荷结构</div>
  <p class="card-text small" style="margin-bottom:10px">安装器读取的是 zip 载荷，<code>files/</code> 与 <code>overrides/</code> 必读并计入 payload 大小；<code>minecraft/</code> 与 <code>jre/</code> 识别但分开计数。</p>
  {code('''<span class="c">// NekoSolo/Services/SoloManifest.cs —— 15 个字段</span>
format, packId, packName, packVersion, author, description,
mcVersion, loaderName, loaderVersion, versionId,
simpleMode(bool), hasJava(bool), iconPath, silent(bool), updateLink''')}
</div>""")}

{sec("04", "NekoSolo 安装器", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>安装流程</div>
    {ul([
      "读取载荷，统计 <code>files/</code> / <code>overrides/</code> 大小",
      "分别统计 <code>minecraft/</code> / <code>jre/</code> 条目数",
      "<b>CRC 校验</b>",
      "写 <code>solo.json</code> + 安装标记",
      "创建桌面快捷方式 <code>.lnk</code>",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>安装目录</div>
    {ul([
      "<code>%UserProfile%\\NekoSolo\\{DisplayName}</code>",
      "文件名非法字符自动替换为 <code>_</code>",
      "4 个面板：welcome / progress / done / about",
    ], tight=True)}
  </div>
</div>
{notice("err", """<b>打包缺口</b>：安装器能读 <code>files/</code> / <code>overrides/</code>、校验 CRC、写 <code>solo.json</code>；
但启动器导出的仍是 <b>.zip 载荷</b>，未追加 exe 尾标，需自行与安装器 stub 合并才能得到单文件。""")}""")}
"""

write("plugins.html", page(
    "plugins.html", "插件与 NekoSolo", "Plugins",
    "插件页只扫描真实存在的 plugin.yaml 与 .nekoex 包。附 NekoSolo "
    "单文件整合包安装器的完整工作流与打包缺口分析。",
    body,
    tags=[("plugin.yaml", "accent"), (".nekoex", ""), ("NekoSolo", "")],
    prev=("creator.html", "创作中心"),
    next_=("widgets.html", "桌面小组件"),
))
