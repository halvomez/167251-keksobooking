'use strict';

(function activatePin() {

  var ENTER_CODE = 13;
  var ESC_CODE = 27;

  var pinAll = document.querySelectorAll('.pin--create');

  var pinClicked;
  function pinActive(event) {
    var showAdvert = window.util.showAdvert;
    if (pinClicked) {
      pinClicked.classList.remove('pin--active');
    }
    pinClicked = event.currentTarget;
    for (i = 0; i < pinAll.length; i++) {
      if (pinClicked.classList.contains('pin--' + i)) {
        showAdvert(i);
      }
    }
    pinClicked.classList.add('pin--active');
    dialog.classList.remove('hidden');
    onCloseClick();
    closeEsc();
  }

  for (var i = 0; i < pinAll.length; i++) {
    pinAll[i].addEventListener('click', pinActive);
    pinAll[i].addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_CODE) {
        pinActive(event);
      }
    });
  }

  var dialog = document.querySelector('.dialog');
  dialog.classList.add('hidden');

  function onCloseClick() {
    var dialogClose = document.querySelector('.dialog__close');
    dialogClose.addEventListener('click', function () {
      dialog.classList.add('hidden');
      pinClicked.classList.remove('pin--active');
    });
    dialogClose.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_CODE) {
        dialog.classList.add('hidden');
        pinClicked.classList.remove('pin--active');
      }
    });
  }

  function closeEsc() {
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_CODE) {
        dialog.classList.add('hidden');
        pinClicked.classList.remove('pin--active');
      }
    });
  }

  var pinMain = document.querySelector('.pin__main');
  pinMain.classList.remove('hidden');
  var pinMainImg = pinMain.children[0];
  var noticeForm = window.util;
  var formAddress = noticeForm.elements;
console.log(noticeForm);

  pinMainImg.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();


