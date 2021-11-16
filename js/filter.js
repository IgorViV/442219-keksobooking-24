import {resetMap, clearMarkerGroup} from './map.js';
import {MAX_PIN_SHOW} from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const filterElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
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
  const onFilterListener = () => {
    resetMap();
    clearMarkerGroup();
    cb();
  };

  mapFilters.addEventListener('change', onFilterListener);

  mapFilters.addEventListener('reset', onFilterListener);
};

/**
 * Определяет соответствие данных объявления выбранному фильтру
 *
 * @param {Object} advertisement Данные объявления
 * @returns {Boolean} True если данные соответствуют
 */
const compareFilter = (advertisement) => {
  const checkedFeatures = mapFeatures.querySelectorAll('input[name="features"]:checked');
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
  filterElements.forEach((filterElement) => {
    if (filterElement.id === 'housing-type' && filterElement.value !== 'any') {
      isType = advertisement.offer.type === filterElement.value;
    }

    if (filterElement.id === 'housing-price' && filterElement.value !== 'any') {
      isPrice = advertisement.offer.price >= priceFilter[filterElement.value].min && advertisement.offer.price < priceFilter[filterElement.value].max;
    }

    if (filterElement.id === 'housing-rooms' && filterElement.value !== 'any') {
      isRooms = advertisement.offer.rooms.toString() === filterElement.value;
    }

    if (filterElement.id === 'housing-guests' && filterElement.value !== 'any') {
      isGuests = advertisement.offer.guests.toString() === filterElement.value;
    }
  });

  return isType && isRooms && isGuests && isPrice && isFeatures;
};

const filterAdvertisements = (advertisements) => advertisements
  .filter(compareFilter)
  .slice(0, MAX_PIN_SHOW);

export {applyFilter, filterAdvertisements};
