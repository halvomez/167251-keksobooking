'use strict';

(function workWithPins() {

  function activatePin() {
    var ENTER_CODE = 13;
    var ESC_CODE = 27;

    var pinAll = document.querySelectorAll('.pin--create');
    var pinClicked;

    function pinActive(event) {

      if (pinClicked) {
        pinClicked.classList.remove('pin--active');
      }
      pinClicked = event.currentTarget;
      for (i = 0; i < pinAll.length; i++) {
        if (pinClicked.classList.contains('pin--' + i)) {
          window.showCard(i);
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

    var pinMainWidth = 75;
    var pinMainHeight = 94;

    var pinMain = document.querySelector('.pin__main');
    pinMain.classList.remove('hidden');

    var noticeForm = document.forms[1];
    noticeForm.elements.address.setAttribute('readonly', 'readonly');
    noticeForm.elements.address.setAttribute('placeholder', 'Переместите метку на карте');

    pinMain.addEventListener('mousedown', function (event) {
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

        var pinMainY = pinMain.offsetTop - shift.y;
        var pinMainX = pinMain.offsetLeft - shift.x;

        pinMain.style.top = pinMainY + 'px';
        pinMain.style.left = pinMainX + 'px';

        var formAddress = noticeForm.elements.address;
        formAddress.value = 'x: ' + (pinMainX + pinMainWidth / 2) + ', y: ' + (pinMainY + pinMainHeight);
      };

      var onMouseUp = function (upEvent) {
        upEvent.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseMove);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  window.activatePin = activatePin;

})();


