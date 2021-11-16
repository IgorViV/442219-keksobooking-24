import {debounce} from './utils.js';
import {getData} from './api.js';
import {loadMap, renderAdvertisementsPin} from './map.js';
import {showPopupErrorGetData, showPopupErrorSendForm, showPopupSuccessSendForm} from './popup.js';
import {deactivateForm, setHandleresForm, setSubmitForm} from './form.js';
import {applyFilter} from './filter.js';

deactivateForm('map__filters');
deactivateForm('ad-form');
loadMap();
getData((advertisements) => {
  renderAdvertisementsPin(advertisements);
  applyFilter(debounce(() => renderAdvertisementsPin(advertisements)));
},
showPopupErrorGetData);
setHandleresForm();
setSubmitForm(showPopupSuccessSendForm, showPopupErrorSendForm);
