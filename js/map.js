'use strict';

var ENTER_CODE = 13;
var ESC_CODE = 27;
var arrAdverts = [];

var arrTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var arrFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var arrCheckIn = [
  '12:00',
  '13:00',
  '14:00'
];


var arrCheckOut = [
  '12:00',
  '13:00',
  '14:00'
];

var arrType = [
  'flat',
  'house',
  'bungalo'
];

for (var i = 0; i < 8; i++) {
  arrAdverts.push({
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'location': {
      'x': getRandom(900, 300),
      'y': getRandom(500, 100)
    },
    'offer': {
      'title': arrTitles[getRandom(arrTitles.length, 0)],
      'address': 'location.x, location.y',
      'price': getRandom(1000000, 1000),
      'type': arrType[getRandom(arrType.length, 0)],
      'rooms': getRandom(5, 1),
      'guests': getRandom(10, 1),
      'checkin': arrCheckIn[getRandom(arrCheckIn.length, 0)],
      'checkout': arrCheckOut[getRandom(arrCheckOut.length, 0)],
      'features': getRandomFeatures(),
      'description': '',
      'photos': []
    }
  });
}

function getRandomFeatures() {
  var featuresCopy = arrFeatures.slice(0, arrFeatures.length);
  featuresCopy.splice(getRandom(arrFeatures.length, 0), getRandom(arrFeatures.length, 0));
  return featuresCopy;
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var pinMapWidth = 56;
var pinMapHeight = 75;

var pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var l = 0; l < arrAdverts.length; l++) {
  var randomPin = document.createElement('div');
  randomPin.innerHTML = '<div class = "pin pin--create pin--' + l + '" style = "left: ' +
    (arrAdverts[l].location.x - pinMapWidth / 2) + 'px;' +
      ' top: ' + (arrAdverts[l].location.y - pinMapHeight) + 'px"  tabindex="0">' +
      '<img src="' + arrAdverts[l].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
  fragment.appendChild(randomPin);
}
pinMap.appendChild(fragment);

var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

function showAdwert(numberOfAdvert) {

  lodgeTemplate.querySelector('.lodge__title').innerHTML = arrAdverts[numberOfAdvert].offer.title;
  lodgeTemplate.querySelector('.lodge__address').innerHTML = arrAdverts[numberOfAdvert].location.x +
    ', ' + arrAdverts[numberOfAdvert].location.y;
  lodgeTemplate.querySelector('.lodge__price').innerHTML = arrAdverts[numberOfAdvert].offer.price + ' &#x20bd/ночь';

  if (arrAdverts[numberOfAdvert].offer.type === 0) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
  } if (arrAdverts[numberOfAdvert].offer.type === 1) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
  } if (arrAdverts[numberOfAdvert].offer.type === 2) {
    lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
  }

  lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + arrAdverts[numberOfAdvert].offer.guests
    + ' гостей в ' + arrAdverts[numberOfAdvert].offer.rooms + ' комнатах';
  lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + arrAdverts[numberOfAdvert].offer.checkin +
    ', выезд до ' + arrAdverts[numberOfAdvert].offer.checkout;

  lodgeTemplate.querySelector('.lodge__features').innerHTML = '';
  for (var k = 0; k < arrAdverts[numberOfAdvert].offer.features.length; k++) {

    lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + arrAdverts[numberOfAdvert].offer.features[k] + ' feature__image">';

  }

  lodgeTemplate.querySelector('.lodge__description').innerHTML = arrAdverts[numberOfAdvert].offer.description;

  var oldDialogPanel = document.querySelector('.dialog__panel');
  var parentDialogPanel = oldDialogPanel.parentNode;
  parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

  document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + arrAdverts[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
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

// module4-task2

var noticeForm = document.forms[1];
noticeForm.setAttribute('name', 'notice__form');
noticeForm.elements.address.setAttribute('required', 'required');

noticeForm.elements.title.setAttribute('required', 'required');
noticeForm.elements.title.setAttribute('minlength', '30');
noticeForm.elements.title.setAttribute('maxlength', '100');
noticeForm.elements.title.setAttribute('maxlength', '100');

noticeForm.elements.price.setAttribute('required', 'required');
noticeForm.elements.price.setAttribute('type', 'number');
noticeForm.elements.price.setAttribute('value', '1000');
noticeForm.elements.price.setAttribute('min', '0');
noticeForm.elements.price.setAttribute('max', '1000000');

var formPrice = document.querySelector('#price');
formPrice.addEventListener('invalid', function () {
  if (!formPrice.validity.valid) {
    formPrice.setCustomValidity('Цена должна быть от ' + formPrice.min + ' до ' + formPrice.max);
  }
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

timeIn.addEventListener('click', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('click', function () {
  timeIn.value = timeOut.value;
});


