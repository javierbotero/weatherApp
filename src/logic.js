import cities from './city.list.json';

const lookForCity = (string) => {
  const input = [];
  string.split(' ').forEach((str) => {
    const newString = str.toLowerCase();
    const resultStr = newString[0].toUpperCase() + newString.substring(1, str.length);
    input.push(resultStr);
  });
  const filteredCities = cities.filter(obj => obj.name.indexOf(input.join(' ')) !== -1);
  return filteredCities;
};
const getDataFromApi = async (cityId) => {
  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=03a141a48b790e67f9785ad5ec24617c&units=metric`, { mode: 'cors' });
    return data.json();
  } catch (err) {
    return `Something wen wrong becasue of this error: ${err}\n
      give it a try again with another option!`;
  }
};

const createWeatherObject = (data) => {
  const myObj = {
    clouds: data.clouds.all,
    coord: data.coord,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.temp_min,
    pressure: data.main.pressure,
    name: data.name,
    iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    description: data.weather[0].description,
    main: data.weather[0].main,
    windDeg: data.wind.deg,
    windSpeed: data.wind.speed,
  };

  return myObj;
};

const convertTemp = (nodeList, btn) => {
  if (btn.dataset.deg === 'C') {
    nodeList.forEach((el) => {
      const newVal = (
        parseInt(el.innerHTML.substring(0, el.innerHTML.length - 2), 10) * (9 / 5)
      ) + 32;
      el.innerHTML = `${Math.round(newVal)}°F`;
    });
    btn.innerHTML = 'See in Celsius';
    btn.dataset.deg = 'F';
  } else {
    nodeList.forEach((el) => {
      const newVal = (
        parseInt(el.innerHTML.substring(0, el.innerHTML.length - 2), 10) - 32
      ) * (5 / 9);
      el.innerHTML = `${Math.round(newVal)}°C`;
    });
    btn.innerHTML = 'See in Fahrenheit';
    btn.dataset.deg = 'C';
  }
};

export {
  lookForCity,
  getDataFromApi,
  createWeatherObject,
  convertTemp,
};
