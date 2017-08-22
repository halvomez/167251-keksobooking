'use strict';

var arrAdverts = [];

var arrTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

for (var i = 0; i < 8; i++) {
  arrAdverts.push({
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'location': {
      'x': Math.floor(getRandom(900, 100)),
      'y': Math.floor(getRandom(500, 100))
    },
    'offer': {
      'title': arrTitle[i],
      'address': 'location.x, location.y',
      'price': Math.floor(getRandom(1000000, 1000)),
      'type': ['flat', 'house', 'bungalo'],
      'rooms': Math.floor(getRandom(5, 1)),
      'guests': Math.floor(getRandom(10, 1)),
      'checkin': ['12:00', '13:00', '14:00'],
      'checkout': ['12:00', '13:00', '14:00'],
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    }
  });
}

function getRandom(max, min) {
  return (Math.random() * (max - min)) + min;
}

var pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var l = 0; l < arrAdverts.length; l++) {
  var randomPin = document.createElement('div');
  randomPin.innerHTML = '<div class = "pin" style = "left: ' + arrAdverts[l].location.x + 'px; top: ' + arrAdverts[l].location.y + 'px">' +
      '<img src="' + arrAdverts[l].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
  fragment.appendChild(randomPin);
}
pinMap.appendChild(fragment); // рандомные метки


// 4 пункт

var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog-panel');

lodgeTemplate.querySelector('.lodge__title').innerHTML = arrAdverts[0].offer.title;
lodgeTemplate.querySelector('.lodge__address').innerHTML = arrAdverts[0].offer.address;
lodgeTemplate.querySelector('.offer.price').innerHTML = arrAdverts[0].offer.price + '&#x20bd/ночь';
lodgeTemplate.querySelector('.lodge__type').innerHTML = arrAdverts[0].offer.type[1];
lodgeTemplate.querySelector('.lodge__rooms-and-guest').innerHTML = 'Для ' + arrAdverts[0].offer.guests + ' гостей в ' + arrAdverts[0].offer.rooms + ' комнатах';
lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + arrAdverts[0].offer.checkin + ', выезд до ' + arrAdverts[0].offer.checkout;
lodgeTemplate.querySelector('.lodge__features').innerHTML = '<span class ="' + arrAdverts[0].offer.features[1] + ' feature__image">';
lodgeTemplate.querySelector('.lodge__description').innerHTML = arrAdverts[0].offer.description;

pinMap.appendChild(lodgeTemplate);