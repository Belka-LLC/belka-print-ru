"use strict"

(function () {
  // console.log('belka.js');

  // проверка поддержки localStorage
  let isStorageSupport = true;
  let shownNoticeDate = "";
  try {
    shownNoticeDate = localStorage.getItem("bp_notice_date");
  } catch (err) {
    isStorageSupport = false;
  }

  let divNotice = document.querySelector(".notice");
  let noticeDate = divNotice.querySelector(".notice__section").getAttribute("date");

  if (isStorageSupport) {
    if (shownNoticeDate == noticeDate) {
      divNotice.style.display = "none";
    } else {
      divNotice.style.display = "";
    }
  }

  divNotice.addEventListener("click", function (evt) {
    evt.preventDefault();
    divNotice.style.display = "none";
    localStorage.setItem("bp_notice_date", noticeDate);
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (divNotice.style.display != "none") {
        divNotice.style.display = "none";
        localStorage.setItem("bp_notice_date", noticeDate);
      }
    }
  });

  /**
   * Удаление висячего анонса
   */
  // if (document.querySelector('body').classList.contains('front')) {
  //   anons_count();
  //   window.addEventListener('resize', anons_count);
  // }

  function anons_count(evt) {
    let anonses = document.querySelectorAll('.anons');
    if (anonses.length) {
      let anons_count = anonses.length;
      let anonses_to_hide = 0;
      let window_width = window.innerWidth;
      anonses[anons_count - 1].classList.add('d-flex');
      anonses[anons_count - 1].classList.remove('d-none');

      if (window_width >= 1200) {
        anonses_to_hide = anons_count % 4;
      } else {
        if (window_width >= 992) {
          anonses_to_hide = anons_count % 3;
        }
      }
      if (anonses_to_hide == 1) {
        anonses[anons_count - 1].classList.remove('d-flex');
        anonses[anons_count - 1].classList.add('d-none');
      }
    }
  }

})();
