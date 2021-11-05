import {createAdvertisements} from './mock/data-mock.js';
import {DefaultSetMap} from './utils.js';
import {renderCard} from './card.js';
import {activateForm} from './form-activating.js';

/**
 * Отображает карту с маркерами объявлений
 */
const greateMap = () => {
  const adForm = document.querySelector('.ad-form');
  const inputAddress = adForm.querySelector('#address');
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm('ad-form');
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

  const customMarker = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const defaultMarker = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainMarker = L.marker(
    {
      lat: DefaultSetMap.LAT,
      lng: DefaultSetMap.LNG,
    },
    {
      draggable: true,
      icon: customMarker,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  const points = createAdvertisements();

  if (points) {
    activateForm('map__filters');
  }

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
        icon: defaultMarker,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(point));
  };

  points.forEach((point) => {
    createMarker(point);
  });
};

export {greateMap};
