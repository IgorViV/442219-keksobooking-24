import {DefaultSetMap, SetPinMainMarker, SetPinOrdinaryMarker} from './utils.js';
import {renderCard} from './card.js';
import {activateForm} from './form-activating.js';

/**
 * Отображает карту с маркерами объявлений
 *
 * @param {Object} points Данные из объявления
 */
const showAdvertisementsToMap = (advertisements) => {
  const adForm = document.querySelector('.ad-form');
  const inputAddress = adForm.querySelector('#address');
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm('ad-form');
      activateForm('map__filters');
      inputAddress.value = `${DefaultSetMap.LAT}, ${DefaultSetMap.LNG}`;
    })
    .setView({
      lat: DefaultSetMap.LAT,
      lng: DefaultSetMap.LNG,
    }, DefaultSetMap.SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: SetPinMainMarker.SIZE,
    iconAnchor: SetPinMainMarker.PEAK,
  });

  const ordinaryPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: SetPinOrdinaryMarker.SIZE,
    iconAnchor: SetPinOrdinaryMarker.PEAK,
  });

  const mainPinMarker = L.marker(
    {
      lat: DefaultSetMap.LAT,
      lng: DefaultSetMap.LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  const markerGroup = L.layerGroup().addTo(map);

  /**
   * Отображает маркер объявления на карте
   *
   * @param {Object} point Данные из объявления
   */
  const createMarker = (point) => {
    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: ordinaryPinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(point));
  };

  advertisements.forEach((advertisement) => {
    createMarker(advertisement);
  });
};

export {showAdvertisementsToMap};
