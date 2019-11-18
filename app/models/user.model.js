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
        temperature: {
            min: Number,
            max: Number
        },
        timeUp: String,
        start: String,
        end: String
    }]
});

mongoose.model('User', userSchema);