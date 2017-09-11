'use strict';

(function () {

  var pins = [];
  var typeValue = 'any';
  var priceValue = 'any';
  var roomsValue = 'any';
  var guestsValue = 'any';
  var featureValue;
  var pinsFiltered;
  var someFeatures = [];
  var startPins = [];

  window.backend.load(getData);

  function getData(serverData) {
    if (typeof serverData === 'object') {
      pins = serverData;
      renderPin(pins);
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

  function renderPin(data) {
    clearMap();
    pinsFiltered = data.slice();
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
    window.getData(pinsFiltered);
    window.addPins(pinsFiltered);
    window.activatePin();
  }

  var formFilter = document.querySelector('.tokyo__filters');
  var houseType = formFilter.querySelector('#housing_type');
  var housePrice = formFilter.querySelector('#housing_price');
  var housingRoomNumber = formFilter.querySelector('#housing_room-number');
  var housingGuestsNumber = formFilter.querySelector('#housing_guests-number');
  var formFeatures = formFilter.querySelectorAll('input[type=checkbox]');
  housePrice.value = priceValue;

  houseType.addEventListener('change', function (event) {
    typeValue = event.target.value;
    window.debounce(renderPin, pins);
  });

  housePrice.addEventListener('change', function (event) {
    priceValue = event.target.value;
    window.debounce(renderPin, pins);
  });

  housingRoomNumber.addEventListener('change', function (event) {
    roomsValue = event.target.value;
    window.debounce(renderPin, pins);
  });

  housingGuestsNumber.addEventListener('change', function (event) {
    guestsValue = event.target.value;
    window.debounce(renderPin, pins);
  });

  formFeatures.forEach(function (feature) {
    feature.addEventListener('click', function (event) {
      featureValue = event.target.value;
      var indexFeature = someFeatures.indexOf(featureValue);
      if (indexFeature < 0) {
        someFeatures.push(featureValue);
      } else {
        someFeatures.splice(indexFeature, 1);
      }
      window.debounce(renderPin, pins);
    });
  });
})();
