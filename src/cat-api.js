import axios from 'axios';
// const BASE_URL = `https://api.thecatapi.com/v1/images/search`;
axios.defaults.headers.common['x-api-key'] =
  'live_MKk2zEF5TQqpZTJvbHTWvTD1iPl8LekviPF2OBqVjGaO1Pphfaury76mh2tMJSWA';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error:', error);
    });
}

export function fetchCatByBreed(breedId) {
  const params = { breed_ids: breedId };

  return axios
    .get('https://api.thecatapi.com/v1/images/search', { params })
    .then(response => {
      //console.log('catData:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
