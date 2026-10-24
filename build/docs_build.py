#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 插件文档站生成器

把 E:/Mofumofu/docs/Extension_Guide 下的 Markdown 转成 docs/ 下的静态站。
自带轻量 Markdown 解析（标题 / 表格 / 代码块 / 列表 / 引用 / 行内标记）与
按语言的小型高亮器，不引入任何第三方依赖。

用法：
    cd E:/redstore-noob.github.io/build
    python docs_build.py
"""
import html
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = r"E:/Mofumofu/docs/Extension_Guide"
OUT = os.path.abspath(os.path.join(ROOT, "..", "docs"))

# md 文件名 → 站点文件名
MD2HTML = {
    "overview.md": "index.html",
    "1.开发环境.md": "01-setup.html",
    "2.第一个插件.md": "02-first-plugin.html",
    "3.API对照表.md": "03-api.html",
    "4.打包.md": "04-packaging.html",
    "5.基于Github仓库的镜像.md": "05-mirror.html",
    "6.UI扩展.md": "06-ui.html",
    "7.下载与实例.md": "07-download.html",
    "8.钩子.md": "08-hooks.html",
}

# 章节元数据（title / lead 为站点版表述，正文仍以源 Markdown 为准）
DOCS = [
    dict(src="overview.md", out="index.html", num="00", nav="概览",
         eyebrow="OVERVIEW", title="插件开发指南",
         lead="这是启动器插件系统的完整开发文档：环境搭建、第一个插件、API 速查、"
              "UI 扩展与启动钩子，八章按顺序读一遍就能上手。"),
    dict(src="1.开发环境.md", out="01-setup.html", num="01", nav="开发环境",
         eyebrow="CHAPTER 01 / SETUP", title="快速建立开发环境",
         lead="装好 .NET 10 SDK、引对契约库，跑通「改代码 → 热重载」的循环，不用重启启动器。"),
    dict(src="2.第一个插件.md", out="02-first-plugin.html", num="02", nav="第一个插件",
         eyebrow="CHAPTER 02 / TUTORIAL", title="你的第一个插件",
         lead="从零写一个圆形时钟：入口、控件、清单、打包、安装，五步走完，照抄能跑。"),
    dict(src="3.API对照表.md", out="03-api.html", num="03", nav="API 对照表",
         eyebrow="CHAPTER 03 / REFERENCE", title="API 对照表",
         lead="全部接口的签名、所需权限与宿主行为。开发时开着当字典用，Ctrl+F 直接搜。"),
    dict(src="4.打包.md", out="04-packaging.html", num="04", nav="打包与发布",
         eyebrow="CHAPTER 04 / PACKAGING", title="打包与发布",
         lead="把清单、详情、程序集、图标四件套压成一个 .nekoex，玩家双击即装。"),
    dict(src="5.基于Github仓库的镜像.md", out="05-mirror.html", num="05", nav="仓库镜像",
         eyebrow="CHAPTER 05 / DISTRIBUTION", title="插件仓库镜像",
         lead="借 GitHub / Gitee / GitCode 的 Release 做在线安装与自动更新，不用自己搭服务器。"),
    dict(src="6.UI扩展.md", out="06-ui.html", num="06", nav="UI 扩展",
         eyebrow="CHAPTER 06 / UI", title="UI 扩展",
         lead="任务栏托盘、桌面组件、页面注入、新页面、主题与样式——五个扩展点，全部走 context。"),
    dict(src="7.下载与实例.md", out="07-download.html", num="07", nav="下载与实例",
         eyebrow="CHAPTER 07 / DOWNLOADS", title="下载与实例",
         lead="搜资源、装实例、管 mods、下 Java：四个接口覆盖完整下载链路。"),
    dict(src="8.钩子.md", out="08-hooks.html", num="08", nav="钩子",
         eyebrow="CHAPTER 08 / HOOKS", title="钩子",
         lead="启动钩子与下载任务钩子：不只是事后通知，还能参与决策、改写参数、拦截启动。"),
]

# 第四章源文件只有一行说明，补上包结构与发布流程（事实取自第二、五章）
EXTRA = {
    "4.打包.md": """
## 包内四件套

| 文件 | 必填 | 作用 |
|---|---|---|
| `info.yaml` | 是 | 插件清单，内容与开发期的 `plugin.yaml` 一致 |
| `description.md` | 否 | 插件详情页展示的 Markdown 简介 |
| `extension.dll` | 是 | 编译产物，发布前记得改名（开发期 DLL 名不限） |
| `icon.png` | 否 | 插件在启动器内展示的图标 |

> `.nekoex` 本质就是 zip：四个文件放在压缩包根目录，别再套一层文件夹。

## 发布流程

1. `dotnet build -c Release` 出 DLL，重命名为 `extension.dll`
2. 按上表把四件套放进同一个目录（官方示例项目里附了 `pack.ps1` 一键打包）
3. 压成 zip 后把扩展名改成 `.nekoex`
4. 建 GitHub 仓库，**仓库名与清单 `id` 保持一致**；发 Release，tag 写版本号，资产上传 `.nekoex`
5. 玩家在 下载 → 插件 粘贴仓库地址，即可在线安装与更新（见[第五章](5.基于Github仓库的镜像.md)）
""",
}

# ══════════════════════════════════════════════════════════
# 行内标记
# ══════════════════════════════════════════════════════════

def _link(url):
    if url in MD2HTML:
        return MD2HTML[url]
    base, _, anchor = url.partition("#")
    if base in MD2HTML:
        return MD2HTML[base] + ("#" + anchor if anchor else "")
    return url


EMOJI = re.compile("[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]")


def plain(text):
    """标题/目录用：去掉 markdown 标记与装饰符号。"""
    t = EMOJI.sub("", text)
    t = re.sub(r"[`*]", "", t)
    return " ".join(t.split())


def inline(text):
    codes = []

    def keep(m):
        codes.append(m.group(1))
        return "\x00%d\x00" % (len(codes) - 1)

    s = re.sub(r"`([^`]+)`", keep, text)
    s = html.escape(s, quote=False)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)",
               lambda m: '<a href="%s"%s>%s</a>' % (
                   html.escape(_link(m.group(2)), quote=True),
                   ' target="_blank" rel="noopener noreferrer"'
                   if m.group(2).startswith(("http://", "https://")) else "",
                   m.group(1)),
               s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\*\w])\*([^*\n]+)\*(?![\*\w])", r"<em>\1</em>", s)
    s = re.sub(r"\x00(\d+)\x00",
               lambda m: "<code>" + html.escape(codes[int(m.group(1))], quote=False) + "</code>", s)
    return s


# ══════════════════════════════════════════════════════════
# 代码高亮（按语言取词表，单趟扫描后逐段转义）
# ══════════════════════════════════════════════════════════

CS_KW = (
    "using|public|private|protected|internal|class|sealed|static|readonly|override|virtual|"
    "new|return|true|false|null|void|string|bool|Boolean|int|double|var|if|else|foreach|for|in|"
    "await|async|Task|event|Action|this|base|get|set|throw|try|catch|finally|where|select|is|not|"
    "record|enum|interface|struct|const|namespace|partial|IProgress|CancellationToken|"
    "Control|IBrush|Color|Point|DrawingContext|SolidColorBrush|Pen|Size|DateTime|TimeSpan|"
    "DispatcherTimer|File|Path|Math|List|IList|Object"
)
BASH_KW = ("mkdir|cd|dotnet|git|cp|mv|curl|rm|new|build|clone|install|run|pack|powershell")


def highlight(code, lang):
    lang = (lang or "").lower()
    rules = []
    tail = []
    if lang in ("csharp", "cs", "c#"):
        rules.append(("com", r"//[^\n]*"))
        tail.append(r"(?P<kw>\b(?:%s)\b)" % CS_KW)
    elif lang in ("bash", "sh", "shell", "powershell", "ps1"):
        rules.append(("com", r"(?<![^\s])#[^\n]*"))
        tail.append(r"(?P<kw>\b(?:%s)\b)" % BASH_KW)
    elif lang in ("yaml", "yml", "toml"):
        rules.append(("com", r"(?<![^\s])#[^\n]*"))
        tail.append(r"(?P<key>^[\w.-]+(?=\s*:))")
    elif lang == "xml":
        rules.append(("com", r"<!--[\s\S]*?-->"))
        tail.append(r"(?P<tag></?[A-Za-z][\w:.-]*)")
        tail.append(r"(?P<attr>\b[A-Za-z][\w:.-]*(?=\s*=))")

    parts = ["(?P<%s>%s)" % (n, p) for n, p in rules]
    parts.append(r"""(?P<str>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')""")
    parts.extend(tail)
    parts.append(r"(?P<num>\b\d+(?:\.\d+)?\b)")
    pat = re.compile("|".join(parts), re.M)

    cls = {"com": "c", "str": "s", "kw": "k", "num": "n", "tag": "t", "attr": "a", "key": "k"}
    out, pos = [], 0
    for m in pat.finditer(code):
        out.append(html.escape(code[pos:m.start()], quote=False))
        out.append('<span class="%s">%s</span>' % (
            cls.get(m.lastgroup or "", ""), html.escape(m.group(0), quote=False)))
        pos = m.end()
    out.append(html.escape(code[pos:], quote=False))
    return "".join(out)


LANG_LABEL = {
    "csharp": "C#", "cs": "C#", "c#": "C#", "bash": "Bash", "sh": "Shell",
    "xml": "XML", "yaml": "YAML", "yml": "YAML", "json": "JSON", "text": "Text",
    "powershell": "PowerShell", "ps1": "PowerShell",
}


def code_block(code, lang):
    label = LANG_LABEL.get(lang.lower(), (lang or "code").upper())
    return (
        '<figure class="cb">'
        '<figcaption class="cb-bar"><span class="cb-lang">%s</span>'
        '<button class="cb-copy" type="button" aria-label="复制代码">复制</button></figcaption>'
        '<pre class="cb-pre"><code>%s</code></pre></figure>' % (label, highlight(code, lang))
    )


# ══════════════════════════════════════════════════════════
# 块级解析
# ══════════════════════════════════════════════════════════

def slugify(s, idx):
    return "sec-%d" % idx


def render_md(md):
    lines = md.replace("\r\n", "\n").split("\n")
    out, toc = [], []
    i, n = 0, len(lines)
    h2n = 0
    first_h1 = None

    def flush_para(buf):
        if buf:
            out.append("<p>" + inline(" ".join(buf)) + "</p>")

    para = []
    while i < n:
        line = lines[i]
        stripped = line.strip()

        # 代码块
        m = re.match(r"^```(\w*)\s*$", stripped)
        if m:
            flush_para(para); para = []
            lang = m.group(1)
            i += 1
            buf = []
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            out.append(code_block("\n".join(buf), lang))
            continue

        # 标题
        m = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if m:
            flush_para(para); para = []
            level, text = len(m.group(1)), m.group(2).strip()
            if level == 1:
                if first_h1 is None:
                    first_h1 = text
                i += 1
                continue
            if level == 2:
                h2n += 1
                sid = slugify(text, h2n)
                toc.append((sid, plain(text)))
                out.append('<h2 id="%s">%s<a class="anchor" href="#%s" aria-label="本节链接">#</a></h2>'
                           % (sid, inline(text), sid))
            else:
                out.append("<h3>%s</h3>" % inline(plain(text)))
            i += 1
            continue

        # 表格
        if stripped.startswith("|") and i + 1 < n and re.match(r"^\|[\s:|-]*-[\s:|-]*$", lines[i + 1].strip()):
            flush_para(para); para = []
            def cells(row):
                row = row.strip()
                if row.startswith("|"):
                    row = row[1:]
                if row.endswith("|"):
                    row = row[:-1]
                return [c.strip() for c in row.split("|")]
            head = cells(lines[i])
            i += 2
            body = []
            while i < n and lines[i].strip().startswith("|"):
                body.append(cells(lines[i]))
                i += 1
            th = "".join("<th>%s</th>" % inline(c) for c in head)
            tr = "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % inline(c) for c in r) for r in body)
            out.append('<div class="table-wrap"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>'
                       % (th, tr))
            continue

        # 引用
        if stripped.startswith(">"):
            flush_para(para); para = []
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append("<blockquote>%s</blockquote>" % inline(" ".join(x.strip() for x in buf if x.strip())))
            continue

        # 列表
        if re.match(r"^\s*([-*]|\d+\.)\s", line):
            flush_para(para); para = []
            items = []
            while i < n:
                m = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", lines[i])
                if m:
                    items.append([len(m.group(1)), m.group(2)[0].isdigit(), m.group(3).strip()])
                    i += 1
                elif lines[i].strip() and items and not lines[i].strip().startswith(("#", "|", "```")):
                    items[-1][2] += " " + lines[i].strip()
                    i += 1
                else:
                    break
            items = [it for it in items if it[2]]
            if items:
                ordered = items[0][1]
                out.append("<ol>" if ordered else "<ul>")
                for _, _, text in items:
                    out.append("<li>%s</li>" % inline(text))
                out.append("</ol>" if ordered else "</ul>")
            continue

        # 水平线：h2 已有分隔线，直接丢弃
        if re.match(r"^(-{3,}|\*{3,}|_{3,})$", stripped):
            flush_para(para); para = []
            i += 1
            continue

        # 空行
        if not stripped:
            flush_para(para); para = []
            i += 1
            continue

        para.append(stripped)
        i += 1

    flush_para(para)
    return "\n".join(out), toc, first_h1


# ══════════════════════════════════════════════════════════
# 页面模板
# ══════════════════════════════════════════════════════════

def render_nav(cur):
    out = ['<nav class="dn-list" aria-label="文档目录">']
    out.append('<div class="dn-group"><div class="dn-label">起点</div>')
    for d in DOCS[:1]:
        out.append(link_html(d, cur))
    out.append("</div>")
    out.append('<div class="dn-group"><div class="dn-label">八章指南</div>')
    for d in DOCS[1:]:
        out.append(link_html(d, cur))
    out.append("</div></nav>")
    return "\n".join(out)


def link_html(d, cur):
    act = " active" if d["out"] == cur else ""
    aria = ' aria-current="page"' if d["out"] == cur else ""
    return ('<a class="dn-link%s" href="%s"%s><span class="dn-num">%s</span>'
            '<span class="dn-text">%s</span></a>' % (act, d["out"], aria, d["num"], d["nav"]))


def pager(cur):
    idx = [d["out"] for d in DOCS].index(cur)
    parts = ['<nav class="doc-pager" aria-label="章节切换">']
    if idx > 0:
        p = DOCS[idx - 1]
        parts.append('<a class="pg prev" href="%s"><span class="pg-dir">← 上一章</span><span class="pg-t">%s</span></a>'
                     % (p["out"], p["nav"]))
    else:
        parts.append("<span></span>")
    if idx < len(DOCS) - 1:
        nx = DOCS[idx + 1]
        parts.append('<a class="pg next" href="%s"><span class="pg-dir">下一章 →</span><span class="pg-t">%s</span></a>'
                     % (nx["out"], nx["nav"]))
    parts.append("</nav>")
    return "".join(parts)


def render(d, article, toc):
    toc_html = ""
    if toc:
        items = "".join('<li><a href="#%s" data-toc="%s">%s</a></li>' % (sid, sid, html.escape(t))
                        for sid, t in toc)
        toc_html = ('<aside class="doc-toc" aria-label="本页目录"><div class="toc-label">本页目录</div>'
                    '<ul class="toc-list">%s</ul></aside>' % items)

    return f"""<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{d['title']} · Mofumofu 插件文档</title>
<meta name="description" content="{html.escape(d['lead'], quote=True)}">
<meta name="theme-color" content="#090d12">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Mofumofu Launcher">
<meta property="og:title" content="{d['title']} · 插件文档">
<meta property="og:description" content="{html.escape(d['lead'], quote=True)}">
<meta property="og:image" content="https://redstore-noob.github.io/assets/img/wallpaper.jpg">
<link rel="icon" href="../favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="512x512" href="../assets/img/app-icon.png">
<link rel="apple-touch-icon" href="../assets/img/app-icon-tile.png">
<link rel="stylesheet" href="assets/docs.css">
</head>
<body>
<a class="skip-link" href="#docMain">跳到正文</a>
<div class="scroll-progress" aria-hidden="true"><i id="scrollProgress"></i></div>

<div class="doc-shell">
  <aside class="doc-side" id="docSide">
    <a class="side-brand" href="../index.html" aria-label="返回 Mofumofu 官网">
      <img src="../assets/img/app-icon.png" alt="" width="36" height="36" decoding="async">
      <span class="side-brand-t"><b>Mofumofu</b><i>PLUGIN DEV DOCS</i></span>
    </a>
    {render_nav(d['out'])}
    <div class="side-foot">
      <a class="side-back" href="../index.html">← 返回官网</a>
      <div class="side-meta">API 1.0.0 · .NET 10</div>
    </div>
  </aside>

  <main class="doc-main" id="docMain" tabindex="-1">
    <header class="doc-top">
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="打开目录" aria-expanded="false" aria-controls="docSide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <div class="doc-crumb"><a href="index.html">文档</a><i>/</i><b>{d['nav']}</b></div>
      <div class="doc-top-tools">
        <span class="api-badge">API 1.0.0</span>
        <button class="icon-btn" id="themeBtn" aria-label="切换主题">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/></svg>
        </button>
      </div>
    </header>

    <article class="doc-body">
      <div class="doc-eyebrow"><span>{d['eyebrow']}</span><i>{d['num']}</i></div>
      <h1 class="doc-title">{d['title']}</h1>
      <p class="doc-lead">{d['lead']}</p>
      {article}
      {pager(d['out'])}
      <footer class="doc-foot">
        <div>本页内容来自启动器仓库 <code>docs/Extension_Guide</code></div>
        <div>第三方辅助工具，与 Mojang / Microsoft 无隶属关系</div>
      </footer>
    </article>
  </main>

  {toc_html}
</div>

<button class="nav-scrim" id="navScrim" aria-label="关闭目录" tabindex="-1"></button>
<script src="assets/docs.js"></script>
</body>
</html>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    for d in DOCS:
        path = os.path.join(SRC, d["src"])
        with open(path, encoding="utf-8") as f:
            md = f.read()
        md = EMOJI.sub("", md) + EXTRA.get(d["src"], "")
        article, toc, _ = render_md(md)
        with open(os.path.join(OUT, d["out"]), "w", encoding="utf-8") as f:
            f.write(render(d, article, toc))
        print("  ✓ docs/%s  (%d 节)" % (d["out"], len(toc)))


if __name__ == "__main__":
    main()
