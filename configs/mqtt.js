var mqtt = require('mqtt');

var option = { username:"pslyp", password:"1475369" };
// var address = 'tcp://35.240.245.133:1883';   //Old Address
var address = 'tcp://test.mosquitto.org:1883';             //New Address

var client = mqtt.connect(address);

client.on('connect', function() {
    console.log("connected MQTT: " + client.connected);
    
    client.subscribe('presence');
    client.subscribe('presence2');
    client.subscribe('fan');
    client.subscribe('data');

    // client.subscribe('user/create');    
    // client.subscribe('user/delete');
    // //client.subscribe('user/data/token');
    // client.subscribe('user/data/token/insert');    
    // client.subscribe('user/data/token/delete');

    // client.subscribe('board/data/create');
    // client.subscribe('board/data/insert');
    // client.subscribe('board/data/update');
    // client.subscribe('board/data/delete');
});
    
require('../app/routes/mqtt.routes')(client);