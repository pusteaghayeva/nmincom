const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

(function () {
  const shells = document.querySelectorAll('[data-scrollshell]');
  if (!shells.length) return;

  shells.forEach(shell => {
    const body = shell.querySelector('[data-scrollbody]');
    const thumb = shell.querySelector('[data-thumb]');
    const track = shell.querySelector('.tariffs-scroll-track');
    if (!body || !thumb || !track) return;

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

    function syncThumb() {
      // ✅ Mobil-də custom scrollbar işləməsin
      if (!isDesktop()) {
        thumb.style.display = 'none';
        return;
      }

      const scrollH = body.scrollHeight;
      const clientH = body.clientHeight;

      // kontent azdırsa thumb gizlə
      if (scrollH <= clientH + 1) {
        thumb.style.display = 'none';
        return;
      } else {
        thumb.style.display = 'block';
      }

      const trackH = track.clientHeight;

      const ratio = clientH / scrollH;
      const thumbH = clamp(Math.round(trackH * ratio), 70, 220);
      thumb.style.height = thumbH + 'px';

      const maxThumbTop = trackH - thumbH;
      const maxScrollTop = scrollH - clientH;

      const thumbTop = (body.scrollTop / maxScrollTop) * maxThumbTop;
      thumb.style.top = thumbTop + 'px';
    }

    // scroll olunca thumb yenilə
    body.addEventListener('scroll', syncThumb);

    // drag start
    thumb.addEventListener('mousedown', (e) => {
      if (!isDesktop()) return; // mobil safety
      isDragging = true;
      startY = e.clientY;
      startTop = parseFloat(getComputedStyle(thumb).top) || 0;
      e.preventDefault();
    });

    // drag move
    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !isDesktop()) return;

      const trackH = track.clientHeight;
      const thumbH = thumb.clientHeight;
      const maxThumbTop = trackH - thumbH;

      const delta = e.clientY - startY;
      const newTop = clamp(startTop + delta, 0, maxThumbTop);
      thumb.style.top = newTop + 'px';

      const maxScrollTop = body.scrollHeight - body.clientHeight;
      const ratio = maxThumbTop === 0 ? 0 : (newTop / maxThumbTop);
      body.scrollTop = ratio * maxScrollTop;
    });

    // drag end
    document.addEventListener('mouseup', () => { isDragging = false; });

    // track-ə klik
    track.addEventListener('mousedown', (e) => {
      if (!isDesktop()) return;
      if (e.target === thumb) return;

      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;

      const trackH = track.clientHeight;
      const thumbH = thumb.clientHeight;
      const maxThumbTop = trackH - thumbH;

      const newTop = clamp(clickY - thumbH / 2, 0, maxThumbTop);

      const maxScrollTop = body.scrollHeight - body.clientHeight;
      const ratio = maxThumbTop === 0 ? 0 : (newTop / maxThumbTop);

      body.scrollTo({ top: ratio * maxScrollTop, behavior: 'smooth' });
    });

    // ilkin hesabla + resize
    syncThumb();
    window.addEventListener('resize', syncThumb);
  });
})();
