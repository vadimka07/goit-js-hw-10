import Notiflix from "notiflix";

const countryInfoContainer = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');

export function getCountryName(e) {
  let currentValue = e.target.value.trim();
  if (!currentValue) {
    countryInfoContainer.innerHTML = '';
    countriesList.innerHTML = '';
    return Notiflix.Notify.warning('Enter country name', {
      width: '450px',
      svgSize: '240px',
      fontSize: '25px'
    });
  }
  fetch(`https://restcountries.com/v3.1/name/${currentValue}`, {
    headers: {
      Accept: "application/json",
    }
  }).then(response => {
    return response.json();
  }).then((data) => {
    if (data.length > 10) {
      return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {
        width: '450px',
        svgSize: '240px',
        fontSize: '25px'
      });
    }
    if (data.length >= 2 && data.length <= 10) {
      const result = data.map((item) => {
        return `<li>
          <div class="flag" style="display: flex; align-items: center">
              <img src="${item.flags.svg}" alt="flag" width="100">
          </div>
          <h2 class="name">${item.name.official}</h2>
        </li>`
      }).join('')
      countryInfoContainer.innerHTML = '';
      countriesList.innerHTML = result;
      Notiflix.Notify.success(`Quantity countries ${data.length}`, {
        width: '450px',
        svgSize: '240px',
        fontSize: '25px'
      });

    } else {
      const result = data.map((item) => {
        const {languages} = item
        const values = Object.values(languages);
        return `<li>
            <div class="flag">
                <img src="${item.flags.svg}" alt="flag" width="150">
            </div>
            <h2 class="name">${item.name.official}</h2>
            <p class="capital"><strong>Capital:</strong> ${item.capital}</p>
            <p class="population"><strong>Population:</strong> ${item.population}</p>
            <p class="lunguages">
                <strong>Lenguages:</strong>
                ${values.join(', ')}
            </p>
          </li>`
      })
      countriesList.innerHTML = '';
      countryInfoContainer.innerHTML = result;
      Notiflix.Notify.success('Country is ok',{
        width: '450px',
        svgSize: '240px',
        fontSize: '25px'
      });
    }
  }).catch((error) => {
    countriesList.innerHTML = '';
    countryInfoContainer.innerHTML = '';
    return Notiflix.Notify.failure("Oops, there is no country with that name", {
      width: '450px',
      svgSize: '240px',
      fontSize: '25px'
    });
  })
}