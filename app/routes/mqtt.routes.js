var data = require('../controllers/data.controller');
var user = require('../controllers/user.controller');

module.exports = function (client) {
    client.on('message', function (topic, message) {
        //var msg2 = 'gh51f5hr55gdfcue684fs61s6v3d54v8/Non-20:25PM-Bright:143-Temp:66.31-Fan:1-Lamp:0';
        //var mString = msg2.split('/');
        /*
        var mString = message.toString().split('/');

        console.log(message.toString());

        var token = mString[0];
        var msg = mString[1];

        console.log(topic.toString());
        console.log(token);
        console.log(msg);       
        */

        //User
        if(topic == "user/create") {
            //console.log(user.getOneValue(message));
            user.create(message);
        }
        if(topic == "user/delete") {

        }
        if(topic == "user/data/password/update") {

        }
        if(topic == "user/data/token") {
            
        }
        if(topic == "user/data/token/insert") {
            user.insert(message);
        }
        if(topic == "user/data/token/delete") {

        }        

        //Board
        if(topic == "board/data/create") {
            data.create(message);    
        }
        if(topic == "board/data/insert") {
            data.insert(message);
        }
        if(topic == "board/data/update") {
            data.update(message);
        }
        if(topic == "board/data/delete") {
            data.delete(message);
        }

        /*
        switch (topic) {
            case "create": console.log("Create");
                data.create(token, msg);               
                break;
            case "insert": console.log("Insert");
                data.insert(token, msg);
                break;
            case "update": console.log("Update");
                //data.update(token, msg);
                break;
            case "delete": console.log("Delete");
                data.delete(token);
                break;
            case "presence": console.log("Presence");
                //data.create(token, msg);
                //data.update(token, msg);
                break;
            case "user": console.log("User");

                break;
        } 
        */    

        if(topic == "fan") {
            console.log("Fan");
        }
    });
}