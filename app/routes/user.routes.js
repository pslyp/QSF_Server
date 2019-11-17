module.exports = function(app) {
    var user = require('../controllers/user.controller'); 
     
    app.route('/user')
        .get(user.getUser)        
        .post(user.create);
    app.route('/user/login')
        .post(user.login);   
    // app.route('/user')    
    //     .get(user.searchById); 
    // app.route('/user/board/:token')
    //     .post(user.getBoardByToken);  
    app.route('/user/:id/token')
        .post(user.getMsgTokenById); 
    app.route('/user/:id/board/:token')
        .get(user.getBoardByIdAndToken)
        .put(user.updateBoard); 
    // app.route('/user/:id/board')
    //     .get(user.getBoardById);           
    app.route('/user/:id')
        .get(user.getUserById)
        // .post(user.getUserById)
        .put(user.insertBoardById);      
    app.param('id', user.parId);    
};