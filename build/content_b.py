#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mofumofu Web · 页面内容 B 组（技术架构）

只讲「怎么分层、每层为什么这样切、内核管哪些事」。
不写源码路径、不写行数、不写构建命令 —— 官网不做开发者文档。
"""
from build import page, sec, card, ul, table, write, icon

# ══════════════════════════════════════════════════════════
# 2. 技术架构
# ══════════════════════════════════════════════════════════
body = f"""
{sec("01", "分层结构", "UI 与 Minecraft 逻辑彻底解耦，同一份内核可换宿主", f"""
<div class="grid g3">
  <div class="card">
    <div class="card-title">{icon("IconMonitor", "card-ico")} 表现层</div>
    <p class="card-text">
      桌面版跑在 <b>Avalonia 12</b> 上，经典版跑在 <b>Photino.NET</b> 上 ——
      同一套内核，两种外壳。
    </p>
    <div class="divider"></div>
    <p class="card-text small">视图、控件、主题、交互全在这一层，换宿主不影响内核。</p>
  </div>
  <div class="card">
    <div class="card-title">{icon("IconSettings", "card-ico")} 后端层</div>
    <p class="card-text">
      只负责启动器<b>自己</b>的事：设置存储、日志、唤起浏览器。
    </p>
    <div class="divider"></div>
    <p class="card-text small">刻意做得很薄 —— 游戏相关的配置一律交给内核。</p>
  </div>
  <div class="card">
    <div class="card-title">{icon("IconCube", "card-ico")} 内核层</div>
    <p class="card-text">
      <b>MofuCore</b>：版本、加载器、账户、启动、服务器、联机，
      全部 Minecraft 逻辑都在这里。
    </p>
    <div class="divider"></div>
    <p class="card-text small">零 UI 引用，可被任意宿主复用。</p>
  </div>
</div>

<div class="flow" style="margin-top:20px">
  <div class="flow-step"><div class="flow-num">STEP 01</div><div class="flow-title">用户操作</div><div class="flow-desc">点击 / 拖拽 / 输入</div></div>
  <div class="flow-step"><div class="flow-num">STEP 02</div><div class="flow-title">界面编排</div><div class="flow-desc">主题 / 进度 / 状态</div></div>
  <div class="flow-step"><div class="flow-num">STEP 03</div><div class="flow-title">内核执行</div><div class="flow-desc">下载 / 账户 / 启动 / 服务</div></div>
  <div class="flow-step"><div class="flow-num">STEP 04</div><div class="flow-title">回写状态</div><div class="flow-desc">通知界面刷新</div></div>
</div>""")}

{sec("02", "内核能力域", "启动器要处理的每一件事，内核里都有归口", f"""
{table(
    ["域", "管什么"],
    [
        ["<b>配置</b>", "游戏目录、Java、内存的分域配置，默认落在 <code>./.minecraft</code>"],
        ["<b>下载</b>", "版本清单、资源与库依赖解析、断点与多线程下载"],
        ["<b>加载器</b>", "Fabric / Quilt / Forge / NeoForge / OptiFine 各自独立实现"],
        ["<b>Modrinth</b>", "mod / 整合包 / 光影 / 材质包四类资源的搜索、安装与打包"],
        ["<b>Java</b>", "环境变量、注册表、常见目录三路探测；Mojang 运行时下载"],
        ["<b>启动</b>", "启动参数装配、继承链合并、进程拉起与退出监听"],
        ["<b>账户</b>", "Microsoft / Authlib / 离线三种账号，令牌加密存储"],
        ["<b>服务器</b>", "进程管理、RCON 指令、热备份、玩家列表"],
        ["<b>工具</b>", "内存与磁盘占用、资源包打包、时光回溯快照"],
        ["<b>联机</b>", "陶瓦联机客户端适配"],
        ["<b>日志</b>", "运行日志实时输出与崩溃原因推测"],
    ])}""")}
"""

write("architecture.html", page(
    "architecture.html", "技术架构", "Architecture",
    "五个模块，职责边界清晰。UI 与 Minecraft 逻辑彻底解耦：同一份 MofuCore 内核，"
    "既能跑在 Avalonia 桌面上，也能跑在 Photino Web 宿主里。",
    body,
    tags=[("Avalonia 12", "accent"), (".NET 10", ""), ("跨平台", ""), ("内核零 UI 引用", "")],
    prev=("index.html", "首页"),
    next_=("docs/index.html", "插件文档"),
))
