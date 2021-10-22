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
