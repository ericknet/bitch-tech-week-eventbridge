const APP_PORT = 8080;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const saleService = require('./services/sale-service-event-rest')
const counters = {success: 0, error: 0}

const app = express()
app.use(cors())
app.use(express.static('./'))
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.html');
})

app.post('/sale', (req, res) => {
    let saleData = req.body;
    console.log("Inicio processamento da venda: " + JSON.stringify(saleData));
    saleService.process(res, saleData, counters);   
})

app.get('/counters', (req, res) => {
    res.send(counters);
})

app.post('/reset', (req, res) => {
    counters.success = 0;
    counters.error = 0;
    res.send(counters);
})


app.listen(APP_PORT, () => {
    console.log(`Sale API listening at port ${APP_PORT}`)
})

