module.exports = function(app) {
    var data = require('../controllers/data.controller');
    
    app.route('/data')
        .get(data.list)
        .post(data.create);        
    app.route('/data/:token')
        .get(data.getAllValue)
        .put(data.update);
    app.route('/data/:token/:key')
        .get(data.getOneValue);
    app.param('token', data.parToken);
};