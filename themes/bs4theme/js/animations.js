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

  /**
   *  Calculator's Webform
   */

  const calcForm = document.querySelector('.webform-client-form-74');
  if (calcForm) {


    const calcOption = document.querySelector('.webform-component--option');
    calcOption.addEventListener(
      'click',
      () => {
        document.querySelector('.webform').classList.add('webform--active');
        const fieldSets = document.querySelectorAll('.webform fieldset');
        for (const fieldset of fieldSets) {
          fieldset.classList.remove('disabled');
          fieldset.disabled = false;
        }
      },
      { once: true }
    );

    const checkValidation = () => {
      const submitButton = document.querySelector('.webform .form-actions .form-submit');
      const validatedMaket = ((document.querySelector('.form-managed-file input[type=hidden]').value > 0) ||
        (document.querySelector('#edit-submitted-design-information-text').textLength > 0) ||
        (document.querySelector('#edit-submitted-design-src-link').value.length > 0));
      const validatedEmail = (document.querySelector('#edit-submitted-customer-mail').validity.valid);
      const validatedConsent = (document.querySelector('#edit-submitted-customer-consent-1').validity.valid);

      submitButton.disabled = !(validatedMaket && validatedEmail && validatedConsent);
      let validWarningHTML = `<span class="total__warning--${validatedMaket}">макет</span>`;
      validWarningHTML += `, <span class="total__warning--${validatedEmail}">e-mail</span>`;
      validWarningHTML += `, <span class="total__warning--${validatedConsent}">согласие</span>`;
      const validWarning = document.createElement('p');
      validWarning.innerHTML = validWarningHTML;
      const submitButtonWrapper = document.createElement('div');
      submitButton.before(submitButtonWrapper);
      submitButtonWrapper.append(validWarning);
      submitButtonWrapper.append(submitButton);

    };

    checkValidation();


    calcForm.addEventListener('keyup', checkValidation);

    const observer = new MutationObserver(checkValidation);
    observer.observe(calcForm.querySelector('.webform-component--design--src'), { childList: true, subtree: true });

    /**
     * Calculator
     */
    let designPrice, shippingPrice, vizPrices, cartonPrices;

    if ($('body').hasClass('page-node-74')) {
      $.ajax({
        type: "POST",
        url: "sites/belka-print.ru/themes/bs4theme/src.php",
        data: 'viz',
        success: function (data) {
          parseData(JSON.parse(data));
          fillPrices();
          calcPrice();
        },
        error: function () {
          console.log("Error!!");
        },
      });

      $('#webform-client-form-74').on('change', 'input, select', calcPrice);
    }

    function parseData(data) {
      designPrice = data.designPrice;
      shippingPrice = data.shippingPrice;
      vizPrices = data.vizPrices;
      cartonPrices = data.cartonPrices;
    }

    function fillPrices() {
      $('#edit-submitted-parameters-amount')
        .empty()
        .append(function () {
          let html = '<optgroup label="Цифровая печать">';
          for (let tiraz in vizPrices[1]['digital']) {
            html += '<option value="' + tiraz + '" data-metod="digital">' + tiraz + '</option>'
          }
          html += '<optgroup label="Офсетная печать">';
          for (let tiraz in vizPrices[1]['offset']) {
            html += '<option value="' + tiraz + '" data-metod="offset">' + tiraz + '</option>'
          }
          return html;
        });
      $('#edit-submitted-parameters-carton')
        .empty()
        .append(function () {
          let html = '';
          let key = 1;
          for (let carton in cartonPrices) {
            html += '<option value="' + key + '" data-carton="' + carton + '">' + cartonPrices[carton]['name'] + '</option>';
            key++;
          }
          return html;
        });
    }

    function calcPrice() {
      const design = $('#edit-submitted-option :radio:checked').val();
      const metod = $('#edit-submitted-parameters-amount option:selected').data('metod');
      const amount = $('#edit-submitted-parameters-amount option:selected').text();
      const carton = $('#edit-submitted-parameters-carton option:selected').data('carton');
      const carton_name = $('#edit-submitted-parameters-carton option:selected').text();
      const sides = $('#edit-submitted-parameters-sides :radio:checked').val();
      const rounded = $('#edit-submitted-parameters-rounded :checkbox').prop("checked");
      const shipping = $('#edit-submitted-order-get-option :radio:checked').val();

      const description = $('.webform-component--parameters--amount .description');
      description.text('* офсетная печать одного макета');

      $('#edit-submitted-parameters-amount .description').text();
      let printCost = vizPrices[sides][metod][amount];

      if (metod == 'digital') {
        printCost += cartonPrices[carton][amount] - cartonPrices['cristalBoard'][amount];
        if (rounded) printCost += +amount;
        description.text('* цифровая печать' + ((+amount > 100) ? (' до ' + Math.round(amount / 100) + ' разных макетов') : ''));
      }

      if (design == 'design') printCost += designPrice;
      if (shipping == 'shipping') printCost += shippingPrice;


      $('.total__price').text(printCost);
      $('#edit-submitted-summa').val(printCost);
      let summaryText = (sides == 1) ? 'Визитки односторонние' : 'Визитки двусторонние';
      summaryText += (design == 'design') ? ', верстка макета' : ', макет заказчика';
      summaryText += (metod == 'digital') ? ', цифровая печать' : ', офсетная печать';
      summaryText += ', ' + carton_name.toLowerCase();
      summaryText += (rounded) ? ', скругление' : '';
      summaryText += (shipping == 'shipping') ? ', доставка' : ', самовывоз';
      summaryText += `. <br>Тираж ${amount} шт.`;
      $('.total__summary').html(summaryText);
    }
  }
  /**
  * Загрузка файла сразу после выбора
  */
  Drupal.behaviors.autoUploadWebform = {
    attach: (context) => {
      $('.upload-button', context).css('display', 'none');
      $('.custom-file', context).on('change', 'input[type=file]', (evt) => {
        $(evt.target).parent().next('input[type="submit"]').mousedown();
      });
    },
  };

})(jQuery);
