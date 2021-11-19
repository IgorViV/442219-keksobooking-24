import {sendData} from './api.js';
import {resetMap, resetMarker} from './map.js';
import {setAvatarListener, setPhotoListener, resetPreview} from './preview.js';

const minCostRooms = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};
const roomsVsGuest = {
  100: [0],
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
};
const guestsMessage = {
  100: 'Для 100 комнат укажите «не для гостей»',
  1: 'Для 1 комнаты укажите «для 1 гостя»',
  2: 'Для 2 комнат укажите «для 1 гостя» или «для 2 гостей»',
  3: 'Для 3 комнат укажите «для 1 гостя», «для 2 гостей» или «для 3 гостей»',
};
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const titleAdvertisement = adForm.querySelector('#title');
const typeHousing = adForm.querySelector('#type');
const priceHousing = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const buttonReset = adForm.querySelector('.ad-form__reset');

/**
 * Деактивирует основную форму и форму с фильтрами
 */
const deactivateAllForms = () => {
  const forms = document.querySelectorAll('form');
  for (const form of forms) {
    if (form.classList.contains('ad-form')) {
      form.classList.add('ad-form--disabled');
    }
    if (form.classList.contains('map__filters')) {
      form.classList.add('map__filters--disabled');
    }
    for (const elem of form.children) {
      elem.setAttribute('disabled', 'disabled');
    }
  }
};

/**
 * Активирует форму
 *
 * @param {Object} form Элемент-форма
 */
const activateForm = (form) => {
  if (form.classList.contains('ad-form--disabled')) {
    form.classList.remove('ad-form--disabled');
  }
  if (form.classList.contains('map__filters--disabled')) {
    form.classList.remove('map__filters--disabled');
  }
  for (const elem of form.children) {
    elem.removeAttribute('disabled');
  }
};

/**
 * Выполняет валидацию количества комнат и гостей
 */
const validateRoomNumber = () => {
  roomNumber.addEventListener('change', (evt) => {
    if (!roomsVsGuest[evt.target.value].includes(+capacity.value)) {
      evt.target.setCustomValidity(guestsMessage[evt.target.value]);
    } else {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('');
    }
    evt.target.reportValidity();
  });
  capacity.addEventListener('change', (evt) => {
    if (!roomsVsGuest[roomNumber.value].includes(+evt.target.value)) {
      evt.target.setCustomValidity(guestsMessage[roomNumber.value]);
    } else {
      evt.target.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
    evt.target.reportValidity();
  });
};

/**
 * Выполняет изменение времени заезда/выезда в зависимости от изменения времени выезда/заезда
 *
 * @param {Object} evt Изменяемый select времени
 */
const changeTime = (evt) => {
  if (evt.target === timeIn) {
    timeOut.value = evt.target.value;
  }
  if (evt.target === timeOut) {
    timeIn.value = evt.target.value;
  }
};

/**
 * Устанавливает обработчики полей для валидации формы
 */
const setHandlersForm = () => {

  titleAdvertisement.addEventListener('input', (evt) => {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Длина заголовка должна быть не менее 30-ти символов');
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  });

  priceHousing.addEventListener('input', (evt) => {
    if (evt.target.validity.rangeUnderflow) {
      evt.target.setCustomValidity(`Цена за ночь должна быть не менее ${evt.target.getAttribute('min')}`);
    } else if (evt.target.validity.rangeOverflow) {
      evt.target.setCustomValidity(`Цена за ночь должна быть не более ${evt.target.getAttribute('max')}`);
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  });

  typeHousing.addEventListener('change', (evt) => {
    priceHousing.setAttribute('min', minCostRooms[evt.target.value]);
    priceHousing.setAttribute('placeholder', minCostRooms[evt.target.value]);
  });

  timeIn.addEventListener('change', (evt) => {
    changeTime(evt);
  });

  timeOut.addEventListener('change', (evt) => {
    changeTime(evt);
  });

  validateRoomNumber();
  setAvatarListener();
  setPhotoListener();
};

/**
 * Выполняет сброс формы и фильтра
 */
const resetForms = () => {
  adForm.reset();
  priceHousing.setAttribute('min', minCostRooms.flat);
  priceHousing.setAttribute('placeholder', minCostRooms.flat);
  mapFilters.reset();
  resetPreview();
};

/**
 * Устанвливает обработчик submit для основной формы
 *
 * @param {Function} onSuccess Действия при успешной отправке объявления
 * @param {Function} onError Действия при ошибке отправки объявления
 */
const setSubmitForm = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess();
        resetForms();
        resetMarker();
        resetMap();
      },
      () => onError(),
      new FormData(evt.target),
    );
  });
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
  resetMarker();
  resetMap();
});

export {deactivateAllForms, activateForm, setHandlersForm, setSubmitForm};
