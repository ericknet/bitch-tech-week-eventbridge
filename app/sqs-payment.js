const SQS_QUEUE_URL = "https://sqs.sa-east-1.amazonaws.com/995635004925/queue-payment";

const counters = {success: 0, error: 0}
const { Consumer } = require('sqs-consumer');

const eventbridgeService = require('./services/event-bridge-service')
const paymentService = require('./services/payment-service.js');

const sqsConsumer = Consumer.create({
    queueUrl: SQS_QUEUE_URL,
    batchSize: 10,
    terminateVisibilityTimeout: false,
    handleMessage: async (message) => {
      console.log(message);
      return paymentService.process(null, JSON.parse(message.Body), counters)
        .then(data => eventbridgeService.sentEvent('sale-payment', data, 'payment'))
    }
});

sqsConsumer.on('error', (err) => {
  console.error(err.message);
});

sqsConsumer.on('processing_error', (err) => {
  console.error(err.message);
  counters.error = counters.error + 1;
});

sqsConsumer.start();






const express = require('express');
const cors = require('cors')
const app = express();
const port = 8081;

app.use(cors())

app.get('/', (req, res) => {
    res.send('Sale API listening at port ${port}');
})

app.get('/counters', (req, res) => {
  res.send(counters);
})

app.post('/reset', (req, res) => {
  counters.success = 0;
  counters.error = 0;
  res.send(counters);
})

app.listen(port, () => {
    console.log(`Sale API listening at port ${port}`);
})