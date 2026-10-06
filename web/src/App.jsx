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
const AFDIAN_URL = "https://afdian.com/a/redstore-noob";
const QQ_GROUP = "1108330006";

const NAV_LINKS = [
  { label: "特性", href: "#features" },
  { label: "下载", href: "#download" },
  { label: "文档", href: "docs/" },
  { label: "社区", href: "#community" },
];

function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar isBordered maxWidth="xl" className="bg-background/60 backdrop-blur-xl" onMenuOpenChange={setMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={menuOpen ? "关闭菜单" : "打开菜单"} className="sm:hidden" />
        <NavbarBrand>
          <a href="#home" className="font-bold text-xl">
            Neko<span className="text-gradient-primary">Launcher</span>
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
          <Button as={Link} href={AFDIAN_URL} target="_blank" rel="noopener" variant="flat" color="danger" size="sm">
            ❤ 赞助
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href={GITHUB_URL} target="_blank" rel="noopener" variant="flat" color="primary" size="sm">
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
          <Link href={AFDIAN_URL} target="_blank" rel="noopener" color="danger" size="lg" onPress={() => setMenuOpen(false)}>
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

/* ===== 通用分区标题 ===== */
function SectionHeader({ kicker, title, desc }) {
  return (
    <div className="mb-8">
      <p className="section-kicker mb-1.5">{kicker}</p>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      {desc && <p className="text-foreground-500 mt-2 max-w-2xl">{desc}</p>}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
      <SectionHeader
        kicker="Features"
        title="特性"
        desc="一个现代、跨平台的可拓展 Minecraft 启动器，不再重复造轮子。"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} isHoverable className="card-lift border border-divider bg-content1/70 backdrop-blur-md">
            <CardBody className="gap-3">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-foreground-500 leading-relaxed">{f.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-14 mb-4">技术栈</h3>
      <div className="flex flex-wrap gap-3">
        {TECH_BADGES.map((b) => (
          <div
            key={b.main}
            className="flex items-baseline gap-2 rounded-medium border border-divider bg-content2/60 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="text-sm font-medium">{b.main}</span>
            <span className="text-xs text-foreground-400">{b.sub}</span>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-14 mb-4">🚧 即将到来</h3>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { t: "CurseForge 资源", d: "后端功能已完毕，API KEY 相关内容正在商讨中，尽快上线" },
          { t: "插件在线商店", d: "规划中，敬请期待喵" },
        ].map((it) => (
          <Card key={it.t} className="border border-dashed border-divider bg-content1/50">
            <CardBody className="gap-1.5">
              <p className="font-medium text-sm">{it.t}</p>
              <p className="text-sm text-foreground-500">{it.d}</p>
            </CardBody>
          </Card>
        ))}
      </div>
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
    <section id="download" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
      <SectionHeader kicker="Download" title="下载 NekoLauncher" />
      <Card className="border border-divider bg-content1/70 backdrop-blur-md overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
        <CardBody className="flex flex-col items-center gap-6 py-12">
          {release && (
            <Chip color="primary" variant="flat" size="sm">
              最新版本 {release.tag}
            </Chip>
          )}
          <p className="text-foreground-500">
            {release
              ? `已自动识别你的平台${OS_LABELS[os] ? `（${OS_LABELS[os]}）` : "，请在下方选择安装包"}`
              : "前往 GitHub Releases 获取全部版本 · 校验与历史存档"}
          </p>

          {/* 当前平台快速下载 */}
          <div className="flex flex-col items-center gap-2.5">
            <Button
              as={Link}
              href={quickAsset ? quickAsset.url : RELEASES_URL}
              target="_blank"
              rel="noopener"
              color="primary"
              size="lg"
              className="px-10 font-semibold shadow-lg shadow-primary/25"
            >
              {quickAsset && OS_LABELS[os]
                ? `为 ${OS_LABELS[os]} 下载 ${release.tag}`
                : "下载最新版"} ↓
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
            variant="light"
            size="sm"
            className="text-foreground-500"
          >
            查看全部版本与历史存档 →
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}

function DocsLinkSection() {
  return (
    <section id="docs" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
      <SectionHeader
        kicker="Docs"
        title="文档"
        desc="想给 NekoLauncher 写插件的开发者从这里开始喵。"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Card
          as="a"
          href="docs/"
          isPressable
          isHoverable
          className="card-lift border border-divider bg-content1/70 backdrop-blur-md"
        >
          <CardHeader className="font-semibold gap-2">
            <span className="feature-icon !w-9 !h-9 !text-lg">📚</span>
            插件开发教程（v1 API）
          </CardHeader>
          <CardBody className="text-sm text-foreground-500 pt-0">
            .nekoex 扩展生态：目录格式、plugin.yaml 清单、权限系统、下载 / IPC / 主题注册等
            全量 API 与发布流程，配齐示例代码 →
          </CardBody>
        </Card>
        <Card
          as="a"
          href={`${GITHUB_URL}/blob/main/docs/guide/Extensions_Guide.md`}
          target="_blank"
          rel="noopener"
          isPressable
          isHoverable
          className="card-lift border border-divider bg-content1/70 backdrop-blur-md"
        >
          <CardHeader className="font-semibold gap-2">
            <span className="feature-icon !w-9 !h-9 !text-lg">📖</span>
            官方规范原文
          </CardHeader>
          <CardBody className="text-sm text-foreground-500 pt-0">
            信任模型、快速上手、权限表、API 全表与使用约定的完整文档，
            也可直接喂给 AIGC 生成插件 →
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section id="community" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
      <SectionHeader kicker="Community" title="社区" />
      <div className="grid gap-5 md:grid-cols-2">
        <Card
          as="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener"
          isPressable
          isHoverable
          className="card-lift border border-divider bg-content1/70 backdrop-blur-md"
        >
          <CardHeader className="font-semibold">🐙 GitHub 仓库</CardHeader>
          <CardBody className="text-sm text-foreground-500">
            源码 · Issues · 贡献指南
            <span className="text-xs text-foreground-400 mt-2 block">github.com/redstore-noob/NekoLauncher</span>
          </CardBody>
        </Card>
        <Card className="border border-divider bg-content1/70 backdrop-blur-md">
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
        <section className="relative mx-auto max-w-5xl px-6 pt-28 pb-20 text-center overflow-hidden">
          <div className="glow-blob w-96 h-96 bg-primary left-1/2 -translate-x-[80%] top-0" />
          <div className="glow-blob w-80 h-80 bg-secondary right-0 top-24 opacity-25" />

          <div className="anim-fade-up mb-7 flex justify-center">
            <Link href="#about">
              <Chip color="secondary" variant="flat" size="md" className="cursor-pointer">
                原 NyaLauncher 已迁移并更名 🐱
              </Chip>
            </Link>
          </div>
          <h1 className="anim-fade-up anim-delay-1 text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Neko<span className="text-gradient-primary">Launcher</span>
          </h1>
          <p className="anim-fade-up anim-delay-2 text-lg md:text-xl text-foreground-500 max-w-2xl mx-auto mb-3">
            现代、跨平台、可拓展的 Minecraft 启动器
          </p>
          <p className="anim-fade-up anim-delay-2 text-foreground-400 mb-10">
            插件生态 · AI Agent · Rewind 备份 · 三合一发行，不再重复造轮子喵 ~
          </p>
          <div className="anim-fade-up anim-delay-3 flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href="#download"
              color="primary"
              size="lg"
              className="px-8 font-semibold shadow-lg shadow-primary/25"
            >
              立即下载 ↓
            </Button>
            <Button as={Link} href="docs/" variant="bordered" size="lg" className="backdrop-blur-sm">
              插件开发教程 →
            </Button>
          </div>
        </section>

        {/* ===== 迁移公告 ===== */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-14 scroll-mt-20">
          <Card className="anim-fade-up anim-delay-4 border border-divider bg-content1/60 backdrop-blur-md">
            <CardBody className="flex-row flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-semibold">📣 迁移公告</span>
              <span className="text-foreground-500">
                本项目已由 <s className="text-foreground-400">NyaLauncher</s> 迁移至{" "}
                <Link href={GITHUB_URL} target="_blank" rel="noopener" size="sm">
                  redstore-noob/NekoLauncher
                </Link>
                ，旧仓库不再维护；网站已用 React + HeroUI 全新重写。
              </span>
            </CardBody>
          </Card>
        </section>

        <FeaturesSection />
        <DocsLinkSection />
        <DownloadSection />
        <CommunitySection />
      </main>

      <footer className="border-t border-divider bg-content1/40 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-lg">
              Neko<span className="text-gradient-primary">Launcher</span>
            </span>
            <span className="text-xs text-foreground-400">用 ❤️ 与 🐱 构建 · Apache 2.0</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="#features" color="foreground" size="sm">特性</Link>
            <Link href="#download" color="foreground" size="sm">下载</Link>
            <Link href="docs/" color="foreground" size="sm">文档</Link>
            <Link href="#community" color="foreground" size="sm">社区</Link>
            <Link href={GITHUB_URL} target="_blank" rel="noopener" color="foreground" size="sm">GitHub</Link>
            <Link href={AFDIAN_URL} target="_blank" rel="noopener" color="danger" size="sm">❤ 赞助</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
