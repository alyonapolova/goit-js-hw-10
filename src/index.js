import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const BASE_URL = `https://api.thecatapi.com/v1/images/search`;
const API_KEY =
  'live_MKk2zEF5TQqpZTJvbHTWvTD1iPl8LekviPF2OBqVjGaO1Pphfaury76mh2tMJSWA';
let breedSelect = [];

fetchBreeds().then(breeds => {
  //   console.log(breeds);
  breeds.forEach(breed => {
    console.log('breed', breed.id);
    breedSelect.push(breed.id);
  });
});
console.log(breedSelect);

// axios
//   .get(BASE_URL, { headers: { 'x-api-key': API_KEY } })
//   .then(response => {
//     console.log(response);
//     return response;
//   })
//   .then(data => console.log(data))
//   .catch(error => console.warn);
