'use strict';

var adverts = [8];
var advertsRandom = {
  'avatar': '',
  'title': '',
  'address': '{{location.x}}, {{location.y}}',
  'price': calcRandom(1000000, 1000),
  'type': ['flat', 'house', 'bungalo'],
  'rooms': calcRandom(5, 1),
  'guests': calcRandom(10, 1),
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': '',
  'photos': []
};

function calcRandom(max, min) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

for (var i = 0; i < 8; i++) {
  adverts[i] = advertsRandom;

}
console.log(adverts);
