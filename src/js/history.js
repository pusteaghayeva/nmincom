const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

(function () {
  const root = document.getElementById('historyRoot');
  const safeRoot = root || document.documentElement;

  const yearsRow    = document.getElementById('yearsRow');
  const viewport    = document.getElementById('yearsViewport');
  const prevBtn     = document.getElementById('yearsPrev');
  const nextBtn     = document.getElementById('yearsNext');

  const buttons     = Array.from(yearsRow.querySelectorAll('.yearBtn'));
  const panels      = Array.from(document.querySelectorAll('.panel'));
  const connector   = document.getElementById('connector');
  const contentArea = document.getElementById('contentArea');

  if (!yearsRow || !viewport || !buttons.length) return;

  let tx = 0;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function maxTranslate() {
    return Math.max(0, yearsRow.scrollWidth - viewport.clientWidth);
  }

  function applyTranslate() {
    if (!isDesktop()) {
      tx = 0;
      yearsRow.style.transform = 'none';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    tx = clamp(tx, 0, maxTranslate());
    yearsRow.style.transform = `translateX(${-tx}px)`;

    prevBtn.disabled = tx <= 0;
    nextBtn.disabled = tx >= maxTranslate() - 1;
  }

  function stepAmount() {
    return Math.round(viewport.clientWidth * 0.85);
  }

  prevBtn.addEventListener('click', () => {
    tx -= stepAmount();
    applyTranslate();
  });

  nextBtn.addEventListener('click', () => {
    tx += stepAmount();
    applyTranslate();
  });

  function ensureVisible(btn) {
    if (!isDesktop()) return;

    const viewRect = viewport.getBoundingClientRect();
    const btnRect  = btn.getBoundingClientRect();

    if (btnRect.left < viewRect.left) {
      tx -= (viewRect.left - btnRect.left);
    } else if (btnRect.right > viewRect.right) {
      tx += (btnRect.right - viewRect.right);
    }

    applyTranslate();
  }

  function pickInitialYear() {
    const now = new Date().getFullYear();
    const exact = buttons.find(b => +b.dataset.year === now);
    return exact ? exact.dataset.year : buttons[0].dataset.year;
  }

  function closeAll() {
    buttons.forEach(b => b.classList.remove('is-active'));
    panels.forEach(p => p.classList.remove('is-active'));
  }

  function activate(year, btn) {
    buttons.forEach(b => b.classList.toggle('is-active', b.dataset.year === year));
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === year));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => recalcConnector(btn));
    });
  }

  function recalcConnector(btn) {
    if (!connector || !contentArea) return;
    if (getComputedStyle(connector).display === 'none') return;

    const panel = panels.find(p => p.classList.contains('is-active'));
    if (!panel) return;

    const text = panel.querySelector('[data-text]');
    if (!text) return;

    const viewRect    = viewport.getBoundingClientRect();
    const btnRect     = btn.getBoundingClientRect();
    const contentRect = contentArea.getBoundingClientRect();
    const textRect    = text.getBoundingClientRect();

    const visibleLeft  = Math.max(btnRect.left, viewRect.left);
    const visibleRight = Math.min(btnRect.right, viewRect.right);
    let cx = ((visibleLeft + visibleRight) / 2) - contentRect.left;

    cx = clamp(cx, 24, contentArea.clientWidth - 24);

    const offsetY =
      parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--btnOffsetY')) || 0;

    const cy = (btnRect.bottom - contentRect.top) + 10 + offsetY;

    let ch = (textRect.top - contentRect.top) - cy;
    ch = Math.max(18, ch);

    let cw = contentArea.clientWidth - cx - 40;
    cw = Math.max(120, cw);

    safeRoot.style.setProperty('--cx', cx + 'px');
    safeRoot.style.setProperty('--cy', cy + 'px');
    safeRoot.style.setProperty('--ch', ch + 'px');
    safeRoot.style.setProperty('--cw', cw + 'px');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.dataset.year;
      const active = btn.classList.contains('is-active');

      if (!isDesktop() && active) {
        closeAll(); 
        return;
      }

      ensureVisible(btn);
      activate(year, btn);
    });
  });

  window.addEventListener('resize', () => {
    applyTranslate();
    requestAnimationFrame(() => {
      const activeBtn = buttons.find(b => b.classList.contains('is-active'));
      if (activeBtn) recalcConnector(activeBtn);
    });
  });

  const initYear = pickInitialYear();
  const initBtn = buttons.find(b => b.dataset.year === initYear);
  activate(initYear, initBtn);
  ensureVisible(initBtn);
  applyTranslate();
})();
