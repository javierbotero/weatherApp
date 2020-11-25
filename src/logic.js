const cities = require('./city.list.json');

const logic = (() => {
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
  const lookForCodeCity = (event) => {
    
  };
  const getDataFromApi = async (city) => {
    try {
      const data = await fetch(`pro.openweathermap.org/data/2.5/forecast/hourly?q={${city}}&appid=9a6d75375af8f269043d2f00f6f9e6d9&mode=json`);
      return data.json();
    } catch (err) {
      console.log('An error!!!!:', err);
      return `Something wen wrong becasue of this error: ${err}\n
        give it a try again with another option!`;
    }
  };

  return {
    getDataFromApi,
    lookForCity,
  };
})();

export { logic };
