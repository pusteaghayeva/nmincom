document.addEventListener('DOMContentLoaded', function () {

  function initSwitcher(cfg) {
    const items = document.querySelectorAll(cfg.itemSelector);
    if (!items.length) return;

    const hero = cfg.heroId ? document.getElementById(cfg.heroId) : null;
    const heroTitle = cfg.heroTitleId ? document.getElementById(cfg.heroTitleId) : null;
    const content = cfg.contentId ? document.getElementById(cfg.contentId) : null;

    const bgClasses = Array.from(items)
      .map(el => el.dataset.bgclass)
      .filter(Boolean);
    const BG_CLASSES = Array.from(new Set(bgClasses));

    function render(el) {
      if (!el) return;

      items.forEach(x => x.classList.remove(cfg.activeClass));
      el.classList.add(cfg.activeClass);

      if (heroTitle) heroTitle.textContent = el.dataset.title || el.textContent.trim();

      if (cfg.enableBg && hero && el.dataset.bgclass) {
        hero.classList.remove(...BG_CLASSES);
        hero.classList.add(el.dataset.bgclass);
      }


      if (cfg.extraTitleId) {
        const t = document.getElementById(cfg.extraTitleId);
        if (t) t.textContent = el.dataset.title || el.textContent.trim();
        }

      const key = el.dataset.key;
      const block = document.querySelector(`#${cfg.textsId} [data-key="${key}"]`);

      if (content) {
        content.innerHTML = block ? block.innerHTML : '';
        if (cfg.scrollTopOnChange) content.scrollTop = 0;
      }
    }

    items.forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        render(el);
      });
    });

    const first = document.querySelector(`${cfg.itemSelector}.${cfg.activeClass}`) || items[0];
    render(first);
  }

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

  initSwitcher({
    itemSelector: '.ehtical_behaviour_name',
    activeClass: 'active',
    heroId: 'ethicalHero',          
    heroTitleId: 'ethicalHeroTitle',
    contentId: 'ethicalContent',
    textsId: 'ethicalTexts',
    enableBg: false,
    scrollTopOnChange: false
  });

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
