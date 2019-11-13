var mongoose = require('mongoose');
//var uri = 'mongodb://localhost:27017/quailSF';
var uri = 'mongodb://heroku_54cbqx7k:vi7bjjbn8ln21isu6f8uafff0k@ds121834.mlab.com:21834/heroku_54cbqx7k';

module.exports = function() {
    mongoose.connect(uri, {useNewUrlParser: true});

    require('../app/models/data.model');
    require('../app/models/user.model');
};