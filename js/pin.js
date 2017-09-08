'use strict';

(function drawPins() {
  var pinMapWidth = 56;
  var pinMapHeight = 75;
  var pins = [];

  window.backend.load(getData);

  function getData(serverData) {
    if (typeof serverData === 'object') {
      pins = serverData;
      addPins(pins);
      window.activatePin();
    }
  }


  function renderPins() {
    var filtredPins = pins.filter(function (pin) {
      return pin.offer.type === 'flat';
    });
    console.log(filtredPins);
  }

  var formFilter = document.forms[0];
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');

  houseType.addEventListener('change', renderPins);

  function addPins() {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var randomPin = document.createElement('div');
      randomPin.innerHTML = '<div class = "pin pin--create pin--' + i + '" style = "left: ' +
      (pins[i].location.x - pinMapWidth / 2) + 'px;' +
      ' top: ' + (pins[i].location.y - pinMapHeight) + 'px"  tabindex="0">' +
      '<img src="' + pins[i].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
      fragment.appendChild(randomPin);
    }
    pinMap.appendChild(fragment);
  }
})();
