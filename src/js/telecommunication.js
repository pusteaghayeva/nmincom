document.addEventListener('DOMContentLoaded', function () {

  function initSwitcher(cfg) {
    const items = document.querySelectorAll(cfg.itemSelector);
    if (!items.length) return;

    const hero = cfg.heroId ? document.getElementById(cfg.heroId) : null;
    const heroTitle = cfg.heroTitleId ? document.getElementById(cfg.heroTitleId) : null;
    const content = cfg.contentId ? document.getElementById(cfg.contentId) : null;

    // bg class-lar (yalnız enableBg=true olsa istifadə ediləcək)
    const bgClasses = Array.from(items)
      .map(el => el.dataset.bgclass)
      .filter(Boolean);
    const BG_CLASSES = Array.from(new Set(bgClasses));

    function render(el) {
      if (!el) return;

      // active toggle
      items.forEach(x => x.classList.remove(cfg.activeClass));
      el.classList.add(cfg.activeClass);

      // title (opsional)
      if (heroTitle) heroTitle.textContent = el.dataset.title || el.textContent.trim();

      // bg (opsional)
      if (cfg.enableBg && hero && el.dataset.bgclass) {
        hero.classList.remove(...BG_CLASSES);
        hero.classList.add(el.dataset.bgclass);
      }


      if (cfg.extraTitleId) {
        const t = document.getElementById(cfg.extraTitleId);
        if (t) t.textContent = el.dataset.title || el.textContent.trim();
        }


      // content
      const key = el.dataset.key;
      const block = document.querySelector(`#${cfg.textsId} [data-key="${key}"]`);

      if (content) {
        content.innerHTML = block ? block.innerHTML : '';
        // istəsən klikdə scroll yuxarı
        if (cfg.scrollTopOnChange) content.scrollTop = 0;
      }
    }

    // click
    items.forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        render(el);
      });
    });

    // initial
    const first = document.querySelector(`${cfg.itemSelector}.${cfg.activeClass}`) || items[0];
    render(first);
  }

  // 1) Telekommunikasiya: bg dəyişsin
  initSwitcher({
    itemSelector: '.telecommunication-button',
    activeClass: 'active',
    heroId: 'telecomBg',
    heroTitleId: 'telecomBgTitle',
    contentId: 'telecomContent',
    textsId: 'telecomTexts',
    enableBg: true,
    scrollTopOnChange: false
  });

  // 2) Etik davranış: bg dəyişməsin (yalnız title + content)
  initSwitcher({
    itemSelector: '.ehtical_behaviour_name',
    activeClass: 'active',
    heroId: 'ethicalHero',          // enableBg false olduğu üçün fərqi yoxdur
    heroTitleId: 'ethicalHeroTitle',
    contentId: 'ethicalContent',
    textsId: 'ethicalTexts',
    enableBg: false,
    scrollTopOnChange: false
  });

  // 3) Tariflər: bg dəyişməsin, sağ kontent dəyişsin (+ scroll yuxarı)
  initSwitcher({
    itemSelector: '.tariffs-button',
    activeClass: 'active',
    heroId: null,
    heroTitleId: null,
    contentId: 'tariffsScrollBody',
    textsId: 'tariffsTexts',
    enableBg: false,
    scrollTopOnChange: true
  });

  // 4) Əsasnamə bölməsi: bg dəyişməsin, hero blur + sağ title + content dəyişsin
initSwitcher({
  itemSelector: '.ethical_behavior_section .ehtical_behaviour_name',
  activeClass: 'active',
  heroId: null,
  heroTitleId: 'provisionsHeroTitle',
  contentId: 'provisionsContent',
  textsId: 'provisionsTexts',
  enableBg: false,
  scrollTopOnChange: true,

  extraTitleId: 'provisionsTitle'
  
});


});
