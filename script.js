/* ============================================================
   NyaLauncher · Brand Page Script
   Canvas 粒子 + 视差 + 入场动画 + 3D 倾斜
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Canvas 粒子系统 ---------- */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const COLORS = ["#FF6BCB", "#00F5FF", "#B98BFF"];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initParticles() {
    const count = Math.min(90, Math.floor((w * h) / 16000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }
  }

  const LINK_DIST = 130;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.85;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.c;
          ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.18;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    if (!prefersReduced) requestAnimationFrame(draw);
  }

  resize();
  initParticles();
  draw(); // 减弱动效时只渲染一帧静止画面，否则持续循环

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); initParticles(); }, 200);
  });

  /* ---------- 2. 导航滚动态 ---------- */
  const nav = document.getElementById("nav");
  function onScrollNav() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 3. 视差 (英雄区标题/副标题) ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  function onParallax() {
    if (prefersReduced) return;
    const y = window.scrollY;
    parallaxEls.forEach(function (el) {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      el.style.transform = "translateY(" + y * speed + "px)";
    });
  }
  window.addEventListener("scroll", onParallax, { passive: true });

  /* ---------- 4. 入场淡入上浮 (IntersectionObserver) ---------- */
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

  /* ---------- 5. 卡片 3D 倾斜 + 光泽 ---------- */
  const tiltCards = document.querySelectorAll(".tilt");
  tiltCards.forEach(function (card) {
    let raf;
    card.addEventListener("mousemove", function (e) {
      if (prefersReduced) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 14;
      const rotX = (0.5 - py) * 14;
      card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        card.style.transform =
          "perspective(800px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) translateY(-6px)";
      });
    });
    card.addEventListener("mouseleave", function () {
      cancelAnimationFrame(raf);
      card.style.transform = "";
    });
  });

  /* ---------- 6. QQ 群号一键复制 ---------- */
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

  /* ---------- 7. 回到顶部 ---------- */
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

  /* ---------- 8. 移动端导航汉堡菜单 ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav__links");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    navMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
