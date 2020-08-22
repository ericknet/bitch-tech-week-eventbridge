const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
const eventbridge = new AWS.EventBridge({apiVersion: '2015-10-07'});

exports.sentEvent = async (type, data, source) => {
    var params = {
        Entries: [
            {
                DetailType: type,
                EventBusName: 'sale-bus2',
                Source: source,
                Time: new Date(),
                Detail: JSON.stringify(data),
            }
        ]
    };
    return eventbridge.putEvents(params).promise();
}