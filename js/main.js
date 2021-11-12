import {getData} from './api.js';
import {loadMap, renderAdvertisementsPin} from './map.js';
import {showPopupErrorGetData, showPopupErrorSendForm, showPopupSuccessSendForm} from './popup.js';
import {deactivateForm, setHandleresForm, setSubmitForm} from './form.js';

deactivateForm('map__filters');
deactivateForm('ad-form');
loadMap();
getData(renderAdvertisementsPin, showPopupErrorGetData);
setHandleresForm();
setSubmitForm(showPopupSuccessSendForm, showPopupErrorSendForm);
