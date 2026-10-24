/* Mofumofu / navigation, theme and editorial motion */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

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

  function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function hex2rgb(hex) {
    hex = hex.replace('#', '');
    return [parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16)];
  }
  function mix(a, b, t) {
    var x = hex2rgb(a), y = hex2rgb(b);
    return 'rgb(' + Math.round(x[0] + (y[0] - x[0]) * t) + ',' +
      Math.round(x[1] + (y[1] - x[1]) * t) + ',' +
      Math.round(x[2] + (y[2] - x[2]) * t) + ')';
  }
  function luminance(hex) {
    var c = hex2rgb(hex);
    return .299 * c[0] + .587 * c[1] + .114 * c[2];
  }
  function surfaceBase() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? '#F2F1EC' : '#090D12';
  }
  function applyAccent(key) {
    var a = ACCENTS[key] || ACCENTS.teal;
    var root = document.documentElement;
    root.style.setProperty('--accent', a.primary);
    root.style.setProperty('--accent-hover', a.hover);
    root.style.setProperty('--accent-pressed', a.pressed);
    root.style.setProperty('--accent-line', a.primary);
    root.style.setProperty('--accent-soft', mix(a.primary, surfaceBase(), .82));
    root.style.setProperty('--accent-soft-hover', mix(a.primary, surfaceBase(), .72));
    root.style.setProperty('--accent-on', luminance(a.primary) > 140 ? '#06121A' : '#FFFFFF');
    document.querySelectorAll('.accent-dot').forEach(function (dot) {
      dot.classList.toggle('on', dot.getAttribute('data-accent') === key);
      dot.setAttribute('aria-pressed', dot.getAttribute('data-accent') === key ? 'true' : 'false');
    });
    lsSet(LS_ACCENT, key);
  }
  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', mode === 'light' ? '切换到深色主题' : '切换到浅色主题');
      btn.innerHTML = mode === 'light'
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/></svg>';
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'light' ? '#f2f1ec' : '#090d12');
  }
  function currentTheme() {
    var saved = lsGet(LS_THEME);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setupNavigation() {
    var menuBtn = document.getElementById('menuBtn');
    var sidebar = document.getElementById('sidebar');
    var scrim = document.getElementById('navScrim');
    function setMenu(open) {
      if (!sidebar || !menuBtn) return;
      sidebar.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    }
    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        setMenu(!sidebar.classList.contains('open'));
      });
      if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
      sidebar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 820) setMenu(false);
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) setMenu(false);
      });
    }

    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sb-link').forEach(function (link) {
      var active = (link.getAttribute('href') || '').split('/').pop() === here;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function setupChapters() {
    var nav = document.getElementById('chapterNav');
    var current = document.getElementById('chapterCurrent');
    var sections = Array.prototype.slice.call(document.querySelectorAll('.content > .section'));
    if (!sections.length) return;
    sections.forEach(function (section, index) {
      var number = String(index + 1).padStart(2, '0');
      var title = section.querySelector('.section-title');
      section.id = 'chapter-' + number;
      if (nav && title) {
        var link = document.createElement('a');
        link.href = '#' + section.id;
        link.setAttribute('aria-label', number + ' ' + title.textContent);
        var label = document.createElement('span');
        label.textContent = number + ' / ' + title.textContent;
        link.appendChild(label);
        nav.appendChild(link);
      }
    });
    function activate(id, title) {
      if (nav) nav.querySelectorAll('a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
      if (current && title) current.textContent = title;
    }
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var title = entry.target.querySelector('.section-title');
            activate(entry.target.id, title ? title.textContent : 'OVERVIEW');
          }
        });
      }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  function setupCommandPalette() {
    var dialog = document.getElementById('commandPalette');
    var openBtn = document.getElementById('commandBtn');
    var input = document.getElementById('commandInput');
    var results = document.getElementById('commandResults');
    if (!dialog || !openBtn || !input || !results) return;
    var pages = [];
    document.querySelectorAll('.sb-group').forEach(function (group) {
      var groupName = group.querySelector('.sb-group-label');
      group.querySelectorAll('.sb-link').forEach(function (link, index) {
        var label = link.querySelector('.sb-label');
        var num = link.querySelector('.nav-num');
        pages.push({
          href: link.getAttribute('href'),
          label: label ? label.textContent : link.textContent.trim(),
          group: groupName ? groupName.textContent : '',
          num: num ? num.textContent : String(index + 1).padStart(2, '0')
        });
      });
    });
    var filtered = pages.slice();
    var selected = 0;
    function render() {
      results.innerHTML = '';
      if (!filtered.length) {
        var empty = document.createElement('div');
        empty.className = 'command-empty';
        empty.textContent = '没有找到这个目的地，换个关键词试试。';
        results.appendChild(empty);
        return;
      }
      filtered.forEach(function (page, index) {
        var link = document.createElement('a');
        link.className = 'command-item' + (index === selected ? ' selected' : '');
        link.href = page.href;
        link.setAttribute('data-index', index);
        var num = document.createElement('span');
        num.className = 'ci-num';
        num.textContent = page.num;
        var label = document.createElement('span');
        label.className = 'ci-label';
        label.textContent = page.label;
        var group = document.createElement('span');
        group.className = 'ci-group';
        group.textContent = page.group + ' ↗';
        link.appendChild(num);
        link.appendChild(label);
        link.appendChild(group);
        link.addEventListener('mouseenter', function () {
          selected = index;
          results.querySelectorAll('.command-item').forEach(function (item, i) {
            item.classList.toggle('selected', i === selected);
          });
        });
        results.appendChild(link);
      });
    }
    function open() {
      filtered = pages.slice();
      selected = 0;
      input.value = '';
      render();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      window.setTimeout(function () { input.focus(); }, 30);
    }
    function close() {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    function move(delta) {
      if (!filtered.length) return;
      selected = (selected + delta + filtered.length) % filtered.length;
      render();
      var active = results.querySelector('.command-item.selected');
      if (active) active.scrollIntoView({ block: 'nearest' });
    }
    openBtn.addEventListener('click', open);
    input.addEventListener('input', function () {
      var query = input.value.trim().toLowerCase();
      filtered = pages.filter(function (page) {
        return (page.label + ' ' + page.group + ' ' + page.href).toLowerCase().indexOf(query) !== -1;
      });
      selected = 0;
      render();
    });
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      var box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
    });
    document.addEventListener('keydown', function (event) {
      var tag = event.target && event.target.tagName;
      var typing = tag === 'INPUT' || tag === 'TEXTAREA' || (event.target && event.target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.open) close(); else open();
      } else if (event.key === '/' && !typing && !dialog.open) {
        event.preventDefault();
        open();
      }
      if (!dialog.open) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
      if (event.key === 'Enter' && filtered[selected]) {
        event.preventDefault();
        location.href = filtered[selected].href;
      }
    });
  }

  function setupMotion() {
    var revealables = document.querySelectorAll('.section > .section-head, .card, .table-wrap, .flow, .code, .notice, .timeline, .pager');
    revealables.forEach(function (el) { el.classList.add('reveal'); });
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .04, rootMargin: '0px 0px -20px 0px' });
      revealables.forEach(function (el) { observer.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add('in'); });
    }
    window.requestAnimationFrame(function () { document.body.classList.add('ready'); });
  }

  function setupScrollEffects() {
    var progress = document.getElementById('scrollProgress');
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
    document.querySelectorAll('.grid').forEach(function (grid) {
      Array.prototype.slice.call(grid.children).forEach(function (card, index) {
        if (card.classList.contains('card')) card.setAttribute('data-card-index', String(index + 1).padStart(2, '0'));
      });
    });
    document.querySelectorAll('.bar > i[data-w]').forEach(function (bar) {
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.width = entry.target.getAttribute('data-w');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: .2 });
        observer.observe(bar);
      } else bar.style.width = bar.getAttribute('data-w');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme());
    var accent = lsGet(LS_ACCENT) || 'teal';
    applyAccent(ACCENTS[accent] ? accent : 'teal');

    var themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      lsSet(LS_THEME, next);
      applyAccent(lsGet(LS_ACCENT) || 'teal');
    });
    document.querySelectorAll('.accent-dot').forEach(function (dot) {
      dot.addEventListener('click', function () { applyAccent(dot.getAttribute('data-accent')); });
    });

    setupNavigation();
    setupChapters();
    setupCommandPalette();
    setupMotion();
    setupScrollEffects();
  });
})();
