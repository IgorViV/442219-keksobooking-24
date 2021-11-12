import {ALERT_SHOW_TIME, isEscapeKey} from './utils.js';

/**
 * Выводит сообщение об ошибке загрузке данных с сервера
 */
const showPopupErrorGetData = () => {
  const errorPopup = document.querySelector('#error-getdata')
    .content
    .querySelector('.error-getdata')
    .cloneNode(true);
  document.body.appendChild(errorPopup);

  setTimeout(() => {
    errorPopup.remove();
  }, ALERT_SHOW_TIME);
};

/**
 * Выводит сообщение об ошибке при размещении объявления
 */
const showPopupErrorSendForm = () => {
  const errorPopup = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  const errorButton = errorPopup.querySelector('.error__button');

  document.body.appendChild(errorPopup);

  const closePopup = () => {
    errorPopup.remove();
  };

  errorPopup.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  });

  errorButton.addEventListener('click', () => {
    closePopup();
  });

};

/**
 * выводит сообщение об успешном размещении объявления
 */
const showPopupSuccessSendForm = () => {
  const successPopup = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);

  document.body.appendChild(successPopup);

  const closePopup = () => {
    successPopup.remove();
  };

  successPopup.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  });
};

export {showPopupErrorGetData, showPopupErrorSendForm, showPopupSuccessSendForm};
