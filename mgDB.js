var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017/quailSF';
var db = mongoose.connect(uri);

var bodyParser = require('body-parser');

var Schema = mongoose.Schema;

var tankSchema = new Schema({
    name: String,
    size: String
});

var apps = require('express')();
var port = process.env.PORT || 5000;

apps.use(bodyParser.json());
apps.use(bodyParser.urlencoded({
    extended: true
}));

//var schema = new mongoose.Schema({ name: 'string', size: 'string'});
var Tank = mongoose.model('Tank', tankSchema);

apps.post('/newdata', function(req, res) {
    var small = new Tank(req.body);
    //var small = new Tank({ size: 'small'});
    small.save(function(err) {
        if(err)
            return handleError(err);
        else
            res.send(small);
    });
});

apps.get('/', function(req, res) {
    res.send("Hello World");
});

apps.listen(port, function() {
    console.log("Port: " + port);
});