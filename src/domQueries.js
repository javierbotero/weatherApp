import { lookForCity, getDataFromApi } from './logic';

const queries = (() => {
  const body = () => document.querySelector('body');
  const div = () => document.createElement('div');
  const search = () => document.querySelector('input[type="text"]');
  const results = () => document.querySelector('.results');

  const printLayout = () => {
    body().classList = 'bg-primary';
    body().innerHTML = `
      <header class="text-dark bg-warning">
        <h2>The Weather App</h2>
        <div class="">
          <p>Write the city</p>
          <input type="text" placeholder="city"><br>
          <button type="">Search City</button>
        </div>
      </header>
      <div class="results bg-succes"></div>
    `;
  };
  const addListeners = () => {
    body().addEventListener('click', (e) => { printCities(e); });
    body().addEventListener('click', (e) => { printWeather(e); });
  };
  const printCities = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === 'Search City') {
      results().innerHTML = '';
      const str = search().value;
      const result = div();
      result.classList = 'row';
      lookForCity(str).forEach(city => {
        result.innerHTML += `
          <div class="col-sm-6">
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

  const printWeather = (e) => {
    if (e.target.dataset.index) {
      const data = getDataFromApi(e.target.dataset.index)
        .then(data => {
          console.log(data);
          const myObj = {
            clouds: data.clouds.all,
            coord: data.coord,
            temp: data.main.temp,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.temp_min,
            pressure: data.main.pressure,
            name: data.name,
          };
          return myObj;
        })
        .catch(err => { console.log('OOpss, an error:', err); });
    }
  };

  return {
    printLayout,
    addListeners,
  };
})();

export { queries };