/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';

(function ($) {
  $(document).ready(function () {
    // Проверка на тач-пад
    $('body').on('touchstart', function (e) {
      $('html').addClass('touch-device');
    });

    /* Показ системных сообщений в модальном окне */
    $('.modal').modal('show');

    /** Анимация при прокручивании окна */
    $(window).on('scroll ready load', function () {
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
      $navLinks.each(function (indx, element) {
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
    $('.folder').on('click mouseenter focus', function (event) {
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


    /*
    ** Плавная прокрутка по якорной ссылке
    */
    $('body').on('click', '.local-menu [href*="#"]', function (e) {
      const fixedOffset = 50;
      $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixedOffset,
      }, 500);
      e.preventDefault();
    });
  });


  /**
   * Webform
   */
  $('.webform-component--option')
    .on('click', function () {
      $('.webform').addClass('webform--active');
    });

  $(document).click(function () {
    setTimeout(function () {
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


  /** Подсветка столбца таблицы */
  $('tbody td, thead th:not([colspan])').hover(
    (e) => {
      const $cell = $(e.currentTarget);
      const rowHeadCells = $cell.parents('table').children('tbody').children().first().children('th').size();

      const theadShifts = getShifts('thead');
      const tbodyShifts = getShifts('tbody');

      const tbodyCellIndexes = tbodyShifts.map(mapShifts);
      const theadCellIndexes = theadShifts.map(mapShifts);

      tbodyCellIndexes.forEach(function (col, row) {
        if (col > (rowHeadCells - 1 - tbodyShifts[row])) {
          $($($cell.parents('table').children('tbody').children()[row]).children()[col]).toggleClass('highlighted');
        }
      });
      theadCellIndexes.forEach(function (col, row) {
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
   * Calculator
   */
  // const data = JSON.stringify(toSave);
  $.ajax({
    type: "POST",
    url: "sites/belka-print.ru/themes/bs4theme/src.php",
    data: JSON.stringify({
      name: 'viz',
      arr: [1,2,3,45],
    }),
    success: function (msg) {
      console.log("Прибыли данные:");
      console.log(msg);
    },
    error: function (msg) {
      console.log("Error!!");
    },
  });

  const koeff = 1.3;
  const designPrice = 300;
  const shippingPrice = 400;
  const vizPrices = {
    '1': {
      'digital': {
        100: 435,
        200: 715,
        300: 970,
        400: 1225,
        500: 1480,
        600: 1730,
        700: 2030,
        800: 2285,
        900: 2540,
        1000: 2790,
      },
      'offset': {
        1000: koeff * 760,
        2000: koeff * 1140,
        3000: koeff * 2410,
        4000: koeff * 2730,
        5000: koeff * 3630,
        6000: koeff * 4130,
        8000: koeff * 4930,
        10000: koeff * 5880,
        15000: koeff * 9520,
        20000: koeff * 10530,
      },
    },
    '2': {
      'digital': {
        100: 745,
        200: 1135,
        300: 1525,
        400: 1915,
        500: 2305,
        600: 2695,
        700: 3160,
        800: 3550,
        900: 3940,
        1000: 4330,
      },
      'offset': {
        1000: koeff * 950,
        2000: koeff * 1330,
        3000: koeff * 2680,
        4000: koeff * 3280,
        5000: koeff * 4170,
        6000: koeff * 4800,
        8000: koeff * 6080,
        10000: koeff * 7350,
        15000: koeff * 11520,
        20000: koeff * 12820,
      },
    },
  }
  const cartonPrices = {
    'cristalBoard': {
      100: 70,
      200: 110,
      300: 150,
      400: 190,
      500: 230,
      600: 270,
      700: 320,
      800: 360,
      900: 400,
      1000: 440,
    },
    'linen': {
      100: 290,
      200: 455,
      300: 620,
      400: 785,
      500: 950,
      600: 1115,
      700: 1320,
      800: 1485,
      900: 1650,
      1000: 1815,
    },
    'sirioPearl': {
      100: 545,
      200: 600,
      300: 815,
      400: 1030,
      500: 1250,
      600: 1470,
      700: 1740,
      800: 1955,
      900: 2175,
      1000: 2390,
    }
  }
  fillPrices();
  calcPrice();

  $('#edit-submitted-parameters-carton').on('change', function () {

  });
  $('#webform-client-form-74').on('change', 'input, select', calcPrice);

  function fillPrices(sides) {
    $('#edit-submitted-parameters-amount')
      .empty()
      .append(function () {
        let html = '<optgroup label="Цифровая печать">';
        for (let tiraz in vizPrices[1]['digital']) {
          html += '<option value="digital">' + tiraz + '</option>'
        }
        html += '<optgroup label="Офсетная печать">';
        for (let tiraz in vizPrices[1]['offset']) {
          html += '<option value="offset">' + tiraz + '</option>'
        }
        return html;
      });
  }

  function calcPrice() {
    const design = $('#edit-submitted-option :radio:checked').val();
    const metod = $('#edit-submitted-parameters-amount option:selected').val();
    const amount = $('#edit-submitted-parameters-amount option:selected').text();
    const carton = $('#edit-submitted-parameters-carton').val();
    const sides = $('#edit-submitted-parameters-sides :radio:checked').val();
    const rounded = $('#edit-submitted-parameters-rounded :checkbox').prop("checked");
    const shipping = $('#edit-submitted-order-get-option :radio:checked').val();

    const description = $('.webform-component--parameters--amount .description');
    description.text('* офсетная печать одного макета');

    $('#edit-submitted-parameters-amount .description').text();
    print = vizPrices[sides][metod][amount];

    if (metod == 'digital') {
      print += cartonPrices[carton][amount] - cartonPrices['cristalBoard'][amount];
      if (rounded) print += +amount;
      description.text('* цифровая печать' + ((+amount > 100) ? (' до ' + Math.round(amount / 100) + ' разных макетов') : ''));
    }

    if (design == 'design') print += designPrice;
    if (shipping == 'shipping') print += shippingPrice;


    $('.total__price').text(print);
    let summaryText = (sides == 1) ? 'Визитки односторонние' : 'Визитки двусторонние';
    summaryText += (metod == 'digital') ? ', цифровая печать' : ', офсетная печать';
    summaryText += (design == 'design') ? ', верстка макета' : ', макет заказчика';
    summaryText += (rounded) ? ', скругление' : '';
    summaryText += (shipping == 'shipping') ? ', доставка' : ', самовывоз';
    summaryText += '. Тираж ' + amount + ' шт.';
    $('.total__summary').text(summaryText);
  }

  /**
  * Загрузка файла
  */
  $('.webform input[type=file]').change(function () {
    const filename = $(this).val().replace(/.*\\/, '');
    if (filename) {
      $(this).parent().addClass('was-validated').children('label').text(filename);
    } else {
      $(this).parent().removeClass('was-validated').children('label').text('Выберите файл...');
    }
  });

  (function ($) {
    Drupal.behaviors.autoUploadWebform = {
      attach: function (context, settings) {
        $('.upload-button').css('display', 'none');
        $('.custom-file').on('change', 'input[type="file"]', function () {
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
