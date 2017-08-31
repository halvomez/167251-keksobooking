'use strict';

var ENTER_CODE = 13;
var ESC_CODE = 27;

var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

function showAdwert(numberOfAdvert) {

  lodgeTemplate.querySelector('.lodge__title').innerHTML = adverts[numberOfAdvert].offer.title;
  lodgeTemplate.querySelector('.lodge__address').innerHTML = adverts[numberOfAdvert].location.x +
    ', ' + adverts[numberOfAdvert].location.y;
  lodgeTemplate.querySelector('.lodge__price').innerHTML = adverts[numberOfAdvert].offer.price + ' &#x20bd/ночь';

  if (adverts[numberOfAdvert].offer.type === 0) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
  } if (adverts[numberOfAdvert].offer.type === 1) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
  } if (adverts[numberOfAdvert].offer.type === 2) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
  }

  lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + adverts[numberOfAdvert].offer.guests
    + ' гостей в ' + adverts[numberOfAdvert].offer.rooms + ' комнатах';
  lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + adverts[numberOfAdvert].offer.checkin +
    ', выезд до ' + adverts[numberOfAdvert].offer.checkout;

  lodgeTemplate.querySelector('.lodge__features').innerHTML = '';
  for (var k = 0; k < adverts[numberOfAdvert].offer.features.length; k++) {

    lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + adverts[numberOfAdvert].offer.features[k] + ' feature__image">';

  }

  lodgeTemplate.querySelector('.lodge__description').innerHTML = adverts[numberOfAdvert].offer.description;

  var oldDialogPanel = document.querySelector('.dialog__panel');
  var parentDialogPanel = oldDialogPanel.parentNode;
  parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

  document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + adverts[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
    '<a href="#" class="dialog__close"><img src="img/close.svg" alt="close" width="22" height="22"></a>' + '</div>';

}

var pinAll = document.querySelectorAll('.pin--create');


var pinClicked;
function pinActive(event) {
  if (pinClicked) {
    pinClicked.classList.remove('pin--active');
  }
  pinClicked = event.currentTarget;
  for (i = 0; i < pinAll.length; i++) {
    if (pinClicked.classList.contains('pin--' + i)) {
      showAdwert(i);
    }
  }
  pinClicked.classList.add('pin--active');
  dialog.classList.remove('hidden');
  onCloseClick();
  closeEsc();
}

for (i = 0; i < pinAll.length; i++) {
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


