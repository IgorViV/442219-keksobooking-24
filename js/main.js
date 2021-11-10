import {createAdvertisements} from './mock/data-mock.js';
import {deactivateForm} from './form-activating.js';
import {showAdvertisementsToMap} from './map.js';
import {addHandleresToForm} from './form-validation.js';

deactivateForm('map__filters');
deactivateForm('ad-form');
showAdvertisementsToMap(createAdvertisements());
addHandleresToForm();
