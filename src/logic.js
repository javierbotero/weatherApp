import cities from './city.list.json';

const lookForCity = (string) => {
  const input = [];
  string.split(' ').forEach((str) => {
    const newString = str.toLowerCase();
    const resultStr = newString[0].toUpperCase() + newString.substring(1, str.length);
    input.push(resultStr);
  });
  console.log(input);
  const filteredCities = cities.filter(obj => obj.name.indexOf(input.join(' ')) !== -1);
  return filteredCities;
};
async function getDataFromApi(cityId) {
  console.log(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=03a141a48b790e67f9785ad5ec24617c`);
  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=03a141a48b790e67f9785ad5ec24617c`);
    return data.json();
  } catch (err) {
    console.log('An error!:', err);
    return `Something wen wrong becasue of this error: ${err}\n
      give it a try again with another option!`;
  }
}

export {
  lookForCity,
  getDataFromApi,
};
