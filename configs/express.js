var express = require('express');

module.exports = function() {
    var app = express();
    require('../configs/bodyParser')(app);
    require('../app/routes/index.routes')(app);
    require('../app/routes/data.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/mqtt.routes')(app);
    return app;
};