'use strict';

(function () {

  function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomArr(arr) {
    var arrCopy = arr.slice(0, arr.length);
    return arrCopy.splice(getRandom(arr.length, 0), getRandom(arr.length, 0));
  }

  window.getRandom = getRandom;
  window.getRandomArr = getRandomArr;
})();
