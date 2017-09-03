'use strict';

(function setForm() {

  var noticeForm = document.forms[1];
  noticeForm.setAttribute('name', 'notice__form');
  noticeForm.elements.address.setAttribute('required', 'required');

  noticeForm.elements.title.setAttribute('required', 'required');
  noticeForm.elements.title.setAttribute('minlength', '30');
  noticeForm.elements.title.setAttribute('maxlength', '100');
  noticeForm.elements.title.setAttribute('maxlength', '100');

  noticeForm.elements.price.setAttribute('required', 'required');
  noticeForm.elements.price.setAttribute('type', 'number');
  noticeForm.elements.price.setAttribute('value', '1000');
  noticeForm.elements.price.setAttribute('min', '0');
  noticeForm.elements.price.setAttribute('max', '1000000');
  noticeForm.setAttribute('action', 'https://1510.dump.academy/keksobooking');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  function synchronizeField(elem1, elem2, elem1Values, elem2Values, cb) {
    elem1.addEventListener('change', function () {
      var elem1Index = elem1Values.indexOf(elem1.value);
      cb(elem2, elem2Values[elem1Index]);
    });
  }

  function syncValues(element, value) {
    element.min = value;
  }

  synchronizeField(timeIn, timeOut, window.checkInTimes, window.checkOutTimes, syncValues);
  synchronizeField(timeOut, timeIn, window.checkInTimes, window.checkOutTimes, syncValues);


  var type = document.querySelector('#type');
  var formPrice = document.querySelector('#price');

  function syncValueWithMin(element, value) {
    element.value = value;
  }

  synchronizeField(type, formPrice, window.types, [1000, 5000, 0, 10000], syncValueWithMin);

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  capacity.value = roomNumber.value;
  hideCapacity();

  roomNumber.addEventListener('change', function () {
    resetCapacity();
    if (roomNumber.value === '100') {
      capacity.value = 0;
      hideCapacity();
    } else if (roomNumber.value === '1') {
      capacity.value = 1;
      hideCapacity();
    } else if (roomNumber.value === '2') {
      capacity.value = 2;
      hideCapacityNumber(0);
      hideCapacityNumber(3);
    } else {
      capacity.value = 3;
      hideCapacityNumber(3);
    }
  });

  function hideCapacityNumber(number) {
    capacity.options[number].setAttribute('hidden', 'hidden');
  }
  function hideCapacity() {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].setAttribute('hidden', 'hidden');
    }
  }
  function resetCapacity() {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].removeAttribute('hidden');
    }
  }

  noticeForm.addEventListener('input', checkValidity, true);
  noticeForm.addEventListener('invalid', checkValidity, true);

  function checkValidity(event) {
    if (!event.target.validity.valid) {
      event.target.style.border = '2px solid red';
    } else {
      event.target.style.border = '';
    }
  }
  window.noticeForm = noticeForm;
})();

