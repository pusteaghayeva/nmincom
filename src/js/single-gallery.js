$('[data-fancybox="gallery"]').fancybox({
  loop: true,
  buttons: ["zoom", "slideShow", "thumbs", "close"],
  afterClose: function(instance, current) {
    // Məsələn, owl carousel refresh (əgər istifadə edirsənsə)
    $('#carousel').trigger('refresh.owl.carousel');
  }
});
$('[data-fancybox="gallery"]').on('afterClose.fb', function() {
  $('.fancybox-slide').css({
    'transform': '',
    'width': ''
  });
});