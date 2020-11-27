import {
  lookForCity, getDataFromApi, createWeatherObject, convertTemp,
} from './logic';

const queries = (() => {
  const body = () => document.querySelector('body');
  const div = () => document.createElement('div');
  const search = () => document.querySelector('input[type="text"]');
  const results = () => document.querySelector('.results');
  const tempSpans = () => document.querySelectorAll('.celsius');
  const btnSwitcher = () => document.querySelector('.switcher');

  const printLayout = () => {
    body().classList = 'bg-primary';
    body().innerHTML = `
      <header class="text-dark bg-warning p-5 text-center container-fluid">
        <h2 class="p-2">The Weather App</h2>
        <div class="">
          <p class="p-1">Write the city</p>
          <input type="text" placeholder="city" class="border-0 text-center p-2 my-2"><br>
          <button type="button" class="btn btn-success p-2">Search City</button>
        </div>
      </header>
      <div class="results bg-succes text-center container p-3"></div>
    `;
  };
  const printCities = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === 'Search City') {
      results().innerHTML = '';
      const str = search().value;
      const result = div();
      result.classList = 'row d-flex justify-content-center';
      lookForCity(str).forEach(city => {
        result.innerHTML += `
          <div class="col-sm-6 cities">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${city.name}</h5>
              <p class="card-text">
                Country code: ${city.country}, state: ${city.state}
              </p>
              <a href="#" class="btn btn-primary" data-index="${city.id}">Weather</a>
            </div>
          </div>
          </div>
        `;
      });
      results().appendChild(result);
      if (result.innerHTML === '') {
        results().innerHTML += '<h4 class="text-light p-5">No results, make sure you write with any tilde or any mark needed in the name of the City.</h4>';
      }
      search().value = '';
    }
  };

  const printWeatherData = (object) => {
    results().innerHTML = '';
    const html = `
    <div class="card mb-3 text-center bg-success text-white">
    <img src="${object.iconUrl}" class="card-img-top icon-weather" alt="${object.main}">
      <div class="card-body">
        <h4 class="card-title">${object.name}</h4>
        <h5 class="card-title">${object.main}</h5>
        <p class="card-text">${object.description}</p>
        <p class="card-text">clouds: ${Math.round(object.clouds)}%, temp: <span class="celsius">${Math.round(object.temp)}°C</span>, humidity: ${Math.round(object.humidity)}%, wind deg: ${object.windDeg}, wind speed: ${Math.round(object.windSpeed)}m/s</p>
        <p class="card-text">
          <small class="text-light">
            General conditions: coord: lat: ${object.coord.lat}, lon: ${object.coord.lon}, pressure: ${object.pressure}hPa, temp max: <span class="celsius">${Math.round(object.tempMax)}°C</span>, temp min: <span class="celsius">${Math.round(object.tempMin)}°C</span>
          </small>
        </p>
        <button type="button" class="switcher btn btn-warning" data-deg="C">See in Fahrenheit</button>
      </div>
    </div>
    `;
    results().innerHTML = html;
  };

  const printWeather = (e) => {
    if (e.target.dataset.index) {
      getDataFromApi(e.target.dataset.index)
        .then(data => {
          const myObj = createWeatherObject(data);
          return myObj;
        })
        .then(object => {
          printWeatherData(object);
        })
        .catch(err => {
          results().innerHTML = `
          <h5>An error has ocurred</h5>
          <p>Something went wrong because of this error: ${err}</p>
          <p>Try later...</p>
          `;
        });
    }
  };

  const printConvertTemp = (e) => {
    if (e.target.innerHTML === 'See in Celsius' || e.target.innerHTML === 'See in Fahrenheit') {
      convertTemp(tempSpans(), btnSwitcher());
    }
  };

  const addListeners = () => {
    body().addEventListener('click', (e) => { printCities(e); });
    body().addEventListener('click', (e) => { printWeather(e); });
    body().addEventListener('click', (e) => { printConvertTemp(e); });
  };

  return {
    printLayout,
    addListeners,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { queries };