'use strict';

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
      'title': arrTitles[i],
      'address': 'location.x, location.y',
      'price': getRandom(1000000, 1000),
      'type': ['flat', 'house', 'bungalo'],
      'rooms': getRandom(5, 1),
      'guests': getRandom(10, 1),
      'checkin': ['12:00', '13:00', '14:00'],
      'checkout': ['12:00', '13:00', '14:00'],
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    }
  });
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
  randomPin.innerHTML = '<div class = "pin" style = "left: ' + (arrAdverts[l].location.x - pinMapWidth / 2) + 'px;' +
      ' top: ' + (arrAdverts[l].location.y - pinMapHeight) + 'px">' +
      '<img src="' + arrAdverts[l].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
  fragment.appendChild(randomPin);
}
pinMap.appendChild(fragment);

var numberOfAdvert = 0;
var typeRandom = getRandom(arrAdverts[numberOfAdvert].offer.type.length, 0);
var checkInRandom = getRandom(arrAdverts[numberOfAdvert].offer.checkin.length, 0);
var checkOutRandom = getRandom(arrAdverts[numberOfAdvert].offer.checkout.length, 0);

var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

lodgeTemplate.querySelector('.lodge__title').innerHTML = arrAdverts[numberOfAdvert].offer.title;
lodgeTemplate.querySelector('.lodge__address').innerHTML = arrAdverts[numberOfAdvert].offer.address;
lodgeTemplate.querySelector('.lodge__price').innerHTML = arrAdverts[numberOfAdvert].offer.price + ' &#x20bd/ночь';

if (typeRandom === 0) {
  lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
} if (typeRandom === 1) {
  lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
} if (typeRandom === 2) {
  lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
}

lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + arrAdverts[numberOfAdvert].offer.guests
    + ' гостей в ' + arrAdverts[numberOfAdvert].offer.rooms + ' комнатах';
lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + arrAdverts[numberOfAdvert].offer.checkin[checkInRandom] +
    ', выезд до ' + arrAdverts[numberOfAdvert].offer.checkout[checkOutRandom];

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

var pinAll = document.querySelectorAll('.pin');

for (i = 0; i < pinAll.length; i++) {
  pinAll[i].classList.remove('pin-active');
  pinAll[i].addEventListener('click', function () {
    this.classList.add('pin--active');
  });
}

var pinActive = document.querySelector('.pin--active');
var dialogClose = document.querySelector('.dialog__close');
var dialog = document.querySelector('.dialog');
dialogClose.addEventListener('click', function () {
  dialog.classList.add('hidden');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
}
);


