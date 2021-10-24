import {createAdvertisements} from './mock/data-mock.js';
import './utils.js';
import {fillCardData} from './rendering.js';
import {deactivateForm, activateForm, validateForm} from './form.js';

document.querySelector('#map-canvas').appendChild(fillCardData(createAdvertisements()[0]));
deactivateForm('map__filters');
deactivateForm('ad-form');
activateForm('map__filters');
activateForm('ad-form');
validateForm();
