const minCostRooms = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};
const roomsVsGuest = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
};
const guestsMessage = {
  '100': 'Для 100 комнат укажите "не для гостей"',
  '1': 'Для 1 комнаты укажите "для 1 гостя"',
  '2': 'Для 2 комнат укажите "для 1 гостя" или "для 2 гостей"',
  '3': 'Для 3 комнат укажите "для 1 гостя", "для 2 гостей" или "для 3 гостей"',
};
const adForm = document.querySelector('.ad-form');
const inputPrice = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

/**
 * Выполняет валидацию количества комнат и гостей
 */
const validateRoomNumber = () => {
  roomNumber.addEventListener('change', (evt) => {
    if (!roomsVsGuest[evt.target.value].includes(capacity.value)) {
      evt.target.setCustomValidity(guestsMessage[evt.target.value]);
    } else {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('');
    }
    evt.target.reportValidity();
  });
  capacity.addEventListener('change', (evt) => {
    if (!roomsVsGuest[roomNumber.value].includes(evt.target.value)) {
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
  const selectedTimeIn = timeIn.querySelector('option[selected]');
  const selectedTimeOut = timeOut.querySelector('option[selected]');
  if (selectedTimeOut.value !== evt.target.value) {
    selectedTimeOut.removeAttribute('selected');
    timeOut.querySelector(`option[value="${evt.target.value}"]`).setAttribute('selected', 'selected');
  }
  if (selectedTimeIn.value !== evt.target.value) {
    selectedTimeIn.removeAttribute('selected');
    timeIn.querySelector(`option[value="${evt.target.value}"]`).setAttribute('selected', 'selected');
  }
};

/**
 * Выполняет валидацию формы
 */
const addHandleresToForm = () => {
  adForm.addEventListener('input', (evt) => {
    if (evt.target.matches('input[name="title"]')) {
      if (evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Длина заголовка должна быть не менее 30-ти символов');
      } else {
        evt.target.setCustomValidity('');
      }
    }
    if (evt.target.matches('input[name="price"]')) {
      if (evt.target.validity.rangeUnderflow) {
        evt.target.setCustomValidity(`Цена за ночь должна быть не менее ${evt.target.getAttribute('min')}`);
      } else if (evt.target.validity.rangeOverflow) {
        evt.target.setCustomValidity(`Цена за ночь должна быть не более ${evt.target.getAttribute('max')}`);
      } else {
        evt.target.setCustomValidity('');
      }
    }
    evt.target.reportValidity();
  });
  adForm.addEventListener('change', (evt) => {
    if (evt.target.matches('select[name="type"]')) {
      inputPrice.setAttribute('min', minCostRooms[evt.target.value]);
      inputPrice.setAttribute('placeholder', minCostRooms[evt.target.value]);
    }
    if (evt.target.matches('select[name="timein"]')) {
      changeTime(evt);
    }
    if (evt.target.matches('select[name="timeout"]')) {
      changeTime(evt);
    }
  });
  validateRoomNumber();
};

export {addHandleresToForm};
