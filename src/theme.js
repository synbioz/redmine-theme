$(document).on('ready page:load', function () {
  (function() {
    $('#context-menu').on('mouseenter', '.folder', function () {
      var
        $submenu = $(this).find('ul'),
        overflow = window.innerHeight - $submenu.innerHeight() - $submenu.offset().top;
      if ( overflow < 0 ) {
        $submenu.css('margin-top', overflow);
      }
    });
    $('#q').focus( function () {
      $('body').addClass('showMenu')
    });
    $('#q').blur( function () {
      $('body').removeClass('showMenu')
    });
  })();
});