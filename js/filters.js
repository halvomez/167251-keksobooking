'use strict';

(function () {

  var pins = [];

  window.backend.load(getData);

  function getData(serverData) {
    if (typeof serverData === 'object') {
      pins = serverData;
      window.addPins(pins);
      window.activatePin();
    }
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

  function renderPinsType(type) {
    var filtredPinsType = pins.filter(function (pin) {
      return pin.offer.type === type;
    });
    clearMap();
    window.getData(filtredPinsType);
    window.addPins(filtredPinsType);
    window.activatePin();
  }


  function renderPinsPrice(price) {
    var filtredPinsPrice = pins.filter(function (pin) {
      if (price === 'middle') {
        return pin.offer.price <= 50000 && pin.offer.price >= 10000;
      } else if (price === 'low') {
        return pin.offer.price < 10000;
      } else if (price === 'high') {
        return pin.offer.price > 50000;
      }
      return false;
    });
    clearMap();
    window.getData(filtredPinsPrice);
    window.addPins(filtredPinsPrice);
    window.activatePin();
  }

  function renderPinsRooms(rooms) {
    var filtredPinsRooms = pins.filter(function (pin) {
      return pin.offer.rooms === rooms;
    });
    clearMap();
    window.getData(filtredPinsRooms);
    window.addPins(filtredPinsRooms);
    window.activatePin();
  }

  function renderPinsNumberGuests(guests) {
    var filtredPinsNumberGuests = pins.filter(function (pin) {
      return pin.offer.guests === guests;
    });
    clearMap();
    window.getData(filtredPinsNumberGuests);
    window.addPins(filtredPinsNumberGuests);
    window.activatePin();
  }

  var formFilter = document.querySelector('.tokyo__filters');
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  housePrice.options[1].removeAttribute('selected');
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
      window.addPins(pins);
      window.activatePin();
    }
  });

  housePrice.addEventListener('change', function (event) {
    var value = event.target.value;
    if (value === 'middle') {
      renderPinsPrice('middle');
    } else if (value === 'low') {
      renderPinsPrice('low');
    } else if (value === 'high') {
      renderPinsPrice('high');
    } else {
      window.getData(pins);
      window.addPins(pins);
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
      window.addPins(pins);
      window.activatePin();
    }
  });

  housingGuestsNumber.addEventListener('change', function (event) {
    var value = event.target.value;
    if (value === '1') {
      renderPinsNumberGuests(1);
    } else if (value === '2') {
      renderPinsNumberGuests(2);
    } else {
      window.getData(pins);
      window.addPins(pins);
      window.activatePin();
    }
  });

})();