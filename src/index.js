import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

// Function to display cat information
function displayCatInfo(catData) {
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

// Function to handle errors
function displayError() {
  errorElement.style.display = 'block';
}

// Fetch breeds and populate the select element
fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    loader.style.display = 'none';
    displayError();
  });

// Listen for breed selection change
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorElement.style.display = 'none';

  // Fetch cat information for the selected breed
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      loader.style.display = 'none';
      catInfo.style.display = 'flex';
      displayCatInfo(catData);
    })
    .catch(error => {
      loader.style.display = 'none';
      displayError();
    });
});

// loaderEl.style.display = 'none';
// errorEl.style.display = 'none';

// function addAllBreeds(breeds) {
//   breeds.forEach(breed => {
//     //console.log('breed', breed);
//     const optionEl = document.createElement('option');
//     optionEl.value = breed.id;
//     optionEl.textContent = breed.name;
//     breedSelect.appendChild(optionEl);
//     //console.log('optionEl', optionEl);
//   });
// }

// function getBreedsArray() {
//   fetchBreeds()
//     .then(breeds => {
//       addAllBreeds(breeds);
//       breedSelect.style.display = 'block';
//       showCatData();
//     })
//     .catch(error => {
//       console.error('Error fetching breeds:', error);
//       errorEl.style.display = 'block';
//     });
// }

// function getCatInfo(catData) {
//   catInfo.innerHTML = `<img src="${catData.vetstreet_url}" alt="${catData.name}"><h2>${catData.name}</h2><p>${catData.description}</p><p>${catData.temperament}</p>`;
// }

// function showCatData() {
//   breedSelect.addEventListener('change', selectBreed);

//   console.log('Event listener added.');

//   function selectBreed() {
//     console.log('Select breed called.');
//     const selectedBreedId = breedSelect.value;
//     if (selectedBreedId) {
//       fetchCatByBreed(selectedBreedId)
//         .then(catData => {
//           console.log('Cat data:', catData);
//           if (catData && catData.length > 0) {
//             getCatInfo(catData[0]);
//             catInfo.style.display = 'block';
//           } else {
//             catInfo.style.display = 'none';
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching cat data:', error);
//           errorEl.style.display = 'block';
//         });
//     } else {
//       catInfo.style.display = 'none';
//     }
//   }
// }

// getBreedsArray();

// getBreedsArray();
