'use strict';

(function () {
  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HEIGHT = 94;

  function activatePin() {

    var pinsAll = document.querySelectorAll('.pin--create');
    var pinClicked;

    function showPinActive(event) {

      if (pinClicked) {
        pinClicked.classList.remove('pin--active');
      }
      pinClicked = event.currentTarget;
      for (i = 0; i < pinsAll.length; i++) {
        if (pinClicked.classList.contains('pin--' + i)) {
          window.showCard(i);
        }
      }
      pinClicked.classList.add('pin--active');
      dialog.classList.remove('hidden');
      clickDialogClose();
      pressEsc();
    }

    for (var i = 0; i < pinsAll.length; i++) {
      pinsAll[i].addEventListener('click', showPinActive);
      pinsAll[i].addEventListener('keydown', function (event) {
        if (event.keyCode === ENTER_CODE) {
          showPinActive(event);
        }
      });
    }

    var dialog = document.querySelector('.dialog');
    var dialogClose;
    dialog.classList.add('hidden');

    function clickDialogClose() {
      dialogClose = document.querySelector('.dialog__close');
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

    function pressEsc() {
      document.addEventListener('keydown', function (event) {
        if (event.keyCode === ESC_CODE) {
          dialog.classList.add('hidden');
          pinClicked.classList.remove('pin--active');
        }
      });
    }

  }
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.elements.address.setAttribute('readonly', 'readonly');
  noticeForm.elements.address.setAttribute('placeholder', 'Переместите метку на карте');
  var pinMain = document.querySelector('.pin__main');

  pinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    function onMouseMove(moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      var pinMainY = pinMain.offsetTop - shift.y;
      var pinMainX = pinMain.offsetLeft - shift.x;

      pinMain.style.top = pinMainY + 'px';
      pinMain.style.left = pinMainX + 'px';

      var formAddress = noticeForm.elements.address;
      formAddress.value = 'x: ' + (pinMainX + PIN_MAIN_WIDTH / 2) + ', y: ' + (pinMainY + PIN_MAIN_HEIGHT);
    }

    function onMouseUp(upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.activatePin = activatePin;
})();


