(function ($) {

  $(document).ready(function () {

    $("body").on('touchstart', function (e) {
      $("html").addClass('touch-device');
    });

    /* Показ системных сообщений в модальном окне */
    $('.modal').modal('show');

    /** Анимация при прокручивании окна */
    $(window).on('scroll ready load', function () {
      /* Положение суммы заказа */
      var winHeight = $(window).height();
      var scrollTop = $(document).scrollTop();
      var posFooter = $("footer").offset();
      if (posFooter.top < (winHeight + scrollTop)) {
        $('.webform-body').css('padding-bottom', 0);
        $('.summa').removeClass('fixed-bottom');
      } else {
        $('.webform-body').css('padding-bottom', $('.summa').outerHeight());
        $('.summa').addClass('fixed-bottom');
      };
      /** Активизация main-menu__item */
      $navLinks = $('.main-menu__link');
      $navLinks.each(function (indx, element) {
        if ($(element).hasClass("active")) {
          $(element).parent().addClass("active");
        } else {
          $(element).parent().removeClass("active");
        }
      });
    });

    /* ------------------------------------
             Выпадающее меню
    --------------------------------------*/
    $('.folder').on('click mouseenter focus', function (event) {

      // folding process
      if (!((event.type == "mouseenter") && ($('html').hasClass("touch-device")))) {
        // exclude (mouseenter on touch-devices)

        correctSideOffset($(this));

        if ($(this).hasClass("folder--opened")) {
          folding($(this)); // close folder
        } else {
          unfolding($(this)); // open folder
        }
      }

      function unfolding($folder) {
        var h = $folder.children(".folder__wrap").children(".folder__menu").outerHeight(true);
        $folder.children(".folder__wrap").addClass("folder__wrap--show");
        $folder.children(".folder__wrap").height(h);
        $folder.addClass("folder--opened");
      }
      function folding($folder) {
        // console.log("folding");
        $folder.children(".folder__wrap").removeClass("folder__wrap--show");
        $folder.children(".folder__wrap").height(0);
        $folder.children(".folder__toggle").blur();
        $folder.removeClass("folder--opened");
      }
    });

    $('.folder').on("mouseleave", function () {
      $(".folder__wrap").each(function (indx, element) {
        $(element)
          .css("left", "unset")
          .removeProp("style")
          .height(0)
          .removeClass("folder__wrap--show")
          .parents(".folder")
          .removeClass("folder--opened");
      });
      $(this).children(".folder__toggle").blur();
    });

    function correctSideOffset($folder) {
      console.log('correcting position');
      var $folderWrap = $folder.children(".folder__wrap");
      // Correct side offset of unfolded menu
      var minOffset = 1;
      var offsetTop = $folderWrap.offset().top;
      var offsetLeft = $folderWrap.offset().left;
      var offsetRight = $(window).width() - offsetLeft - $folderWrap.outerWidth();
      if ((offsetLeft < minOffset) && (offsetRight > minOffset)) $folderWrap.offset({
        top: offsetTop,
        left: minOffset
      });
      if ((offsetRight < minOffset) && (offsetLeft > minOffset)) $folderWrap.offset({
        top: top,
        left: $(window).width() - $folderWrap.outerWidth() - minOffset
      });
    }

    /*
    ** Плавная прокрутка по якорной ссылке
    */
    $("body").on('click', '.local-menu [href*="#"]', function (e) {
      var fixed_offset = 0;
      $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixed_offset
      }, 500);
      e.preventDefault();
    });

    $(document).click(function () {
      setTimeout(function () {
        var winHeight = $(window).height();
        var scrollTop = $(document).scrollTop();
        var posFooter = $("footer").offset();
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
      $cell = $(e.currentTarget);
      rowHeadCells = $cell.parents('table').children('tbody').children().first().children('th').size();

      let theadShifts = getShifts('thead');
      let tbodyShifts = getShifts('tbody');

      let tbodyCellIndexes = tbodyShifts.map(mapShifts);
      let theadCellIndexes = theadShifts.map(mapShifts);

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
        let arr = new Array($cell.parents('table').children(tag).children().size()).fill(0);
        $cell.parents('table').children(tag).children().each((rowIndx, element) => {
          $(element).children().each((cellIndx, element) => {
            let rowspan = parseInt($(element).attr('rowspan'));
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
          index += theadShifts[$cell.parent().index()]
        } else {
          index += tbodyShifts[$cell.parent().index()]
        }
        return index;
      }
    });

})(jQuery);
