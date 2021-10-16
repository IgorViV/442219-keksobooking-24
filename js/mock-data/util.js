/**
 * Возвращает случайное целое число из переданного диапазона включительно
 *
 * @param {Number} min Минимальное положительное число диапазона
 * @param {Number} max Максимальное положительное число диапазона
 * @returns {Number} Случайное целое число
 */
const getRandomInteger = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if (min === max) {
    return min;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {Number} min Минимальное положительное число диапазона
 * @param {Number} max Максимальное положительное число диапазона
 * @param {Integer} exp Показатель степени (количество знаков после запятой)
 * @returns {Number} Случайное число с заданным количеством знаков после запятой
 */
const getRandomFloat = (min, max, exp = 1) => {
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
};

/**
 * Возвращает случайный элемент массива
 *
 * @param {Array} array Заданный массив
 * @returns {Array} Случайный элемент массива
 */
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

/**
 * Возвращает случайный неповторяющийся элемент массива
 *
 * @param {Array} array Заданный массив
 * @returns {Array} Случайный неповторяющийся элемент массива
 */
const getRandomElementDontRepeat = (array) => {
  if (array.length > 1) {
    const result = array.splice(getRandomInteger(0, array.length - 1), 1);
    return result[0];
  }
  return array[0];
};

/**
 * Возвращает массив случайной длины
 *
 * @param {Array} array Заданный массив
 * @returns {Array} Массив случайной длины
 */
const getArrayRandomLength = (array) => array.slice(getRandomInteger(1, array.length - 1));

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomElementDontRepeat, getArrayRandomLength};
