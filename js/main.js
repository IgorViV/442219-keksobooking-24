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

  switch (true) {
    case min === max:
      return min;
    case min > max:
      return Math.floor(Math.random() * (min - max + 1)) + max;
    default:
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Возвращает случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {Number} min Минимальное положительное число диапазона
 * @param {Number} max Максимальное положительное число диапазона
 * @param {Integer} exp Показатель степени (количество знаков после запятой)
 * @returns {Number} Случайное число с заданным количеством знаков после запятой
 */
function getRandomFloat (min, max, exp) {
  min = Math.abs(min);
  max = Math.abs(max);
  let result;

  switch (true) {
    case min === max:
      result = min;
      break;
    case min > max:
      result = Math.random() * (min - max + 1) + max;
      break;
    default:
      result = Math.random() * (max - min + 1) + min;
  }

  if (typeof exp === 'undefined' || +exp === 0) {
    return result;
  }

  result = Math.round(`${result}e${exp}`);
  return Number(`${result}e-${exp}`);
}

getRandomInteger(2, 9);

getRandomFloat(15, 19, 3);
