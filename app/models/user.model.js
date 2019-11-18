var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    msgToken: String,
    board: [{
        token: String,
        name: String,
        brightness: Number,
        tempMin: Number,
        tempMax: Number,
        timeUp: String,
        start: String,
        end: String
    }]
});

mongoose.model('User', userSchema);