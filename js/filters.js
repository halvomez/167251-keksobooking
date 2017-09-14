'use strict';

(function () {

  var PRICE_MIDDLE = 10000;
  var PRICE_HIGH = 50000;

  var pins = [];
  var startPins = [];

  window.backend.load(checkData);

  function checkData(serverData) {
    if (typeof serverData === 'object') {
      pins = serverData;
      getStartPins();
      renderPins(startPins);
      window.activatePin();
    }
  }

  function getStartPins() {
    startPins = pins.slice();
    startPins = startPins.splice(window.getRandom(6, 0), 3);
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

  function renderPinsPrice(price) {
    pinsFiltered = pinsFiltered.filter(function (pin) {
      if (price === 'middle') {
        return pin.offer.price <= PRICE_HIGH && pin.offer.price >= PRICE_MIDDLE;
      } else if (price === 'low') {
        return pin.offer.price < PRICE_MIDDLE;
      }
      return pin.offer.price > PRICE_HIGH;
    });
  }

  function renderPinsRooms(rooms) {
    pinsFiltered = pinsFiltered.filter(function (pin) {
      return pin.offer.rooms === rooms;
    });
  }

  function renderPinsNumberGuests(guests) {
    pinsFiltered = pinsFiltered.filter(function (pin) {
      return pin.offer.guests === guests;
    });
  }

  function renderPinsFeature(pickFeatures) {
    pickFeatures.forEach(function (feature) {
      pinsFiltered = pinsFiltered.filter(function (pin) {
        return pin.offer.features.indexOf(feature) >= 0;
      });
    });
  }

  var typeValue = 'any';
  var priceValue = 'any';
  var roomsValue = 'any';
  var guestsValue = 'any';

  function renderPins(currentData) {
    clearMap();
    pinsFiltered = currentData.slice();
    if (typeValue !== 'any') {
      renderPinsType(typeValue);
    } if (priceValue !== 'any') {
      renderPinsPrice(priceValue);
    } if (roomsValue !== 'any') {
      renderPinsRooms(+roomsValue);
    } if (guestsValue !== 'any') {
      renderPinsNumberGuests(+guestsValue);
    } if (someFeatures.length > 0) {
      renderPinsFeature(someFeatures);
    }
    window.workWithData.getData(pinsFiltered);
    window.addPins(pinsFiltered);
    window.activatePin();
  }

  var mapFilter = document.querySelector('.tokyo__filters');
  var mapType = mapFilter.querySelector('#housing_type');
  var mapPrice = mapFilter.querySelector('#housing_price');
  var mapRoomNumber = mapFilter.querySelector('#housing_room-number');
  var mapGuestsNumber = mapFilter.querySelector('#housing_guests-number');
  var mapFeatures = mapFilter.querySelectorAll('input[type=checkbox]');
  mapPrice.value = priceValue;

  mapType.addEventListener('change', function (event) {
    typeValue = event.target.value;
    window.debounce(renderPins, pins);
  });

  mapPrice.addEventListener('change', function (event) {
    priceValue = event.target.value;
    window.debounce(renderPins, pins);
  });

  mapRoomNumber.addEventListener('change', function (event) {
    roomsValue = event.target.value;
    window.debounce(renderPins, pins);
  });

  mapGuestsNumber.addEventListener('change', function (event) {
    guestsValue = event.target.value;
    window.debounce(renderPins, pins);
  });

  var featureValue;
  var pinsFiltered;
  var indexFeature;
  var someFeatures = [];

  [].forEach.call(mapFeatures, function (feature) {
    feature.addEventListener('click', function (event) {
      featureValue = event.target.value;
      indexFeature = someFeatures.indexOf(featureValue);
      if (indexFeature < 0) {
        someFeatures.push(featureValue);
      } else {
        someFeatures.splice(indexFeature, 1);
      }
      window.debounce(renderPins, pins);
    });
  });
})();
