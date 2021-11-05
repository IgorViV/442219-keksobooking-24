import './utils.js';
import {deactivateForm} from './form-activating.js';
import {greateMap} from './map.js';
import {validateForm} from './form-validation.js';

deactivateForm('map__filters');
deactivateForm('ad-form');
greateMap();
validateForm();
