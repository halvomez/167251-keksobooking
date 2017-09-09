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

  function renderPins(param) {
    var filtredPins = pins.filter(function (pin) {
      return pin.offer.type === param;
    });
    clearMap();
    addPins(filtredPins);
    window.activatePin();
  }

  var pinMap = document.querySelector('.tokyo__pin-map');

  function clearMap() {
    var divCreateAll = pinMap.querySelectorAll('.div--create');
    var divCreate;
    for (var i = 0; i < divCreateAll.length; i++) {
      divCreate = pinMap.querySelector('.div--create')
      pinMap.removeChild(divCreate);
    }
  }


  var formFilter = document.forms[0];
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');
  var flat = 'flat';
  var house = 'house';
  var bungalo = 'bungalo';

  houseType.addEventListener('change', function (event) {
    if (event.target.value === 'flat') {
      renderPins(flat);
    } else if (event.target.value === 'house') {
      renderPins(house);
    } else if (event.target.value === 'bungalo') {
      renderPins(bungalo);
    } else {
      addPins(pins);
      window.activatePin();
    }
  });

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
