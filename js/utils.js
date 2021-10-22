/**
 * Возвращает корректную форму множественного числа (только для целых чисел)
 *
 * @param {Number} currentNumber Число, по которому вычисляем форму множественного числа
 * @param {String} oneString Форма единственного числа: яблоко, час, минута
 * @param {String} twoString Форма множественного числа для 2, 3, 4: яблока, часа, минуты
 * @param {String} manyString Форма множественного числа для остальных чисел
 * @returns {String} Рассчитанная форма множественнго числа
 */
const getNounPlularForm = (currentNumber, oneString, twoString, manyString) => {
  currentNumber = Number(currentNumber);
  const mod10 = currentNumber % 10;
  const mod100 = currentNumber % 100;

  switch (true) {
    case (mod100 >= 11 && mod100 <= 20):
      return manyString;
    case (mod10 > 5):
      return manyString;
    case (mod10 === 1):
      return oneString;
    case (mod10 >= 2 && mod10 <= 4):
      return twoString;
    default:
      return manyString;
  }
};

export {getNounPlularForm};
