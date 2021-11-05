import {getNounPlularForm} from './utils.js';

const typeAlias = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const templateCard = document.querySelector('#card')
  .content
  .querySelector('.popup');

/**
 * Формирует список доступных удобств в объявлении
 *
 * @param {Object} cloneTemplate Элементы списка удобств указанные в шаблоне
 * @param {Array} offerFeatures Удобства указанные в объявлении
 */
const createListFeatures = (cloneTemplate, offerFeatures) => {
  const listFeatures = cloneTemplate.querySelector('.popup__features').querySelectorAll('.popup__feature');

  listFeatures.forEach((itemFeature) => {
    const isExist = offerFeatures.some((feature) => itemFeature.classList.contains(`popup__feature--${feature}`));

    if (!isExist) {
      itemFeature.remove();
    }
  });
};

/**
 * Заполняет шаблон карточки объявления данными
 *
 * @param {Object} data Данные объявленния
 * @returns Fragment с заполненными полями карточки
 */
const renderCard = (data) => {
  const card = templateCard.cloneNode(true);
  const {author, offer} = data;

  card.querySelector('.popup__avatar').setAttribute('src', author.avatar ? author.avatar : 'img/avatars/default.png');

  card.querySelector('.popup__title').textContent = offer.title ? offer.title : '';
  card.querySelector('.popup__text--address').textContent = offer.address ? offer.address : '';
  card.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
  card.querySelector('.popup__type').textContent = offer.type ? typeAlias[offer.type] : '';
  if (offer.rooms && offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getNounPlularForm(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${getNounPlularForm(offer.guests, 'гостя', 'гостей', 'гостей')}`;
  } else if (offer.rooms) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getNounPlularForm(offer.rooms, 'комната', 'комнаты', 'комнат')}`;
  } else {
    card.querySelector('.popup__text--capacity').textContent = '';
  }

  card.querySelector('.popup__description').textContent = offer.description ? offer.description : '';

  createListFeatures(card, offer.features);

  if (offer.photos) {
    const popupPhotos = card.querySelector('.popup__photos');
    const imageTemplate = popupPhotos.querySelector('img');
    popupPhotos.innerHTML = '';
    offer.photos.forEach((photo) => {
      const image = imageTemplate.cloneNode(true);
      image.setAttribute('src', photo);
      popupPhotos.appendChild(image);
    });
  } else {
    card.querySelector('.popup__photos').innerHTML = '';
  }

  return card;
};

export {renderCard};
