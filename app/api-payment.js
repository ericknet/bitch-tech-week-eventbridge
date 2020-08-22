const port = 8081;

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const paymentService = require('./services/payment-service.js');
const counters = {success: 0, error: 0};

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.send('Sale API listening at port ${port}');
})

app.post('/payment', (req, res) => {
    let saleData = req.body;
    console.log('Iniciar processamento do pagamento da venda: ' + JSON.stringify(saleData));
    paymentService.process(res, saleData, counters)
        .catch(err => {
            res.status(500);
            res.send(err);
        });
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
