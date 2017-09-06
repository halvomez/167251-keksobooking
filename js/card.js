'use strict';

(function generateAdvert() {

  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

  function showAdvert(numberOfAdvert) {
    window.backend.load(getData);
    function getData(serverData) {
      if (typeof serverData === 'object') {
        drawCards(serverData);
      }
    }

    function drawCards(serverData) {

      lodgeTemplate.querySelector('.lodge__title').innerHTML = serverData[numberOfAdvert].offer.title;
      lodgeTemplate.querySelector('.lodge__address').innerHTML = serverData[numberOfAdvert].location.x +
    ', ' + serverData[numberOfAdvert].location.y;
      lodgeTemplate.querySelector('.lodge__price').innerHTML = serverData[numberOfAdvert].offer.price + ' &#x20bd/ночь';

      if (serverData[numberOfAdvert].offer.type === 0) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Квартира';
      } if (serverData[numberOfAdvert].offer.type === 1) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Дом';
      } if (serverData[numberOfAdvert].offer.type === 2) {
        lodgeTemplate.querySelector('.lodge__type').innerHTML = 'Бунгало';
      }

      lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + serverData[numberOfAdvert].offer.guests
    + ' гостей в ' + serverData[numberOfAdvert].offer.rooms + ' комнатах';
      lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML =
    'Заезд после ' + serverData[numberOfAdvert].offer.checkin +
    ', выезд до ' + serverData[numberOfAdvert].offer.checkout;

      lodgeTemplate.querySelector('.lodge__features').innerHTML = '';
      for (var k = 0; k < serverData[numberOfAdvert].offer.features.length; k++) {

        lodgeTemplate.querySelector('.lodge__features').innerHTML +=
      '<span class ="feature__image--' + serverData[numberOfAdvert].offer.features[k] + ' feature__image">';

      }

      lodgeTemplate.querySelector('.lodge__description').innerHTML = serverData[numberOfAdvert].offer.description;

      var oldDialogPanel = document.querySelector('.dialog__panel');
      var parentDialogPanel = oldDialogPanel.parentNode;
      parentDialogPanel.replaceChild(lodgeTemplate, oldDialogPanel);

      document.querySelector('.dialog__title').innerHTML = '<div class="dialog__title">' +
    '<img src="' + serverData[numberOfAdvert].author.avatar + '" alt="Avatar" width="70" height="70">' +
    '<a href="#" class="dialog__close"><img src="img/close.svg" alt="close" width="22" height="22"></a>' + '</div>';
    }
  }
  window.showCard = showAdvert;
})();
