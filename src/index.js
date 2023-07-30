// //import axios from 'axios';
// //import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

Notiflix.Notify.init({});

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
  Notiflix.Notify.Failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  //errorElement.style.display = 'block';
}

//масив порід в option
fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
      //console.log('breed:', breed);
    });
  })
  .catch(error => {
    loader.style.display = 'none';
    showError();
  });

//fetchCatByBreed(); //щоб побачити catData

breedSelect.addEventListener('change', chooseCat);

function chooseCat() {
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
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const loader = document.querySelector('.loader');
// const breedSelect = document.querySelector('.breed-select');
// const catInfo = document.querySelector('.cat-info');
// const errorElement = document.querySelector('.error');

// const slimSelect = new SlimSelect({
//   select: '#selectElement',
//   onChange: chooseCat,
// });

// function showCatInfo(catData) {
//   const breedName = catData[0].breeds[0].name;
//   const description = catData[0].breeds[0].description;
//   const temperament = catData[0].breeds[0].temperament;
//   const imageUrl = catData[0].url;

//   catInfo.innerHTML = `
//     <div><img src="${imageUrl}" alt="${breedName}"></div>
//     <div class="img_info">
//       <h2>${breedName}</h2>
//       <p>Description: ${description}</p>
//       <p>Temperament: ${temperament}</p>
//     </div>
//   `;
// }

// function showError() {
//   errorElement.style.display = 'block';
// }

// function addBreeds() {
//   fetchBreeds()
//     .then(breeds => {
//       loader.style.display = 'none';

//       const selectData = breeds.map(breed => ({
//         value: breed.id,
//         text: breed.name,
//       }));
//       console.log('Select data:', selectData);
//       slimSelect.setData(selectData);
//     })
//     .catch(error => {
//       loader.style.display = 'none';
//       showError();
//     });
// }

// addBreeds();

// function chooseCat() {
//   const selectedBreedId = slimSelect.selected();
//   console.log(selectedBreedId);
//   loader.style.display = 'block';
//   catInfo.style.display = 'none';
//   errorElement.style.display = 'none';

//   fetchCatByBreed(selectedBreedId)
//     .then(catData => {
//       loader.style.display = 'none';
//       catInfo.style.display = 'flex';
//       console.log(catData);
//       showCatInfo(catData);
//     })
//     .catch(error => {
//       loader.style.display = 'none';
//       showError();
//     });
// }
