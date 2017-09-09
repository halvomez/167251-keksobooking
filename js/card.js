'use strict';

(function generateAdvert() {

  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

  window.backend.load(getData);
  var advertData;
  function getData(serverData) {
    if (typeof serverData === 'object') {
      advertData = serverData;
    }
  }
  window.getData = getData;

  function showCard(numberOfAdvert) {

    lodgeTemplate.querySelector('.lodge__title').innerHTML = advertData[numberOfAdvert].offer.title;
    lodgeTemplate.querySelector('.lodge__address').innerHTML = advertData[numberOfAdvert].location.x +
    ', ' + advertData[numberOfAdvert].location.y;
    lodgeTemplate.querySelector('.lodge__price').innerHTML = advertData[numberOfAdvert].offer.price + ' &#x20bd/ночь';

    if (advertData[numberOfAdvert].offer.type === 'flat') {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
    } if (advertData[numberOfAdvert].offer.type === 'house') {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
    } if (advertData[numberOfAdvert].offer.type === 'bungalo') {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Сарай';
    }

    lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + advertData[numberOfAdvert].offer.guests
    + ' гостей в ' + advertData[numberOfAdvert].offer.rooms + ' комнатах';
    lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + advertData[numberOfAdvert].offer.checkin +
    ', выезд до ' + advertData[numberOfAdvert].offer.checkout;

    lodgeTemplate.querySelector('.lodge__features').innerHTML = '';

    for (var k = 0; k < advertData[numberOfAdvert].offer.features.length; k++) {
      lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + advertData[numberOfAdvert].offer.features[k] + ' feature__image">';
    }

    lodgeTemplate.querySelector('.lodge__description').innerHTML = advertData[numberOfAdvert].offer.description;
    lodgeTemplate.querySelector('.lodge__photos').innerHTML = '';

    for (var i = 0; i < advertData[numberOfAdvert].offer.photos.length; i++) {
      lodgeTemplate.querySelector('.lodge__photos').innerHTML +=
    '<img src="' + advertData[numberOfAdvert].offer.photos[i] + '" alt="Lodge photo" width="52" height="42">';
    }

    var oldDialogPanel = document.querySelector('.dialog__panel');
    var parentDialogPanel = oldDialogPanel.parentNode;
    parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

    document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + advertData[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
    '<a href="#" class="dialog__close"><img src="img/close.svg" alt="close" width="22" height="22"></a>' + '</div>';
  }
  window.showCard = showCard;
})();
