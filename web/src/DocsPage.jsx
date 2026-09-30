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
const GUIDE_URL = `${GITHUB_URL}/blob/main/docs/Extensions_Guide.md`;
const CSS_TABLE_URL = `${GITHUB_URL}/blob/main/docs/CSS_STYLE_TABLE.md`;
const EXAMPLE_URL = `${GITHUB_URL}/tree/main/examples/server-status`;

/* ===== 左侧导航数据 ===== */
const NAV_SECTIONS = [
  { id: "quick-start", label: "🚀 快速开始" },
  { id: "manifest", label: "📋 plugin.yaml 清单" },
  { id: "permissions", label: "🔐 权限系统" },
  { id: "widgets", label: "🧩 小组件与页面" },
  { id: "storage", label: "💾 存储 config.*" },
  { id: "launch", label: "🎮 启动游戏" },
  { id: "instances", label: "📦 实例与存档" },
  { id: "accounts", label: "👤 账号" },
  { id: "feedback", label: "🔔 通知与反馈" },
  { id: "system", label: "🛠️ 系统能力" },
  { id: "server-status", label: "🌐 服务器状态" },
  { id: "launcher-config", label: "⚙️ 启动器设置" },
  { id: "lifecycle", label: "♻️ 生命周期" },
  { id: "ui", label: "🎨 UI 约定" },
  { id: "styles", label: "🖌️ 自定义 CSS 样式" },
  { id: "styles-vars", label: "　└ 第一档：CSS 变量" },
  { id: "styles-classes", label: "　└ 第二档：nya-* 类" },
  { id: "styles-debug", label: "　└ 调试与禁忌" },
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

/* ===== 内容区 ===== */

function QuickStart() {
  return (
    <Section id="quick-start" title="🚀 快速开始">
      <p>
        插件是<strong>与启动器同权限的受信前端代码</strong>，运行在启动器 WebView 里，
        支持手写 JS（<Code>h()</Code>）或 TSX / JSX。权限系统是声明制契约而不是安全沙箱——
        安装插件 = 把代码交给它，因此源码随包分发、人人可审计。
      </p>
      <p>一个完整可用的插件目录（目录名必须等于清单 <Code>id</Code>，宿主强校验）：</p>
      <CodeBlock>{`<插件id>/
├── plugin.yaml   ← 唯一声明文件
├── icon.png      ← 图标（固定名，可选，≤ 256KB）
├── index.js      ← 编译产物 = 默认入口
├── theme.css     ← 清单 styles 声明的样式文件（可选，存盘即热生效）
└── src/…         ← 源码（随包分发）`}</CodeBlock>
      <p>
        <strong>dev 模式零工具链</strong>：在 <Code>plugin.yaml</Code> 加{" "}
        <Code>dev: true</Code>，入口直接写 <Code>index.jsx</Code> 源码，宿主会用
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
        <Code>styles</Code> 是新增的样式声明：列出的 <Code>.css</Code> 文件会被注入为全局 CSS，
        可自定义任意控件（含宿主自身）的样式，详见「自定义 CSS 样式」。
      </p>
    </Section>
  );
}

function Permissions() {
  const rows = [
    ["storage", "config.get / set / clear"],
    ["launch", "launchSelected / launchVersion"],
    ["instances", "getInstances / getSaves / selectInstance / getVersionProfile / saveVersionProfile / getVersionDetails / getScreenshots"],
    ["accounts", "getAccounts"],
    ["launcher-config", "getLauncherSettings / saveLauncherSettings"],
    ["notifications", "notify.*"],
    ["clipboard", "setClipboard"],
    ["open-url", "openUrl"],
    ["open-path", "openPath（叠加“仅插件目录内”的宿主侧限制）"],
    ["server-status", "getServerStatus"],
    ["styles", "styles.inject / styles.remove（全局 CSS 注入，可自定义任意控件样式）"],
  ];
  return (
    <Section id="permissions" title="🔐 权限系统（声明制，未声明 = 报错）">
      <p>
        受权限控制的 API <strong>始终存在</strong>，但调用时校验清单的{" "}
        <Code>capabilities</Code>：<strong>未声明对应权限直接抛错</strong>
        （错误信息会指明缺哪个权限、如何声明），绝不静默失败。
      </p>
      <Table aria-label="权限表" removeWrapper>
        <TableHeader>
          <TableColumn>权限键</TableColumn>
          <TableColumn>解锁的 API</TableColumn>
        </TableHeader>
        <TableBody>
          {rows.map(([k, v]) => (
            <TableRow key={k}>
              <TableCell><Code className="text-xs">{k}</Code></TableCell>
              <TableCell className="text-xs">{v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p>
        无需权限（永远可用）：<InlineCodeList items={["apiVersion", "plugin{id,name,version}", "react / h / Fragment / ui / icons / HomeCard", "registerWidget / registerPage", "onCleanup", "log / t / confirm", "getLaunchState", "onLaunchPhaseChange", "onInstancesChanged"]} />
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

function Storage() {
  return (
    <Section id="storage" title="💾 存储（config.*，需 storage 权限）">
      <p>
        键前缀隔离（不会与其他插件冲突）、仅字符串值；
        默认值来自清单 <Code>settings</Code>（仅当键为空时写入，用户改过不覆盖）。
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
});`}</CodeBlock>
      <p>
        插件<strong>不能</strong>改写启动命令行，也没有注入 JVM 参数的后门；
        想调整启动行为请引导用户修改实例启动档案（见「实例与存档」）。
      </p>
    </Section>
  );
}

function Instances() {
  return (
    <Section id="instances" title="📦 实例与存档（需 instances 权限）">
      <CodeBlock>{`// 查询
const instances = await api.getInstances();      // 实例列表
const saves = await api.getSaves();              // 存档列表
const details = await api.getVersionDetails(v);  // 含加载器信息与全部内容列表
const shots = await api.getScreenshots(v);       // 截图

// 切换全局选中实例
await api.selectInstance(instances[0]);

// 读取 → 原样修改 → 写回（实例启动档案）
const profile = await api.getVersionProfile(v);
profile.javaArgs = "-Xmx4G";                     // 基于返回值修改
await api.saveVersionProfile(v, profile);`}</CodeBlock>
      <p>
        另有事件 <Code>api.onInstancesChanged(cb)</Code>（无需权限），
        实例增删/切换时回调，返回取消订阅函数。
      </p>
    </Section>
  );
}

function Accounts() {
  return (
    <Section id="accounts" title="👤 账号（需 accounts 权限）">
      <CodeBlock>{`const accounts = await api.getAccounts();
// 只读摘要（含头像），凭据不出宿主
for (const a of accounts) {
  api.log(a.name, a.key, a.avatarUrl);
}`}</CodeBlock>
      <p>
        <strong>只读</strong>：插件无法添加/删除账号，也永远拿不到令牌等凭据；
        做账号快切这类小组件时配合 <Code>launchSelected</Code> 或界面选择即可。
      </p>
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
  api.log("在线人数：", status.players?.online);
} catch (e) {
  // 连接失败抛错，由插件接住展示
  api.notify.error("查询失败喵");
}`}</CodeBlock>
    </Section>
  );
}

function LauncherConfig() {
  return (
    <Section id="launcher-config" title="⚙️ 启动器设置（需 launcher-config 权限）">
      <CodeBlock>{`// 读取 → 原样修改 → 写回（全局启动设置，影响所有用户操作，谨慎修改）
const settings = await api.getLauncherSettings();
settings.memory.min = "2G";
await api.saveLauncherSettings(settings);`}</CodeBlock>
      <p>
        这是<strong>全局设置</strong>：写入即对所有用户操作生效，
        务必基于 <Code>get</Code> 的返回值原样修改后写回，不要凭空构造对象。
      </p>
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

/* ===== 自定义样式（新增） ===== */

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
  ["其它", ".nya-instance-pill / .nya-instance-stagger", "实例列表胶囊项与逐级进场"],
  ["其它", ".nya-drag-ghost / .nya-drop-line", "小组件拖动的幽灵条与落点指示线"],
  ["其它", ".nya-mc-obfuscated", "MC 风格乱码字符效果"],
];

function StylesSection() {
  return (
    <Section id="styles" title="🖌️ 自定义 CSS 样式（新增）">
      <p>
        插件现在可以注入<strong>全局 CSS</strong>，自定义启动器任意控件的样式（含宿主自身）。
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
// 卸载 / 重载 / 停用时，宿主自动移除该插件的全部样式`}</CodeBlock>
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
      <Table aria-label="CSS 变量表" removeWrapper>
        <TableHeader>
          <TableColumn>变量</TableColumn>
          <TableColumn>含义</TableColumn>
        </TableHeader>
        <TableBody>
          {STYLE_VARS.map(([v, d]) => (
            <TableRow key={v}>
              <TableCell><Code className="text-xs whitespace-nowrap">{v}</Code></TableCell>
              <TableCell className="text-xs">{d}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p><strong>示例——全局换成绿色主题 + 更实的毛玻璃：</strong></p>
      <CodeBlock>{`:root {
  --heroui-primary: 142 71% 45%;
  --heroui-primary-foreground: 0 0% 100%;
  --nya-glass-alpha: 0.92;
}`}</CodeBlock>
      <p>
        <strong>注意</strong>：只覆盖 <Code>--heroui-primary</Code> 时，500 档阶梯与表面色
        不会自动跟随（它们由宿主按所选主题色计算写入）——想成套换色请把主色阶梯和{" "}
        <Code>nya</Code> 表面变量一起覆盖，或直接改用设置页的预设主题色。
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
      <Table aria-label="语义类表" removeWrapper>
        <TableHeader>
          <TableColumn>分组</TableColumn>
          <TableColumn>类名</TableColumn>
          <TableColumn>对应控件</TableColumn>
        </TableHeader>
        <TableBody>
          {STYLE_CLASSES.map(([g, c, d], i) => (
            <TableRow key={i}>
              <TableCell className="text-xs whitespace-nowrap">{g}</TableCell>
              <TableCell><Code className="text-xs">{c}</Code></TableCell>
              <TableCell className="text-xs">{d}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
          docs/CSS_STYLE_TABLE.md
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
# 2. 用启动器内的打包工具打出 .nekoex（zip + 识别后缀）
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
        <strong>明确不做的</strong>：运行时编译进生产路径、跨插件通信、任意路径文件系统访问、
        网络代理封装、包签名、通用事件总线——等第一个真实场景来拽再议。
      </p>
    </Section>
  );
}

function CheatSheet() {
  const rows = [
    ["元信息", "apiVersion / plugin{id,name,version}", "—", "只读"],
    ["建材", "react / h / Fragment / ui / icons / HomeCard", "—", "宿主注入"],
    ["扩展点", "registerWidget / registerPage", "—", "id 自动加 <插件id>: 前缀"],
    ["生命周期", "onCleanup", "—", "卸载/重载时依次调用"],
    ["反馈", "log / t / confirm", "—", "宿主统一样式"],
    ["反馈", "notify（4 级）", "notifications", "5s 内最多 3 条"],
    ["系统", "setClipboard", "clipboard", "只写不读"],
    ["系统", "openUrl", "open-url", "仅 http(s)"],
    ["系统", "openPath", "open-path", "仅插件目录内"],
    ["查询", "getInstances / getSaves / getVersionDetails / getScreenshots", "instances", "只读"],
    ["写入", "selectInstance / getVersionProfile / saveVersionProfile", "instances", "get → 改 → 写回"],
    ["查询", "getAccounts", "accounts", "只读摘要，凭据不出宿主"],
    ["查询", "getLaunchState", "—", "只读启动状态"],
    ["查询", "getServerStatus", "server-status", "失败抛错由插件接住"],
    ["写入", "getLauncherSettings / saveLauncherSettings", "launcher-config", "全局设置，get → 改 → 写回"],
    ["启动", "launchSelected / launchVersion", "launch", "与手点同管线"],
    ["事件", "onLaunchPhaseChange / onInstancesChanged", "—", "返回取消订阅函数"],
    ["设置", "config.get / set / clear", "storage", "键前缀隔离；仅字符串"],
    ["样式", "styles.inject(css, key?) / styles.remove(key)", "styles", "注入全局 CSS（可改任意控件）；同 key 重复注入为替换；卸载/重载/停用时宿主自动移除；静态文件用清单 styles 字段"],
  ];
  return (
    <Section id="cheatsheet" title="📖 运行时 API 速查表（v1 全表）">
      <Table aria-label="API 速查表" removeWrapper>
        <TableHeader>
          <TableColumn>组</TableColumn>
          <TableColumn>成员</TableColumn>
          <TableColumn>权限</TableColumn>
          <TableColumn>说明</TableColumn>
        </TableHeader>
        <TableBody>
          {rows.map(([g, m, p, d], i) => (
            <TableRow key={i}>
              <TableCell className="text-xs whitespace-nowrap">{g}</TableCell>
              <TableCell><Code className="text-xs">{m}</Code></TableCell>
              <TableCell className="text-xs">{p}</TableCell>
              <TableCell className="text-xs">{d}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}

/* ===== 页面 ===== */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background/30 text-foreground">
      <Navbar isBordered maxWidth="full" className="bg-background/70">
        <NavbarBrand>
          <a href="/" className="font-bold text-xl">
            Neko<span className="text-primary">Launcher</span>
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
                className="text-sm text-foreground-500 hover:text-primary px-3 py-1.5 rounded-medium hover:bg-content2 transition-colors"
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
            <h1 className="text-3xl font-bold">插件开发教程</h1>
            <Chip size="sm" variant="flat" color="secondary">v1 API</Chip>
          </div>
          <p className="text-foreground-500 mb-10">
            基于 WebView 的前端扩展生态。本文依据官方{" "}
            <Link href={GUIDE_URL} target="_blank" rel="noopener" size="sm">
              Extensions_Guide.md
            </Link>{" "}
            v1 API 整理，配齐各类 API 的使用示例，并含新增的<span className="text-foreground">自定义 CSS 样式定制</span>指南喵。
          </p>

          <QuickStart />
          <Manifest />
          <Permissions />
          <Widgets />
          <Storage />
          <Launch />
          <Instances />
          <Accounts />
          <Feedback />
          <System />
          <ServerStatus />
          <LauncherConfig />
          <Lifecycle />
          <UiConventions />
          <StylesSection />
          <StylesVars />
          <StylesClasses />
          <StylesDebug />
          <Publish />
          <CheatSheet />

          <Card className="mt-4">
            <CardHeader className="font-semibold">📚 官方示例</CardHeader>
            <CardBody className="text-sm text-foreground-500">
              <Link href={EXAMPLE_URL} target="_blank" rel="noopener" showAnchorIcon size="sm">
                examples/server-status
              </Link>{" "}
              —— 服务器状态小组件，完整演示 settings 种子、权限声明、轮询 +{" "}
              <Code>onCleanup</Code>、<Code>getServerStatus</Code>、
              一键复制地址与快速进服，拷进插件目录点「重新加载」即可试用。
            </CardBody>
          </Card>
        </main>
      </div>

      <footer className="border-t border-divider">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold">
            Neko<span className="text-primary">Launcher</span>
          </span>
          <span className="text-sm text-foreground-500">用 ❤️ 与 🐱 构建</span>
        </div>
      </footer>
    </div>
  );
}
