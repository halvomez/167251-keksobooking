'use strict';

(function () {
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  var pinMap = document.querySelector('.tokyo__pin-map');

  function addPins(data) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var randomPin = document.createElement('div');
      randomPin.classList.add('div--create');
      randomPin.innerHTML = '<div class = "pin pin--create pin--' + i + '" style = "left: ' +
      (data[i].location.x - PIN_WIDTH / 2) + 'px;' +
      ' top: ' + (data[i].location.y - PIN_HEIGHT) + 'px"  tabindex="0">' +
      '<img src="' + data[i].author.avatar + '" class = "rounded" width="40" height="40">' +
      '</div>';
      fragment.appendChild(randomPin);
    }
    pinMap.appendChild(fragment);
  }
  window.addPins = addPins;
})();

