/* ============================================================
   Mofumofu Web · 运行时
   主题/强调色切换逻辑对齐 ThemeManager.cs 的行为
   ============================================================ */
(function () {
  'use strict';

  /* ---- 6 套强调色（与 ThemeManager.cs:35-40 完全一致） ---- */
  var ACCENTS = {
    teal:   { name: '青绿', primary: '#3FC6C1', hover: '#57D8D3', pressed: '#33BDB8' },
    blue:   { name: '蔚蓝', primary: '#5AA9E6', hover: '#7CBEED', pressed: '#4590CE' },
    green:  { name: '新绿', primary: '#4CC38A', hover: '#6BD3A3', pressed: '#3AA876' },
    orange: { name: '暖橙', primary: '#F2AE49', hover: '#F7C470', pressed: '#D8962F' },
    pink:   { name: '樱粉', primary: '#E5698F', hover: '#EE8AA9', pressed: '#CC5379' },
    purple: { name: '紫藤', primary: '#A78BFA', hover: '#BCA5FF', pressed: '#8F6EF0' }
  };

  var LS_THEME = 'mofu.theme';
  var LS_ACCENT = 'mofu.accent';

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- 主题 ---------- */
  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', mode === 'light' ? '切换到深色主题' : '切换到浅色主题');
      btn.innerHTML = mode === 'light'
        ? '<svg viewBox="0 0 24 24"><path d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16Z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L14.5,5.5L18.5,4.5L18,8.5L21,10.5L18,12.5L18,16.5L14.5,15.5L12,19L9.5,15.5L6,16.5L6,12.5L3,10.5L6,8.5L5.5,4.5L9.5,5.5L12,2Z"/></svg>';
    }
  }

  function currentTheme() {
    var saved = lsGet(LS_THEME);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /* ---------- 强调色 ---------- */
  function applyAccent(key) {
    var a = ACCENTS[key] || ACCENTS.teal;
    var root = document.documentElement;
    root.style.setProperty('--accent', a.primary);
    root.style.setProperty('--accent-hover', a.hover);
    root.style.setProperty('--accent-pressed', a.pressed);
    root.style.setProperty('--accent-line', a.primary);
    /* Soft(ratio) = Blend(强调色, surfaceBase, ratio)，与 ThemeManager 同算法 */
    var soft = mix(a.primary, surfaceBase(), 0.82);
    var softHover = mix(a.primary, surfaceBase(), 0.72);
    root.style.setProperty('--accent-soft', soft);
    root.style.setProperty('--accent-soft-hover', softHover);
    /* onAccent 按亮度自动判黑/白（阈值 140，同 ThemeManager:165-169） */
    root.style.setProperty('--accent-on', luminance(a.primary) > 140 ? '#06121A' : '#FFFFFF');

    var dots = document.querySelectorAll('.accent-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('on', dots[i].getAttribute('data-accent') === key);
    }
    lsSet(LS_ACCENT, key);
  }

  function surfaceBase() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? '#F2F5F8' : '#0A0E15';
  }

  function hex2rgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }

  /* 与 ThemeTokens.Blend 一致 */
  function mix(a, b, t) {
    var x = hex2rgb(a), y = hex2rgb(b);
    var r = Math.round(x[0] + (y[0] - x[0]) * t);
    var g = Math.round(x[1] + (y[1] - x[1]) * t);
    var bl = Math.round(x[2] + (y[2] - x[2]) * t);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  function luminance(hex) {
    var c = hex2rgb(hex);
    return 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme());

    var accent = lsGet(LS_ACCENT) || 'teal';
    if (!ACCENTS[accent]) accent = 'teal';
    applyAccent(accent);

    var themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        lsSet(LS_THEME, next);
        applyAccent(lsGet(LS_ACCENT) || 'teal');
      });
    }

    var dots = document.querySelectorAll('.accent-dot');
    for (var i = 0; i < dots.length; i++) {
      (function (d) {
        d.addEventListener('click', function () {
          applyAccent(d.getAttribute('data-accent'));
        });
      })(dots[i]);
    }

    /* 移动端侧栏 */
    var menuBtn = document.getElementById('menuBtn');
    var sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }

    /* 滚动进场动画（页面切换淡入上滑，同应用行为） */
    var revealables = document.querySelectorAll('.card, .table-wrap, .flow, .code, .notice, .timeline');
    if ('IntersectionObserver' in window && revealables.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
      for (var i = 0; i < revealables.length; i++) io.observe(revealables[i]);
    } else {
      for (var j = 0; j < revealables.length; j++) revealables[j].classList.add('in');
    }

    /* 进度条动画 */
    var bars = document.querySelectorAll('.bar > i[data-w]');
    function fillBars() {
      for (var i = 0; i < bars.length; i++) {
        var b = bars[i];
        var r = b.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) {
          b.style.width = b.getAttribute('data-w');
        }
      }
    }
    if (bars.length) {
      if ('IntersectionObserver' in window) {
        var io2 = new IntersectionObserver(function (es) {
          es.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.style.width = en.target.getAttribute('data-w');
              io2.unobserve(en.target);
            }
          });
        }, { threshold: 0.2 });
        for (var k = 0; k < bars.length; k++) io2.observe(bars[k]);
      } else { fillBars(); }
    }

    /* 当前页高亮 */
    var here = location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.sb-link');
    for (var m = 0; m < links.length; m++) {
      var href = (links[m].getAttribute('href') || '').split('/').pop();
      if (href === here) links[m].classList.add('active');
    }
  });
})();
