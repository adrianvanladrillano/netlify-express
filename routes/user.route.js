module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Project
    app.post('/users', users.create);
    app.get('/users', users.findAll);
    // app.post('/users/get', users.authenticate);
};
