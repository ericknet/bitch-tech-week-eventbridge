const uuid = require('uuid-random')

exports.process = async (res, saleData, counters) => {
    delayTime();

    if (saleData.saleValue == null || saleData.saleValue < 1) {
        throw "Valor da venda precisa ser maior que 1.00";
    }
    saleData.payment = {
        id: uuid(),
        feeConvenienceValue: saleData.saleValue * 0.05,
        createDate: new Date()
    };
    console.log('Pagamento realizado com sucesso. ');

    counters.success = counters.success + 1;
    if (res != null) {
        res.send(saleData);
        res.end();
    }

    return saleData;
}

function delayTime() {
    let delay = getRandomInt(100, 300);
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
