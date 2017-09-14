'use strict';

(function () {
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  var pinMap = document.querySelector('.tokyo__pin-map');

  function addPins(data) {

    var fragment = document.createDocumentFragment();
    data.forEach(function (pin, number) {
      pin = document.createElement('div');
      pin.classList.add('div--create');
      pin.innerHTML = '<div class = "pin pin--create pin--' + number + '" style = "left: ' +
      (data[number].location.x - PIN_WIDTH / 2) + 'px;' +
      ' top: ' + (data[number].location.y - PIN_HEIGHT) + 'px"  tabindex="0">' +
      '<img src="' + data[number].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
      fragment.appendChild(pin);
    });
    pinMap.appendChild(fragment);
  }
  window.addPins = addPins;
})();

