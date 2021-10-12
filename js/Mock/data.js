import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomElementDontRepeat, getArrayRandomLength} from './util.js';

const TITLES = [
  'Заголовок объявления 1',
  'Заголовок объявления 2',
  'Заголовок объявления 3',
  'Заголовок объявления 4',
  'Заголовок объявления 5',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Описание помещения 1',
  'Описание помещения 2',
  'Описание помещения 3',
  'Описание помещения 4',
  'Описание помещения 5',
];
const PHOTO_URL = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const CountRooms = {
  MIN: 1,
  MAX: 5,
};
const CountQuests = {
  MIN: 1,
  MAX: 5,
};
const PriceValue = {
  MIN: 0,
  MAX: 1000000,
};
const Latitide = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
};
const SIMILAR_OFFER_COUNT = 10;
const DIGITS = 5;

/**
 * Возвращает массив индексов фотографий
 *
 * @param {Integer} maxCount Число фотографий
 * @returns {Array} Массив индексов фотографий
 */
const createIndexPhoto = (maxCount) => {
  const arrayIndex = [];
  for (let i = 1; i <= maxCount; i++) {
    let index = `0${i}`;
    if (i === maxCount) {
      index = `${i}`;
    }
    arrayIndex.push(index);
  }
  return arrayIndex;
};
const INDEX_PHOTO = createIndexPhoto(SIMILAR_OFFER_COUNT);

/**
 * Возвращает сгенерируемое объявление
 *
 * @returns {Object} Объявление со случайными данными
 */
const createOffer = () => {
  const randomLat = getRandomFloat(Latitide.MIN, Latitide.MAX, DIGITS);
  const randomLng = getRandomFloat(Longitude.MIN, Longitude.MAX, DIGITS);
  const randomIndexPhoto = getRandomElementDontRepeat(INDEX_PHOTO);

  return {
    author: {
      avatar: `img/avatars/user${randomIndexPhoto}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(PriceValue.MIN, PriceValue.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(CountRooms.MIN, CountRooms.MAX),
      guests: getRandomInteger(CountQuests.MIN, CountQuests.MAX),
      checkin: getRandomArrayElement(CHECK_TIME),
      checkout: getRandomArrayElement(CHECK_TIME),
      features: getArrayRandomLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getArrayRandomLength(PHOTO_URL),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};
const arrGeneratedOffers = Array.from({length: SIMILAR_OFFER_COUNT}, createOffer);

export {arrGeneratedOffers};
