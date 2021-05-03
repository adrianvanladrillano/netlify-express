const User = require('../models/user.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Project
    const user = new User({
        user_name: req.body.user_name,
        user_username: req.body.user_username,
        user_password: req.body.user_password,
        user_type: req.body.user_type,
        user_created: req.body.user_created,
    });

    // Save Customer in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || `Error: ${err}`,
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    // Create a User

    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        else res.send(data);
    });
};

