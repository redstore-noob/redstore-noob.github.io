#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 E 组（桌面小组件 / 设置）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 12. 桌面小组件
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "自由摆放的桌面", "拖、吸、丢，像摆一张真实的桌面", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">交互</div>
    {ul([
      "<b>8 列网格</b>，长按磁贴 1 秒浮现格子线",
      "拖动吸附 + 落点预览",
      "<b>拖到开始栏即移除</b>：幽灵卡跟随指针，底部显示红色「松手移除」提示",
      "右下角圆形「+」按钮打开组件盒抽屉（352px 侧滑），带搜索过滤",
      "空桌面时显示居中引导提示",
    ])}
  </div>
  <div class="card">
    <div class="card-title">持久化</div>
    <p class="card-text">
      摆好的布局<b>自动保存</b>，关掉再开还是原样。
    </p>
    <div class="divider"></div>
    <p class="card-text small">
      首次进入会预置一套常用的七个组件：最近存档、托管服务器、运行日志、时光回溯、
      外观调节、快速设置、快速下载。
    </p>
  </div>
</div>""")}

{sec("02", "22 个组件", "三大类，全部接真实数据源", f"""
{notice("info", """还有 <b>8 个</b>组件（播放时长、RSS、音乐、目标、截图等）因为后端未接，
<b>暂时不放出</b>。没有真实数据就不占你的桌面 —— 这是我们不加示例数据的理由。""")}

<div class="section-head" style="margin-top:22px;margin-bottom:12px">
  <span class="section-num">02.1</span><h2 class="section-title">Core · 核心信息</h2>
</div>
{table(
    ["组件", "显示什么"],
    [
        ["<b>最近存档</b>", "扫本机存档目录，按最后游玩时间排序，点一下直接进档"],
        ["<b>托管服务器</b>", "当前托管的服务端，支持真实启停"],
        ["<b>运行日志</b>", "实时输出，退出后推测崩溃原因"],
        ["<b>常用实例</b>", "按使用频率排的实例快捷入口"],
        ["<b>时光回溯</b>", "横向迷你时间轴，一眼看到最近的快照"],
        ["<b>快速下载</b>", "跳下载页，也能直接下 Java"],
    ])}

<div class="section-head" style="margin-top:24px;margin-bottom:12px">
  <span class="section-num">02.2</span><h2 class="section-title">System · 系统监控</h2>
</div>
{table(
    ["组件", "显示什么"],
    [
        ["<b>内存监控</b>", "当前内存占用与历史曲线"],
        ["<b>性能监控</b>", "CPU / GPU / 内存三条折线"],
        ["<b>Java 环境</b>", "本机 Java 探测结果，一键跳下载页"],
        ["<b>磁盘空间</b>", "游戏目录所在盘，快满变红"],
        ["<b>快速设置</b>", "启动 / 内存 / Java / 下载 / 网络 分区直达"],
        ["<b>外观调节</b>", "毛玻璃开关 + 窗口与壁纸不透明度滑块"],
        ["<b>皮肤展示</b>", "当前账号 3D 皮肤，双层模型与披风"],
    ])}

<div class="section-head" style="margin-top:24px;margin-bottom:12px">
  <span class="section-num">02.3</span><h2 class="section-title">Fun · 趣味组件</h2>
</div>
{table(
    ["组件", "行为"],
    [
        ["<b>今日运气</b>", "每天零点重摇一次，纯本地计算"],
        ["<b>敲木鱼</b>", "敲一下积一次功德，纯本地"],
        ["<b>看板娘</b>", "点一下会弹跳，随机吐气泡"],
        ["<b>一言</b>", "随机句子，可以刷新"],
        ["<b>问候</b>", "按时段打招呼，附带一句 Minecraft 小句子"],
        ["<b>假期倒计时</b>", "距周末多少天，下一个假期是哪天"],
        ["<b>时钟</b>", "数字时钟 + 日期星期，秒级跳动"],
        ["<b>日历</b>", "月历视图，节假日标红"],
    ])}""")}

{sec("03", "长得像一家人", "22 个组件共用同一套积木", f"""
<p class="muted" style="margin-top:-4px">
  所有组件共用同一套构建原语：卡片、指标、标签、进度条、列表项、空状态 ——
  所以 22 个组件放在一起，视觉与交互完全一致，不会各长各的。
</p>
{notice("ok", """<b>定时器统一管理</b>：所有组件遵循「定时刷新 + 不可见时停表」——
滚出视野就不再空转刷新，省 CPU 也省电。""")}""")}
"""

write("widgets.html", page(
    "widgets.html", "桌面小组件", "Desktop Widgets",
    "格子板上自由摆放的 22 个组件，全部接真实数据源。"
    "统一遵循「定时刷新 + 不可见时停表」，滚出视野即停止空转。",
    body,
    tags=[("22 个组件", "accent"), ("3 大类", ""), ("不可见停表", "ok")],
    prev=("plugins.html", "插件与 NekoSolo"),
    next_=("settings.html", "设置"),
))

# ══════════════════════════════════════════════════════════
# 13. 设置
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "五大分区", "顶部带搜索框，找设置项不用翻", f"""
<div class="grid g-auto">
  {card("游戏", "游戏目录（改 / 重置）、Java（自动探测 / 设为默认）、内存上限。", "分区 1", "accent")}
  {card("通用", "关闭行为（退出 / 最小化到托盘 / 每次询问）、单实例、S 模式、界面语言。", "分区 2", "accent")}
  {card("外观", "主题、图标配色、强调色 + 自定义取色器、跟随背景、毛玻璃、卓越视效、不透明度、直角模式、开始栏位置。", "分区 3", "accent")}
  {card("网络", "下载源、回落源、自定义源、测速、并行下载数、CurseForge Key、自动装前置。", "分区 4", "accent")}
  {card("关于", "应用名、真实版本号、检查更新、项目主页、许可证。", "分区 5", "accent")}
</div>""")}

{sec("02", "外观与个性化", "每一个开关都真的生效", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">逐项对照</div>
    {ul([
      "<b>面板毛玻璃</b> —— 窗口不在前台时自动暂停模糊，不偷吃 CPU",
      "<b>窗口不透明度 / 背景不透明度</b> —— 两条独立滑块",
      "<b>直角模式</b> —— 当前页面面板与输入框圆角归零",
      "<b>卓越视效</b> —— 恢复高光、阴影、折射、渐进模糊等额外渲染",
      "<b>开始栏位置</b> —— 上 / 下 / 左 / 右 + 自动隐藏",
      "<b>图标配色</b> —— theme / colorful 两档",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">强调色与跟随背景</div>
    {ul([
      "6 套预设强调色 + <b>自定义取色器</b>（自研 HSV 拾色轮）",
      "<b>最近使用</b>列表，上限 8 个",
      "<b>跟随背景</b> —— 从壁纸预览算平均色，挑最接近的主题色",
      "换色即时生效，自绘控件也一起跟着变",
    ], tight=True)}
  </div>
</div>

<figure class="wall-preview">
  <img src="assets/img/wallpaper.jpg" alt="默认壁纸：云海之上的方块世界，白发少女坐在草方块上" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption><span>默认壁纸</span>「跟随背景」会从这张图里取平均色，再挑最接近的强调色</figcaption>
</figure>""")}

{sec("03", "S 模式与本地化", "轻量模式 + 三语言即时切换", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title">S 模式（简洁模式）</div>
    {ul([
      "隐藏开始栏与开始菜单",
      "首页变成一屏「选版本 → 选账号 → 开玩」",
      "保留 5 个页面：home / download / instances / account / settings",
      "可随时退出",
      "<b>无 OOBE</b> —— 不再有首次启动引导流程，启动直接进桌面",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title">本地化</div>
    {ul([
      "内置 <b>简体中文 / English / 跟随系统</b> 三种语言",
      "<b>切换即时生效</b>，不用重启界面",
      "覆盖全部界面文案：设置、下载、实例、服务器、账户、创作工具、组件说明",
      "不翻译游戏内容：实例名 / 服务器名 / MOTD / 曲名",
    ], tight=True)}
  </div>
</div>""")}
"""

write("settings.html", page(
    "settings.html", "设置", "Settings",
    "5 大分区，从游戏路径到界面外观。所有外观开关都真的生效 —— "
    "毛玻璃、不透明度、直角模式、跟随背景取色，一项不落。",
    body,
    tags=[("5 分区", "accent"), ("三语言", "ok"), ("S 模式", ""), ("外观全生效", "")],
    prev=("widgets.html", "桌面小组件"),
    next_=("index.html", "回到首页"),
))
