'use strict';

(function generateAdvert() {


  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

  function showAdvert(numberOfAdvert) {

    window.loadBackend(function (serverAdverts) {

      lodgeTemplate.querySelector('.lodge__title').innerHTML = serverAdverts[numberOfAdvert].offer.title;
      lodgeTemplate.querySelector('.lodge__address').innerHTML = serverAdverts[numberOfAdvert].location.x +
    ', ' + serverAdverts[numberOfAdvert].location.y;
      lodgeTemplate.querySelector('.lodge__price').innerHTML = serverAdverts[numberOfAdvert].offer.price + ' &#x20bd/ночь';

      if (serverAdverts[numberOfAdvert].offer.type === 0) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
      } if (serverAdverts[numberOfAdvert].offer.type === 1) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
      } if (serverAdverts[numberOfAdvert].offer.type === 2) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
      }

      lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + serverAdverts[numberOfAdvert].offer.guests
    + ' гостей в ' + serverAdverts[numberOfAdvert].offer.rooms + ' комнатах';
      lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + serverAdverts[numberOfAdvert].offer.checkin +
    ', выезд до ' + serverAdverts[numberOfAdvert].offer.checkout;

      lodgeTemplate.querySelector('.lodge__features').innerHTML = '';
      for (var k = 0; k < serverAdverts[numberOfAdvert].offer.features.length; k++) {

        lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + serverAdverts[numberOfAdvert].offer.features[k] + ' feature__image">';

      }

      lodgeTemplate.querySelector('.lodge__description').innerHTML = serverAdverts[numberOfAdvert].offer.description;

      var oldDialogPanel = document.querySelector('.dialog__panel');
      var parentDialogPanel = oldDialogPanel.parentNode;
      parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

      document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + serverAdverts[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
    '<a href="#" class="dialog__close"><img src="img/close.svg" alt="close" width="22" height="22"></a>' + '</div>';
    });
  }
  window.showCard = showAdvert;
})();
