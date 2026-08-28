
(function(){
  var root = document.documentElement;
  var rail = document.getElementById('rail');
  var scrim = document.getElementById('scrim');
  var hamburger = document.getElementById('hamburger');

  // 主题切换
  var tgl = document.getElementById('themeToggle');
  var saved = null;
  try { saved = localStorage.getItem('nya-docs-theme'); } catch(e){}
  if (saved === 'light') { root.setAttribute('data-theme','light'); tgl.checked = true; }
  tgl.addEventListener('change', function(){
    if (tgl.checked) { root.setAttribute('data-theme','light'); }
    else { root.setAttribute('data-theme','dark'); }
    try { localStorage.setItem('nya-docs-theme', tgl.checked ? 'light' : 'dark'); } catch(e){}
  });

  // 移动端抽屉
  function closeDrawer(){ rail.classList.remove('open'); scrim.classList.remove('show'); }
  hamburger.addEventListener('click', function(){
    rail.classList.toggle('open'); scrim.classList.toggle('show');
  });
  scrim.addEventListener('click', closeDrawer);

  // 移动端：点导航后收起抽屉（多页架构下导航是普通链接跳转）
  document.querySelectorAll('.nav-item').forEach(function(b){
    b.addEventListener('click', function(){
      if (window.innerWidth <= 880) closeDrawer();
    });
  });

  // 本页目录：高亮当前标题
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-list a'));
  var LINE = 132;                       // sticky 顶栏 64px + 判断余量
  function absTop(el){ return el.getBoundingClientRect().top + window.pageYOffset; }
  var ticking = false;
  function updateToc(){
    ticking = false;
    if (!tocLinks.length) return;
    var best = tocLinks[0];
    for (var i = 0; i < tocLinks.length; i++){
      var t = document.getElementById(tocLinks[i].getAttribute('href').slice(1));
      if (t && absTop(t) <= window.pageYOffset + LINE) best = tocLinks[i];
    }
    for (var j = 0; j < tocLinks.length; j++){
      tocLinks[j].classList.toggle('active', tocLinks[j] === best);
    }
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(updateToc); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateToc();

  // URL hash 定位
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) setTimeout(function(){ t.scrollIntoView(); }, 60);
  }

  // 代码块复制按钮
  function copyText(text, btn){
    var done = function(){
      btn.classList.add('copied');
      btn.textContent = '已复制 ✓';
      setTimeout(function(){
        btn.classList.remove('copied');
        btn.textContent = '复制';
      }, 1600);
    };
    var fallback = function(){
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else { fallback(); }
  }
  document.querySelectorAll('.md-content .code-wrap').forEach(function(wrap){
    var btn = document.createElement('button');
    btn.className = 'code-copy';
    btn.type = 'button';
    btn.textContent = '复制';
    btn.setAttribute('aria-label', '复制代码');
    btn.addEventListener('click', function(){
      var code = wrap.querySelector('code') || wrap;
      copyText(code.textContent, btn);
    });
    wrap.appendChild(btn);
  });
})();
