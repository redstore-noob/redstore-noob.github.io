import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Divider,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

const GITHUB_URL = "https://github.com/redstore-noob/NekoLauncher";
const GUIDE_URL = `${GITHUB_URL}/blob/main/docs/guide/Extensions_Guide.md`;
const API_REF_URL = `${GITHUB_URL}/blob/main/docs/guide/API_REFERENCE.md`;
const PERMISSIONS_URL = `${GITHUB_URL}/blob/main/docs/guide/PERMISSIONS.md`;
const CONVENTIONS_URL = `${GITHUB_URL}/blob/main/docs/guide/CONVENTIONS.md`;
const CSS_TABLE_URL = `${GITHUB_URL}/blob/main/docs/guide/CSS_STYLE_TABLE.md`;
const UI_THEMES_URL = `${GITHUB_URL}/blob/main/docs/guide/UI_THEMES.md`;
const EXAMPLE_URL = `${GITHUB_URL}/tree/main/examples/server-status`;

/* ===== 左侧导航数据 ===== */
const NAV_SECTIONS = [
  { id: "quick-start", label: "🚀 快速开始" },
  { id: "manifest", label: "📋 plugin.yaml 清单" },
  { id: "permissions", label: "🔐 权限系统" },
  { id: "permissions-gates", label: "　└ 三层闸与高危确认" },
  { id: "widgets", label: "🧩 小组件与页面" },
  { id: "launch-card", label: "　└ 启动卡覆盖" },
  { id: "page-action", label: "　└ 页面按钮" },
  { id: "storage", label: "💾 存储 config.*" },
  { id: "launch", label: "🎮 启动游戏" },
  { id: "instances", label: "📦 实例与存档" },
  { id: "downloads", label: "⬇️ 下载与安装" },
  { id: "accounts", label: "👤 账号" },
  { id: "system-status", label: "📈 系统状态" },
  { id: "music", label: "🎵 音乐库" },
  { id: "feedback", label: "🔔 通知与反馈" },
  { id: "system", label: "🛠️ 系统能力" },
  { id: "server-status", label: "🌐 服务器状态" },
  { id: "launcher-config", label: "⚙️ 启动器设置" },
  { id: "ipc", label: "🔌 插件间通信 IPC" },
  { id: "logs", label: "📜 日志与退出事件" },
  { id: "navigate", label: "🧭 页面导航" },
  { id: "lifecycle", label: "♻️ 生命周期" },
  { id: "ui", label: "🎨 UI 约定" },
  { id: "styles", label: "🖌️ 自定义 CSS 样式" },
  { id: "styles-vars", label: "　└ 第一档：CSS 变量" },
  { id: "styles-classes", label: "　└ 第二档：nya-* 类" },
  { id: "styles-debug", label: "　└ 调试与禁忌" },
  { id: "ui-themes", label: "🌈 界面主题注册" },
  { id: "publish", label: "📤 打包发布" },
  { id: "cheatsheet", label: "📖 API 速查表" },
];

/* ===== 通用小组件 ===== */

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-sm text-foreground-500 leading-relaxed [&_code]:whitespace-pre-wrap flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }) {
  return (
    <Code color="default" className="block px-4 py-3 text-xs overflow-x-auto whitespace-pre">
      {children}
    </Code>
  );
}

function InlineCodeList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Code key={it} className="text-xs">{it}</Code>
      ))}
    </div>
  );
}

function InfoTable({ columns, rows }) {
  return (
    <Table aria-label={columns.join("/")} removeWrapper>
      <TableHeader>
        {columns.map((c) => (
          <TableColumn key={c}>{c}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j} className={j === 0 ? "text-xs whitespace-nowrap" : "text-xs"}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* 侧边栏当前章节高亮 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <Button
      isIconOnly
      aria-label="返回顶部"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-content1/80 backdrop-blur-md border border-divider"
      onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </Button>
  );
}

/* ===== 内容区 ===== */

function QuickStart() {
  return (
    <Section id="quick-start" title="🚀 快速开始">
      <p>
        插件运行在启动器 WebView 里，支持手写 JS（<Code>h()</Code>）或 TSX / JSX。
        但插件<strong>不等于</strong>与启动器同权限：宿主在启动最早时刻安装了
        <strong>后端闸门</strong>，收走 <Code>window.go</Code> 等全部直呼 Go
        绑定的出口，插件<strong>只能</strong>通过注入的 <Code>api</Code>{" "}
        对象使用宿主能力（能力隔离，不是密码学沙箱）。
        权限系统是声明制契约：安装插件 = 信任它，因此源码随包分发、人人可审计。
      </p>
      <p>一个完整可用的插件目录（目录名必须等于清单 <Code>id</Code>，宿主强校验）：</p>
      <CodeBlock>{`<插件id>/
├── plugin.yaml   ← 唯一声明文件
├── icon.png      ← 图标（固定名，可选）
├── index.js      ← 编译产物 = 默认入口
├── theme.css     ← 清单 styles 声明的样式文件（可选，存盘即热生效）
└── src/…         ← 源码（作者保留，随包分发）`}</CodeBlock>
      <p>
        <strong>dev 模式零工具链</strong>：在 <Code>plugin.yaml</Code> 加{" "}
        <Code>dev: true</Code>，入口直接写 <Code>index.jsx</Code> 源码，宿主会懒加载
        Sucrase 现场编译，保存后点插件页「重新加载」即生效。
      </p>
      <p>第一个插件——手写 <Code>h()</Code> 也能写（dev 模式写 <Code>index.jsx</Code> 可用 JSX 语法）：</p>
      <CodeBlock>{`export default function activate(api) {
  const { h, ui, icons, notify } = api;

  api.registerWidget({
    id: "hello",                    // 注册为 "<插件id>:hello"
    title: "你好世界",
    description: "我的第一个插件",
    icon: h(icons.Key20Regular),    // 注意：icon 要节点不是组件
    tileClass: "from-violet-500 to-fuchsia-500",
    render: () => h("div", { className: "text-xs text-gray-400" }, "喵！"),
  });

  api.notify.success("插件已加载");
}`}</CodeBlock>
      <p>
        官方完整示例：<Link href={EXAMPLE_URL} target="_blank" rel="noopener" showAnchorIcon size="sm">examples/server-status</Link>
        ，拷进插件目录点「重新加载」即可试用。
      </p>
    </Section>
  );
}

function Manifest() {
  return (
    <Section id="manifest" title="📋 plugin.yaml 清单">
      <CodeBlock>{`id: playtime-stats          # 必填，= 目录名；小写字母/数字/连字符
name: 游戏时长统计
version: "1.0.0"            # 所有版本字段必须带引号（防 1.20 → 1.2）
api: "1"                    # 目标宿主主版本
description: …
author: …

dev: true                   # 仅开发期：入口用 index.jsx，现场编译

capabilities:               # 权限声明，见「权限系统」
  storage: true
  launch: true

settings:                   # 默认设置：首次加载种入 api.config（仅空键写入）
  dailyGoalHours: "2"

styles:                     # 样式文件（相对插件目录、限 .css）：加载时自动注入为全局 CSS
  - theme.css               # 改动会被宿主监听，保存即热生效（约 3 秒内），无需重新加载`}</CodeBlock>
      <p>
        注意：<Code>entry</Code> / <Code>icon</Code> 字段<strong>不存在</strong>——入口固定{" "}
        <Code>index.js</Code>（dev 插件 <Code>index.jsx</Code>），图标固定 <Code>icon.png</Code>；
        也<strong>不存在改写启动命令行的通道</strong>，插件只能通过{" "}
        <Code>launchSelected</Code> / <Code>launchVersion</Code> 走与用户手点完全相同的启动正门。
      </p>
      <p>
        <Code>styles</Code> 列出的 <Code>.css</Code> 文件会被注入为全局 CSS，
        可自定义任意控件（含宿主自身）的样式，详见「自定义 CSS 样式」。
      </p>
    </Section>
  );
}

const PERMISSION_ROWS = [
  ["storage", "config.get / set / clear（卸载插件时会一并删除其全部配置键）"],
  ["launch", "launchSelected / launchVersion（首次调用弹 NekoPrompt 确认）"],
  ["instances", "只读查询：getInstances / getSaves / getVersionProfile / getVersionDetails / getScreenshots"],
  ["instances-write", "改全局状态：selectInstance / saveVersionProfile / setContentEnabled（兼容旧 instances，新插件请显式声明写权限）"],
  ["downloads", "只读：getDownloadTasks / onDownloadTasksChanged / getVersions / getModLoaderVersions / getDownloadSources / getJavaRuntimes"],
  ["downloads-write", "写：startDownload / startModLoaderDownload / downloadResource / installModpack（不认 downloads：读权限不构成写权限）"],
  ["system-status", "只读机器占用：getMemorySnapshot / getSystemUsage / getDiskUsage"],
  ["music", "只读音乐库：getCurrentTrack / getMusicTracks（默认关闭）"],
  ["logs", "只读运行日志：onLogLine（含路径 / 账号名 / 服务器地址，默认关闭）"],
  ["network", "宿主代插件发起的联网请求（版本清单 / 服务器状态 / 资源下载等；默认关闭，可声明表达意图）"],
  ["accounts", "getAccounts（默认关闭）"],
  ["launcher-config", "getLauncherSettings"],
  ["launcher-config-write", "saveLauncherSettings（兼容旧 launcher-config，新插件请显式声明写权限）"],
  ["notifications", "notify.*"],
  ["clipboard", "setClipboard"],
  ["open-url", "openUrl"],
  ["open-path", "openPath（叠加「仅插件目录内」的宿主侧限制）"],
  ["server-status", "getServerStatus（叠加 network 联网开关）"],
  ["styles", "styles.inject / styles.remove（全局 CSS 注入）；registerUiTheme / unregisterUiTheme（界面主题）"],
  ["ipc", "插件间消息总线：ipc.send / ipc.broadcast / ipc.onMessage / ipc.plugins"],
];

function Permissions() {
  return (
    <Section id="permissions" title="🔐 权限系统（声明制，未声明 = 报错）">
      <p>
        受权限控制的 API <strong>始终存在</strong>，但调用时校验清单的{" "}
        <Code>capabilities</Code>：<strong>未声明对应权限直接抛错</strong>
        （错误信息会指明缺哪个权限、如何声明），绝不静默失败。
        读 / 写权限已拆分（<Code>instances-write</Code>、<Code>launcher-config-write</Code>），
        让用户在安装页就能看出插件会不会改全局状态。
      </p>
      <InfoTable columns={["权限键", "解锁的 API"]} rows={PERMISSION_ROWS} />
      <p>
        无需权限（永远可用）：<InlineCodeList items={[
          "apiVersion", "plugin{id,name,version}", "react / h / Fragment / ui / icons / HomeCard",
          "registerWidget / registerPage / registerPageAction / registerLaunchCard",
          "log / t / confirm", "navigateToPage", "getLaunchState",
          "onLaunchPhaseChange", "onInstancesChanged", "onGameExit", "onCleanup",
        ]} />
      </p>
    </Section>
  );
}

function PermissionsGates() {
  return (
    <Section id="permissions-gates" title="三层闸与高危动作确认">
      <p>声明只是第一层，权限共有三层闸：</p>
      <InfoTable columns={["层", "在哪", "不满足时"]} rows={[
        ["① 声明", "plugin.yaml 的 capabilities（安装页可见的用途清单）", "调用直接抛错（绝不静默）"],
        ["② 授权", "插件页每个权限一个 Switch，用户随时收回某项能力", "相关 API 返回 null（不执行、不抛错），控制台记警告"],
        ["③ 动作", "高危动作的 NekoPrompt / 中危动作的 NekoAlert 确认", "拒绝即抛错，磁盘上不留改动"],
      ]} />
      <p>
        <strong>默认关闭</strong>的四项：<Code>network</Code>（联网）、<Code>logs</Code>（运行日志）、
        <Code>accounts</Code>（账号）、<Code>music</Code>（音乐库）；其余权限「声明即开启」。
        插件<strong>必须判空</strong>：受权限控制的成员返回类型都带 <Code>| null</Code>，
        <Code>null</Code> 的含义就是「用户关掉了这一项」。
      </p>
      <p><strong>高危动作闸门</strong>（闸在动手之前，确认框三按钮：允许一次 / 本次运行内允许 / 拒绝，默认落在拒绝）：</p>
      <InfoTable columns={["动作", "闸门", "触发 API"]} rows={[
        ["发起游戏启动", "NekoPrompt 确认", "launchSelected / launchVersion"],
        ["下载 / 安装", "NekoPrompt 确认", "startDownload / startModLoaderDownload / downloadResource / installModpack"],
        ["写实例启动档案", "NekoPrompt 确认", "saveVersionProfile"],
        ["写启动器全局设置", "NekoPrompt 确认", "saveLauncherSettings"],
        ["启停实例内容 / 注入全局样式 / 切换当前实例", "只公示（NekoAlert）", "setContentEnabled / styles.inject / selectInstance"],
      ]} />
      <p>
        确认按（插件 + 动作）记在本次运行内，批处理只问一次；拒绝同样被记住，
        同一动作本次运行内直接失败、不再弹框，<strong>重新加载插件即可重新询问</strong>。
        公示是宿主行为、插件关不掉——插件可以强，但不能悄悄改东西。
      </p>
      <p>
        <strong>危险读的收口</strong>：<Code>onLogLine</Code> 需要 <Code>logs</Code> 声明；
        <Code>getSaves</Code> 的路径被限制在已知游戏根目录内，越界返回空数组并记 WARN。
      </p>
    </Section>
  );
}

function Widgets() {
  return (
    <Section id="widgets" title="🧩 小组件与页面（registerWidget / registerPage）">
      <p>
        两个核心扩展点。<Code>registerWidget</Code> 在主页组件列注册小组件，
        <Code>registerPage</Code> 注册一个独立页面。id 会被自动加上{" "}
        <Code>&lt;插件id&gt;:</Code> 前缀，所以不用担心和其它插件撞名。
      </p>
      <CodeBlock>{`api.registerWidget({
  id: "account-switcher",          // 实际注册为 "<插件id>:account-switcher"
  title: "账号快切",
  description: "在主页一键切换登录账号",
  icon: h(icons.Key20Regular),     // icon 要节点不是组件
  tileClass: "from-violet-500 to-fuchsia-500",   // 卡片渐变背景
  render: function AccountCard({ context }) {
    const { accounts, selectedAccount, onSelectAccount } = context;
    if (accounts.length === 0) {
      return h("div", { className: "text-xs text-gray-400" }, "还没有添加账号");
    }
    return h(ui.Button, {
      size: "sm", color: "primary",
      variant: accounts[0].key === selectedAccount?.key ? "solid" : "flat",
      onPress: () => void onSelectAccount(accounts[0].key),
    }, accounts[0].name);
  },
});

api.registerPage({
  id: "stats-page",                // 注册为 "<插件id>:stats-page"
  title: "时长统计",
  icon: h(icons.ChartMultiple20Regular),
  render: function Page({ context }) {
    // PageRenderContext 随启动状态自动重渲染
    return h("div", { className: "p-4" }, "页面内容喵");
  },
});`}</CodeBlock>
      <p>
        <Code>WidgetRenderContext</Code>（小组件注入的 context）自 v1 封版：
        只增不改名，改名/删除即升主版本。主页小组件会被宿主自动装入标准卡片壳，
        内容不要自带卡片背景/外壳，直接输出内容行即可（详见「UI 约定」）。
      </p>
    </Section>
  );
}

function LaunchCard() {
  return (
    <Section id="launch-card" title="启动卡覆盖（registerLaunchCard）">
      <p>
        <Code>api.registerLaunchCard(&#123; render &#125;)</Code> 可以整体替换主页右侧启动卡的内容：
      </p>
      <CodeBlock>{`api.registerLaunchCard({
  render: function MyLaunchCard({ context }) {
    // LaunchCardContext：与内置卡完全相同的数据与回调
    // （版本列表 / 选中版本 / 账号列表 / 启动停止 / 刷新 / 打开目录）
    return h("div", { className: "p-2" }, "我的启动卡");
  },
});`}</CodeBlock>
      <p>
        · <strong>独占槽</strong>：同时只有一张覆盖卡生效（最后注册者赢）；插件被停用 /
        卸载 / 重载失败后宿主自动摘除并回落内置卡片，无需插件清理；
      </p>
      <p>
        · 宿主在外层提供面板容器、滑动切换与拖动删除区，<strong>不要再自带整块面板背景</strong>；
        覆盖卡出错只坏这一张卡（宿主套错误边界）；
      </p>
      <p>
        · 只想微调内置卡样式而不换整张卡的，优先用清单 <Code>styles</Code> /{" "}
        <Code>styles.inject</Code> 注入 CSS——内置卡根节点带{" "}
        <Code>data-nya="launch-card"</Code> 选择锚点。
      </p>
    </Section>
  );
}

function PageAction() {
  return (
    <Section id="page-action" title="页面按钮（registerPageAction）">
      <p>往宿主<strong>已有页面</strong>里加一个按钮（目前 <Code>instances</Code> / <Code>download</Code> 有渲染插槽），不做整页占位：</p>
      <CodeBlock>{`api.registerPageAction({
  pageId: "instances",              // 目前 instances / download 有插槽
  id: "health-check",               // 注册为 "<插件id>:health-check"
  label: "体检",
  icon: api.h(api.icons.Warning20Regular),
  onPress: async () => { await api.getVersionDetails(selected); },
});`}</CodeBlock>
      <p>
        · <Code>onPress</Code> 返回 Promise 时按钮进入忙碌态（禁用 + loading）；抛错由宿主接住并弹错误提示，不会弄坏宿主页面；
      </p>
      <p>
        · 目标 pageId 未注册时只记控制台警告、不显示（插件间加载顺序无法保证）；
        没有插件注册时插槽不占任何空间；插件卸载 / 重载 / 停用时按钮自动摘除。
      </p>
    </Section>
  );
}

function Storage() {
  return (
    <Section id="storage" title="💾 存储（config.*，需 storage 权限）">
      <p>
        键前缀隔离（不会与其他插件冲突）、仅字符串值；
        默认值来自清单 <Code>settings</Code>（仅当键为空时写入，用户改过不覆盖）。
        <strong>卸载插件时会一并删除其全部配置键。</strong>
      </p>
      <CodeBlock>{`// 读（键不存在时返回种子值或 undefined）
const goal = await api.config.get("dailyGoalHours");   // "2"

// 写（仅字符串）
await api.config.set("dailyGoalHours", "3");

// 清除
await api.config.clear("dailyGoalHours");`}</CodeBlock>
    </Section>
  );
}

function Launch() {
  return (
    <Section id="launch" title="🎮 启动游戏（需 launch 权限）">
      <CodeBlock>{`// 启动当前选中的实例（与用户手点启动按钮完全同管线）
await api.launchSelected();

// 启动指定版本（校验版本存在，且不改变用户当前选中）
await api.launchVersion("1.21.9-fabric");

// 查询启动状态（无需权限）
const state = await api.getLaunchState();

// 订阅启动阶段变化（无需权限；返回取消订阅函数）
const off = api.onLaunchPhaseChange((phase) => {
  api.log("启动阶段：", phase);
});

// 一次启动的终态（无需权限）：failed / exited + 退出码 + 是否崩溃
api.onGameExit((e) => {
  if (e.crashed) api.notify.error("游戏崩溃了喵：" + e.message);
});`}</CodeBlock>
      <p>
        启动是<strong>高危动作</strong>：首次调用弹 NekoPrompt 确认，拒绝即抛错。
        插件<strong>不能</strong>改写启动命令行，也没有注入 JVM 参数的后门；
        想调整启动行为请走 <Code>saveVersionProfile</Code>（同样要过确认框，见「实例与存档」）。
      </p>
    </Section>
  );
}

function Instances() {
  return (
    <Section id="instances" title="📦 实例与存档（instances / instances-write）">
      <CodeBlock>{`// 查询（instances）
const instances = await api.getInstances();      // 实例列表
const saves = await api.getSaves();              // 存档列表（路径限已知游戏根目录内）
const details = await api.getVersionDetails(v);  // 含加载器信息与全部内容列表
const shots = await api.getScreenshots(v);       // 截图

// 写（instances-write）
await api.selectInstance(instances[0]);          // 切换全局选中实例（NekoAlert 公示）

// 读取 → 原样修改 → 写回（实例启动档案；NekoPrompt 确认后生效）
const profile = await api.getVersionProfile(v);
profile.javaArgs = "-Xmx4G";                     // 基于返回值修改
await api.saveVersionProfile(v, profile);

// 启停 Mod 等内容：只做 .disabled 后缀重命名（NekoAlert 公示）
await api.setContentEnabled(entry.SourcePath, false);`}</CodeBlock>
      <p>
        写侧 API 需声明 <Code>instances-write</Code>（兼容旧的 <Code>instances</Code>，
        但新插件请显式声明写权限）。<Code>saveVersionProfile</Code> 档案里的 Java 路径 /
        包装命令等同「下次启动执行什么」，所以要先过确认框。
        宿主<strong>没有「删除内容」能力，插件也没有</strong>——mod 文件永远由用户自己处置。
      </p>
      <p>
        另有事件 <Code>api.onInstancesChanged(cb)</Code>（无需权限），
        实例增删/切换时回调，返回取消订阅函数。
      </p>
    </Section>
  );
}

function Downloads() {
  return (
    <Section id="downloads" title="⬇️ 下载与安装（downloads / downloads-write）">
      <p>
        读侧（<Code>downloads</Code>）可以看下载进度、查版本清单；写侧（<Code>downloads-write</Code>）
        与下载页 / 资源页同一条管线：进度进右下角下载中心、可暂停取消；
        后端拒绝（已有下载在跑等）时<strong>抛错</strong>，不返回假成功。
        声明 <Code>downloads</Code> <strong>不会</strong>解锁写侧 API——下载域不做读→写兼容。
      </p>
      <CodeBlock>{`// —— 只读（downloads）——
const tasks = await api.getDownloadTasks();     // 全部下载任务（与下载中心同源）
const versions = await api.getVersions();       // 版本清单
const loaders  = await api.getModLoaderVersions("fabric", target.id);
const sources  = await api.getDownloadSources();
const runtimes = await api.getJavaRuntimes();
const off = api.onDownloadTasksChanged((list) => { /* 重新读来的完整列表 */ });

// —— 写（downloads-write；每次动作都过 NekoPrompt 确认）——
// 1. 版本清单 → 2. Loader 版本 → 3. 发起安装
const target = versions.find((item) => item.id === "1.21.1");
await api.startModLoaderDownload({
  version: target,                // 版本 / Loader 对象请原样传，不要自己拼
  loader: loaders.at(-1),
  instanceName: "1.21.1-Fabric",
});

// 往已有实例里装一个 mod
await api.downloadResource({
  source: "modrinth", projectId: "AANobbMI", versionId: "...",
  contentDirectory: instance.MinecraftDirectory,
});`}</CodeBlock>
      <p>
        下载任务带 <Code>kind</Code>（game / content / modpack / java）、归一后的{" "}
        <Code>phase</Code> 与便捷布尔值 <Code>isActive</Code> / <Code>isFinished</Code> /{" "}
        <Code>isCompleted</Code>；「是否全部完成」用{" "}
        <Code>tasks.every((t) =&gt; t.isCompleted)</Code>。终态任务按宿主策略只保留最近几条，
        <strong>不要当作下载历史</strong>。<Code>onDownloadTasksChanged</Code>{" "}
        订阅时不会立刻回调一次——先 <Code>getDownloadTasks()</Code> 取初值再订阅。
        进度与终态一律从这两个入口看，发起接口不返回进度。
      </p>
    </Section>
  );
}

function Accounts() {
  return (
    <Section id="accounts" title="👤 账号（需 accounts 权限，默认关闭）">
      <CodeBlock>{`const accounts = await api.getAccounts();   // 用户关掉开关时返回 null
if (accounts) {
  // 只读摘要（含头像），凭据不出宿主
  for (const a of accounts) api.log(a.name, a.key, a.avatarUrl);
}`}</CodeBlock>
      <p>
        <strong>只读</strong>：插件无法添加/删除账号，也永远拿不到令牌等凭据；
        做账号快切这类小组件时配合 <Code>launchSelected</Code> 或界面选择即可。
      </p>
    </Section>
  );
}

function SystemStatus() {
  return (
    <Section id="system-status" title="📈 系统状态（需 system-status 权限）">
      <CodeBlock>{`const mem   = await api.getMemorySnapshot();  // 内存占用
const sys   = await api.getSystemUsage();     // CPU 等整机占用
const disk  = await api.getDiskUsage();       // 磁盘占用
// 与内置「内存 / 性能 / 磁盘」小组件同源`}</CodeBlock>
    </Section>
  );
}

function Music() {
  return (
    <Section id="music" title="🎵 音乐库（需 music 权限，默认关闭）">
      <CodeBlock>{`const current = await api.getCurrentTrack();  // 正在播放的曲目
const tracks  = await api.getMusicTracks();   // 音乐库列表
// 只读：没有播放控制；播放控制等有真实场景再议`}</CodeBlock>
    </Section>
  );
}

function Feedback() {
  return (
    <Section id="feedback" title="🔔 通知与反馈（notify 需 notifications 权限）">
      <CodeBlock>{`// 通知共 4 级；另有频控：5s 内最多 3 条
api.notify.success("已保存");
api.notify.info("开始同步存档…");
api.notify.warning("Java 路径为空");
api.notify.error("连接失败：" + err.message);

// 无需权限的反馈类
api.log("调试信息");                    // 宿主日志
api.t("剩余 {n} 秒", { n: 10 });        // 占位插值
const ok = await api.confirm({          // 宿主统一样式确认框
  title: "删除确认",
  body: "确定要删除吗？",
});`}</CodeBlock>
    </Section>
  );
}

function System() {
  return (
    <Section id="system" title="🛠️ 系统能力（clipboard / open-url / open-path）">
      <CodeBlock>{`await api.setClipboard("play.hypixel.net");   // 需 clipboard；只写不读
await api.openUrl("https://nekolauncher.example");  // 需 open-url；仅 http(s)
await api.openPath("./assets/notes.txt");     // 需 open-path；仅插件目录内`}</CodeBlock>
      <p>
        注意三个「仅」：剪贴板<strong>只写不读</strong>、链接<strong>仅 http(s)</strong>、
        路径<strong>仅插件目录内</strong>（宿主侧还会再限制一层）。
      </p>
    </Section>
  );
}

function ServerStatus() {
  return (
    <Section id="server-status" title="🌐 服务器状态（需 server-status 权限）">
      <CodeBlock>{`try {
  const status = await api.getServerStatus("hypixel.net", 25565);
  if (!status) {
    // 返回 null = 用户关掉了联网或服务器状态开关，不是错误
    api.notify.warning("请到插件页打开联网开关喵");
  } else {
    api.log("在线人数：", status.players?.online);
  }
} catch (e) {
  // 连接失败抛错，由插件接住展示
  api.notify.error("查询失败喵");
}`}</CodeBlock>
      <p>
        查询走的网络请求还受<strong>用户独占的联网开关</strong>（<Code>network</Code>，
        默认关闭）约束——开关关掉时返回 <Code>null</Code> 而不是抛错。
      </p>
    </Section>
  );
}

function LauncherConfig() {
  return (
    <Section id="launcher-config" title="⚙️ 启动器设置（launcher-config / launcher-config-write）">
      <CodeBlock>{`// 读（launcher-config）
const settings = await api.getLauncherSettings();
// 写（launcher-config-write；NekoPrompt 确认后生效）
settings.memory.min = "2G";
await api.saveLauncherSettings(settings);`}</CodeBlock>
      <p>
        这是<strong>全局设置</strong>：写入即对所有用户操作生效，
        务必基于 <Code>get</Code> 的返回值原样修改后写回，不要凭空构造对象。
      </p>
    </Section>
  );
}

function Ipc() {
  return (
    <Section id="ipc" title="🔌 插件间通信 IPC（需 ipc 权限）">
      <p>
        插件之间通过宿主的消息总线对话：点对点 <Code>send</Code> / 广播{" "}
        <Code>broadcast</Code> / 订阅 <Code>onMessage</Code>，发现用 <Code>plugins</Code>。
      </p>
      <CodeBlock>{`// 发送（接收方 id 从 api.ipc.plugins() 查）
const delivered = await api.ipc.send("other-plugin:main", "my-plugin:hello", { msg: "喵" });
// 返回送达的处理器数（0 = 目标没在监听，不是错误；权限被关闭返回 null）

// 广播
await api.ipc.broadcast("my-plugin:settings-changed", { theme: "dark" });

// 接收
const off = api.ipc.onMessage((message) => {
  // message = { from: {id,name,version}, to, type, payload }
  // from 由宿主注入，接收方可直接信任，插件伪造不了
});

// 查看当前活跃的其它插件
const peers = await api.ipc.plugins();`}</CodeBlock>
      <p>
        · 负载必须 JSON 可序列化且序列化后 ≤ 256 KB；每个接收者拿到独立深拷贝，互改不串；
      </p>
      <p>
        · 频控：同一插件 5 秒内最多 100 条；接收方异常隔离，一个插件处理器抛错不影响别人；
      </p>
      <p>
        · 投递资格：只有「当前活跃且 <Code>ipc</Code> 权限仍被授权」的插件能收到；
        订阅在卸载 / 重载 / 停用时由宿主自动退订；
      </p>
      <p>
        · 语义建议：<Code>type</Code> 用「域名式」前缀避免撞名（如 <Code>my-plugin:settings-changed</Code>）；
        回信用 <Code>send(message.from.id, …)</Code>；宿主不代管请求-响应会话。
      </p>
    </Section>
  );
}

function Logs() {
  return (
    <Section id="logs" title="📜 日志与退出事件（需 logs 权限的 onLogLine）">
      <CodeBlock>{`// 回调收到的是一批新增行（宿主按 1 秒窗口合并），不是逐行回调
const off = api.onLogLine(({ lines, droppedLines, totalLines, rotated }) => {
  if (rotated) clearMyPanel();        // 日志被清空/轮转，totalLines 重新计数
  render(lines);                      // 单批最多 200 行 / 256 KB
}, { tailLines: 0 });                 // 默认 0 = 只收订阅之后的新行（上限 2000）`}</CodeBlock>
      <p>
        日志含路径 / 账号名 / 服务器地址，属<strong>危险读</strong>：需要 <Code>logs</Code>{" "}
        声明且默认关闭。窗口隐藏 / 最小化时轮询自动暂停，回到前台补一拍；
        所有插件共享同一条轮询，多订阅不会线性增加 IO，但别在回调里做重活。
      </p>
      <p>
        退出事件无需权限：<Code>onGameExit(handler)</Code> 只在一次启动的<strong>终态</strong>触发
        （<Code>phase: "failed"</Code> 启动失败或 <Code>"exited"</Code> 进程退出），
        带 <Code>exitCode</Code> / <Code>crashed</Code> / <Code>stoppedManually</Code> /{" "}
        <Code>message</Code>，崩溃判定与启动器自己的崩溃弹窗同源。
      </p>
    </Section>
  );
}

function Navigate() {
  return (
    <Section id="navigate" title="🧭 页面导航（navigateToPage，无需权限）">
      <CodeBlock>{`await api.navigateToPage("download");        // 切到内置页
await api.navigateToPage("other-plugin:main", { from: "me" });  // 切到其它插件页
// 页面不存在抛错`}</CodeBlock>
    </Section>
  );
}

function Lifecycle() {
  return (
    <Section id="lifecycle" title="♻️ 生命周期（onCleanup / 事件订阅）">
      <CodeBlock>{`// 注册清理函数：卸载/重载时宿主依次调用
api.onCleanup(() => clearInterval(timer));

// 事件订阅返回取消订阅函数；卸载/重载时宿主也会自动清理
const offPhase = api.onLaunchPhaseChange(cb1);
const offInst  = api.onInstancesChanged(cb2);
const offDl    = api.onDownloadTasksChanged(cb3);   // 需 downloads 权限
const offLog   = api.onLogLine(cb4, { tailLines: 0 });  // 需 logs 权限
offPhase();   // 也可以手动取消`}</CodeBlock>
      <p>
        轮询定时器记得在 <Code>onCleanup</Code> 里清掉；官方 server-status
        示例演示了完整的「轮询 + <Code>onCleanup</Code>」写法。
      </p>
    </Section>
  );
}

function UiConventions() {
  return (
    <Section id="ui" title="🎨 UI 约定">
      <p><strong>宿主注入，插件不得自带 React</strong>。可用建材：</p>
      <InlineCodeList items={["react", "h", "Fragment", "ui（白名单组件）", "icons（白名单图标）", "api.HomeCard"]} />
      <p><strong>小组件卡片壳约定</strong>：主页组件列对指针事件做了统一管理，
        <Code>registerWidget</Code> 的小组件会被宿主自动装入标准卡片壳（主题描边、圆角内边距、事件恢复）——</p>
      <p>· 组件内容<strong>不要自带卡片背景/外壳</strong>（不要再套一层 Card），直接输出内容行即可；</p>
      <p>· 要与内置组件一致的「图标 + 标题 + 大数值」头部，用 <Code>api.HomeCard</Code>；</p>
      <p>· 长按 1 秒拖动排序、错误边界与内置组件完全相同，无需插件处理。</p>
      <p>
        <strong>样式</strong>：宿主的 Tailwind 工具类对插件 DOM 可用，但仅限宿主源码出现过的类；
        任意值（如 <Code>w-[137px]</Code>）请用 inline style。
        静态资源用 <Code>new URL("./assets/x.png", import.meta.url)</Code> 引用，
        不要用相对路径 <Code>&lt;img src="./assets/x.png"&gt;</Code>。
      </p>
      <p>
        要改<strong>插件自己的 DOM 之外</strong>的样式（包括宿主自身的控件），
        用清单 <Code>styles</Code> 字段或 <Code>api.styles.inject</Code>，见下一节。
      </p>
    </Section>
  );
}

/* ===== 自定义样式 ===== */

const STYLE_VARS = [
  ["--heroui-primary", "主题主色（500 档），影响全部强调色元素"],
  ["--heroui-primary-50 … -900", "主色明暗阶梯（50/100/200/300/400/500/600/700/800/900）"],
  ["--heroui-primary-foreground", "主色上的前程色（按钮文字），亮主色应给深色"],
  ["--nya-surface-1", "一级表面色（侧边栏、面板底色）· 自动跟随明暗主题"],
  ["--nya-surface-2", "二级表面色（更亮的浮层面板）· 自动跟随明暗主题"],
  ["--nya-border-c", "通用描边色 · 自动跟随明暗主题"],
  ["--nya-surface-1-light / -dark", "一级表面色的亮/暗值（想手动分别覆盖时用）"],
  ["--nya-surface-2-light / -dark", "二级表面色的亮/暗值"],
  ["--nya-border-light / -dark", "描边的亮/暗值"],
  ["--nya-shell", "最外层底壳色（RGB 通道，如 3 7 18）· 自动跟随明暗主题"],
  ["--nya-blur-scale", "毛玻璃模糊半径倍率（缺省 1，调小可降模糊省性能）"],
  ["--nya-glass-alpha", "表面不透明度（缺省 0.8，配合 blur 做玻璃质感）"],
  ["--nya-radius-sm … -3xl", "Tailwind 档圆角基础值（rounded-sm~rounded-3xl 一一对应；缺省与 Tailwind 原刻度一致）"],
  ["--nya-radius-medium / -large", "HeroUI 档圆角（rounded-medium=12px / rounded-large=14px；HeroUI 组件插槽样式也消费这两档）"],
];

const STYLE_CLASSES = [
  ["容器与面板", ".nya-panel / .nya-panel-strong / .nya-panel-inner", "通用面板容器（毛玻璃 + 描边）、强面板、面板内嵌次级内容块"],
  ["容器与面板", ".nya-border", "通用描边（颜色取 --nya-border-c）"],
  ["容器与面板", ".nya-neon-card", "主页小组件卡片壳（插件小组件也被自动装入此壳）"],
  ["容器与面板", ".nya-bg-scrim", "背景图上的压暗遮罩"],
  ["侧边栏", ".nya-sidebar / .nya-sidebar-item", "侧边栏本体 / 侧边栏按钮项（含进场动画）"],
  ["侧边栏", ".nya-sidebar-item-active / .nya-sidebar-icon", "当前选中项 / 项内图标（悬停选中弹跳动画）"],
  ["侧边栏", ".nya-sidebar-cursor", "选中项背后的滑动光标"],
  ["弹窗与过渡", ".nya-modal-backdrop / .nya-modal-surface / .nya-modal-enter", "弹窗遮罩层 / 弹窗面板本体 / 弹窗进场动画"],
  ["弹窗与过渡", ".nya-enter / .nya-stagger-1~3 / .nya-card-in / .nya-bg-fade", "通用进场动画与逐级延迟 / 卡片进场 / 背景图淡入"],
  ["其它", ".nya-scroll", "自定义滚动条区域（可覆写 ::-webkit-scrollbar）"],
  ["其它", ".nya-bar / .nya-hold-bar", "进度条 / 长按进度条"],
  ["其它", ".nya-markdown", "Markdown 渲染容器（p / h1~h6 / code / pre / table 等子选择器）"],
  ["其它", ".nya-eq-bar / .nya-vinyl / .nya-cover-glow", "音乐播放器均衡条 / 黑胶 / 封面光晕"],
  ["其它", ".nya-instance-stagger", "实例列表逐级进场（选中高亮直接画在选中按钮上，无独立类）"],
  ["其它", ".nya-drag-ghost / .nya-drop-line", "小组件拖动的幽灵条与落点指示线"],
  ["其它", ".nya-mc-obfuscated", "MC 风格乱码字符效果"],
];

function StylesSection() {
  return (
    <Section id="styles" title="🖌️ 自定义 CSS 样式">
      <p>
        插件可以注入<strong>全局 CSS</strong>，自定义启动器任意控件的样式（含宿主自身）。
        两种方式：<strong>静态文件</strong>（推荐，存盘即热生效）与{" "}
        <strong>运行时注入</strong>（需 <Code>styles</Code> 权限）。
      </p>
      <CodeBlock>{`# plugin.yaml：静态样式（推荐，存盘即热生效，无需重新加载）
styles:
  - theme.css          # 相对插件目录、限 .css`}</CodeBlock>
      <CodeBlock>{`// 运行时动态样式（capabilities 需声明 styles: true）
api.styles.inject(":root { --nya-glass-alpha: 0.9 }", "glass");
api.styles.remove("glass");

// 同 key 重复注入 = 替换；不传 key 时缺省为 "inline"
// 卸载 / 重载 / 停用时，宿主自动移除该插件的全部样式
// 注入内容受宿主约束：单条上限 256 KB、@import 语句一律移除（不许借此发外部请求）`}</CodeBlock>
      <p>
        <strong>兼容承诺</strong>：下面的「第一档 CSS 变量」与「第二档 <Code>nya-*</Code>{" "}
        语义类」都是宿主公共接口——改名/删除/语义变更会在更新日志明确标注，新增只增不改。
        除此之外的一切选择器（Tailwind 工具类、HeroUI 内部结构）都是实现细节，随时可能变化。
      </p>
    </Section>
  );
}

function StylesVars() {
  return (
    <Section id="styles-vars" title="第一档：CSS 变量（最稳，换肤首选）">
      <p>
        宿主主题由这些变量驱动，覆盖它们即可整体换色，不受类名变动影响。
        <strong>格式均为 HSL 通道值</strong>（如 <Code>212 100% 47%</Code>，不含{" "}
        <Code>hsl()</Code> 包裹），使用时写作 <Code>hsl(var(--nya-surface-1) / 0.8)</Code>。
      </p>
      <InfoTable columns={["变量", "含义"]} rows={STYLE_VARS} />
      <p><strong>示例——全局换成绿色主题 + 更实的毛玻璃：</strong></p>
      <CodeBlock>{`:root {
  --heroui-primary: 142 71% 45%;
  --heroui-primary-foreground: 0 0% 100%;
  --nya-glass-alpha: 0.92;
}`}</CodeBlock>
      <p>
        只覆盖 <Code>--heroui-primary</Code> 时，500 档阶梯与表面色
        不会自动跟随（它们由宿主按所选主题色计算写入）——想成套换色请把主色阶梯和{" "}
        <Code>nya</Code> 表面变量一起覆盖，或直接改用设置页的预设主题色。
      </p>
      <p>
        <strong>示例——全局圆角调整</strong>：全部控件的 <Code>rounded-*</Code>{" "}
        圆角都转发到 <Code>--nya-radius-*</Code> 变量，改一组变量即可全局生效：
      </p>
      <CodeBlock>{`:root {
  --nya-radius-lg: 0.375rem;   /* 只调某一档：rounded-lg 单独变小 */
}
/* 整体直角化：8 个档位一起清零（宿主内置的「直角模式」开关即此写法） */
:root {
  --nya-radius-sm: 0px;   --nya-radius-md: 0px;
  --nya-radius-lg: 0px;   --nya-radius-xl: 0px;
  --nya-radius-2xl: 0px;  --nya-radius-3xl: 0px;
  --nya-radius-medium: 0px;  --nya-radius-large: 0px;
}`}</CodeBlock>
      <p>
        注意：<strong>正圆不在这套 token 里</strong>——<Code>rounded-full</Code>{" "}
        是写死的超大半径（头像、开关旋钮、进度条等），保持正圆语义。
      </p>
    </Section>
  );
}

function StylesClasses() {
  return (
    <Section id="styles-classes" title="第二档：nya-* 语义类">
      <p>
        宿主自己命名的语义类名，定义集中在{" "}
        <Link
          href={`${GITHUB_URL}/blob/main/frontend/src/styles/globals.css`}
          target="_blank"
          rel="noopener"
          size="sm"
          showAnchorIcon
        >
          frontend/src/styles/globals.css
        </Link>
        。
      </p>
      <InfoTable columns={["分组", "类名", "对应控件"]} rows={STYLE_CLASSES} />
      <p>
        <strong>第三档：HeroUI 组件（不构成契约，后果自负）</strong>——HeroUI 组件暴露{" "}
        <Code>data-slot</Code> 属性，可以不依赖 Tailwind 类名地选中：
      </p>
      <CodeBlock>{`/* 例：所有按钮改方角 */
[data-slot="button"] { border-radius: 6px; }`}</CodeBlock>
      <p>
        这些属性来自上游库、宿主不可控，组件内部结构（嵌套 slot、伪元素）没有稳定承诺。
        适合个人微调，<strong>不要</strong>在发布给他人的插件里依赖第三档选择器。
      </p>
    </Section>
  );
}

function StylesDebug() {
  return (
    <Section id="styles-debug" title="调试方法与明确不建议做的">
      <p>
        每条插件样式以{" "}
        <Code>{`<style data-plugin-id="<插件id>" data-plugin-key="<key>">`}</Code>{" "}
        挂在 <Code>document.head</Code> 末尾——DevTools 里按 <Code>data-plugin-id</Code>{" "}
        过滤即可看到某个插件注入了什么；
      </p>
      <p>
        · 清单 <Code>styles</Code> 文件的 key 是 <Code>file:&lt;路径&gt;</Code>，
        运行时 API 缺省 key 是 <Code>inline</Code>；
      </p>
      <p>
        · 改清单声明的 CSS 文件，存盘后约 <strong>3 秒内自动热生效</strong>
        （宿主监听文件变化），无需手动「重新加载插件」。
      </p>
      <p><strong>明确不建议做的</strong>：</p>
      <p>· 覆盖 <Code>body</Code> / <Code>#app</Code> 之外的全局 reset——会波及 Wails 的 WebView 容器行为；</p>
      <p>· <Code>!important</Code> 满天飞——插件样式的 <Code>&lt;style&gt;</Code> 挂载顺序晚于宿主样式，
        同特异性下本来就是插件赢，滥用只会让用户其它插件没法再改回；</p>
      <p>· 依赖第三档选择器做主题分发——你的用户会在某次升级后回来找你。</p>
      <p>
        完整锚点清单见{" "}
        <Link href={CSS_TABLE_URL} target="_blank" rel="noopener" size="sm" showAnchorIcon>
          docs/guide/CSS_STYLE_TABLE.md
        </Link>
        。
      </p>
    </Section>
  );
}

function UiThemes() {
  return (
    <Section id="ui-themes" title="🌈 界面主题注册（registerUiTheme，需 styles 权限）">
      <p>
        插件可以注册<strong>界面主题</strong>，出现在外观设置的「界面主题」列表里
        （随选择持久化）。样式本体走清单 <Code>styles</Code> / <Code>styles.inject</Code>，
        <Code>apply</Code> 只操作 <Code>&lt;html&gt;</Code> 的 data-* 属性门控：
      </p>
      <CodeBlock>{`export default function activate(api) {
  // 样式本体走清单 styles 字段（推荐，存盘热生效）或 api.styles.inject
  api.registerUiTheme({
    id: "midnight",              // 可省略，缺省用插件 id；宿主自动加 "<插件id>:" 前缀
    name: "午夜蓝",
    apply(on) {
      document.documentElement.dataset.midnight = on ? "on" : "off";
    },
  });
}`}</CodeBlock>
      <p>
        · 主题 CSS 应当静态在场，由 <Code>html[data-&lt;主题&gt;]</Code> 属性选择器门控，
        切换零延迟、首帧无闪；关闭时宿主会逐个调 <Code>apply(false)</Code> 复位；
      </p>
      <p>
        · 插件卸载 / 重载 / 停用时宿主自动摘除其全部主题；若被摘的是用户当前选中项，
        整体回落默认主题（已选配置键保留，插件回来还能恢复）；
      </p>
      <p>
        · <Code>api.unregisterUiTheme(id)</Code> 可主动摘除；外观列表随注册/摘除实时增删；
      </p>
      <p>
        · <Code>apply</Code> 抛错被宿主隔离（记控制台警告），不会弄坏宿主与其它主题。
        主题想固定自己的主色需 <Code>!important</Code> 压过宿主内联写入的主题色阶梯。
      </p>
      <p>
        完整契约见{" "}
        <Link href={UI_THEMES_URL} target="_blank" rel="noopener" size="sm" showAnchorIcon>
          docs/guide/UI_THEMES.md
        </Link>
        。
      </p>
    </Section>
  );
}

function Publish() {
  return (
    <Section id="publish" title="📤 打包发布">
      <CodeBlock>{`# 1. 用插件模板仓库（esbuild）把 TSX/JSX 编译为单文件 ESM index.js
# 2. 用启动器内的打包工具打出 .nekoex（zip + 识别后缀，源文件会先编译再打包）
# 3. 分发喵`}</CodeBlock>
      <p>
        生产加载路径上<strong>没有编译器</strong>，分发物永远是编译后的{" "}
        <Code>index.js</Code>。源码随包分发是特性——信任模型要求用户能读到插件在做什么。
      </p>
      <p>
        <strong>版本号注意</strong>：改动 <Code>index.js</Code> 必须同时提升{" "}
        <Code>plugin.yaml</Code> 的版本号，否则宿主不会重新加载喵。
      </p>
      <p>
        <strong>明确不做的</strong>：运行时编译进生产路径、任意路径文件系统访问、
        网络代理封装、包签名、通用事件总线——等第一个真实场景来拽再议
        （跨插件通信已以 <Code>ipc</Code> 权限 + 宿主消息总线的形态落地，见「插件间通信」）。
      </p>
    </Section>
  );
}

function CheatSheet() {
  const rows = [
    ["元信息", "apiVersion / plugin{id,name,version}", "—", "只读"],
    ["建材", "react / h / Fragment / ui / icons / HomeCard", "—", "宿主注入，不得自带 React"],
    ["扩展点", "registerWidget / registerPage", "—", "id 自动加 <插件id>: 前缀"],
    ["扩展点", "registerLaunchCard({ render })", "—", "独占槽覆盖主页启动卡，最后注册者赢"],
    ["扩展点", "registerPageAction({ pageId, id, label, icon, onPress })", "—", "往宿主已有页面（instances / download）加按钮"],
    ["生命周期", "onCleanup", "—", "卸载/重载时依次调用"],
    ["反馈", "log / t / confirm", "—", "宿主统一样式"],
    ["反馈", "notify（4 级）", "notifications", "5s 内最多 3 条"],
    ["系统", "setClipboard", "clipboard", "只写不读"],
    ["系统", "openUrl", "open-url", "仅 http(s)"],
    ["系统", "openPath", "open-path", "仅插件目录内"],
    ["查询", "getInstances / getSaves / getVersionProfile / getVersionDetails / getScreenshots", "instances", "只读；getSaves 限已知游戏根目录内"],
    ["写入", "selectInstance / saveVersionProfile / setContentEnabled", "instances-write（兼容旧 instances）", "写档案与启动过 NekoPrompt；启停内容只公示"],
    ["查询", "getAccounts", "accounts", "只读摘要，凭据不出宿主；默认关闭"],
    ["查询", "getLaunchState", "—", "只读启动状态"],
    ["查询", "getDownloadTasks / getVersions / getModLoaderVersions / getDownloadSources / getJavaRuntimes", "downloads", "只读；onDownloadTasksChanged 同权限"],
    ["写入", "startDownload / startModLoaderDownload / downloadResource / installModpack", "downloads-write", "不认 downloads；每次动作过 NekoPrompt"],
    ["查询", "getMemorySnapshot / getSystemUsage / getDiskUsage", "system-status", "只读机器占用"],
    ["查询", "getCurrentTrack / getMusicTracks", "music", "只读音乐库，无播放控制；默认关闭"],
    ["导航", "navigateToPage(pageId, detail?)", "—", "切内置页或其它插件页，页面不存在抛错"],
    ["查询", "getServerStatus", "server-status", "叠加 network 联网开关；失败抛错，开关关闭返回 null"],
    ["写入", "getLauncherSettings / saveLauncherSettings", "launcher-config / -write", "全局设置，get → 改 → 写回"],
    ["启动", "launchSelected / launchVersion", "launch", "与手点同管线；首次调用过 NekoPrompt"],
    ["事件", "onLaunchPhaseChange / onInstancesChanged / onGameExit", "—", "返回取消订阅函数；onGameExit 只在终态触发"],
    ["事件", "onDownloadTasksChanged", "downloads", "订阅时不立刻回调，先 get 取初值"],
    ["事件", "onLogLine(handler, { tailLines })", "logs", "成批投递（单批≤200行）；默认关闭"],
    ["通信", "ipc.send / ipc.broadcast / ipc.onMessage / ipc.plugins", "ipc", "宿主注入发送方身份；负载≤256KB；5s 100 条频控"],
    ["设置", "config.get / set / clear", "storage", "键前缀隔离；仅字符串；卸载即删键"],
    ["样式", "styles.inject(css, key?) / styles.remove(key)", "styles", "全局 CSS；单条≤256KB、@import 移除；同 key 重复注入为替换"],
    ["样式", "registerUiTheme({ id?, name, apply }) / unregisterUiTheme(id)", "styles", "注册界面主题到外观设置；卸载自动摘除并回落默认"],
  ];
  return (
    <Section id="cheatsheet" title="📖 运行时 API 速查表（v1 全表）">
      <InfoTable columns={["组", "成员", "权限", "说明"]} rows={rows} />
      <p>
        各 API 组配套的行为约定（下载任务 / IPC / 日志 / 卡片壳等）见{" "}
        <Link href={CONVENTIONS_URL} target="_blank" rel="noopener" size="sm" showAnchorIcon>
          docs/guide/CONVENTIONS.md
        </Link>
        ，把文档喂给 AIGC 生成插件也是官方推荐用法喵。
      </p>
    </Section>
  );
}

/* ===== 页面 ===== */

export default function DocsPage() {
  const active = useActiveSection(NAV_SECTIONS.map((s) => s.id));
  return (
    <div className="min-h-screen bg-background/30 text-foreground">
      <BackToTop />
      <Navbar isBordered maxWidth="full" className="bg-background/70">
        <NavbarBrand>
          <a href="/" className="font-bold text-xl">
            Neko<span className="text-gradient-primary">Launcher</span>
          </a>
          <Chip size="sm" variant="flat" color="secondary" className="ml-3">
            文档
          </Chip>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} href="/" variant="flat" size="sm">
              ← 返回首页
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="https://afdian.com/a/redstore-noob"
              target="_blank"
              rel="noopener"
              variant="flat"
              color="danger"
            >
              ❤ 赞助
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              variant="flat"
              color="primary"
            >
              GitHub
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 flex gap-8 items-start">
        {/* ===== 左侧导航 ===== */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-sm px-3 py-1.5 rounded-medium transition-colors ${
                  active === s.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-foreground-500 hover:text-primary hover:bg-content2"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
          <Divider className="my-4" />
          <Link href={GUIDE_URL} target="_blank" rel="noopener" size="sm" className="px-3">
            完整规范（v1）↗
          </Link>
        </aside>

        {/* ===== 右侧内容 ===== */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">插件开发教程</h1>
            <Chip size="sm" variant="flat" color="secondary">v1 API</Chip>
          </div>
          <p className="text-foreground-500 mb-10">
            基于 WebView 的前端扩展生态。本文依据官方{" "}
            <Link href={GUIDE_URL} target="_blank" rel="noopener" size="sm">
              docs/guide/
            </Link>{" "}
            下的 v1 API 规范（信任模型 / 快速上手 / 权限表 /{" "}
            <Link href={API_REF_URL} target="_blank" rel="noopener" size="sm">API 全表</Link> /{" "}
            <Link href={CONVENTIONS_URL} target="_blank" rel="noopener" size="sm">使用约定</Link>）
            整理，配齐各类 API 的使用示例，并含 CSS 定制与界面主题注册指南喵。
          </p>

          <QuickStart />
          <Manifest />
          <Permissions />
          <PermissionsGates />
          <Widgets />
          <LaunchCard />
          <PageAction />
          <Storage />
          <Launch />
          <Instances />
          <Downloads />
          <Accounts />
          <SystemStatus />
          <Music />
          <Feedback />
          <System />
          <ServerStatus />
          <LauncherConfig />
          <Ipc />
          <Logs />
          <Navigate />
          <Lifecycle />
          <UiConventions />
          <StylesSection />
          <StylesVars />
          <StylesClasses />
          <StylesDebug />
          <UiThemes />
          <Publish />
          <CheatSheet />

          <Card className="mt-4">
            <CardHeader className="font-semibold">📚 官方示例</CardHeader>
            <CardBody className="text-sm text-foreground-500">
              <Link href={EXAMPLE_URL} target="_blank" rel="noopener" showAnchorIcon size="sm">
                examples/server-status
              </Link>{" "}
              —— 服务器状态小组件，完整演示 settings 种子、权限声明（含默认关闭的{" "}
              <Code>network</Code>）、轮询 + <Code>onCleanup</Code>、
              <Code>getServerStatus</Code> 的判空处理、
              一键复制地址与快速进服，拷进插件目录点「重新加载」即可试用。
            </CardBody>
          </Card>
        </main>
      </div>

      <footer className="border-t border-divider">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-lg">
            Neko<span className="text-gradient-primary">Launcher</span>
          </span>
          <span className="text-sm text-foreground-500">用 ❤️ 与 🐱 构建</span>
        </div>
      </footer>
    </div>
  );
}
