#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 B 组（技术架构 / UI 库选型）"""
from build import page, sec, card, ul, table, code, notice, write, icon

# ══════════════════════════════════════════════════════════
# 2. 技术架构
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "分层结构", "UI 与 Minecraft 逻辑彻底解耦，同一份内核可换宿主", f"""
<div class="grid g3">
  <div class="card">
    <div class="card-title"><span class="dot"></span>表现层</div>
    <p class="card-text">Mofumofu.Launcher（Avalonia 12.1.4）<br>Mofumofu.Classic（Photino.NET）</p>
    <div class="divider"></div>
    <p class="card-text small">Views / Controls / Services / Styles / Web<br>经典版走 <code>Api/</code> 反射注册</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>后端层</div>
    <p class="card-text">Mofumofu.Backend<br><span class="dim small">467 行 / 3 文件</span></p>
    <div class="divider"></div>
    <p class="card-text small">LocalSettings / LogWrite / OpenLinkBrowser<br>只管启动器自身的配置</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>内核层</div>
    <p class="card-text">MofuCore<br><span class="dim small">25,873 行 / 31 文件</span></p>
    <div class="divider"></div>
    <p class="card-text small">零 UI 引用 · 可被任意宿主复用</p>
  </div>
</div>

<div class="flow" style="margin-top:20px">
  <div class="flow-step"><div class="flow-num">STEP 01</div><div class="flow-title">用户操作</div><div class="flow-desc">点击 / 拖拽 / 输入</div></div>
  <div class="flow-step"><div class="flow-num">STEP 02</div><div class="flow-title">Service 编排</div><div class="flow-desc">主题 / 进度 / 状态</div></div>
  <div class="flow-step"><div class="flow-num">STEP 03</div><div class="flow-title">MofuCore 调用</div><div class="flow-desc">下载 / 账户 / 启动 / 服务</div></div>
  <div class="flow-step"><div class="flow-num">STEP 04</div><div class="flow-title">回写状态</div><div class="flow-desc">Observable 通知界面</div></div>
</div>""")}

{sec("02", "MofuCore 能力地图", "31 个文件，覆盖 Minecraft 启动器的全部核心域", f"""
{table(
    ["域", "关键文件", "职责"],
    [
        ["<b>Config</b>", "<code>YamlRead.cs</code>", "config / game 两域 yaml 解析 + 默认游戏目录 <code>./.minecraft</code>"],
        ["<b>Download</b>", "<code>MinecraftDownload</code> <code>MinecraftManifest</code> <code>LibraryResolver</code>", "版本清单、资源下载、库依赖解析"],
        ["<b>加载器</b>", "<code>FabricDownload</code> <code>QuiltLoaderDownload</code> <code>ForgeDownload</code> <code>NeoforgeLoaderDownload</code> <code>OptifineInstaller</code>", "5 个加载器各自独立实现类"],
        ["<b>Modrinth</b>", "<code>ModrinthResourceSearch</code> <code>ModrinthBundleInstall</code> <code>ModrinthBundleMake</code>", "资源搜索 / 整合包安装 / 打包"],
        ["<b>Java</b>", "<code>JavaPathSearch</code> <code>JavaDownload</code>", "环境变量 + 注册表 + 常见目录探测；Mojang 运行时下载"],
        ["<b>Launch</b>", "<code>GameLaunch</code> <code>LaunchProfile</code> <code>VersionLoader</code>", "启动参数装配、进程启动、继承链合并"],
        ["<b>Account</b>", "<code>AccountStore</code> <code>AuthlibAccountManage</code> <code>MinecraftTokenHandle</code>", "Microsoft / Authlib / 离线账号 + 令牌加密"],
        ["<b>Server</b>", "<code>ServerManage</code> <code>ServerDownload</code>", "进程 / RCON / 备份 / 玩家，2,800+ 行"],
        ["<b>Tools</b>", "<code>MemoryRead</code> <code>ResourcePackMake</code> <code>RewindSystem</code>", "内存与磁盘占用、资源包打包、时光回溯"],
        ["<b>Online</b>", "<code>Terracotta.cs</code>", "陶瓦联机客户端适配"],
        ["<b>Log</b>", "<code>LogShareAPI.cs</code>", "LogShare 日志上传"],
    ])}""")}

{sec("03", "SukiUI 实际用量", "关键发现：SukiUI 只提供了外壳，交互控件全是原生 Avalonia 自绘", f"""
{notice("info", """全项目 grep <code>Suki[A-Za-z0-9_]+</code> 的结果：<b>SukiWindow × 6</b>、<b>SukiDialogHost × 8</b>、<b>SukiDialogManager × 1</b>、
<b>SukiTheme × 3</b>、<b>SukiColorTheme × 3</b>、<b>GlassCard × 8</b>、<b>InfoBar × 1</b>。
<b>没有用到</b> SukiButton / SukiToggleSwitch / SukiComboBox / SukiNumericUpDown / SukiTabControl / SukiTextBox / SukiToast / SukiSideMenu。""")}

<div class="grid g2" style="margin-top:16px">
  <div class="card">
    <div class="card-title"><span class="dot"></span>用到的 SukiUI 能力</div>
    {ul([
      "<b>SukiWindow</b> —— 无边框外壳，标题栏 / 阴影 / 圆角随主题",
      "<b>SukiDialogHost + Manager</b> —— 模态对话框宿主",
      "<b>SukiTheme / SukiColorTheme</b> —— 全局主题注册与强调色切换",
      "<b>GlassCard</b> —— 毛玻璃卡片（创作中心 / 实例 / 联机）",
      "<b>InfoBar</b> —— 下载大厅的中国大陆合规警告条",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>自己实现的部分</div>
    {ul([
      "<b>Toast</b> —— 自绘 ToastStack，最多 4 条，异步淡出",
      "<b>按钮 / 输入框 / 下拉 / 开关</b> —— 原生 Avalonia 控件 + <code>Classes=\"primary\"</code> 等自定义样式类",
      "<b>ColorWheel</b> —— 自研 HSV 拾色轮（色相环 + 饱和度盘 + 明度条）",
      "<b>IconParkIcon</b> —— 自研多色矢量图标控件",
      "<b>GradientSpinner</b> —— 自绘旋转渐变加载圈",
    ], tight=True)}
  </div>
</div>

<div class="section-head" style="margin-top:26px;margin-bottom:12px">
  <span class="section-num">03.1</span><h2 class="section-title">主题切换的坑（已踩过）</h2>
</div>
{code('''<span class="c">// ThemeManager.cs:135-139 —— SukiUI 对同名主题不覆盖</span>
<span class="c">// 所以主题名必须带递增序号，否则换强调色无效</span>
<span class="k">private</span> <span class="k">int</span> _sukiThemeSerial = <span class="n">0</span>;

<span class="k">var</span> theme = <span class="k">new</span> SukiColorTheme(...);
SukiTheme.<span class="p">AddColorTheme</span>(<span class="k">new</span> SukiThemeVariant(
    <span class="s">$"Mofumofu {accentKey} {++_sukiThemeSerial}"</span>, theme));
SukiTheme.<span class="p">ChangeColorTheme</span>(...);''')}
{notice("warn", "这一条是选型时的重要参考：<b>SukiUI 的主题覆盖语义有坑</b>，任何补充 UI 库如果也走「注册主题 + 按名切换」的模型，都需要考虑同样的序号问题。")}""")}

{sec("04", "Classic 宿主", "同内核的另一套前端：Photino.NET + 16 个反射注册 API", f"""
<p class="muted" style="margin-top:-4px">
  <code>Mofumofu.Classic/Program.cs</code> 的入口注释直书「Mofumofu 启动器（Photino.NET 宿主）」。
  启动流程是：日志 → 本地设置 → <code>StaticServer(wwwroot)</code> → AppWindow + Bridge → 反射注册程序集里所有 <code>ApiBase</code> 子类 → runtime 命令 → Load。
</p>
{code('''<span class="c">// Program.cs:73 —— 反射注册所有 ApiBase 子类</span>
<span class="k">foreach</span> (<span class="k">var</span> t <span class="k">in</span> asm.<span class="p">GetTypes</span>())
    <span class="k">if</span> (<span class="k">typeof</span>(ApiBase).<span class="p">IsAssignableFrom</span>(t) && !t.<span class="p">IsAbstract</span>)
        <span class="p">RegisterApi</span>(<span class="k">new</span> t());

<span class="c">// ApiBase.cs:101-106 —— 方法不存在时优雅降级</span>
<span class="c">// 「未接入 MofuCore」的模块不会崩，只是返回 null</span>''')}
{table(
    ["API 模块", "行数", "状态"],
    [
        ["<code>DownloadApi</code>", "832", "<span class=\"tag ok\">完整</span>"],
        ["<code>ServerHostApi</code>", "614", "<span class=\"tag ok\">完整</span>"],
        ["<code>InstanceApi</code>", "666", "<span class=\"tag ok\">完整</span>"],
        ["<code>AccountApi</code>", "643", "<span class=\"tag ok\">完整</span>"],
        ["<code>ConfigApi</code>", "514", "<span class=\"tag ok\">完整</span>"],
        ["<code>SystemApi</code>", "421", "<span class=\"tag ok\">完整</span>"],
        ["<code>LauncherApi</code>", "420", "<span class=\"tag ok\">完整</span>"],
        ["<code>OnlineApi</code>", "261", "<span class=\"tag ok\">完整</span>"],
        ["<code>WorldApi</code>", "65", "<span class=\"tag ok\">完整</span>"],
        ["<code>MonitorApi</code>", "53", "<span class=\"tag ok\">完整</span>"],
        ["<code>ServerApi</code>", "49", "<span class=\"tag warn\">部分</span> 只实现了 <code>ParseServerAddress</code>"],
        ["<code>ContentApi</code>", "20", "<span class=\"tag err\">桩</span>"],
        ["<code>ModpackApi</code>", "9", "<span class=\"tag err\">空</span> MofuCore 无对应服务"],
        ["<code>MusicApi</code>", "10", "<span class=\"tag err\">空</span> MofuCore 本轮无音乐模块"],
        ["<code>UpdateApi</code>", "9", "<span class=\"tag err\">空</span> 移植版暂无更新通道"],
    ])}""")}

{sec("05", "构建与运行", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>前置要求</div>
    {ul([
      ".NET 10 SDK",
      "WebView2 Runtime（Win11 自带，Win10 需装 Evergreen）",
      "首次启动自动创建 <code>./.minecraft</code> 版本文件夹",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>常用命令</div>
    {code('''<span class="c"># 运行桌面版</span>
dotnet run --project Mofumofu.Launcher

<span class="c"># 经典版（Web 前端）</span>
dotnet run --project Mofumofu.Classic -- --dev
<span class="c">#   默认连 http://127.0.0.1:5173 的 Vite dev server</span>''')}
  </div>
</div>""")}
"""

write("architecture.html", page(
    "architecture.html", "技术架构", "Architecture",
    "五个模块，职责边界清晰。UI 与 Minecraft 逻辑彻底解耦：同一份 MofuCore 内核，"
    "既能跑在 Avalonia 桌面上，也能跑在 Photino Web 宿主里。",
    body,
    tags=[("Avalonia 12.1.4", "accent"), (".NET 10", ""), ("SukiUI 7.0.2-nightly", ""), ("5 模块", "")],
    prev=("index.html", "首页"),
    next_=("ui-library.html", "SukiUI 适配选型"),
))

# ══════════════════════════════════════════════════════════
# 3. UI 库选型（核心页）
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "问题定义", "什么才算「适配 SukiUI」", f"""
<p class="muted" style="margin-top:-4px">
  SukiUI 是一套 <b>Material Design 3 血统</b> 的 Avalonia 主题与控件库：令牌化、状态层、elevation 层级、
  12/16dp 圆角规范、强调色跟随体系。要给它挑搭档，得看这几个维度。
</p>
<div class="grid g3" style="margin-top:16px">
  {card("设计语言一致", "同为 MD3 血统 —— 状态层透明度、圆角 scale、elevation 数值才能直接复用，不打架。", "必要")}
  {card("主题机制不冲突", "SukiUI 自己管着 <code>AddColorTheme</code> + 序号递增这套逻辑，第二个主题库进来容易撞车。", "必要")}
  {card("Avalonia 12 兼容", "Avalonia 12 是 2026 的新大版本，很多库还没跟上。要确认依赖声明是否 <code>Avalonia &gt;= 12</code>。", "必要")}
</div>
{notice("err", """<b>硬性禁止组合：</b><code>SukiUI</code> + <code>Material.Avalonia</code> —— 两套设计系统并存会导致 brush 冲突与视觉混乱。
同理 <code>FluentAvaloniaTheme</code> 也不能与 SukiUI 同时装载。""")}""")}

{sec("02", "候选横评", "Avalonia 生态里能跟 SukiUI 组队的库", f"""
{table(
    ["库", "定位", "Avalonia 12", "与 SukiUI 兼容性", "结论"],
    [
        ["<b>Irihi.Ursa 2.0</b>", "企业级控件集（.NET 基金会成员）",
         "<span class=\"tag ok\">原生支持</span>", "<span class=\"tag ok\">可共存</span>",
         "<b>首选</b>"],
        ["<b>Avalonia 12 内置 TableView</b>", "只读表格控件",
         "<span class=\"tag ok\">核心包内置</span>", "<span class=\"tag ok\">零冲突</span>",
         "<b>推荐</b>"],
        ["<b>Material.Avalonia</b>", "真 MD3 主题",
         "<span class=\"tag warn\">部分</span>", "<span class=\"tag err\">禁止并存</span>",
         "不选"],
        ["<b>FluentAvalonia</b>", "WinUI3 风格控件",
         "<span class=\"tag warn\">部分</span>", "<span class=\"tag err\">同属基础主题</span>",
         "不选"],
        ["<b>Semi.Avalonia</b>", "字节 Semi Design 移植",
         "<span class=\"tag ok\">支持</span>", "<span class=\"tag err\">第二套基础主题</span>",
         "不选"],
        ["<b>Citrus.Avalonia</b>", "轻量原生控件美化",
         "<span class=\"tag warn\">跟进中</span>", "<span class=\"tag ok\">可共存</span>",
         "备选"],
        ["<b>Avalonia.Controls.DataGrid</b>", "官方数据表格",
         "<span class=\"tag err\">已废弃</span>", "<span class=\"tag ok\">可共存</span>",
         "别用"],
        ["<b>Markdown.Avalonia</b>", "Markdown 渲染",
         "<span class=\"tag ok\">12.0.2</span>", "<span class=\"tag ok\">可共存</span>",
         "按需"],
        ["<b>Avalonia.AvaloniaEdit</b>", "代码编辑器",
         "<span class=\"tag ok\">12.0.0</span>", "<span class=\"tag ok\">可共存</span>",
         "按需"],
    ])}""")}

{sec("03", "最终推荐", "Irihi.Ursa 2.0 + Avalonia 12 内置 TableView", f"""
<div class="card" style="border-color:var(--accent-line);background:color-mix(in srgb,var(--accent) 8%, var(--card))">
  <div class="card-title">{icon("M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z")} 推荐方案</div>
  <p class="card-text">
    <b>主库：<code>Irihi.Ursa 2.0</code></b> —— 补齐 SukiUI 没有的高阶控件。<br>
    <b>表格：<code>Avalonia 12 内置 TableView</code></b> —— 不引任何新包，直接用核心包。
  </p>
</div>

<div class="grid g2" style="margin-top:16px">
  <div class="card">
    <div class="card-title"><span class="dot"></span>为什么是 Ursa 2.0</div>
    {ul([
      "<b>专为 Avalonia 12 设计</b> —— 2.0 面向 Avalonia 12 全新 API：窗体装饰、焦点管理、无障碍全面对齐",
      "<b>MIT 协议 + .NET 基金会成员</b> —— 商用无忧，无授权风险",
      "<b>控件层而非主题层</b> —— Ursa 核心控件可脱离 Semi 主题单独用，与 SukiUI 不抢 brush",
      "<b>补齐 Mofumofu 的真实缺口</b>：Form / Tag / Drawer / Skeleton / Toast / Banner / Pagination / DatePicker / TimePicker / ColorPicker / PathPicker / KeyGestures",
      "<b>深色友好</b> —— 半透明卡片 + 状态层，风格与 SukiUI 的玻璃质感同源",
    ])}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>为什么表格用 TableView</div>
    {ul([
      "<b>DataGrid 已废弃</b> —— 官方标注「deprecated and only receives bug fixes」，且已独立成仓",
      "<b>TreeDataGrid 变成商业版</b> —— 现属 Avalonia Pro，需 license key，启动器这种免费项目不合适",
      "<b>TableView 是官方指定的替代</b> —— 12.1 新增，核心包内置，零 NuGet 依赖",
      "<b>正好对上 Mofumofu 场景</b>：版本列表、资源列表、服务器玩家表全是只读展示",
      "<b>行与单元格都回收虚拟化</b> —— 大列表滚动性能有保障",
    ])}
  </div>
</div>

<div class="section-head" style="margin-top:26px;margin-bottom:12px">
  <span class="section-num">03.1</span><h2 class="section-title">落地代码</h2>
</div>
{code('''<span class="c"># csproj —— 加一行就够</span>
&lt;<span class="k">PackageReference</span> Include=<span class="s">"Irihi.Ursa"</span> Version=<span class="s">"2.0.0"</span> /&gt;

<span class="c">// App.axaml —— 顺序很重要：先 SukiUI，后 Ursa</span>
&lt;<span class="k">Application.Styles</span>&gt;
  &lt;<span class="k">suki</span>:<span class="k">SukiTheme</span> /&gt;
  &lt;<span class="k">Styles</span> Include=<span class="s">"avares://Ursa/Themes/Semi/SemiTheme.xaml"</span> /&gt;
&lt;/<span class="k">Application.Styles</span>&gt;

<span class="c">// 表格 —— 直接用核心包的 TableView，零新依赖</span>
&lt;<span class="k">TableView</span> ItemsSource=<span class="s">"{{Binding Versions}}"</span>&gt;
  &lt;<span class="k">TableView.Columns</span>&gt;
    &lt;<span class="k">TableViewColumn</span> Header=<span class="s">"版本"</span> Binding=<span class="s">"{{Binding Id}}"</span> Width=<span class="s">"1*"</span> /&gt;
    &lt;<span class="k">TableViewColumn</span> Header=<span class="s">"类型"</span> Binding=<span class="s">"{{Binding Type}}"</span> Width=<span class="s">"120px"</span> /&gt;
  &lt;/<span class="k">TableView.Columns</span>&gt;
&lt;/<span class="k">TableView</span>&gt;''')}
{notice("warn", "<b>注意 Semi 主题那条 StyleInclude</b>：如果你不想引入 Semi 视觉，只取 Ursa 控件不加载 SemiTheme 字典即可，控件会落到 SukiUI 的资源键上，风格统一。")}""")}

{sec("04", "补齐方案对照", "Mofumofu 现在自研的控件，哪些该交给 Ursa", f"""
{table(
    ["Mofumofu 现状", "现状位置", "建议"],
    [
        ["自绘 ToastStack（最多 4 条 + 淡出）", "<code>MainWindow.axaml.cs:649-750</code>", "<b>换用</b> <code>Ursa Toast</code> —— 支持堆叠、动画、优先级"],
        ["自研 HSV 拾色轮 ColorWheel", "<code>Controls/ColorWheel.cs</code>", "<b>保留自研</b> —— Ursa 的 ColorPicker 形态不同，替换需重做交互"],
        ["自绘 IconParkIcon 控件", "<code>Controls/IconParkIcon.cs</code>", "<b>保留</b> —— 多色图标是项目特色，无现成等价物"],
        ["自绘 GradientSpinner", "<code>Controls/GradientSpinner.cs</code>", "<b>保留</b> —— 轻量且已够用"],
        ["原生 ComboBox + 自定义样式类", "全局", "<b>可换</b> <code>Ursa</code> 的 AutoCompleteBox / 增强 ComboBox"],
        ["原生 ToggleSwitch", "全局", "<b>可换</b> —— Ursa 版本带动画与状态层"],
        ["手搓的分页逻辑", "<code>DownloadView.axaml.cs:1141</code>", "<b>换用</b> <code>Ursa Pagination</code>"],
        ["手搓的日期时间选择", "服务器备份调度", "<b>换用</b> <code>Ursa DatePicker / TimePicker</code>（支持 DateOnly / TimeOnly）"],
        ["手搓的 Drawer 抽屉", "<code>HomeView.axaml:57-119</code>", "<b>可换</b> <code>Ursa Drawer</code>，但自定义磁贴逻辑要重接"],
        ["版本 / 资源列表", "<code>DownloadView</code>", "<b>换用</b> <code>TableView</code> —— 内置虚拟化，替代手写列表"],
    ])}""")}

{sec("05", "禁忌与注意事项", f"""
<div class="grid g2">
  <div class="card">
    <div class="card-title"><span class="dot"></span>绝对不要</div>
    {ul([
      "<b>SukiUI + Material.Avalonia</b> —— 两套 MD3 实现抢 brush，必然视觉混乱",
      "<b>SukiUI + FluentAvaloniaTheme</b> —— 基础主题只能有一个",
      "<b>同时引入两个图标家族</b> —— 一个视图里只放一套",
      "<b>在视图里写死颜色</b> —— 破坏令牌体系，换主题会失效",
      "<b>直接改主题 NuGet 的样式</b> —— 应在自己的 <code>Styles/</code> 里做覆盖",
    ], tight=True)}
  </div>
  <div class="card">
    <div class="card-title"><span class="dot"></span>要留意</div>
    {ul([
      "<b>主题序号坑</b> —— SukiUI 不覆盖同名主题，换色必须递增序号",
      "<b>不要重写控件默认样式</b> —— 用 <code>Classes</code> 样式类扩展，别覆盖 <code>App.axaml</code> 里的默认样式",
      "<b>RequestedThemeVariant=\"Default\"</b> —— 让系统深浅色偏好生效",
      "<b>亮暗两套都要测</b> —— 尤其透明与毛玻璃层在浅色下容易翻车",
      "<b>Ursa 2.0 部分控件要求 ViewModel 层依赖框架</b> —— 见官方 discussion #959",
    ], tight=True)}
  </div>
</div>""")}
"""

write("ui-library.html", page(
    "ui-library.html", "SukiUI 适配选型", "UI Library",
    "为 Mofumofu 的 Avalonia + SukiUI 技术栈挑一个不打架、能补齐短板的 UI 库。"
    "结论：<b>Irihi.Ursa 2.0</b> 做控件补充，表格用 <b>Avalonia 12 内置 TableView</b>。",
    body,
    tags=[("Irihi.Ursa 2.0", "ok"), ("Avalonia 12 原生", "accent"), ("MIT", "")],
    prev=("architecture.html", "技术架构"),
    next_=("download.html", "下载大厅"),
))
