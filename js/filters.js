'use strict';

(function () {

  var pins = [];
  var typeValue = 'any';
  var priceValue = 'any';
  var roomsValue = 'any';
  var guestsValue = 'any';
  var pinsFiltered;

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
    pinsFiltered = pinsFiltered.filter(function (pin) {
      return pin.offer.type === type;
    });
  }
  //
  //
  function renderPinsPrice(price) {
    pinsFiltered = pinsFiltered.filter(function (pin) {
      if (price === 'middle') {
        return pin.offer.price <= 50000 && pin.offer.price >= 10000;
      } else if (price === 'low') {
        return pin.offer.price < 10000;
      } else if (price === 'high') {
        return pin.offer.price > 50000;
      }
      return false;
    });
  }

  function renderPinsRooms(rooms) {
    pinsFiltered = pinsFiltered.filter(function (pin) {
      return pin.offer.rooms === rooms;
    });
  }

  function renderPin() {
    clearMap();
    pinsFiltered = pins.slice();
    if (typeValue !== 'any') {
      renderPinsType(typeValue);
    } if (priceValue !== 'any') {
      renderPinsPrice(priceValue);
    } if (roomsValue !== 'any') {
      renderPinsRooms(+roomsValue);
    }
    window.getData(pinsFiltered);
    window.addPins(pinsFiltered);
    window.activatePin();
  }

  var formFilter = document.querySelector('.tokyo__filters');
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  housePrice.options[1].removeAttribute('selected');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');

  houseType.addEventListener('change', function (event) {
    typeValue = event.target.value;
    renderPin();
  });

  housePrice.addEventListener('change', function (event) {
    priceValue = event.target.value;
    renderPin();
  });

  housingRoomNumber.addEventListener('change', function (event) {
    roomsValue = event.target.value;
    renderPin();
  });

  //
  // housingGuestsNumber.addEventListener('change', function (event) {
  //   guestsValue = event.target.value;
  //   if (guestsValue === '1') {
  //     renderPinsNumberGuests(1);
  //   } else if (guestsValue === '2') {
  //     renderPinsNumberGuests(2);
  //   } else {
  //     guestsValue = false;
  //   }
  // });

  //
  //
  //
  // function renderPinsNumberGuests(guests) {
  //   var filtredPinsNumberGuests = pins.filter(function (pin) {
  //     return pin.offer.guests === guests;
  //   });
  //   clearMap();
  //   window.getData(filtredPinsNumberGuests);
  //   window.addPins(filtredPinsNumberGuests);
  //   window.activatePin();
  // }

})();
