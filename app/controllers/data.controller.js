var Data = require('mongoose').model('Data');

exports.create = function(req, res, next) { 
    var token = req.query.token;   
    var data = new Data(req.body);
    
    if(token) {
        Data.findOne({ token: token }, function(err, doc) {
            if(err) {
                res.status(400);
                res.end();
            } else {
                if(doc != null) {
                    res.status(204);
                    res.end();
                } else {
                    res.status(205);
                    res.end();
                }
            }
        });
    } else {
        data.save(function(err) {
            if(err) {
                // return next(err);
                res.status(400);
                res.end();
            } else {
                res.json(data);
            }
        });
    }
};

exports.insert = function(message) {
    //Token --> gh51f5hr55gdf71sfde4fs61s6v3d54v8
    //Message --> Non-20:25PM-Bright:143-Temp:66.31-Fan:1-Lamp:0

    var part = message.toString().split('/');

    var token = part[0];
    var value = part[1].split('-');

    var name = value[0];
    var date = value[1];
    const bright = value[2];
    const temp = value[3];
    const fan = value[4];
    const lamp = value[5];
    // const bright = value[2].substring(value[2].indexOf(':')+1);
    // const temp = value[3].substring(value[3].indexOf(':')+1);
    // const fan = value[4].substring(value[4].indexOf(':')+1);
    // const lamp = value[5].substring(value[5].indexOf(':')+1);

    console.log("********************");
    console.log("Insert");
    console.log(date);
    console.log(bright);
    console.log(temp);
    console.log(fan);
    console.log(lamp);

    var dataArray = { date: date, brightness: bright, temperature: temp, fan: fan, lamp: lamp };
    Data.findOneAndUpdate({ token: token }, { $push: { data: dataArray } }, function(err, doc) {
        if(err) {
            return next(err);
        } else {
            console.log(doc);
        }
    });
};

exports.list = function(req, res, next) {
    Data.find({}, function(err, datas) {
        if(err) {
            return next(err);
        } else {
            res.json(datas);
        }
    });
};

exports.getOneValue = function(req, res, next) {
    var key = req.params.key;

    Data.findOne({ token: req.doc.token }, function(err, doc) {
        if(err) {
            res.status(205);
            res.end();
        } else {
            //res.json(col);
            // var value = JSON.stringify(col);
            // value = value.substring(value.lastIndexOf(':')+2, value.lastIndexOf('"'));
            // res.send(value);

            res.status(204);
            res.end();
        }        
    });
};

exports.getAllValue = function(req, res, next) {
    Data.findOne({ token: req.doc.token }, function(err, doc) {
        if(err) {
            return next(err);
        } else {
            res.json(doc);
        }
    });
};

//Update for RestAPI
/*
exports.update = function(req, res, next) {
    Data.findOneAndUpdate({ token: req.doc.token }, req.body, function(err, datas) {
        if(err) {
            return next(err);
        } else {
            res.json(datas);
        }
    });
};
*/

exports.update = function(req, res, next) {
    var token = req.params.token;

    Data.findOneAndUpdate({ token: token }, { $push: { data: req.body } }, function(err) {
        if(err) {
            res.status(400);
            res.end();
        } else {
            res.status(204);
            res.end();
        }
    });
};

exports.delete = function(token) {
    Data.deleteOne({ token: token }, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Delete token " + token + " Success");
        }
    });
};

exports.parToken = function(req, res, next, token) {
    Data.findOne({ token: token }, function(err, doc) {
        if(err) {
            return next(err);
        } else {
            req.doc = doc;
            next();
        }
    });
};