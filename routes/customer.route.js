module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');

    // Create a new Project
    app.post('/customers', customers.create);
    app.get('/customers', customers.findAll);
    // app.post('/users/get', users.authenticate);
};
