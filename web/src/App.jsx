import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Select,
  SelectItem,
  Snippet,
} from "@heroui/react";

const GITHUB_URL = "https://github.com/redstore-noob/NekoLauncher";
const RELEASES_URL = "https://github.com/redstore-noob/NekoLauncher/releases/latest";
const QQ_GROUP = "1108330006";

const NAV_LINKS = [
  { label: "文档", href: "docs/" },
  { label: "特性", href: "#features" },
  { label: "下载", href: "#download" },
  { label: "社区", href: "#community" },
];

function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar isBordered maxWidth="xl" className="bg-background/70" onMenuOpenChange={setMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={menuOpen ? "关闭菜单" : "打开菜单"} className="sm:hidden" />
        <NavbarBrand>
          <a href="#home" className="font-bold text-xl">
            Neko<span className="text-primary">Launcher</span>
          </a>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        {NAV_LINKS.map((item) => (
          <NavbarItem key={item.href} className="hidden sm:block">
            <Link href={item.href} color="foreground" size="md">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden sm:flex">
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
      <NavbarMenu>
        {NAV_LINKS.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} color="foreground" size="lg" onPress={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            href="https://afdian.com/a/redstore-noob"
            target="_blank"
            rel="noopener"
            color="danger"
            size="lg"
            onPress={() => setMenuOpen(false)}
          >
            ❤ 赞助
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

const FEATURES = [
  {
    icon: "🔌",
    title: "基于 React 的插件系统",
    desc: "编写更简单，同时限制插件部分权力，保障数据安全。热重载 + 完善的插件 API，开发者上手成本极低。",
  },
  {
    icon: "📦",
    title: "NekoSolo 打包格式",
    desc: "独创三合一安装包：启动器本体 + 整合包 + Java Runtime 一键安装，解决整合包制作者科普难与发行难。",
  },
  {
    icon: "🤖",
    title: "AI Agent 融合",
    desc: "修改配置等操作交给 AI Agent，更加便携省心。",
  },
  {
    icon: "🎨",
    title: "现代化 UI",
    desc: "支持 Wallpaper Engine / 必应每日一图 / 跟随系统桌面作为背景，毛玻璃 + 圆角设计，基于 HeroUI。",
  },
  {
    icon: "⏪",
    title: "Rewind 备份系统",
    desc: "参考 Git 设计的文件级备份，支持 Minecraft 存档与实例备份，随时回滚。",
  },
  {
    icon: "🛠️",
    title: "创作中心",
    desc: "一条龙创作：从 NekoLauncher 插件制作，到 Minecraft 整合包生成，再到资源包制作。",
  },
];

const TECH_BADGES = [
  { main: "Go", sub: "后端" },
  { main: "Wails", sub: "桌面框架" },
  { main: "React", sub: "前端" },
  { main: "HeroUI", sub: "组件库" },
  { main: "TypeScript", sub: "语言" },
  { main: "Apache 2.0", sub: "许可证" },
  { main: "Win / Linux / macOS", sub: "平台" },
];

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-semibold">特性</h2>
        <Chip size="sm" variant="flat" color="secondary">同步自 README</Chip>
      </div>
      <p className="text-foreground-500 mb-8">
        一个现代、跨平台的可拓展 Minecraft 启动器，不再重复造轮子。
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} isHoverable className="border border-divider">
            <CardBody className="gap-2">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-foreground-500">{f.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-12 mb-4">技术栈</h3>
      <div className="flex flex-wrap gap-3">
        {TECH_BADGES.map((b) => (
          <div
            key={b.main}
            className="flex items-baseline gap-2 rounded-medium border border-divider bg-content2/60 px-3 py-1.5"
          >
            <span className="text-sm font-medium">{b.main}</span>
            <span className="text-xs text-foreground-400">{b.sub}</span>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-12 mb-4">🚧 即将到来</h3>
      <Card>
        <CardBody className="text-sm text-foreground-500 gap-2">
          <p>· <strong>CurseForge 资源</strong> —— 后端功能已完毕，API KEY 相关内容正在商讨中，尽快上线</p>
          <p>· <strong>插件在线商店</strong> —— 规划中，敬请期待喵</p>
        </CardBody>
      </Card>
    </section>
  );
}

const OS_LABELS = { windows: "Windows", macos: "macOS", linux: "Linux" };

// 各平台的推荐安装包后缀（下拉框默认项 / 快速下载的自动匹配）
const RECOMMENDED = /\.(exe|msi|dmg|pkg|appimage)$/i;
// NekoSolo 独立安装器：只是装启动器的安装器，不能单独当启动器用
const isInstallerOnly = (name) => /installer/i.test(name);
const recommendedFirst = (a, b) =>
  ((RECOMMENDED.test(b.name) && !isInstallerOnly(b.name) ? 1 : 0) -
  (RECOMMENDED.test(a.name) && !isInstallerOnly(a.name) ? 1 : 0));

function detectOS() {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return "unknown";
  if (/Windows/i.test(ua)) return "windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macos";
  if (/Linux/i.test(ua)) return "linux";
  return "unknown";
}

// 把 release 资产归到对应平台：先认文件名里的平台关键词，再认后缀兜底
function classifyAsset(assetName) {
  const n = assetName.toLowerCase();
  if (/darwin|macos|mac[-_.]/.test(n)) return "macos";
  if (/linux|ubuntu|debian/.test(n)) return "linux";
  if (/windows|win32|win64|win[-_.]/.test(n)) return "windows";
  if (/\.(exe|msi)$/.test(n)) return "windows";
  if (/\.(dmg|pkg)$/.test(n)) return "macos";
  if (/\.(appimage|deb|rpm)$/.test(n)) return "linux";
  return null; // 识别不了的包不进下拉框
}

const matchAsset = classifyAsset;

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function useLatestRelease() {
  const [release, setRelease] = useState(null); // { tag, assets: [{name, url}] }
  const [os] = useState(detectOS);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/repos/redstore-noob/NekoLauncher/releases/latest")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        setRelease({
          tag: data.tag_name,
          page: data.html_url,
          assets: (data.assets ?? []).map((a) => ({
            name: a.name,
            size: a.size,
            url: a.browser_download_url,
          })),
        });
      })
      .catch(() => {}); // 无 release / 限流 / 断网：静默回退到 releases 页
    return () => {
      cancelled = true;
    };
  }, []);

  const mainAsset = release
    ? release.assets.find((a) => matchAsset(a.name, os))
    : null;
  return { release, os, mainAsset };
}

function DownloadSection() {
  const { release, os, mainAsset } = useLatestRelease();

  // 三个平台各自的资产分组
  const groups = ["windows", "macos", "linux"].map((platform) => ({
    platform,
    label: OS_LABELS[platform],
    assets: release
      ? release.assets.filter((a) => matchAsset(a.name) === platform).sort(recommendedFirst)
      : [],
  }));

  // 各平台下拉框的当前选中项：默认自动匹配当前平台的最佳资产
  const [selected, setSelected] = useState({});
  const selectedAsset = (platform) => {
    const group = groups.find((g) => g.platform === platform);
    if (!group || group.assets.length === 0) return null;
    const name = selected[platform];
    return group.assets.find((a) => a.name === name) ?? group.assets[0];
  };
  const quickAsset = selectedAsset(os) ?? mainAsset;

  const pick = (platform, item) =>
    setSelected((s) => ({ ...s, [platform]: item?.toString?.() ?? item }));

  return (
    <section id="download" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold mb-6">下载 NekoLauncher</h2>
      <Card>
        <CardBody className="flex flex-col items-center gap-5 py-12">
          <p className="text-foreground-500">
            {release
              ? `最新版本 ${release.tag} · 已自动识别你的平台${OS_LABELS[os] ? `（${OS_LABELS[os]}）` : ""}`
              : "前往 GitHub Releases 获取全部版本 · 校验与历史存档"}
          </p>

          {/* 当前平台快速下载 */}
          <div className="flex flex-col items-center gap-2">
            <Button
              as={Link}
              href={quickAsset ? quickAsset.url : RELEASES_URL}
              target="_blank"
              rel="noopener"
              color="primary"
              size="lg"
            >
              {quickAsset && OS_LABELS[os]
                ? `为 ${OS_LABELS[os]} 下载 ${release.tag}`
                : "下载最新版"}
            </Button>
            {quickAsset && (
              <span className="text-xs text-foreground-400">
                {quickAsset.name} · {formatSize(quickAsset.size)} · SHA-256 见 Release 说明
                {isInstallerOnly(quickAsset.name) && (
                  <span className="text-warning-500"> · 仅为启动器安装器，不能单独运行喵</span>
                )}
              </span>
            )}
          </div>

          {/* 三个平台的资产下拉框 */}
          {release && (
            <div className="grid gap-4 w-full max-w-3xl md:grid-cols-3 mt-2">
              {groups.map((g) => (
                <Select
                  key={g.platform}
                  label={g.label}
                  labelPlacement="outside"
                  size="sm"
                  variant="bordered"
                  classNames={{ trigger: "min-h-10" }}
                  selectedKeys={selectedAsset(g.platform) ? [selectedAsset(g.platform).name] : []}
                  items={g.assets}
                  isDisabled={g.assets.length === 0}
                  onChange={(e) => {
                    if (e.target.value) pick(g.platform, e.target.value);
                  }}
                >
                  {(asset) => (
                    <SelectItem key={asset.name} textValue={asset.name}>
                      {asset.name}
                      {isInstallerOnly(asset.name) && (
                        <span className="text-warning-500"> · 仅安装器</span>
                      )}
                      <span className="text-foreground-400"> · {formatSize(asset.size)}</span>
                    </SelectItem>
                  )}
                </Select>
              ))}
            </div>
          )}

          <Button
            as={Link}
            href={`${GITHUB_URL}/releases`}
            target="_blank"
            rel="noopener"
            variant="flat"
            size="sm"
          >
            全部版本 →
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}

function DocsLinkSection() {
  return (
    <section id="docs" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold mb-6">文档</h2>
      <Card
        as="a"
        href="docs/"
        isPressable
        isHoverable
        className="max-w-xl"
      >
        <CardHeader className="font-semibold">📚 插件开发教程（v1 API）</CardHeader>
        <CardBody className="text-sm text-foreground-500">
          .nekoex 扩展生态：目录格式、plugin.yaml 清单、activate 入口、权限系统与发布流程，
          八步写出你的第一个插件喵 →
        </CardBody>
      </Card>
    </section>
  );
}

function CommunitySection() {
  return (
    <section id="community" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold mb-6">社区</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card as="a" href={GITHUB_URL} target="_blank" rel="noopener" isPressable isHoverable>
          <CardHeader className="font-semibold">🐙 GitHub 仓库</CardHeader>
          <CardBody className="text-sm text-foreground-500">
            源码 · Issues · 贡献指南 · 插件市场
            <span className="text-xs text-foreground-400 mt-2">github.com/redstore-noob/NekoLauncher</span>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="font-semibold">💬 QQ 交流群</CardHeader>
          <CardBody className="text-sm text-foreground-500 flex flex-col items-start gap-3">
            <span>实时答疑 · 版本速递 · 一起摸鱼</span>
            <Snippet
              symbol=""
              color="primary"
              variant="flat"
              classNames={{ content: "font-mono" }}
            >
              {QQ_GROUP}
            </Snippet>
            <span className="text-xs text-foreground-400">点击群号即可一键复制喵</span>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background/30 text-foreground">
      <SiteNavbar />

      <main id="home">
        {/* ===== 英雄区 ===== */}
        <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <div className="mb-6 flex justify-center">
            <Chip color="primary" variant="flat" size="lg">
              项目已迁移
            </Chip>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Neko<span className="text-primary">Launcher</span>
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto mb-4">
            原 NyaLauncher 已迁移并更名为 NekoLauncher，全新的站点正在重写中。
          </p>
          <p className="text-foreground-400 mb-10">更多内容将逐步补充喵 ~</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              color="primary"
              size="lg"
            >
              前往新仓库
            </Button>
            <Button as={Link} href="docs/" variant="flat" size="lg">
              插件教程 →
            </Button>
          </div>
        </section>

        {/* ===== 迁移公告 ===== */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-6">迁移公告</h2>
          <Card>
            <CardBody className="gap-3">
              <p>
                本项目已由 <s className="text-foreground-400">NyaLauncher</s> 迁移至{" "}
                <Link href={GITHUB_URL} target="_blank" rel="noopener" showAnchorIcon>
                  redstore-noob/NekoLauncher
                </Link>
                ，旧仓库不再维护。
              </p>
              <p className="text-foreground-500">
                网站已使用 React + HeroUI 全新重写，更多内容将在后续逐步补充。
              </p>
            </CardBody>
          </Card>
        </section>

        <DocsLinkSection />
        <DownloadSection />
        <CommunitySection />
        <FeaturesSection />
      </main>

      <footer className="border-t border-divider">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold">
            Neko<span className="text-primary">Launcher</span>
          </span>
          <span className="text-sm text-foreground-500">
            用 ❤️ 与 🐱 构建 · 内容待补充
          </span>
        </div>
      </footer>
    </div>
  );
}
