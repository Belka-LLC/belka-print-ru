'use strict';

(function ($) {
  $(document).ready(function () {

    /* ------------------------------------
             Выпадающее меню
    --------------------------------------*/
    $('.folder').on('click mouseenter focus', function (event) {

      correctSideOffset($(this));

      // folding process
      if (!((event.type == 'mouseenter') && ($('html').hasClass('touch-device')))) {

        if ($(this).hasClass('folder--opened')) {
          // close folder
          folding($(this));
        } else {
          // open folder
          unfolding($(this));
        }
      }

      function unfolding($folder) {
        const h = $folder.children('.folder__wrap').children('.folder__menu').outerHeight(true);
        $folder.children('.folder__wrap').addClass('folder__wrap--show');
        $folder.children('.folder__wrap').height(h);
        $folder.addClass('folder--opened');
      }
      function folding($folder) {
        $folder.children('.folder__wrap').removeClass('folder__wrap--show');
        $folder.children('.folder__wrap').height(0);
        $folder.children('.folder__toggle').blur();
        $folder.removeClass('folder--opened');
      }
      function correctSideOffset($folder) {
        const $folderWrap = $folder.children('.folder__wrap');
        // Correct side offset of unfolded menu
        const minOffset = 0;
        const offsetTop = $folderWrap.offset().top;
        const offsetLeft = $folderWrap.offset().left;
        const offsetRight = $('.main-nav__navbar').width() - offsetLeft - $folderWrap.width();
        if ((offsetLeft < minOffset) && (offsetRight > minOffset)) {
          $folderWrap.offset({
            top: offsetTop,
            left: minOffset,
          });
        }
        if ((offsetRight < minOffset) && (offsetLeft > minOffset)) {
          $folderWrap.offset({
            top: top,
            left: $('.main-nav__navbar').width() - $folderWrap.width() - minOffset,
          });
        }
      }
    });

    $('.folder').on('mouseleave', function () {
      $('.folder__wrap').each(function (indx, element) {
        $(element)
          .css('left', 'unset')
          .removeProp('style')
          .height(0)
          .removeClass('folder__wrap--show')
          .parents('.folder')
          .removeClass('folder--opened');
      });
      $(this).children('.folder__toggle').blur();
    });


  });

})(jQuery);
