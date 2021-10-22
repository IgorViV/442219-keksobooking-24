import {createAdvertisements} from './mock/data-mock.js';
import {getNounPlularForm} from './utils.js';

const advertisements = createAdvertisements();
const mapConvas = document.querySelector('#map-canvas');
const typeAlias = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

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
const fillCardData = (data) => {
  const templateCard = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const card = templateCard.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const {author, offer} = data;

  if (author.avatar) {
    card.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  } else {
    card.querySelector('.popup__avatar').setAttribute('src', 'img/avatars/default.png');
  }

  (offer.title) ? card.querySelector('.popup__title').textContent = offer.title : card.querySelector('.popup__title').textContent = '';
  (offer.address) ? card.querySelector('.popup__text--address').textContent = offer.address : card.querySelector('.popup__text--address').textContent = '';
  (offer.price) ? card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : card.querySelector('.popup__text--price').textContent = '';
  (offer.type) ? card.querySelector('.popup__type').textContent = typeAlias[offer.type] : card.querySelector('.popup__type').textContent = '';
  if (offer.rooms && offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getNounPlularForm(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${getNounPlularForm(offer.guests, 'гостя', 'гостей', 'гостей')}`;
  } else if (offer.rooms) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getNounPlularForm(offer.rooms, 'комната', 'комнаты', 'комнат')}`;
  } else {
    card.querySelector('.popup__text--capacity').textContent = '';
  }

  (offer.description) ? card.querySelector('.popup__description').textContent = offer.description : card.querySelector('.popup__description').textContent = '';

  createListFeatures(card, offer.features);

  if (offer.photos) {
    const popupPhotos = card.querySelector('.popup__photos');
    const imageTemplate = popupPhotos.querySelector('img');
    const imageFragment = document.createDocumentFragment();
    popupPhotos.innerHTML = '';
    offer.photos.forEach((photo) => {
      const image = imageTemplate.cloneNode(true);
      image.setAttribute('src', photo);
      imageFragment.appendChild(image);
    });
    popupPhotos.appendChild(imageFragment);
  } else {
    card.querySelector('.popup__photos').innerHTML = '';
  }

  fragment.appendChild(card);
  return fragment;
};

mapConvas.appendChild(fillCardData(advertisements[0]));
