'use strict';

(function createAdverts() {

  var adverts = [];

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var checkInTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];


  var checkOutTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var types = [
    'flat',
    'house',
    'bungalo'
  ];

  for (var i = 0; i < 8; i++) {
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'location': {
        'x': getRandom(900, 300),
        'y': getRandom(500, 100)
      },
      'offer': {
        'title': titles[getRandom(titles.length, 0)],
        'address': 'location.x, location.y',
        'price': getRandom(1000000, 1000),
        'type': types[getRandom(types.length, 0)],
        'rooms': getRandom(5, 1),
        'guests': getRandom(10, 1),
        'checkin': checkInTimes[getRandom(checkInTimes.length, 0)],
        'checkout': checkOutTimes[getRandom(checkOutTimes.length, 0)],
        'features': getRandomFeatures(),
        'description': '',
        'photos': []
      }
    });
  }

  function getRandomFeatures() {
    var featuresCopy = features.slice(0, features.length);
    featuresCopy.splice(getRandom(features.length, 0), getRandom(features.length, 0));
    return featuresCopy;
  }

  function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
})();
