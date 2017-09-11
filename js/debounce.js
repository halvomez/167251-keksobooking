'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeout;

  window.debounce = function (cb, data) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_TIME, data);
  };
})();
