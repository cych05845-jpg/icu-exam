/* 主題切換（考生頁與管理頁共用）。預設主題在 exams/list.js 的 DEFAULT_THEME 設定 */
(function () {
  var THEMES = [
    { id: 'holo',     name: '全息',   sw: 'linear-gradient(135deg,#00c6ff,#5b5cf6 55%,#ff4fd8)' },
    { id: 'aurora',   name: '晨光',   sw: 'linear-gradient(135deg,#3b6cf6,#22b8e6)' },
    { id: 'mint',     name: '薄荷',   sw: 'linear-gradient(135deg,#0ea5a0,#34d399)' },
    { id: 'lavender', name: '薰衣草', sw: 'linear-gradient(135deg,#7c5cf0,#e46fb5)' },
    { id: 'space',    name: '深空',   sw: 'linear-gradient(135deg,#0a0f1f 45%,#38d6f5)' },
    { id: 'classic',  name: '經典綠', sw: '#0f6b5c' }
  ];
  var KEY = 'exam_theme';
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function valid(t) { return THEMES.some(function (x) { return x.id === t; }); }
  function apply(t, remember) {
    if (!valid(t)) t = 'holo';
    document.documentElement.setAttribute('data-theme', t);
    if (remember) { try { localStorage.setItem(KEY, t); } catch (e) {} }
    var sws = document.querySelectorAll('.theme-sw');
    for (var i = 0; i < sws.length; i++) sws[i].classList.toggle('on', sws[i].getAttribute('data-t') === t);
  }
  apply(saved() || window.DEFAULT_THEME || 'holo');
  window.setExamTheme = apply;

  // 在 el 後面放一顆「🎨 主題」按鈕
  window.mountThemePicker = function (anchor) {
    if (!anchor) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'theme-btn'; btn.textContent = '🎨 主題';
    var pop = document.createElement('div');
    pop.className = 'theme-pop'; pop.hidden = true;
    pop.innerHTML = THEMES.map(function (t) {
      return '<button type="button" class="theme-sw" data-t="' + t.id + '"><i style="background:' + t.sw + '"></i>' + t.name + '</button>';
    }).join('');
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);
    document.body.appendChild(pop);
    btn.onclick = function (e) {
      e.stopPropagation();
      var r = btn.getBoundingClientRect();
      pop.style.top = (r.bottom + window.scrollY) + 'px';
      pop.hidden = !pop.hidden;
    };
    pop.onclick = function (e) {
      var b = e.target.closest('.theme-sw'); if (!b) return;
      apply(b.getAttribute('data-t'), true); pop.hidden = true;
    };
    document.addEventListener('click', function (e) { if (!pop.contains(e.target) && e.target !== btn) pop.hidden = true; });
    window.addEventListener('scroll', function () { pop.hidden = true; }, { passive: true });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') pop.hidden = true; });
    window.closeThemePicker = function () { pop.hidden = true; };
    apply(document.documentElement.getAttribute('data-theme'));
  };
})();
