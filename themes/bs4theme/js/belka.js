(function () {
  // console.log('belka.js');
  var isStorageSupport = true;
  var closeInfo = "";
  try {
    closeInfo = localStorage.getItem("notice");
  } catch (err) {
    isStorageSupport = false;
  }

  var infoModal = document.querySelector(".notice");

  if (isStorageSupport) {
    if (closeInfo == "closed") {
      infoModal.style.display = "none";
    } else {
      infoModal.style.display = "";
    }
  }

  infoModal.addEventListener("click", function (evt) {
    evt.preventDefault();
    infoModal.style.display = "none";
    localStorage.setItem("notice", "closed");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (infoModal.style.display != "none") {
        infoModal.style.display = "none";
        localStorage.setItem("notice", "closed");
      }
    }
  });

  if (document.querySelector('body').classList.contains('front')) {
    anons_count();
    window.addEventListener('resize', anons_count);
  }

  function anons_count(evt) {
    var anonses = document.querySelectorAll('.anons');
    if (anonses.length) {
      var anons_count = anonses.length;
      var anonses_to_hide = 0;
      var window_width = window.innerWidth;
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
