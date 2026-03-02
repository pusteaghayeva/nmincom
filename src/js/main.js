// nav
const searchIcons = document.querySelectorAll('.search-icon');
const searchBg = document.querySelector('.search-bg');
const closeBtn = document.querySelector('.search-close');
const headerEl = document.querySelector('header.header-main');

function setHeaderH(){
  if(!headerEl) return;
  const h = headerEl.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--headerH', `${Math.ceil(h)}px`);
}

function openSearch(){
  setHeaderH();
  searchBg.classList.add('search-menu-open');
  document.body.classList.add('search-open');
  searchIcons.forEach(ic => ic.classList.add('active'));
}

function closeSearch(){
  searchBg.classList.remove('search-menu-open');
  document.body.classList.remove('search-open');
  searchIcons.forEach(ic => ic.classList.remove('active'));
}

searchIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = searchBg.classList.contains('search-menu-open');
    isOpen ? closeSearch() : openSearch();
  });
});

if(closeBtn) closeBtn.addEventListener('click', closeSearch);

window.addEventListener('load', setHeaderH);
window.addEventListener('resize', setHeaderH);

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeSearch();
});
// nav end
// nav  fixed
 (function () {
    const stickyEl = document.querySelector('.js-sticky');
    if (!stickyEl) return;

    const stickyAt = stickyEl.offsetTop; // istəsən 0 yazıb həmişə fixed edə bilərsən

    function onScroll() {
      const shouldStick = window.scrollY > stickyAt;
      stickyEl.classList.toggle('sticky', shouldStick);
      stickyEl.classList.toggle('is-sticky', shouldStick);
      document.body.classList.toggle('has-sticky', shouldStick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
  // footer navbar
(() => {
  const nav = document.getElementById('footerNav');
  if(!nav) return;

  const items = nav.querySelectorAll('.footer-item.has-sub');
  const isMobile = () => window.matchMedia('(max-width: 767.98px)').matches;

  items.forEach(item => {
    const link = item.querySelector('.footer-link');

    link.addEventListener('click', function(e){

      if(isMobile()){
        e.preventDefault();
        e.stopPropagation();

        items.forEach(i => { if(i !== item) i.classList.remove('is-open'); });

        item.classList.toggle('is-open');
      }

    }, true); 
  });

  window.addEventListener('resize', () => {
    if(!isMobile()) items.forEach(i => i.classList.remove('is-open'));
  });
})();


// news1
(function () {
  if (!window.jQuery) return;
  if (!jQuery.fn || !jQuery.fn.owlCarousel) return;

  const $newsOwl = jQuery('#newsOwl');
  if (!$newsOwl.length) return;
  $newsOwl.owlCarousel({
    loop: false,
    nav: false,
    dots: false,
    smartSpeed: 300,
    autoWidth: true,
    margin: 14,
    responsive: {
      0: { items: 1, autoWidth: false, margin: 12 },
      577: { autoWidth: true, margin: 14 }
    }
  });

  function fadeHero() {
    const content = document.querySelector('.news-hero__content');
    const mediaBox = document.querySelector('.news-hero__mediaBox');

    if (content) content.classList.add('is-fading');
    if (mediaBox) mediaBox.classList.add('is-fading');

    setTimeout(() => {
      if (content) content.classList.remove('is-fading');
      if (mediaBox) mediaBox.classList.remove('is-fading');
    }, 120);
  }

  function renderFromCard(cardEl) {
    if (!cardEl) return;

    fadeHero();

    document.getElementById('heroTitle').textContent = cardEl.dataset.title || '';
    document.getElementById('heroText').textContent = cardEl.dataset.text || '';

    const img = cardEl.dataset.image || '';
    const heroImg = document.getElementById('heroImage');

    heroImg.classList.add('is-loading');
    heroImg.style.opacity = '0';

    if (!img) {
      heroImg.removeAttribute('src');
      return;
    }
    heroImg.onload = null;
    heroImg.onerror = null;

    heroImg.onload = function () {
      heroImg.classList.remove('is-loading');
      heroImg.style.opacity = '1';
    };

    heroImg.onerror = function () {
      heroImg.classList.add('is-loading');
      heroImg.style.opacity = '0';
    };

    heroImg.src = img;
  }

  function setActive(cardEl) {
    document
      .querySelectorAll('#newsOwl .news-card.is-active')
      .forEach(el => el.classList.remove('is-active'));
    cardEl.classList.add('is-active');
  }

  const firstCard =
    document.querySelector('#newsOwl .news-card.is-active') ||
    document.querySelector('#newsOwl .news-card');

  if (firstCard) renderFromCard(firstCard);

  $newsOwl.on('click', '.news-card', function () {
    const idx = Number(this.dataset.index);
    if (Number.isNaN(idx)) return;

    setActive(this);
    renderFromCard(this);
    $newsOwl.trigger('to.owl.carousel', [idx, 250, true]);
  });

  $newsOwl.on('changed.owl.carousel', function (event) {
    if (!event || !event.item) return;

    const currentIndex = event.item.index;

    const card = document.querySelector(
      `#newsOwl .news-card[data-index="${currentIndex}"]`
    );
    if (!card) return;

    setActive(card);
    renderFromCard(card);
  });


  const prevBtn = document.querySelector('.news-carousel__nav--prev');
  const nextBtn = document.querySelector('.news-carousel__nav--next');

  if (prevBtn)
    prevBtn.addEventListener('click', () => $newsOwl.trigger('prev.owl.carousel'));

  if (nextBtn)
    nextBtn.addEventListener('click', () => $newsOwl.trigger('next.owl.carousel'));
})();


jQuery("#carousel").owlCarousel({
  autoplay: true,
  rewind: false, 
  margin: 20,
  loop: true,

  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  nav: true,
  navText: [
    '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',
    '<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>'],
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1024: {
      items: 3
    },

    1366: {
      items: 3
    }
  }
});

// layiheler
$(function () {
  const $section = $("#projectsSection");
  const $owl = $section.find("#projects-carousel");
  if (!$section.length || !$owl.length) return;
  if ($owl.hasClass("owl-loaded")) {
    $owl.trigger("destroy.owl.carousel");
    $owl.removeClass("owl-loaded owl-hidden");
    $owl.find(".owl-stage-outer").children().unwrap();
    $owl.find(".owl-stage").children().unwrap();
    $owl.find(".owl-item").removeClass("active-project");
    $owl.find(".owl-item, .item, .project-card").removeAttr("style");
    $owl.removeAttr("style");
  }

  function setLeftFromItem($item) {
    $section.find("#dynamic-kicker").text($item.data("kicker") || "");
    $section.find("#dynamic-title").text($item.data("title") || "");
    $section.find("#dynamic-desc").text($item.data("desc") || "");
  }

  function updateArrows() {
    const api = $owl.data("owl.carousel");
    if (!api) return;

    const current = api.current();
    const max = api.maximum();

    const $prev = $section.find(".prev-arrow");
    const $next = $section.find(".next-arrow");
    if ($prev.length) $prev.prop("disabled", current <= 0);
    if ($next.length) $next.prop("disabled", current >= max);
  }

  function syncByIndex(index) {
    const $item = $owl.find(".owl-item").eq(index).find(".item").first();

    $owl.find(".owl-item").removeClass("active-project");
    $owl.find(".owl-item").eq(index).addClass("active-project");

    $section.toggleClass("is-start", index === 0);

    $section.addClass("no-fade");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => $section.removeClass("no-fade"));
    });

    setLeftFromItem($item);
    updateArrows();
  }

  requestAnimationFrame(function () {
    $owl.owlCarousel({
      loop: false,
      rewind: false,
      nav: false,
      dots: false,
      smartSpeed: 400,
      slideBy: 1,
      autoWidth: true,
      margin: 30,
      responsive: {
        0:    { margin: 15, stagePadding: 40 },
        768:  { margin: 20, stagePadding: 90 },
        1200: { margin: 30, stagePadding: 170 }
      },

      
      onInitialized: function (e) {
        syncByIndex(e.item.index);
      }
    });

    $owl.off("translated.owl.carousel.projects");
    $owl.on("translated.owl.carousel.projects", function (e) {
      syncByIndex(e.item.index);
    });
  });

  $section.off("click.projectsCard").on("click.projectsCard", ".project-card", function () {
    const index = $(this).closest(".owl-item").index();
    $owl.trigger("to.owl.carousel", [index, 400, true]);
  });

  $section.off("click.projectsPrev").on("click.projectsPrev", ".prev-arrow", function (e) {
    e.preventDefault();
    $owl.trigger("prev.owl.carousel");
  });

  $section.off("click.projectsNext").on("click.projectsNext", ".next-arrow", function (e) {
    e.preventDefault();
    $owl.trigger("next.owl.carousel");
  });
});

// other owl-carousel
jQuery("#useful-carousel").owlCarousel({
  autoplay: true,
  rewind: false, /* use rewind if you don't want loop */
  margin: 60,
  loop: true,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1024: {
      items: 3
    },

    1200: {
      items: 4
    }
  }
});

// back to top
(function ($) {
  "use strict";
  $(".switch").on("click", function () {
    if ($("body").hasClass("light")) {
      $("body").removeClass("light");
      $(".switch").removeClass("switched");
    } else {
      $("body").addClass("light");
      $(".switch").addClass("switched");
    }
  });

  $(document).ready(function () {
    "use strict";


    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
  });
})(jQuery);

