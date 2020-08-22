const uuid = require('uuid-random')

exports.process = async (res, saleData, counters) => {
    delayTime();

    saleData.shipment = {
        id: uuid(),
        address: saleData.shipmentAddress.toUpperCase(),  
        feeDeliveryValue: saleData.saleValue * 0.01,
        createDate: new Date()
    };
    console.log('Entrega realizada com sucesso.');
    counters.success = counters.success + 1;

    if (res != null) {
        res.send(saleData);
        res.end();
    }
    return saleData;
}

function delayTime() {
    let delay = getRandomInt(100, 100);
    var tFim = Date.now() + delay;
    console.log(`Aguardar ${delay} milisegundos.`)
    while (tFim > Date.now()) {
        Math.sqrt(Math.random() * 1000000) 
    }
    return delay;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
