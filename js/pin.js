'use strict';

(function drawPins() {
  var pinMapWidth = 56;
  var pinMapHeight = 75;

  window.loadBackend(function (serverAdverts) {

    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < serverAdverts.length; i++) {
      var randomPin = document.createElement('div');
      randomPin.innerHTML = '<div class = "pin pin--create pin--' + i + '" style = "left: ' +
    (serverAdverts[i].location.x - pinMapWidth / 2) + 'px;' +
    ' top: ' + (serverAdverts[i].location.y - pinMapHeight) + 'px"  tabindex="0">' +
    '<img src="' + serverAdverts[i].author.avatar + '" class = "rounded" width="40" height="40">' +
    '</div>';
      fragment.appendChild(randomPin);
    }
    pinMap.appendChild(fragment);
  });
})();
