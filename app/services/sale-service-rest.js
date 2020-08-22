const PAYMENT_URL = 'http://localhost:8081/payment';
const SHIPPING_URL = 'http://localhost:8082/shipment';

const axios = require('axios');

exports.process = (res, saleData, counters) => {
  this.doPayment = (callback) => doPost(res, PAYMENT_URL, saleData, counters, callback);
  this.doShipment = (res, saleData) => doPost(res, SHIPPING_URL, saleData, counters, null);

  this.doPayment((res, returnData) => this.doShipment(res, returnData));
}

function doPost(res, url, saleData, counters, callback) {
  axios.post(url, saleData, {timeout: 3000})
  .then(response => {
    console.log("Resultado da chamada [" + url + "]:  " + JSON.stringify(response.data));
    if (callback == null) {
      res.send({
        message: 'Venda processada com sucesso.',
        result: response.data
      });
      counters.success = counters.success + 1;
    } else {
      callback(res, response.data);
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500);
    res.send(error);
    counters.error = counters.error + 1;
  });
}