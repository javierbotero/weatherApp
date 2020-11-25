import countries from './countries.json';
import cities from './city.list.json';

const logic = (() => {
  const lookForCity = (string, code) => {
    const filteredCities = cities.filter(
      obj => obj.name.indexOf(string) !== -1 && obj.country === code
    );
    return filteredCities;
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
