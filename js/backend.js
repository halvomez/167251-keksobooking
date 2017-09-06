'use strict';

(function createBackend() {

  var URL_DATA = 'https://1510.dump.academy/keksobooking/data';
  var URL = 'https://1510.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL_DATA);
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });
      xhr.addEventListener('timeout', function () {
        onError(xhr.status);
      });

      xhr.timeout = 10000;
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL);
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr);
        }
      });
      xhr.send(data);
    }

  };

  function getData(serverData) {
    if (typeof serverData === 'object') {
      window.serverData = serverData;
      window.addPins();
      window.activatePin();
    }
  }
  window.backend.load(getData);
})();
