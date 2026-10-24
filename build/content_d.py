#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 D 组（联机 / 音乐 / 创作 / 插件）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 8. 联机
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "陶瓦联机", "启动器只做客户端，组网交给陶瓦", f"""
<p class="muted" style="margin-top:-4px">
  Mofumofu 接入的是 <b>Terracotta（陶瓦）</b> 联机方案，定位是<b>纯客户端</b>：
  启动器不自己做中转，而是拉起本机的 Terracotta 服务，由它负责与其他客户端组网。
</p>
<div class="flow" style="margin-top:18px">
  <div class="flow-step"><div class="flow-num">01</div><div class="flow-title">安装服务</div><div class="flow-desc">官方源 / Gitee 镜像</div></div>
  <div class="flow-step"><div class="flow-num">02</div><div class="flow-title">启动服务</div><div class="flow-desc">拉起 terracotta</div></div>
  <div class="flow-step"><div class="flow-num">03</div><div class="flow-title">读端口</div><div class="flow-desc">从端口文件获取</div></div>
  <div class="flow-step"><div class="flow-num">04</div><div class="flow-title">建房 / 加入</div><div class="flow-desc">房间码交换</div></div>
  <div class="flow-step"><div class="flow-num">05</div><div class="flow-title">进服</div><div class="flow-desc">地址直连</div></div>
</div>""")}

{sec("02", "五态状态机", "服务处于哪一步，界面上一眼看清", f"""
{table(
    ["状态", "含义", "可执行操作"],
    [
        ["<code>idle</code>", "服务未运行", "安装服务 / 指定 exe / 开始检测"],
        ["<code>starting</code>", "服务启动中", "等待（可重新检测）"],
        ["<code>hosting</code>", "已建房，正在托管", "显示房间码与地址 / 退房 / 停止服务"],
        ["<code>joined</code>", "已加入他人房间", "显示地址 / 退房"],
        ["<code>error</code>", "启动失败", "重新检测 / 手动指定 exe / 查看日志"],
    ])}""")}

{sec("03", "服务管理", "自动装好，也能手动接管", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">自动安装</div>
    {ul([
      "官方源自动下载安装",
      "<b>Gitee 国内镜像</b>加速（国内网络友好）",
      "一键完成，无需手动配置",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">手动干预</div>
    {ul([
      "手动指定可执行文件路径",
      "重新检测服务状态",
      "停止正在运行的服务",
    ], tight=True)}
  </div>
</div>
{notice("info", """目前只接入 <b>陶瓦</b> 一家服务商 —— 不做「假装支持很多家」的事。
多人联机方案在排期中，接口已留好扩展位。""")}""")}

{sec("04", "房间信息", "房间码、地址、一键退房", f"""
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
{sec("01", "双源曲库", "本地文件与网易云，两个源一起用", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">本地音乐</div>
    {ul([
      "扫描本地文件夹",
      "支持 <b>mp3 / flac / ogg / wav / m4a / aac / opus / wma</b> 八种格式",
      "系统原生解码，不额外装播放器",
      "<span class=\"tag warn\">未读 ID3 标签</span> 标题直接用文件名",
    ])}
  </div>
  <div class="card">
    <div class="card-title">网易云音乐</div>
    {ul([
      "内置 <b>WebView2 登录页</b>：手机号 / 邮箱 / 扫码",
      "登录后直接读取登录态，无需手动复制",
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

{sec("03", "界面结构", "导航、队列、歌词，各就各位", f"""
<div class="grid g3">
  {card("左侧导航", "首页 / 曲库 / 喜欢 / 歌单 四个入口。")}
  {card("播放队列栏", "当前队列可视化。")}
  {card("歌词区", "LRC 歌词同步。")}
</div>
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
{sec("01", "八个工具", "一个页面里装下八种常用创作需求", f"""
{table(
    ["工具", "能做什么"],
    [
        ["<b>资源包编辑器</b>", "新建草稿、导入现有资源包、导出成品"],
        ["<b>命令生成器</b>", "可视化拼装 Minecraft 指令，不用背语法"],
        ["<b>渐变文字</b>", "渐变 / 彩虹文字生成，直接复制进游戏"],
        ["<b>立方体文字 3D</b>", "WebGL 渲染立体字，可导出透明 PNG"],
        ["<b>皮肤编辑器</b>", "64×64 展开图涂色 + 3D 实时预览"],
        ["<b>整合包导出</b>", "一键打包成 <code>.mrpack</code>"],
        ["<b>NekoSolo 制作</b>", "把整合包做成单文件安装器载荷"],
        ["<b>插件清单生成</b>", "生成 <code>plugin.yaml</code> 与权限声明"],
    ])}""")}

{sec("02", "立方体 3D 文字", "WebView2 内嵌，不再单独开窗口", f"""
<p class="muted" style="margin-top:-4px">
  这是创作中心最重的一块：把 <b>three.js</b> 场景直接嵌在页面内部，不额外弹窗，
  改参数即时看效果。
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

{sec("03", "日志导出与分享", "出问题时有据可查", f"""
<div class="card">
  <div class="card-title">导出 / 分享</div>
  <p class="card-text">
    两个动作：<b>导出</b>写成本地文件，<b>分享</b>上传后拿一个链接 ——
    崩溃现场可以直接贴给朋友或开发者，不用来回截图。
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
{sec("01", "插件扫描", "只列出真实存在的插件，不做演示占位", f"""
<p class="muted" style="margin-top:-4px">
  插件页只扫描本地 <code>plugins</code> 目录下<b>真实存在</b>的文件：
  <code>plugin.yaml</code> / <code>plugin.yml</code> / <code>.nekoex</code> 包。
  内置的示例插件与权限占位已全部移除 —— 列表里出现的，就是你装了的。
</p>
<div class="grid g3" style="margin-top:16px">
  {card("搜索过滤", "按名称 / id / 作者过滤。")}
  {card("打开插件目录", "一键跳到本地 plugins 目录。")}
  {card("重新加载", "手动刷新扫描结果。")}
</div>""")}

{sec("02", "权限声明", "八种权限，插件必须明说要用什么", f"""
{notice("warn", """插件清单里可以声明 <b>8 种权限</b>，安装前一眼看清它想动什么。
当前版本<b>插件运行时尚未开放</b> —— 启动器会扫描、列出、并读取清单，但不会加载插件代码执行。
这一层我们不想先给一个假的安全感。""")}
{table(
    ["权限键", "语义"],
    [
        ["<code>ServerStatus</code>", "读取服务器状态"],
        ["<code>Notify</code>", "发送通知"],
        ["<code>Widget</code>", "注册桌面小组件"],
        ["<code>NetworkReadonly</code>", "只读网络访问"],
        ["<code>Storage</code>", "存储读写"],
        ["<code>Network</code>", "完整网络访问"],
        ["<code>Readonly</code>", "只读权限"],
        ["<code>Unknown</code>", "未知权限（兜底）"],
    ])}""")}

{sec("03", "插件包格式", "plugin.yaml 与 .nekoex 两种形式", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">.nekoex</div>
    <p class="card-text">
      插件包（zip）格式，扩展名区分于普通压缩包。启动器把它当目录项列出，
      <b>当前不解析内部内容</b>。
    </p>
  </div>
  <div class="card">
    <div class="card-title">plugin.yaml</div>
    <p class="card-text">
      清单格式，同时兼容 <code>plugin.yml</code>。创作中心的「插件清单生成」工具定位就是生成这份清单与权限声明。
    </p>
  </div>
</div>
<div class="card" style="margin-top:16px">
  <div class="card-title">NekoSolo 载荷结构</div>
  <p class="card-text small">安装器读取 zip 载荷：<code>files/</code> 与 <code>overrides/</code> 必读并计入体积，
  <code>minecraft/</code> 与 <code>jre/</code> 单独识别、分开计数，进度条不会因为 JRE 而虚高。</p>
</div>""")}

{sec("04", "NekoSolo 安装器", "双击即装的单文件整合包", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">安装流程</div>
    {ul([
      "读取载荷，统计 <code>files/</code> / <code>overrides/</code> 大小",
      "分别统计 <code>minecraft/</code> / <code>jre/</code> 条目数",
      "<b>CRC 校验</b>",
      "写 <code>solo.json</code> + 安装标记",
      "创建桌面快捷方式 <code>.lnk</code>",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">安装目录</div>
    {ul([
      "<code>%UserProfile%\\NekoSolo\\{DisplayName}</code>",
      "文件名非法字符自动替换为 <code>_</code>",
      "4 个面板：welcome / progress / done / about",
    ], tight=True)}
  </div>
</div>
{notice("info", """<b>当前状态</b>：安装器读包、CRC 校验、写 <code>solo.json</code>、建快捷方式都已可用；
启动器导出的还是 <b>.zip 载荷</b>，单文件打包（与 stub 合并）仍在收尾。""")}""")}
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
