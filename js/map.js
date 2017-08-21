'use strict';

var arrAdverts = [];

var arrAvatar = [];
var avatarNumber = 1;
for (var j = 0; j < 8; j++) {
  arrAvatar[j] = 'img/avatars/user0' + avatarNumber + '.png';
  avatarNumber++;
}

var countArrTitle = 0;
var countArrAuthor = 0;

var arrTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

for (var i = 0; i < 8; i++) {
  arrAdverts[i] = {
    'author': {
      'avatar': arrAvatar[countArrAuthor]
    },
    'location': {
      'x': calcRandom(900, 100),
      'y': calcRandom(500, 100)
    },
    'offer': {
      'title': arrTitle[countArrTitle],
      'address': 'location.x, location.y',
      'price': calcRandom(1000000, 1000),
      'type': ['flat', 'house', 'bungalo'],
      'rooms': calcRandom(5, 1),
      'guests': calcRandom(10, 1),
      'checkin': ['12:00', '13:00', '14:00'],
      'checkout': ['12:00', '13:00', '14:00'],
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    }
  };
  countArrAuthor++;
  countArrTitle++;
}

function calcRandom(max, min) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

var randomPin = document.createElement('div');

document.body.appendChild(randomPin);


/*
for (var l = 0; l < arrAdverts.length; l++) {
  randomPin.innerHTML = '<div class = "pin" style = "left: ' + arrAdverts[l].location.x + 'px; top: ' + arrAdverts[l].location.y + 'px">' +
      '<img src="sd" class = "rounded" width="40" height="40">' +
      '</div>';
  document.body.appendChild(randomPin);
}

console.log(arrAdverts[1].location.x);
*/


