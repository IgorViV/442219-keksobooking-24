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
 * Добавляет popup сообщения на страницу
 *
 * @param {Object} popup Шаблон окна сообщнения
 */
const appendPopup = (popup) => {
  const errorButton = popup.querySelector('.error__button');
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onPopupClick = () => {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  document.body.appendChild(popup);
  popup.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);

  if (errorButton) {
    errorButton.addEventListener('click', onPopupClick);
  }
};

/**
 * Выводит сообщение об ошибке при размещении объявления
 */
const showPopupErrorSendForm = () => {
  const errorSendPopup = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);

  appendPopup(errorSendPopup);
};

/**
 * Выводит сообщение об успешном размещении объявления
 */
const showPopupSuccessSendForm = () => {
  const successPopup = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);

  appendPopup(successPopup);
};

export {showPopupErrorGetData, showPopupErrorSendForm, showPopupSuccessSendForm};
