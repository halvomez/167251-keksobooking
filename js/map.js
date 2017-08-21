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

console.log(arrAdverts);


/* var randomPin = document.createElement('div');

document.body.appendChild(randomPin);*/


/*
for (var l = 0; l < arrAdverts.length; l++) {
  randomPin.innerHTML = '<div class = "pin" style = "left: ' + arrAdverts[l].location.x + 'px; top: ' + arrAdverts[l].location.y + 'px">' +
      '<img src="sd" class = "rounded" width="40" height="40">' +
      '</div>';
  document.body.appendChild(randomPin);
}

console.log(arrAdverts[1].location.x);
*/


