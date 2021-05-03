const Schedule = require('../models/schedule.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Project
    const schedule = new Schedule({
        schedule_customer: req.body.schedule_customer,
        schedule_job: req.body.schedule_job,
        schedule_status: req.body.schedule_status,
        schedule_date: req.body.schedule_date,
        schedule_created: req.body.schedule_created,
        schedule_time: req.body.schedule_time,
        schedule_remark: req.body.schedule_remark,
        schedule_total: req.body.schedule_total,
        schedule_received: req.body.schedule_received,
        schedule_encoded: req.body.schedule_encoded,
        schedule_type: req.body.schedule_type
    });

    // Save Customer in the database
    Schedule.create(schedule, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || `Error: ${err}`,
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    // Create a Customer

    Schedule.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        else res.send(data);
    });
};

