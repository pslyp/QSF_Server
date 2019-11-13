var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if(err) {  
            console.log("Create Fail"); 
            res.status(204);
            res.end();       
        } else {
            console.log("Create Success");
            res.status(200);
            res.end();           
        }
    });
};

exports.getUser = function(req, res, next) {
    var id = req.query.id;
    var token = req.query.token;

    if(id) {
        if(token) {
            User.findOne({ id: id }, 'token', function(err, doc) {
                if(err) {
                    return next(err);
                } else {
                    res.json(doc);
                }
            });
        }

        User.findOne({ id: id }, function(err, doc) {
            if(err) {
                return next(err);        
            } else {
                if(doc != null) {
                    console.log("A");
                    res.status(200);
                    res.end();
                } else {
                    console.log("B");
                    res.status(204);
                    res.end();
                }
            }
        });        
    } else {        
        User.find({}, function(err, col) {
            if(err) {
                return next(err);
            } else {
                res.json(col);
            }
        });
    }
};

exports.getUserById = function(req, res, next) {
    User.findOne({ id: req.params.id }, function(err, doc) {
        if(err) {
            return next(err);
        } else {
            res.json(doc);
        }
    });
};

exports.getMsgTokenById = function(req, res, next) {
    User.findOne({ id: req.params.id }, 'msgToken', function(err, doc) {
        if(err) {
            return next(err);
        } else {
            res.json(doc);
        }
    });
};

exports.getBoardById = function(req, res, next) {
    var token = req.query.token;

    if(token) {
        User.findOne({ id: req.doc.id, 'board.token': token }, 'board.$', function(err, doc) {
            if(err) {

            } else {
                if(doc != null) {
                    // res.json(doc);
                    res.status(204);
                    res.end();
                } else {
                    res.status(205);
                    res.end();
                }
                
            }
        });
    } else {
        User.findOne({ id: req.doc.id }, { '_id': 0, 'email': 0, 'firstname': 0, 'id': 0, 'lastname': 0, 'password': 0, 'msgToken': 0, '__v': 0 }, function(err, doc) {
            if(err) {
                return next(err);
            } else {           
                if(doc.board[0] != null) {
                    res.json(doc);
                } else {
                    res.status(204);
                    res.end();
                }                 
            }
        });
    }
};

exports.getBoardByToken = function(req, res, next) {
    User.findOne({ 'board.token': req.params.token }, 'board.$', function(err, doc) {
        if(err) {
            res.status(400);
            res.end();
        } else {
            if(doc != null) {
                res.json(doc);
            } else {
                res.status(204);
                res.end();
            }
        }
    });
};

exports.getBoardByIdAndToken = function(req, res, next) {
    User.findOne({ id: req.params.id, 'board.token': req.params.token }, 'board.$', function(err, doc) {
        if(err) {
            res.status(400);
            res.end();
        } else {
            if(doc != null) {
                res.status(200);
                res.json(doc);
            } else {
                res.status(204);
                res.end();
            }
        }
    });
};

exports.updateBoard = function(req, res, next) {
    var id = req.params.id;
    var token = req.params.token;
    var update = { 
                   'board.$.brightness': req.body.brightness,
                   'board.$.temperature': req.body.temperature,
                   'board.$.timeUp': req.body.timeUp,
                   'board.$.start': req.body.start,
                   'board.$.end': req.body.end 
                 };
    
    User.updateOne({ id: id, 'board.token': token }, { $set: update }, function(err) {
        if(err) {   
            res.status(400);
            res.end();
        } else {           
            res.status(204);
            res.end();
        }
    });
};

// exports.searchById = function(req, res, next) {
//     User.findOne({ id: req.query.id }, function(err, doc) {
//         if(err) {
//             return next(err);
//         } else {
//             if(doc != null) {
//                 res.json({ status: 'Found' });
//             } else {
//                 res.json({ status: 'Not Found'});
//             }        
//         }
//     });
// };

exports.insertBoardById = function(req, res, next) {
    User.findOneAndUpdate({ id: req.doc.id }, { $push: { board: req.body } }, function(err) {
        if(err) {
            // res.json({ status: "fail" });
            // console.log("Update Fail");
            res.status(400);
            res.end();
        } else {
            // res.json({ status: "success" });
            res.status(204);
            res.end();
            // console.log("Update Success");
        }
    });
};

exports.login = function(req, res, next) {
    var email = req.query.email;
    var passQ = req.query.pass;

    User.findOne({ email: email }, function(err, doc) {
        if(err) {
            return next(err);
        } else {
            if(doc != null) {
                console.log(doc.password);
                var passR = JSON.stringify(doc.password);
                console.log(passR);
                if(passQ != doc.password) {
                    res.status(204);
                    res.end();
                } else {
                    res.status(200).json(doc);
                }
            } else {
                res.status(400);
                res.end();
            }                     
        }
    });
};

exports.parId = function(req, res, next, id) {
    User.findOne({ id: id }, function(err, doc) {
        if(err) {
            return next(err);           
        } else {
            if(doc != null) {
                req.doc = doc;
                next();
            } else {
                res.status(204);
                res.end();
            }
        }
    });
};