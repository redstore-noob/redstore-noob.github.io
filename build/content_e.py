#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 E 组（小组件 / 设置 / 现状缺口）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 12. 桌面小组件
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "自由摆放的桌面", "HomeView.axaml", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>交互</div>
    {ul([
      "<b>8 列网格</b>，长按磁贴 1 秒浮现格子线",
      "拖动吸附 + 落点预览",
      "<b>拖到开始栏即移除</b>：幽灵卡跟随指针，底部显示红色「松手移除」提示",
      "右下角圆形「+」按钮打开组件盒抽屉（352px 侧滑），带搜索过滤",
      "空桌面时显示居中引导提示",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>持久化</div>
    <p class="card-text">
      布局存在 <code>settings.json</code> 的 <code>DesktopWidgets</code> 字段
      （<code>DesktopWidgetPlacement</code>，8 列 / 行单位），另有 <code>DesktopLayoutVersion</code> 便于后续迁移。
    </p>
    <div class="divider"></div>
    <p class="card-text small">
      首次进入默认摆 7 个：worlds(0,0)、hosted-server(6,0)、log(5,4)、rewind(12,5)、
      appearance-quick(16,5)、quick-settings(0,7)、quick-download(4,7)
    </p>
  </div>
</div>""")}

{sec("02", "22 个组件", "注册 30 个，硬过滤掉 8 个未接后端的", f"""
{notice("info", """<code>WidgetRegistry.cs:146-147</code> 用 <code>.Where(...)</code> 过滤掉了
<b>playtime / quickjoin / rss / music / download / network / goal / screenshots</b> 这 8 个未接后端的组件，
实际暴露 <b>22 个</b>。未接后端的不再展示示例数据。""")}

<div class="section-head" style="margin-top:22px;margin-bottom:12px">
  <span class="section-num">02.1</span><h2 class="section-title">Core · 核心信息</h2>
</div>
{table(
    ["组件", "读什么数据源"],
    [
        ["<b>worlds</b> 最近存档", "<code>WidgetBackend.LoadWorldsAsync</code> → 扫 <code>saves/*/level.dat</code>，按 LastWrite 排序"],
        ["<b>hosted-server</b> 托管服务器", "<code>ServerManage.ListServerInfos()</code>，支持真实启停"],
        ["<b>log</b> 运行日志", "实时输出 + 退出后推测崩溃原因"],
        ["<b>favorites</b> 常用实例", "<code>WidgetBackend.LoadInstancesAsync</code>"],
        ["<b>rewind</b> 时光回溯", "<code>RewindSystem.ListSnapshotsAsync</code> + <code>GetSummaryAsync</code>，横向迷你时间轴"],
        ["<b>quick-download</b> 快速下载", "跳下载页 + Java 下载直达"],
    ])}

<div class="section-head" style="margin-top:24px;margin-bottom:12px">
  <span class="section-num">02.2</span><h2 class="section-title">System · 系统监控</h2>
</div>
{table(
    ["组件", "读什么数据源"],
    [
        ["<b>memory</b> 内存监控", "<code>MemoryRead.SystemUsageNowAsync</code> + <code>SnapshotAsync</code>"],
        ["<b>performance</b> 性能监控", "同上，CPU / GPU / 内存折线图"],
        ["<b>java</b> Java 环境", "<code>MofuCore.Java</code>，一键跳 Java 下载页"],
        ["<b>disk</b> 磁盘空间", "<code>MemoryRead.GetDiskUsageAsync</code>（游戏目录所在盘），快满变红"],
        ["<b>quick-settings</b> 快速设置", "启动 / 内存 / Java / 下载 / 网络 分区直达"],
        ["<b>appearance-quick</b> 外观调节", "直接读写 <code>LocalSettings</code>：毛玻璃 + 窗口 / 壁纸不透明度滑块"],
        ["<b>skin</b> 皮肤展示", "当前账号 3D 皮肤（双层皮肤 / 披风）"],
    ])}

<div class="section-head" style="margin-top:24px;margin-bottom:12px">
  <span class="section-num">02.3</span><h2 class="section-title">Fun · 趣味组件</h2>
</div>
{table(
    ["组件", "行为"],
    [
        ["<b>luck</b> 今日运气", "日期 + 设备码 hash，每天 0 点重摇"],
        ["<b>muyu</b> 敲木鱼", "纯本地交互，敲一下积功德"],
        ["<b>mascot</b> 看板娘", "点击弹跳 + 随机气泡"],
        ["<b>hitokoto</b> 一言", "Hitokoto API，可刷新"],
        ["<b>greeting</b> 问候", "按时段问候 + MC 小句子"],
        ["<b>countdown</b> 假期倒计时", "距周末天数 + 最近假期"],
        ["<b>clock</b> 时钟", "数字时钟 + 日期星期，秒级跳动"],
        ["<b>calendar</b> 日历", "月历视图，节假日红字"],
    ])}""")}

{sec("03", "统一原语", "WidgetChrome.cs —— 429 行", f"""
<p class="muted" style="margin-top:-4px">
  所有组件共用 <code>WidgetChrome</code> 提供的 28 个构建原语：
  Card / Stat / Pill / Bar / ListItem / ChipButton / EmptyStateCard 等，
  保证 22 个组件的视觉与交互完全一致。
</p>
{notice("ok", """<b>定时器统一管理</b>：所有组件遵循「定时刷新 + 不可见时停表」——
<code>WidgetChrome.OnBecameVisible:429</code> 与 <code>OnDetach:428</code> 负责挂起与恢复。
组件滚出视野就不再空转刷新，省 CPU 也省电。""")}""")}
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
{sec("01", "五大分区", "SettingsView.axaml:227-271 —— 顶部带搜索框", f"""
<div class="grid g-auto">
  {card("游戏", "游戏目录（改 / 重置）、Java（自动探测 / 设为默认）、内存上限。", "分区 1", "accent")}
  {card("通用", "关闭行为（退出 / 最小化到托盘 / 每次询问）、单实例、S 模式、界面语言。", "分区 2", "accent")}
  {card("外观", "主题、图标配色、强调色 + 自定义取色器、跟随背景、毛玻璃、卓越视效、不透明度、直角模式、开始栏位置。", "分区 3", "accent")}
  {card("网络", "下载源、回落源、自定义源、测速、并行下载数、CurseForge Key、自动装前置。", "分区 4", "accent")}
  {card("关于", "应用名、真实版本号、检查更新、项目主页、许可证。", "分区 5", "accent")}
</div>""")}

{sec("02", "外观设置的真实性", "每一项都真的生效", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>逐项对照</div>
    {ul([
      "<b>面板毛玻璃</b> —— <code>Fluid.Avalonia.Acrylic</code>，窗口不在前台时自动暂停模糊降 CPU",
      "<b>窗口不透明度 / 背景不透明度</b> —— 两条独立滑块",
      "<b>直角模式</b> —— 当前页面面板与输入框圆角归零",
      "<b>卓越视效</b> —— 恢复高光、阴影、折射、渐进模糊等额外渲染",
      "<b>开始栏位置</b> —— 上 / 下 / 左 / 右 + 自动隐藏",
      "<b>图标配色</b> —— theme / colorful 两档",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>强调色与跟随背景</div>
    {ul([
      "6 套预设强调色 + <b>自定义取色器</b>（自研 HSV 拾色轮）",
      "<b>最近使用</b>列表，上限 8 个",
      "<b>跟随背景</b> —— 从壁纸预览算平均色，挑最接近的主题色",
      "换色即时生效，含 code-behind 自绘元素",
    ], tight=True)}
  </div>
</div>""")}

{sec("03", "配置存储", "settings.json —— 24 个属性 / 7 大类", f"""
{table(
    ["大类", "属性"],
    [
        ["<b>主题 / 语言</b>", "<code>Theme</code> <code>Language</code> <code>AccentColor</code> <code>AccentFollowBackground</code> <code>RecentAccentColors</code>(≤8) <code>IconPalette</code>"],
        ["<b>当前选择</b>", "<code>SelectedInstanceId</code> <code>SelectedAccountName</code> <code>OfflineAccounts</code>(已废弃，仅迁移用)"],
        ["<b>窗口 / 外观</b>", "<code>PanelBlur</code> <code>WindowOpacity</code> <code>BackgroundOpacity</code> <code>PremiumVisuals</code> <code>SquareCorners</code> <code>CloseAction</code> <code>SingleInstance</code>"],
        ["<b>开始栏</b>", "<code>StartBarPlacement</code> <code>StartBarAutoHide</code> <code>TaskbarPages</code>"],
        ["<b>下载 / 网络</b>", "<code>DownloadSource</code> <code>DownloadFallbackSource</code> <code>CustomDownloadSourceName</code> <code>CustomDownloadSourceUrl</code> <code>ParallelDownloads</code> <code>CurseForgeApiKey</code> <code>AutoInstallDependencies</code>"],
        ["<b>模式</b>", "<code>SimpleMode</code>（S 模式）"],
        ["<b>桌面组件</b>", "<code>DesktopWidgets</code> <code>DesktopLayoutVersion</code>"],
    ])}
{notice("info", """存储位置：<code>%LOCALAPPDATA%\\Mofumofu.Launcher\\settings.json</code>，壁纸单独存 <code>wallpaper.json</code>。
<b>游戏目录 / Java / 内存不在这里</b>，而是在 <code>config/game</code> 两域 yaml（<code>MofuCore/Config/YamlRead.cs</code>）——
游戏相关配置与启动器自身配置刻意分离。""")}""")}

{sec("04", "S 模式与本地化", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>S 模式（简洁模式）</div>
    {ul([
      "隐藏开始栏与开始菜单",
      "首页变成一屏「选版本 → 选账号 → 开玩」",
      "保留 5 个页面：home / download / instances / account / settings",
      "可随时退出",
      "<b>无 OOBE</b> —— 不再有首次启动引导流程，启动直接进桌面",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>本地化</div>
    {ul([
      "内置 <b>简体中文 / English / 跟随系统</b> 三种语言",
      "存储于 <code>Localization/&lt;lang&gt;/&lt;Area&gt;.json</code>",
      "zh-CN 与 en-US 各 <b>1853 键</b>，完全对齐",
      "<b>切换即时生效</b>：XAML 走 <code>{{DynamicResource L.xxx}}</code>，code-behind 随页面重建刷新",
      "不翻译：实例名 / 服务器名 / MOTD / 曲名 / MofuCore 后端消息与日志",
    ], tight=True)}
  </div>
</div>

<div class="table-wrap" style="margin-top:16px">
  <table>
    <thead><tr><th>Area 文件</th><th>键数</th><th>覆盖内容</th></tr></thead>
    <tbody>
      <tr><td><code>Creator.json</code></td><td>315</td><td>8 个创作工具全部界面文案，最大 Area</td></tr>
      <tr><td><code>Home.json</code></td><td>266</td><td>桌面、组件盒、拖拽、外观调节、问候语</td></tr>
      <tr><td><code>Pages.json</code></td><td>201</td><td>Plugins（~38）+ Music（~60）+ Online（~100）</td></tr>
      <tr><td><code>Settings.json</code></td><td>187</td><td>5 分区全部设置项 + Toast</td></tr>
      <tr><td><code>Servers.json</code></td><td>167</td><td>服务器控制台 / 玩家 / 备份 / 配置</td></tr>
      <tr><td><code>Instances.json</code></td><td>152</td><td>实例 6 标签 + 管理操作</td></tr>
      <tr><td><code>Download.json</code></td><td>132</td><td>下载 7 标签 + 资源详情</td></tr>
      <tr><td><code>Launch.json</code></td><td>108</td><td>启动阶段时间线 + 崩溃原因诊断文案</td></tr>
      <tr><td><code>Account.json</code></td><td>103</td><td>三种登录 + 皮肤编辑 + 皮肤图库</td></tr>
      <tr><td><code>Widgets.json</code></td><td>58</td><td>22 个组件的 Title / Desc</td></tr>
      <tr><td><code>Rewind.json</code></td><td>58</td><td>时间轴、回滚确认、调度错误</td></tr>
      <tr><td><code>Shell.json</code></td><td>55</td><td>标题栏 / 开始栏 / 开始菜单 / S 模式</td></tr>
      <tr><td><code>Common.json</code></td><td>28</td><td>通用词（Enabled / Disabled / Stopped…）</td></tr>
      <tr><td><code>Wallpaper.json</code></td><td>23</td><td>4 种壁纸模式</td></tr>
    </tbody>
  </table>
</div>""")}
"""

write("settings.html", page(
    "settings.html", "设置", "Settings",
    "5 大分区、24 个持久化属性。所有外观开关都真的生效 —— "
    "毛玻璃、不透明度、直角模式、跟随背景取色，一项不落。",
    body,
    tags=[("5 分区", "accent"), ("24 属性", ""), ("1853 键 i18n", "ok"), ("三语言", "")],
    prev=("widgets.html", "桌面小组件"),
    next_=("roadmap.html", "现状与缺口"),
))

# ══════════════════════════════════════════════════════════
# 14. 现状与缺口
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "如实记录", "README 自己承认的 + 源码里能佐证的", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>README 明确承认</div>
    {ul([
      "<b>网易云 VIP</b> —— 部分歌曲需 VIP，接口只返回试听片段或空地址",
      "<b>本地音乐无 ID3</b> —— 标题直接用文件名",
      "<b>插件运行时未实现</b> —— 只扫描目录，不加载插件代码",
      "<b>AI 对话占位</b> —— 未配置 Key 时使用本地回复（且代码中已无 Ai 页面）",
      "<b>NekoSolo 尾标</b> —— 导出仍是 .zip，未追加 exe 尾标",
      "<b>Rewind 玻璃外框</b> —— 离屏渲染下边缘轻微透出下层页面",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>源码佐证但 README 未列</div>
    {ul([
      "<b>README 的 Wallpaper Engine 章节已完全过时</b> —— webwallgl / scene.pkg 零命中，实际用 libVLC",
      "<b>8 个桌面组件被硬过滤</b> —— 注册 30 个只暴露 22 个",
      "<b>CurseForge 完全未适配</b> —— 目录下只有 info.md，Key 只存不用",
      "<b>插件权限只在文案层</b> —— 8 种权限有文案无逻辑",
      "<b>联机只接 1 个服务商</b> —— index ≥ 1 直接返回 null",
      "<b>ParallelDownloads 注释与实际矛盾</b> —— 注释 1-16，实际 32",
    ], tight=True)}
  </div>
</div>""")}

{sec("02", "文档与仓库偏差", "README 描述与仓库实况", f"""
{table(
    ["README 描述", "仓库实况"],
    [
        ["本地化 1826 键", "实测 zh-CN / en-US <b>各 1853 键</b>，完全对齐"],
        ["<code>docs/rebuild/</code>（PLAN / LOCALIZATION / INTEGRATION）", "<b>不存在</b>，<code>docs/</code> 只有 <code>免责声明.md</code>"],
        ["<code>docs/reference/</code> 参考截图", "<b>不存在</b>"],
        ["<code>scripts/build-locked.ps1</code> 等三个脚本", "<b>不存在</b>"],
        ["<code>web/</code> WebView 页面源码", "<b>不存在</b>（<code>WebAssets/</code> 里只剩 skin 与 cubetext）"],
        ["Wallpaper Engine 全类型支持", "<b>已完全过时</b>，改用 libVLC"],
        ["Views 含 <code>Ai</code> 页面", "<b>已移除</b>，属残留描述"],
    ])}
{notice("warn", """<b>提交历史只有 2 个 commit</b>，最新一个标题是
「snapshot: Avalonia launcher implementation before Photino/React pivot」——
说明 Classic 那套是后续试验分支，<b>Avalonia 版才是主线</b>。另外仓库根目录有个 0 字节的
<code>MainWindow.axaml.cs</code> 残留文件。""")}""")}

{sec("03", "免责声明要点", "docs/免责声明.md —— 975 行 / 16 章 + 6 附录", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>软件定位</div>
    {ul([
      "<b>第三方辅助工具</b>，不是外挂 / 作弊器 / 修改器 / 注入器",
      "<b>免费</b> —— 无内购、无付费解锁、无订阅、无会员等级",
      "个人开发者独立开发",
      "与 Mojang / Microsoft <b>无隶属、合作、授权或代理关系</b>",
      "不提供、不托管、不分发游戏本体，不指向盗版下载源",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>数据与隐私</div>
    {ul([
      "原则上<b>不收集个人身份信息</b>",
      "联网时只传必要技术信息（软件版本号、系统类型）",
      "<b>不在设备上存储游戏账号密码</b>，凭据由官方服务处理",
      "绝大多数功能在本地完成，不需要把游戏控制权交给远端",
    ], tight=True)}
  </div>
</div>""")}
"""

write("roadmap.html", page(
    "roadmap.html", "现状与缺口", "Status & Gaps",
    "把 README 承认的、源码佐证的、以及文档与仓库的偏差全部摊开讲。"
    "如实记录，比粉饰更有价值。",
    body,
    tags=[("如实记录", "warn"), ("16 章免责声明", "")],
    prev=("settings.html", "设置"),
    next_=("index.html", "回到首页"),
))
