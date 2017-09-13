'use strict';

(function () {
  var errorPlace = document.querySelector('.header__motto');

  function showError(errorMassage) {
    errorPlace.textContent = errorMassage;
    errorPlace.style.backgroundColor = 'red';
    errorPlace.style.display = 'inline';
    errorPlace.style.textAlign = 'center';
    errorPlace.style.paddingLeft = '10px';
    errorPlace.style.paddingRight = '10px';
  }

  function showNoError() {
    errorPlace.textContent += ', к бою готовы';
  }

  window.backend.load(showNoError, showError);

  var nodeError = document.createElement('div');
  nodeError.classList.add('error-massage');
  nodeError.style.zIndex = '2';
  nodeError.style.margin = '0 auto';
  nodeError.style.textAlign = 'center';
  nodeError.style.color = 'white';
  nodeError.style.backgroundColor = '#ffaa99';
  nodeError.style.fontSize = '16px';
  nodeError.style.opacity = '0';

  var noticeForm = document.forms[1];
  var formSubmit = noticeForm.querySelector('.form__submit');

  function showPostFormError(error) {
    formSubmit.style.fontSize = '14px';
    formSubmit.textContent = 'не удалось отправить, повторите';
    formSubmit.appendChild(nodeError);
    formSubmit.style.color = '#ffaa99';
    nodeError.textContent = 'код ' + error.status;
    nodeError.style.opacity = '1';
    if (!noticeForm.elements.address.value) {
      noticeForm.elements.address.style.border = '2px solid red';
    }
  }
  window.showPostFormError = showPostFormError;
})();
