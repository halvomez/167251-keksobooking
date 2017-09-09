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

  function renderPinsType(type) {
    var filtredPinsType = pins.filter(function (pin) {
      return pin.offer.type === type;
    });
    clearMap();
    window.getData(filtredPinsType);
    addPins(filtredPinsType);
    window.activatePin();
  }

  function renderPinsRooms(rooms) {
    var filtredPinsRooms = pins.filter(function (pin) {
      return pin.offer.rooms === rooms;
    });
    clearMap();
    window.getData(filtredPinsRooms);
    addPins(filtredPinsRooms);
    window.activatePin();
  }


  var pinMap = document.querySelector('.tokyo__pin-map');

  function clearMap() {
    var divCreateAll = pinMap.querySelectorAll('.div--create');
    var divCreate;
    for (var i = 0; i < divCreateAll.length; i++) {
      divCreate = pinMap.querySelector('.div--create');
      pinMap.removeChild(divCreate);
    }
  }

  var formFilter = document.querySelector('.tokyo__filters');
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');

  houseType.addEventListener('change', function (event) {
    var value = event.target.value;
    if (value === 'flat') {
      renderPinsType('flat');
    } else if (value === 'house') {
      renderPinsType('house');
    } else if (value === 'bungalo') {
      renderPinsType('bungalo');
    } else {
      window.getData(pins);
      addPins(pins);
      window.activatePin();
    }
  });

  housingRoomNumber.addEventListener('change', function (event) {
    var value = event.target.value;
    if (value === '1') {
      renderPinsRooms(1);
    } else if (value === '2') {
      renderPinsRooms(2);
    } else if (value === '3') {
      renderPinsRooms(3);
    } else {
      window.getData(pins);
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

