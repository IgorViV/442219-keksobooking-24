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

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  function closePopup () {
    errorPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  errorPopup.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onPopupEscKeydown);

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

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  function closePopup () {
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  successPopup.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showPopupErrorGetData, showPopupErrorSendForm, showPopupSuccessSendForm};

// TODO Д10. В случае, если одинаковый код повторяется в нескольких модулях, повторяющаяся часть вынесена в отдельный модуль.
// повторяющийся код в модуле popup: 28-46 и 63-81 строчки

// TODO Д5. Все функции объявлены единообразно.
// function closePopup можно написать и без хоистинга, лишних переменных и прочего
