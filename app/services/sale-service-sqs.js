const PAYMENT_SQS = 'https://sqs.sa-east-1.amazonaws.com/995635004925/queue-payment';
const SHIPPING_SQS = 'https://sqs.sa-east-1.amazonaws.com/995635004925/queue-shipment';

const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
let sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.process = (res, sale, counters) => {
  sendQueue(PAYMENT_SQS, sale)
    .then(data => sendQueue(SHIPPING_SQS, sale))
    .then(data => {
        counters.success = counters.success + 1;
        res.send({message: 'Obrigado pela preferência, sua compra está sendo processada.'});
     })
    .catch(err => {
      res.send(err);
      counters.errors = counters.errors + 1;
    })
    .finally(data => res.end());
}

async function sendQueue(queyeUrl, saleData) {
  var params = {
    MessageBody: JSON.stringify(saleData),
    QueueUrl: queyeUrl
  };

  return sqs.sendMessage(params).promise()
    .then(data => console.log("Success", data.MessageId));
}