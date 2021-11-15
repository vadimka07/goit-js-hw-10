import './css/styles.css';
import debounce from 'lodash.debounce';
import {getCountryName} from "./js/fetchCountries";

const DEBOUNCE_DELAY = 1000;
const getCountry = document.getElementById('search-box');

getCountry.addEventListener('input', debounce(getCountryName, DEBOUNCE_DELAY));
