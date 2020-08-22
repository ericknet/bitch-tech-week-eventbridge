let eventbridgeService = require('./event-bridge-service')

exports.process = (res, saleData, counters) => {
  eventbridgeService.sentEvent('sale', saleData, 'api-sale')
    .then(data => {
      console.log("Sucesso ao enviar para o barramento de eventos: " + JSON.stringify(data));     
      res.send({message: 'Obrigado pela preferência, sua compra está sendo processada.'});
      counters.success = counters.success + 1;  
    }).catch(err => {
      console.log("Erro ao enviar para o barramento de eventos: " + err);     
      res.send(err)
      counters.errors = counters.errors + 1; 
    });
}