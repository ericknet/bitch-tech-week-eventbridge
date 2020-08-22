const port = 8082;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const shipmentService = require('./services/shipment-service.js');
const counters = {success: 0, error: 0}

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.send('Sale API listening at port ${port}');
})

app.post('/shipment', (req, res) => {
    let saleData = req.body;
    console.log('Iniciar processamento da entrega da venda: ' + JSON.stringify(saleData));
    shipmentService.process(res, saleData, counters)
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
