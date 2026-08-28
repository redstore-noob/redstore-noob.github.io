/* ============================================================
   NyaLauncher · Brand Page Script
   Material Design 3 · 导航滚动态 / 当前区块高亮 / 入场动画 / Ripple 涟漪 / QQ 复制 / 回到顶部 / 移动端菜单
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 导航滚动态（Top App Bar 抬升） ---------- */
  const nav = document.getElementById("nav");
  function onScrollNav() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 2. 入场淡入上浮 (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 3. Ripple 涟漪（Material 标志性反馈） ---------- */
  function createRipple(e) {
    if (prefersReduced) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (e.clientX != null ? e.clientX : rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e.clientY != null ? e.clientY : rect.top + rect.height / 2) - rect.top - size / 2;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    el.appendChild(ripple);
    ripple.addEventListener("animationend", function () { ripple.remove(); });
  }
  const rippleTargets = document.querySelectorAll(
    ".md-btn, .to-top, .nav__toggle, .qq-copy, .nav__links a, .community__card"
  );
  rippleTargets.forEach(function (el) {
    el.classList.add("md-ripple");
    el.addEventListener("pointerdown", createRipple);
  });

  /* ---------- 4. QQ 群号一键复制 ---------- */
  const qqBtn = document.querySelector(".qq-copy");
  if (qqBtn) {
    const qqNum = qqBtn.getAttribute("data-qq");
    const qqHint = qqBtn.querySelector(".qq-hint");
    qqBtn.addEventListener("click", function () {
      const done = function () {
        qqBtn.classList.add("copied");
        if (qqHint) qqHint.textContent = "已复制 ✓";
        setTimeout(function () {
          qqBtn.classList.remove("copied");
          if (qqHint) qqHint.textContent = "点击复制";
        }, 1800);
      };
      const fallback = function () {
        const ta = document.createElement("textarea");
        ta.value = qqNum; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (err) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(qqNum).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------- 5. 回到顶部 (FAB) ---------- */
  const toTop = document.getElementById("toTop");
  function onScrollTop() {
    if (!toTop) return;
    if (window.scrollY > 480) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }
  window.addEventListener("scroll", onScrollTop, { passive: true });
  onScrollTop();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- 6. 移动端导航菜单 (MD Menu / Drawer) ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav__links");
  if (navToggle && navMenu) {
    function closeMenu() {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "打开菜单");
    }
    navToggle.addEventListener("click", function () {
      const open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    navMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // 点击菜单外部关闭
    document.addEventListener("click", function (e) {
      if (!navMenu.classList.contains("open")) return;
      if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
      closeMenu();
    });
    // ESC 关闭并把焦点还给菜单按钮
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ---------- 7. 导航当前区块高亮 (scroll spy) ---------- */
  const spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  const spySections = spyLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if (spySections.length) {
    function absTop(el) { return el.getBoundingClientRect().top + window.pageYOffset; }
    let spyTicking = false;
    function updateSpy() {
      spyTicking = false;
      const y = window.pageYOffset + 140;   // 顶栏 64px + 判定余量
      let idx = -1;                          // -1 = 还在首屏，不高亮
      for (let i = 0; i < spySections.length; i++) {
        if (absTop(spySections[i]) <= y) idx = i; else break;
      }
      // 触底时高亮最后一项，避免末尾短区块永远选不中
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 4) {
        idx = spySections.length - 1;
      }
      spyLinks.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
    }
    function onSpyScroll() {
      if (!spyTicking) { spyTicking = true; requestAnimationFrame(updateSpy); }
    }
  window.addEventListener("scroll", onSpyScroll, { passive: true });
  window.addEventListener("resize", onSpyScroll);
  updateSpy();
}

/* ---------- 8. 英雄背景：粒子网络 + 鼠标聚光灯 ---------- */
const particleCanvas = document.getElementById("particleCanvas");
const spotlight = document.querySelector(".md-bg__spotlight");
if (particleCanvas && !prefersReduced) {
  const ctx = particleCanvas.getContext("2d");
  let width = 0, height = 0, particles = [];
  const mouse = { x: null, y: null };
  const linkDist = 148;
  const mouseDist = 190;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    particleCanvas.width = Math.floor(width * dpr);
    particleCanvas.height = Math.floor(height * dpr);
    particleCanvas.style.width = width + "px";
    particleCanvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles() {
    const area = window.innerWidth * window.innerHeight;
    const count = Math.min(Math.max(Math.floor(area / 8200), 38), 95);
    const colors = ["rgba(174,198,255,.55)", "rgba(156,231,255,.45)", "rgba(174,198,255,.35)"];
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .55,
        vy: (Math.random() - .5) * .55,
        size: Math.random() * 2.0 + 1.1,
        color: colors[i % colors.length],
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.pulse += .035;
      ctx.globalAlpha = Math.max(.2, Math.min(.65, .42 + Math.sin(p.pulse) * .22));
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    const lineColor = "rgba(174,198,255,";
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < linkDist) {
          ctx.strokeStyle = lineColor + (.24 * (1 - d / linkDist)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse.x != null) {
        const dx = a.x - mouse.x, dy = a.y - mouse.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < mouseDist) {
          ctx.strokeStyle = lineColor + (.4 * (1 - d / mouseDist)) + ")";
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () { resizeCanvas(); makeParticles(); });
  document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (spotlight) {
      spotlight.style.setProperty("--x", (e.clientX / width * 100) + "%");
      spotlight.style.setProperty("--y", (e.clientY / height * 100) + "%");
    }
  });
  document.addEventListener("mouseleave", function () { mouse.x = null; mouse.y = null; });

  resizeCanvas(); makeParticles(); draw();
}

/* ---------- 9. 滚动自适应遮罩：首屏背景图最清晰，往下滚逐渐压暗 ---------- */
const bgScrim = document.querySelector(".md-bg__scrim");
if (bgScrim) {
  let scrimTicking = false;
  function updateScrim() {
    scrimTicking = false;
    const vh = window.innerHeight || 1;
    // 首屏 opacity 0，滚过约 0.9 屏后达到 .55
    const p = Math.min(window.pageYOffset / (vh * 0.9), 1);
    bgScrim.style.opacity = (p * 0.55).toFixed(3);
  }
  function onScrimScroll() {
    if (!scrimTicking) { scrimTicking = true; requestAnimationFrame(updateScrim); }
  }
  window.addEventListener("scroll", onScrimScroll, { passive: true });
  window.addEventListener("resize", onScrimScroll);
  updateScrim();
}
})();
