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
const INDEX_PHOTO = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
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
const COUNT_ROOMS_MIN = 1;
const COUNT_ROOMS_MAX = 5;
const COUNT_QUESTS_MIN = 1;
const COUNT_QUESTS_MAX = 5;
const PRICE_VALUE_MIN = 0;
const PRICE_VALUE_MAX = 1000000;
const LATITIDE_MIN = 35.65000;
const LATITIDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const SIMILAR_OFFER_COUNT = 10;
const DIGITS = 5;

const createOffers = () => {
  const randomLat = getRandomFloat(LATITIDE_MIN, LATITIDE_MAX, DIGITS);
  const randomLng = getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, DIGITS);
  const randomIndexPhoto = getRandomElementDontRepeat(INDEX_PHOTO);

  return {
    author: {
      avatar: `img/avatars/user${randomIndexPhoto}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(PRICE_VALUE_MIN, PRICE_VALUE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(COUNT_ROOMS_MIN, COUNT_ROOMS_MAX),
      guests: getRandomInteger(COUNT_QUESTS_MIN, COUNT_QUESTS_MAX),
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
const arrGeneratedOffers = Array.from({length: SIMILAR_OFFER_COUNT}, createOffers);

export {arrGeneratedOffers};
