'use strict';

(function () {
  function synchronizeField(elem1, elem2, elem1Values, elem2Values, cb) {
    elem1.addEventListener('change', function () {
      var elem1Index = elem1Values.indexOf(elem1.value);
      cb(elem2, elem2Values[elem1Index]);
    });
  }
  window.synchronizeField = synchronizeField;
})();
