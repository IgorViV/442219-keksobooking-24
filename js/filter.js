import {resetMap, clearMarkerGroup} from './map.js';
import {MAX_PIN_SHOW} from './utils.js';

const formFilters = document.querySelector('.map__filters');
const filters = formFilters.querySelectorAll('.map__filter');
const features = formFilters.querySelector('.map__features');
const priceFilter = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000001,
  },
};

/**
 * Применяет выбранные изменения фильтра
 *
 * @param {Function} cb Функция реализуемая при изменении фильтра
 */
const applyFilter = (cb) => {
  const onFilterChange = () => { // TODO Д4. Из названия обработчика события и функции-колбэка следует, что это обработчик.
    resetMap();                    // onFilterListener - строго говоря, не подходит под критерий
    clearMarkerGroup();
    cb();
  };

  formFilters.addEventListener('change', onFilterChange);

  formFilters.addEventListener('reset', onFilterChange);
};

/**
 * Определяет соответствие данных объявления выбранному фильтру
 *
 * @param {Object} advertisement Данные объявления
 * @returns {Boolean} True если данные соответствуют
 */
const compareFilter = (advertisement) => {
  const checkedFeatures = features.querySelectorAll('input[name="features"]:checked');
  let isType = true;
  let isRooms = true;
  let isGuests = true;
  let isPrice = true;
  let isFeatures = true;

  if (checkedFeatures.length) {
    if (!advertisement.offer.features) {
      isFeatures = false;
    } else {
      const selectedFeatures = Array.from(checkedFeatures).map((input) => input.value);
      isFeatures = selectedFeatures.every((feature) => advertisement.offer.features.includes(feature));
    }
  }
  filters.forEach((filter) => {
    if (filter.id === 'housing-type' && filter.value !== 'any') {
      isType = advertisement.offer.type === filter.value;
    }

    if (filter.id === 'housing-price' && filter.value !== 'any') {
      isPrice = advertisement.offer.price >= priceFilter[filter.value].min && advertisement.offer.price < priceFilter[filter.value].max;
    }

    if (filter.id === 'housing-rooms' && filter.value !== 'any') {
      isRooms = advertisement.offer.rooms.toString() === filter.value;
    }

    if (filter.id === 'housing-guests' && filter.value !== 'any') {
      isGuests = advertisement.offer.guests.toString() === filter.value;
    }
  });

  return isType && isRooms && isGuests && isPrice && isFeatures;
};

const filterAdvertisements = (advertisements) => {
  const filteredAdvertisement = new Array();
  let counterPin = 0;
  for (let i = 0; i < advertisements.length; i++) {
    if (!compareFilter(advertisements[i])) {
      continue;
    }
    filteredAdvertisement.push(advertisements[i]);
    ++counterPin;
    if (counterPin === MAX_PIN_SHOW) {
      break;
    }
  }

  return filteredAdvertisement;
};

export {applyFilter, filterAdvertisements};

// TODO Д24. Для каждого события используется отдельный обработчик.
// mapFilters.addEventListener('change', onFilterListener);
// mapFilters.addEventListener('reset', onFilterListener);
