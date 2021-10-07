/**
 * Возвращает случайное целое число из переданного диапазона включительно
 *
 * @param {Number} min Минимальное положительное число диапазона
 * @param {Number} max Максимальное положительное число диапазона
 * @returns {Number} Случайное целое число
 */
function getRandomInteger (min, max) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if (min === max) {
    return min;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {Number} min Минимальное положительное число диапазона
 * @param {Number} max Максимальное положительное число диапазона
 * @param {Integer} exp Показатель степени (количество знаков после запятой)
 * @returns {Number} Случайное число с заданным количеством знаков после запятой
 */
function getRandomFloat (min, max, exp = 1) {
  min = Math.abs(min);
  max = Math.abs(max);
  let result = Math.random() * (max - min) + min;

  if (min === max) {
    result = min;
  }

  if (min > max) {
    result = Math.random() * (min - max) + max;
  }

  result = Math.round(`${result}e${exp}`);
  return Number(`${result}e-${exp}`);
}

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
const COUNT_ROOMS = {
  min: 1,
  max: 5,
};
const COUNT_QUESTS = {
  min: 1,
  max: 5,
};
const PRICE_VALUE = {
  min: 10,
  max: 1000,
};
const LATITIDE = {
  min: 35.65000,
  max: 35.70000,
};
const LONGITUDE = {
  min: 139.70000,
  max: 139.80000,
};
const SIMILAR_OFFER_COUNT = 10;

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomElementDontRepeat = (array) => {
  if (array.length > 1) {
    const result = array.splice(getRandomInteger(0, array.length - 1), 1);
    return result[0];
  }
  return array[0];
};

const getArrayRandomLength = (array) => array.slice(getRandomInteger(1, array.length - 1));

const createOffers = () => {
  const randomLat = getRandomFloat(LATITIDE.min, LATITIDE.max, 5);
  const randomLng = getRandomFloat(LONGITUDE.min, LONGITUDE.max, 5);
  const randomIndexPhoto = getRandomElementDontRepeat(INDEX_PHOTO);

  return {
    author: {
      avatar: `img/avatars/user${randomIndexPhoto}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(PRICE_VALUE.min, PRICE_VALUE.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(COUNT_ROOMS.min, COUNT_ROOMS.max),
      guests: getRandomInteger(COUNT_QUESTS.min, COUNT_QUESTS.max),
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
arrGeneratedOffers;
