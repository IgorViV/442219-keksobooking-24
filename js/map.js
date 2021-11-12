import {DefaultSetMap, SetPinMainMarker, SetPinOrdinaryMarker} from './utils.js';
import {renderCard} from './card.js';
import {activateForm} from './form.js';

const adForm = document.querySelector('.ad-form');
const inputAddress = adForm.querySelector('#address');
const map = L.map('map-canvas');
const mainPinIcon = L.icon({
  iconUrl: SetPinMainMarker.URL,
  iconSize: SetPinMainMarker.SIZE,
  iconAnchor: SetPinMainMarker.PEAK,
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
const ordinaryPinIcon = L.icon({
  iconUrl: SetPinOrdinaryMarker.URL,
  iconSize: SetPinOrdinaryMarker.SIZE,
  iconAnchor: SetPinOrdinaryMarker.PEAK,
});

/**
 * Отображает карту
 */
const loadMap = () => {
  map.on('load', () => {
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

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

/**
 * Отображает маркеры объявлений на карте
 *
 * @param {Object} advertisements Данные из объявлений
 */
const renderAdvertisementsPin = (advertisements) => {
  const markerGroup = L.layerGroup().addTo(map);

  /**
   * Отрисовывает маркер объявления
   *
   * @param {Object} advertisement Данные из объявления
   */
  const createMarker = (advertisement) => {
    const marker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng,
      },
      {
        icon: ordinaryPinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(advertisement));
  };

  advertisements.forEach((advertisement) => {
    createMarker(advertisement);
  });
  activateForm('map__filters');
};

const resetMarker = () => {
  mainPinMarker.setLatLng({
    lat: DefaultSetMap.LAT,
    lng: DefaultSetMap.LNG,
  });
  inputAddress.value = `${DefaultSetMap.LAT}, ${DefaultSetMap.LNG}`;
  map.closePopup();
};

export {loadMap, renderAdvertisementsPin, resetMarker};
