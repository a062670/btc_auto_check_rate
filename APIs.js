const axios = require('axios');

exports.getDigitalRate = async ccy1 => {
  let response = await axios
    .post('https://api.bitfinex.com/v2/calc/fx', {
      ccy1: ccy1,
      ccy2: 'USD'
    })
    .catch(function(error) {
      console.log(error);
    });
  return response.data[0];
};

exports.getUSDRate = async () => {
  let response = await axios
    .get('https://tw.rter.info/capi.php')
    .catch(function(error) {
      console.log(error);
    });
  return response.data.USDTWD.Exrate;
};
