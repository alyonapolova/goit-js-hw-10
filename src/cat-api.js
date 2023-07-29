import axios from 'axios';
const BASE_URL = `https://api.thecatapi.com/v1/images/search`;
axios.defaults.headers.common['x-api-key'] =
  'live_MKk2zEF5TQqpZTJvbHTWvTD1iPl8LekviPF2OBqVjGaO1Pphfaury76mh2tMJSWA';

export function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}`)
    .then(response => console.log('fetchCatByBreed', response));
}
