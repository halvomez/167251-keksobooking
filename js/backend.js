'use strict';

(function createBackend() {

  var URL_DATA = 'https://1510.dump.academy/keksobooking/data';
  var URL = 'https://1510.dump.academy/keksobooking';

  function loadBackend(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_DATA);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
    });

    xhr.send();
  }
  window.loadBackend = loadBackend;
})();
