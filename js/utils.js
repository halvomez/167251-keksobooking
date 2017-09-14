'use strict';

(function () {

  function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  window.getRandom = getRandom;
})();
