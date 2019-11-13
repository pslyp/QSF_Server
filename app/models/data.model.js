var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    token: String,
    data: [{
        date: String,       
        fanSta: String,
        lampSta: String,
        feedSta: String,
        waterSta: String,
        brightness: Number,
        temperature: Number
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Data', dataSchema);