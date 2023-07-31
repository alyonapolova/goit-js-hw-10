import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '10px',
});
errorElement.style.display = 'none';

// Інформація про кота
function showCatInfo(catData) {
  const breedName = catData[0].breeds[0].name;
  const description = catData[0].breeds[0].description;
  const temperament = catData[0].breeds[0].temperament;
  const imageUrl = catData[0].url;

  catInfo.innerHTML = `
  <div><img src="${imageUrl}" alt="${breedName}"></div>
    <div class="img_info">
    <h2>${breedName}</h2>
    <p>Description: ${description}</p>
    <p>Temperament: ${temperament}</p></div>

  `;
}

// Показати помилку
function showError() {
  const errorMessage = errorElement.textContent;
  Notify.failure(errorMessage);
  catInfo.style.display = 'none';
  //errorElement.style.display = 'block';
}

//масив порід в option
fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';

    const selectData = breeds.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));
    console.log('Select data:', selectData);
    const slimSelect = new SlimSelect({
      select: breedSelect,
    });
    slimSelect.setData(selectData);
  })
  .catch(error => {
    loader.style.display = 'none';
    showError();
  });

//fetchCatByBreed(); //щоб побачити catData

breedSelect.addEventListener('change', chooseCat);

function chooseCat() {
  catInfo.style.display = 'none';

  const selectedBreedId = breedSelect.value;

  //console.log(selectedBreedId);
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorElement.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      loader.style.display = 'none';
      catInfo.style.display = 'flex';

      showCatInfo(catData);
      // console.log(catData);
    })
    .catch(error => {
      loader.style.display = 'none';
      showError();
    });
}
