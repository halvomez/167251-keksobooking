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
    clearMap();
    // addPins(filtredPins);
  }

  function clearMap() {
  }


  var formFilter = document.forms[0];
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');

  houseType.addEventListener('change', renderPins);


  var pinMap = document.querySelector('.tokyo__pin-map');

  function addPins(data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var randomPin = document.createElement('div');
      randomPin.classList.add('div--create');
      randomPin.innerHTML = '<div class = "pin pin--create pin--' + i + '" style = "left: ' +
      (data[i].location.x - pinMapWidth / 2) + 'px;' +
      ' top: ' + (data[i].location.y - pinMapHeight) + 'px"  tabindex="0">' +
      '<img src="' + data[i].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
      fragment.appendChild(randomPin);
    }
    pinMap.appendChild(fragment);
  }
})();
