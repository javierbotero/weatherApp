import { logic } from './logic';

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
  };
  const printCities = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.innerHTML === 'Search City') {
      results().innerHTML = '';
      const str = search().value;
      const result = div();
      result.classList = 'row';
      logic.lookForCity(str).forEach(city => {
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
      search().value = '';
    }
  };

  return {
    printLayout,
    addListeners,
  };
})();

export { queries };