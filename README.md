# Mofumofu Launcher · 展示站

基于 **Avalonia 12.1.4 + SukiUI 7.0.2-nightly** 构建的 Mofumofu Launcher 多页式展示网站。
内容全部来自对 `E:/Mofumofu` 仓库源码的实测，非编造。

静态站点，**零构建、零外链依赖**，直接由 GitHub Pages 托管。

## 页面结构（12 页 + 404）

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 首页 | `index.html` | Hero、核心能力、模块构成、深入阅读入口 |
| 技术架构 | `architecture.html` | 五模块分层、内核能力域 |
| 下载大厅 | `download.html` | 7 标签页、5 大加载器、下载源与镜像 |
| 实例管理 | `instances.html` | 6 详情标签、继承链、内存与 G1GC 调优 |
| 账户与皮肤 | `account.html` | 三种登录、Microsoft 六步链路、凭据加密、3D 皮肤编辑 |
| 服务器 | `servers.html` | 4 种核心、RCON 协议、热备份、玩家权限 |
| 联机 | `online.html` | Terracotta 适配、五态状态机 |
| 音乐 | `music.html` | 本地曲库 + 网易云、播放控制、歌词 |
| 创作中心 | `creator.html` | 8 个工具、立方体 3D 文字 |
| 插件 | `plugins.html` | plugin.yaml / .nekoex、NekoSolo 安装器 |
| 桌面小组件 | `widgets.html` | 22 个组件、三大分类、统一原语 |
| 设置 | `settings.html` | 5 大分区、24 属性、本地化键分布 |
| 404 | `404.html` | GitHub Pages 无效链接兜底页 |

## 目录

```
.
├── index.html … settings.html   # 12 个页面 + 404，全部由生成器产出
├── assets/
│   ├── css/main.css             # 设计系统（令牌层 + 组件层）
│   ├── js/main.js               # 运行时（主题 / 强调色 / 动画）
│   └── img/                     # 应用图标、壁纸等品牌素材（src/ 为原图）
├── favicon.ico                  # 由 build/prepare_assets.py 生成
├── build/                       # 站点生成器
│   ├── build.py                 # 页面模板与工具函数
│   ├── prepare_assets.py        # 品牌素材处理（裁切 / 压缩 / favicon）
│   ├── iconpark.py              # IconPark 图标表（自动提取，勿手改）
│   └── content_a.py … content_e.py
└── .gitignore
```

## 品牌素材

图标与壁纸的原始文件放在 `assets/img/src/`，页面只引用处理后的成品。
换图后重跑一次即可，尺寸与压缩参数写在脚本里：

```bash
python build/prepare_assets.py     # 需要 pillow
```

产出 `assets/img/app-icon.png`（512）、`app-icon-192.png`、`app-icon-tile.png`（iOS 主屏）、
`wallpaper.jpg`（1600 宽）与根目录 `favicon.ico`。
图标保留白底以圆角方块呈现 —— 立方体用白描边分面，抠成透明底会在深色主题下丢描边。

## 重新生成

页面由 Python 生成器产出，改内容后重跑：

```bash
cd build
python -c "import build, content_a, content_b, content_c, content_d, content_e"
```

输出直接落在仓库根目录（GitHub Pages 的站点根）。

## 本地预览

```bash
# 方式一：直接双击 index.html（零依赖，无需服务器）

# 方式二：本地起服务
python -m http.server 8791 --bind 127.0.0.1
# → http://127.0.0.1:8791/index.html
```

## 设计系统说明

站点视觉 **1:1 复刻** 启动器的 `Styles/AppStyles.axaml` + `Services/ThemeManager.cs`：

- **41 个颜色令牌**，命名沿用 `Neko{语义}{状态}Brush` 语义
- **6 套强调色**：青绿 `#3FC6C1`（默认）/ 蔚蓝 `#5AA9E6` / 新绿 `#4CC38A` / 暖橙 `#F2AE49` / 樱粉 `#E5698F` / 紫藤 `#A78BFA`
- **深 / 浅双主题**，色值取自 `ThemeManager.cs:185-240`
- **强调色切换**：右上角圆点实时切换，Soft 底色用 `Blend(强调色, surfaceBase, ratio)` 动态计算，与 `ThemeManager` 同算法
- **onAccent 自动判黑/白**：亮度阈值 140，与 `ThemeManager.cs:165-169` 一致
- **MD3 规范**：状态层 8/12/12/16%、elevation 五级、圆角 4/6/10/14/20
- **图标**：统一 IconPark —— 48px 视图盒、4px 圆头描边、`currentColor` 描边，图标表从主项目 `Controls/IconParkGlyphs.cs` 自动提取，与启动器同源

交互：主题切换（localStorage 持久化）、强调色切换、滚动进场动画、响应式侧栏。

## 选型结论速览

| 结论 | 方案 |
| --- | --- |
| **主库** | `Irihi.Ursa 2.0` — 专为 Avalonia 12 设计、MIT、.NET 基金会成员、控件层不与 SukiUI 抢 brush |
| **表格** | `Avalonia 12 内置 TableView` — 零 NuGet 依赖；DataGrid 已废弃、TreeDataGrid 已转商业 |
| **禁止** | `SukiUI` + `Material.Avalonia` / `FluentAvaloniaTheme` / `Semi.Avalonia`（第二套基础主题） |
| **按需** | `Markdown.Avalonia 12.0.2`、`Avalonia.AvaloniaEdit 12.0.0` |

---

Mofumofu 是第三方辅助工具，与 Mojang Studios、Microsoft Corporation 及其关联公司无任何隶属、合作、授权或代理关系。
