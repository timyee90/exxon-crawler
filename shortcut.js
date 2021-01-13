const axios = require('axios');

(async () => {
  let result = await axios.get(
    'https://www.exxon.com/en/api/locator/Locations?Latitude1=40.17523318465677&Latitude2=41.216402105456815&Longitude1=-75.12775228906249&Longitude2=-72.83160971093749&DataSource=RetailGasStations&Country=US&Customsort=False'
  );

  console.log(result);
})();
