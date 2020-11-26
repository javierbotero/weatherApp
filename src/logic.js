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
async function getDataFromApi(cityId) {
  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=03a141a48b790e67f9785ad5ec24617c`);
    return data.json();
  } catch (err) {
    console.log('An error!:', err);
    return `Something wen wrong becasue of this error: ${err}\n
      give it a try again with another option!`;
  }
}

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

export {
  lookForCity,
  getDataFromApi,
  createWeatherObject,
};
