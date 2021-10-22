/**
 * Переводит форму в неактивное состояние
 *
 * @param {String} classForm CSS класс формы
 */
const deactivateForm = (classForm) => {
  const currentForm = document.querySelector(`.${classForm}`);
  const fieldsets = currentForm.querySelectorAll('fieldset');
  currentForm.classList.add(`${classForm}--disabled`);
  fieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
};

const activateForm = (classForm) => {
  const currentForm = document.querySelector(`.${classForm}`);
  const fieldsets = currentForm.querySelectorAll('fieldset');
  currentForm.classList.remove(`${classForm}--disabled`);
  fieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
};

deactivateForm('ad-form');
deactivateForm('map__filters');
activateForm('ad-form');
activateForm('map__filters');

// TODO 3. Напишите функцию, которая будет переводить страницу в активное состояние. В задании про карту мы будем вызывать эту функцию, когда карта будет загружена и готова к работе, а пока вы можете просто вызвать эту функцию активации в своём коде.

// ТЗ:
// 1.1. Неактивное состояние
// При открытии страница находится в неактивном состоянии:
// На месте карты отображается серый прямоугольник.
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
// Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.

// 1.2. Активное состояние. Загрузка и успешная инициализация карты (карта реализуется сторонней библиотекой Leaflet) переводит страницу в активное состояние. В активном состоянии страница позволяет:
// Вносить изменения в форму и отправлять её на сервер;
// После загрузки данных с сервера просматривать похожие объявления на карте, фильтровать их и уточнять подробную информацию о них, показывая для каждого из объявлений карточку.
