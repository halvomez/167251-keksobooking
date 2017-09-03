'use strict';

(function generateAdvert() {


  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

  window.showCard = function showAdvert(numberOfAdvert) {

    lodgeTemplate.querySelector('.lodge__title').innerHTML = window.data[numberOfAdvert].offer.title;
    lodgeTemplate.querySelector('.lodge__address').innerHTML = window.data[numberOfAdvert].location.x +
    ', ' + window.data[numberOfAdvert].location.y;
    lodgeTemplate.querySelector('.lodge__price').innerHTML = window.data[numberOfAdvert].offer.price + ' &#x20bd/ночь';

    if (window.data[numberOfAdvert].offer.type === 0) {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
    } if (window.data[numberOfAdvert].offer.type === 1) {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
    } if (window.data[numberOfAdvert].offer.type === 2) {
      lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
    }

    lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + window.data[numberOfAdvert].offer.guests
    + ' гостей в ' + window.data[numberOfAdvert].offer.rooms + ' комнатах';
    lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + window.data[numberOfAdvert].offer.checkin +
    ', выезд до ' + window.data[numberOfAdvert].offer.checkout;

    lodgeTemplate.querySelector('.lodge__features').innerHTML = '';
    for (var k = 0; k < window.data[numberOfAdvert].offer.features.length; k++) {

      lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + window.data[numberOfAdvert].offer.features[k] + ' feature__image">';

    }

    lodgeTemplate.querySelector('.lodge__description').innerHTML = window.data[numberOfAdvert].offer.description;

    var oldDialogPanel = document.querySelector('.dialog__panel');
    var parentDialogPanel = oldDialogPanel.parentNode;
    parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

    document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + window.data[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
    '<a href="#" class="dialog__close"><img src="img/close.svg" alt="close" width="22" height="22"></a>' + '</div>';

  };
})();
