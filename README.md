# Mofumofu Launcher · 展示站

基于 **Avalonia 12.1.4 + SukiUI 7.0.2-nightly** 构建的 Mofumofu Launcher 展示网站 + 插件开发文档。
内容全部来自对 `E:/Mofumofu` 仓库源码与 `docs/Extension_Guide` 的实测，非编造。

静态站点，**零构建、零外链依赖**，直接由 GitHub Pages 托管。

## 页面结构

站点只保留三件事：这是什么、凭什么做得出来、怎么给它写插件。

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 首页 | `index.html` | Hero、十项能力（一条优势）、模块构成、深入入口 |
| 技术架构 | `architecture.html` | 四模块分层、内核能力域 |
| 插件文档 | `docs/index.html` | 扩展开发指南：概览 + 八章（见下） |
| 404 | `404.html` | GitHub Pages 无效链接兜底页 |

下载大厅、实例管理、账户与皮肤、服务器、联机、音乐、创作中心、插件、桌面小组件、设置
这十项常规功能**不再单独成页**，已合并为首页「一个启动器，十项全能」条目。

## 插件文档（`docs/`）

内容源为启动器仓库的 `Mofumofu/docs/Extension_Guide/*.md`，由 `build/docs_build.py` 转换。

| 章节 | 文件 |
| --- | --- |
| 概览 | `docs/index.html` |
| 一、快速建立开发环境 | `docs/01-setup.html` |
| 二、你的第一个插件 | `docs/02-first-plugin.html` |
| 三、API 对照表 | `docs/03-api.html` |
| 四、打包与发布 | `docs/04-packaging.html` |
| 五、插件仓库镜像 | `docs/05-mirror.html` |
| 六、UI 扩展 | `docs/06-ui.html` |
| 七、下载与实例 | `docs/07-download.html` |
| 八、钩子 | `docs/08-hooks.html` |

生成器自带轻量 Markdown 解析（标题 / 表格 / 代码块 / 列表 / 引用 / 行内标记）
与按语言的高亮器（C# / Bash / YAML / XML），不引入第三方依赖。

## 目录

```
.
├── index.html · architecture.html · 404.html   # 由生成器产出
├── docs/                                        # 插件文档站（独立样式与脚本）
│   ├── index.html · 01-setup.html … 08-hooks.html
│   └── assets/docs.css · assets/docs.js
├── assets/
│   ├── css/main.css             # 设计系统（令牌层 + 组件层）
│   ├── js/main.js               # 运行时（主题 / 强调色 / 动画）
│   └── img/                     # 应用图标、壁纸等品牌素材（src/ 为原图）
├── favicon.ico                  # 由 build/prepare_assets.py 生成
├── build/                       # 站点生成器
│   ├── build.py                 # 页面模板与工具函数
│   ├── content_a.py             # 首页 / 404
│   ├── content_b.py             # 技术架构
│   ├── docs_build.py            # 插件文档站（Markdown → HTML）
│   ├── prepare_assets.py        # 品牌素材处理（裁切 / 压缩 / favicon）
│   └── iconpark.py              # IconPark 图标表（自动提取，勿手改）
└── .gitignore
```

## 重新生成

```bash
cd build
python -c "import build, content_a, content_b"   # 主站
python docs_build.py                              # 插件文档站
```

主站输出落在仓库根目录，文档输出落在 `docs/`（GitHub Pages 的站点根下）。

## 品牌素材

图标与壁纸的原始文件放在 `assets/img/src/`，页面只引用处理后的成品。
换图后重跑一次即可，尺寸与压缩参数写在脚本里：

```bash
python build/prepare_assets.py     # 需要 pillow
```

产出 `assets/img/app-icon.png`（512）、`app-icon-192.png`、`app-icon-tile.png`（iOS 主屏）、
`wallpaper.jpg`（1600 宽）与根目录 `favicon.ico`。
图标保留白底以圆角方块呈现 —— 立方体用白描边分面，抠成透明底会在深色主题下丢描边。

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
- **深 / 浅双主题**，色值取自 `ThemeManager.cs:185-240`；文档站共用同一套 localStorage 键，跨站主题与强调色同步
- **强调色切换**：右上角圆点实时切换，Soft 底色用 `Blend(强调色, surfaceBase, ratio)` 动态计算，与 `ThemeManager` 同算法
- **onAccent 自动判黑/白**：亮度阈值 140，与 `ThemeManager.cs:165-169` 一致
- **MD3 规范**：状态层 8/12/12/16%、elevation 五级、圆角 4/6/10/14/20
- **图标**：统一 IconPark —— 48px 视图盒、4px 圆头描边、`currentColor` 描边，图标表从主项目 `Controls/IconParkGlyphs.cs` 自动提取，与启动器同源

交互：主题切换（localStorage 持久化）、强调色切换、滚动进场动画、响应式侧栏、
`Ctrl/Cmd+K` 命令面板、章节锚点导航；文档站另有目录高亮、代码块复制、章节翻页。

---

Mofumofu 是第三方辅助工具，与 Mojang Studios、Microsoft Corporation 及其关联公司无任何隶属、合作、授权或代理关系。
