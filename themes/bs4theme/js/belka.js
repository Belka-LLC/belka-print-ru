'use strict';

(function() {
  // console.log('belka.js');

  // проверка поддержки localStorage
  let isStorageSupport = true;
  let shownNoticeDate = '';
  try {
    shownNoticeDate = localStorage.getItem('bp_notice_date');
  } catch (err) {
    isStorageSupport = false;
  }

  const divNotice = document.querySelector('.notice');
  const noticeDate = divNotice
      .querySelector('.notice__section')
      .getAttribute('date');

  if (isStorageSupport) {
    if (shownNoticeDate == noticeDate) {
      divNotice.style.display = 'none';
    } else {
      divNotice.style.display = '';
    }
  }

  divNotice.addEventListener('click', function(evt) {
    evt.preventDefault();
    divNotice.style.display = 'none';
    localStorage.setItem('bp_notice_date', noticeDate);
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (divNotice.style.display != 'none') {
        divNotice.style.display = 'none';
        localStorage.setItem('bp_notice_date', noticeDate);
      }
    }
  });
})();
