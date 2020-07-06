/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';

(function($) {
  $(document).ready(function() {
    // Проверка на тач-пад
    $('body').on('touchstart', function(e) {
      $('html').addClass('touch-device');
    });

    /* Показ системных сообщений в модальном окне */
    $('.modal').modal('show');

    /** Анимация при прокручивании окна */
    $(window).on('scroll ready load', function() {
      /* Положение суммы заказа */
      const winHeight = $(window).height();
      const scrollTop = $(document).scrollTop();
      const posFooter = $('footer').offset();
      if (posFooter.top < (winHeight + scrollTop)) {
        $('.webform-body').css('padding-bottom', 0);
        $('.summa').removeClass('fixed-bottom');
      } else {
        $('.webform-body').css('padding-bottom', $('.summa').outerHeight());
        $('.summa').addClass('fixed-bottom');
      };
      /** Активизация main-menu__item */
      const $navLinks = $('.main-menu__link');
      $navLinks.each(function(indx, element) {
        if ($(element).hasClass('active')) {
          $(element).parent().addClass('active');
        } else {
          $(element).parent().removeClass('active');
        }
      });
    });

    /* ------------------------------------
             Выпадающее меню
    --------------------------------------*/
    $('.folder').on('click mouseenter focus', function(event) {
      // on touch-devices: touch is mouseenter+click
      // console.log("---------------");
      // console.log(event.type);
      // console.log($(this).attr("class"));

      correctSideOffset($(this));

      // folding process
      if (!((event.type == 'mouseenter') && ($('html').hasClass('touch-device')))) {
        // exclude (mouseenter on touch-devices)

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
        console.log('folding');
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

    $('.folder').on('mouseleave', function() {
      $('.folder__wrap').each(function(indx, element) {
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


    /*
    ** Плавная прокрутка по якорной ссылке
    */
    $('body').on('click', '.local-menu [href*="#"]', function(e) {
      const fixedOffset = 50;
      $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixedOffset,
      }, 500);
      e.preventDefault();
    });

    /**
     * Webform
     */
    $('.webform-component--vybor-nalichiya-maketa')
        .on('click', function() {
          $('.webform').addClass('webform--active');
        });

    $(document).click(function() {
      setTimeout(function() {
        const winHeight = $(window).height();
        const scrollTop = $(document).scrollTop();
        const posFooter = $('footer').offset();
        if (posFooter.top < (winHeight + scrollTop)) {
          $('.webform-body').css('padding-bottom', 0);
          $('.summa').removeClass('fixed-bottom');
        } else {
          $('.webform-body').css('padding-bottom', $('.summa').outerHeight());
          $('.summa').addClass('fixed-bottom');
        }
      }, 50);
    });
  });


  /** Подсветка столбца таблицы */
  $('tbody td, thead th:not([colspan])').hover(
      (e) => {
        const $cell = $(e.currentTarget);
        const rowHeadCells = $cell.parents('table').children('tbody').children().first().children('th').size();

        const theadShifts = getShifts('thead');
        const tbodyShifts = getShifts('tbody');

        const tbodyCellIndexes = tbodyShifts.map(mapShifts);
        const theadCellIndexes = theadShifts.map(mapShifts);

        tbodyCellIndexes.forEach(function(col, row) {
          if (col > (rowHeadCells - 1 - tbodyShifts[row])) {
            $($($cell.parents('table').children('tbody').children()[row]).children()[col]).toggleClass('highlighted');
          }
        });
        theadCellIndexes.forEach(function(col, row) {
          if (col > (rowHeadCells - 1 - theadShifts[row])) {
            $($($cell.parents('table').children('thead').children()[row]).children('th:not([colspan])')[col]).toggleClass('highlighted');
          }
        });
        function getShifts(tag) {
          const arr = new Array($cell.parents('table').children(tag).children().size()).fill(0);
          $cell.parents('table').children(tag).children().each((rowIndx, element) => {
            $(element).children().each((cellIndx, element) => {
              const rowspan = parseInt($(element).attr('rowspan'));
              if (rowspan) {
                for (let index = rowIndx + 1; index < rowIndx + rowspan; index++) {
                  arr[index] = (arr[index]) ? arr[index] += 1 : arr[index] = 1;
                }
              }
            });
          });
          return arr;
        }
        function mapShifts(shift) {
          let index = $cell.index() - shift;
          if ($cell.parents('thead').size() > 0) {
            index += theadShifts[$cell.parent().index()];
          } else {
            index += tbodyShifts[$cell.parent().index()];
          }
          return index;
        }
      });

  /**
  * Загрузка файла
  */
  $('.webform input[type=file]').change(function() {
    const filename = $(this).val().replace(/.*\\/, '');
    if (filename) {
      $(this).parent().addClass('was-validated').children('label').text(filename);
    } else {
      $(this).parent().removeClass('was-validated').children('label').text('Выберите файл...');
    }
  });

  (function($) {
    Drupal.behaviors.autoUploadWebform = {
      attach: function( context, settings ) {
        $('.upload-button').css('display', 'none');
        $('.custom-file').on( 'change', 'input[type="file"]', function() {
          $(this).parent().next('input[type="submit"]').mousedown();
        });
      },
    };
  })(jQuery);

  /**
   * Masked Input for Tel
   */
  $('.webform-component--kontaktnye-dannye--tel input').mask('(999) 999 99 99');
})(jQuery);