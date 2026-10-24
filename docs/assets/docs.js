/* Mofumofu / docs runtime: theme, drawer, toc, copy */
(function () {
  'use strict';

  var ACCENTS = {
    teal:   { primary: '#3FC6C1', hover: '#70E2DD', pressed: '#33BDB8' },
    blue:   { primary: '#5AA9E6', hover: '#82C4F2', pressed: '#4590CE' },
    green:  { primary: '#4CC38A', hover: '#75DDA9', pressed: '#3AA876' },
    orange: { primary: '#F2AE49', hover: '#F7C470', pressed: '#D8962F' },
    pink:   { primary: '#E5698F', hover: '#EE8AA9', pressed: '#CC5379' },
    purple: { primary: '#A78BFA', hover: '#BCA5FF', pressed: '#8F6EF0' }
  };
  var LS_THEME = 'mofu.theme';
  var LS_ACCENT = 'mofu.accent';

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', mode === 'light' ? '切换到深色主题' : '切换到浅色主题');
      btn.innerHTML = mode === 'light'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/></svg>';
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'light' ? '#f2f1ec' : '#090d12');
    lsSet(LS_THEME, mode);
  }

  function applyAccent(key) {
    var a = ACCENTS[key];
    if (!a) return;
    var s = document.documentElement.style;
    s.setProperty('--accent', a.primary);
    s.setProperty('--accent-hover', a.hover);
    s.setProperty('--accent-pressed', a.pressed);
  }

  function initTheme() {
    applyTheme(lsGet(LS_THEME) || 'dark');
    applyAccent(lsGet(LS_ACCENT) || 'teal');
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
      });
    }
  }

  function initDrawer() {
    var side = document.getElementById('docSide');
    var btn = document.getElementById('menuBtn');
    var scrim = document.getElementById('navScrim');
    if (!side || !btn) return;
    function setOpen(open) {
      side.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!side.classList.contains('open'));
    });
    if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
    side.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && side.classList.contains('open')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  function initCopy() {
    document.querySelectorAll('.cb-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.closest('.cb').querySelector('code');
        var text = pre ? pre.innerText : '';
        var done = function () {
          btn.textContent = '已复制';
          btn.classList.add('done');
          setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('done'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
        } else {
          fallback(text, done);
        }
      });
    });
    function fallback(text, done) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  function initProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function initToc() {
    var links = [].slice.call(document.querySelectorAll('.toc-list a'));
    if (!links.length) return;
    var heads = links.map(function (a) { return document.getElementById(a.getAttribute('data-toc')); });
    var current = -1;

    function update() {
      var idx = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i] && heads[i].getBoundingClientRect().top <= 132) idx = i;
      }
      if (idx !== current) {
        current = idx;
        links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  function boot() {
    initTheme();
    initDrawer();
    initCopy();
    initProgress();
    initToc();
  }
})();
