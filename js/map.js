'use strict';

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


