  (function(){
    const items = document.querySelectorAll('.faqs-blog .faq-item');

    function closeItem(item){
      item.classList.remove('is-open');
      const a = item.querySelector('.faq-a');
      a.style.maxHeight = 0;
    }

    function openItem(item){
      item.classList.add('is-open');
      const a = item.querySelector('.faq-a');
      a.style.maxHeight = a.scrollHeight + 'px';
    }

    // init: əvvəlcədən is-open varsa hündürlüyü düz qoy
    items.forEach(item => {
      const a = item.querySelector('.faq-a');
      if(item.classList.contains('is-open')){
        a.style.maxHeight = a.scrollHeight + 'px';
      } else {
        a.style.maxHeight = 0;
      }

      item.querySelector('.faq-q').addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // hamısını bağla
        items.forEach(closeItem);

        // əgər bağlı idi, bunu aç
        if(!isOpen) openItem(item);
      });
    });

    // resize-da açıq itemin hündürlüyünü yenilə
    window.addEventListener('resize', () => {
      const open = document.querySelector('.faqs-blog .faq-item.is-open .faq-a');
      if(open) open.style.maxHeight = open.scrollHeight + 'px';
    });
  })();
