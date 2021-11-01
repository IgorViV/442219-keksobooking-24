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

/**
 * Активирует форму
 *
 * @param {String} classForm CSS класс формы
 */
const activateForm = (classForm) => {
  const currentForm = document.querySelector(`.${classForm}`);
  const fieldsets = currentForm.querySelectorAll('fieldset');
  currentForm.classList.remove(`${classForm}--disabled`);

  fieldsets.forEach((fieldset) => {
    if (fieldset.hasAttribute('disabled')) {
      fieldset.removeAttribute('disabled');
    }
  });
};

export {deactivateForm, activateForm};
