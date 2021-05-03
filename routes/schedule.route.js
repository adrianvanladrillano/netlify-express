module.exports = (app) => {
    const schedules = require('../controllers/schedule.controller.js');

    // Create a new Project
    app.post('/schedules', schedules.create);
    app.get('/schedules', schedules.findAll);
    // app.post('/users/get', users.authenticate);
};
